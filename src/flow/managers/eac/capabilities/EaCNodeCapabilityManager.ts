import { NullableArrayOrObject } from '@fathym/common';
import { EaCVertexDetails } from '@fathym/eac';
import { EaCFlowNodeMetadata } from '@o-industrial/common/eac';
import { FlowGraphNode } from '../../../types/graph/FlowGraphNode.ts';
import { FlowGraphEdge } from '../../../types/graph/FlowGraphEdge.ts';
import { OpenIndustrialEaC } from '../../../../types/OpenIndustrialEaC.ts';

/**
 * Abstract base class for managing scoped node capabilities in the EaC model.
 *
 * Implementations of this class define how a specific node type:
 * - Projects into the graph (`BuildNode`)
 * - Generates edges (`BuildEdgesForNode`)
 * - Computes patch mutations (`BuildUpdatePatch`, `BuildDeletePatch`, `BuildConnectionPatch`)
 * - Extracts structured metadata and details (`GetAsCode`)
 */
export abstract class EaCNodeCapabilityManager<
  TDetails extends EaCVertexDetails = EaCVertexDetails
> {
  /**
   * Canonical node type string, used for matching and capability resolution.
   */
  public abstract Type: string;

  /**
   * Construct a FlowGraphNode from a known ID and current EaC context.
   */
  public BuildNode(
    id: string,
    context: EaCNodeCapabilityContext
  ): FlowGraphNode | null {
    return this.buildNode?.(id, context) ?? null;
  }

  /**
   * Generate outbound FlowGraphEdges from the given node.
   */
  public BuildEdgesForNode(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): FlowGraphEdge[] {
    return this.buildEdgesForNode?.(node, context) ?? [];
  }

  /**
   * Generate a partial EaC patch representing a valid connection from source → target.
   */
  public BuildConnectionPatch(
    source: FlowGraphNode,
    target: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    return this.buildConnectionPatch?.(source, target, context) ?? null;
  }

  /**
   * Checks if this capability manager supports the given node.
   */
  public Matches(node: FlowGraphNode): boolean {
    return node.Type === this.Type;
  }

  /**
   * Extracts the structured AsCode representation of a node’s current state.
   */
  public GetAsCode(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): EaCNodeCapabilityAsCode<TDetails> | null {
    return this.buildAsCode(node, context);
  }

  /**
   * Builds a partial EaC update patch from a node mutation.
   */
  public BuildUpdatePatch(
    node: FlowGraphNode,
    update: EaCNodeCapabilityPatch<TDetails>,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    return this.buildUpdatePatch(node, update, context);
  }

  /**
   * Builds a partial EaC delete patch for the given node.
   */
  public BuildDeletePatch(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): NullableArrayOrObject<OpenIndustrialEaC> | null {
    return this.buildDeletePatch(node, context);
  }

  // ---------------------------------------------------------------------
  // Subclass-required implementations (to be overridden)
  // ---------------------------------------------------------------------

  protected abstract buildAsCode(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): EaCNodeCapabilityAsCode<TDetails> | null;

  protected abstract buildUpdatePatch(
    node: FlowGraphNode,
    update: EaCNodeCapabilityPatch<TDetails>,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null;

  protected abstract buildDeletePatch(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): NullableArrayOrObject<OpenIndustrialEaC> | null;

  /**
   * Optional override for building a node from ID.
   */
  protected abstract buildNode?(
    id: string,
    context: EaCNodeCapabilityContext
  ): FlowGraphNode | null;

  /**
   * Optional override for computing outbound edges.
   */
  protected abstract buildEdgesForNode?(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): FlowGraphEdge[];

  /**
   * Optional override for connection patch generation.
   */
  protected abstract buildConnectionPatch?(
    source: FlowGraphNode,
    target: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null;

  // ---------------------------------------------------------------------
  // Shared utility helpers
  // ---------------------------------------------------------------------

  /**
   * Utility to merge node details + metadata into a single object.
   */
  protected mergeDetailsAndMetadata<T extends object>(
    details?: T,
    metadata?: EaCFlowNodeMetadata
  ): T & { Metadata?: EaCFlowNodeMetadata } {
    return {
      ...(details ?? {}),
      ...(metadata ? { Metadata: metadata } : {}),
    } as T & { Metadata?: EaCFlowNodeMetadata };
  }

  /**
   * Splits compound node ID (like "surface->connection") into [parent, child].
   * Throws if invalid format.
   */
  protected extractCompoundIDs(node: FlowGraphNode): [string, string] {
    const parts = node.ID.split('->');
    if (parts.length !== 2) {
      throw new Error(`Invalid compound ID: ${node.ID}`);
    }
    return [parts[0], parts[1]];
  }

  /**
   * Wraps a delete operation into the correct EaC nesting structure.
   */
  protected wrapDeletePatch(
    outer: keyof OpenIndustrialEaC,
    inner: string
  ): NullableArrayOrObject<OpenIndustrialEaC> {
    return {
      [outer]: {
        [inner]: null,
      },
    };
  }
}

// ---------------------------------------------------------------------
// Type Signatures
// ---------------------------------------------------------------------

/**
 * Context object passed to all capability operations.
 */
export type EaCNodeCapabilityContext = {
  /**
   * Read-only accessor for the current EaC model (with overlays applied).
   */
  GetEaC: () => OpenIndustrialEaC;

  /**
   * Optional SurfaceLookup when scoped to a specific surface.
   */
  SurfaceLookup?: string;
};

/**
 * Return structure for a GetAsCode call.
 */
export type EaCNodeCapabilityAsCode<
  TDetails extends EaCVertexDetails = EaCVertexDetails
> = {
  Details: TDetails;
  Metadata?: EaCFlowNodeMetadata;
};

/**
 * Patch input used when building a node update.
 */
export type EaCNodeCapabilityPatch<
  TDetails extends EaCVertexDetails = EaCVertexDetails
> = {
  Details?: TDetails;
  Metadata?: EaCFlowNodeMetadata;
};
