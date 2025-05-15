import { NullableArrayOrObject } from '@fathym/common';
import { EaCVertexDetails } from '@fathym/eac';
import { EaCFlowNodeMetadata } from '@o-industrial/common/eac';
import { FlowGraphNode } from '../../../types/graph/FlowGraphNode.ts';
import { OpenIndustrialEaC } from '../../../../types/OpenIndustrialEaC.ts';

export abstract class EaCNodeCapabilityManager<
  TDetails extends EaCVertexDetails = EaCVertexDetails
> {
  public abstract Type: string;

  public Matches(node: FlowGraphNode): boolean {
    return node.Type === this.Type;
  }

  public GetAsCode(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): EaCNodeCapabilityAsCode<TDetails> | null {
    return this.buildAsCode(node, context);
  }

  public BuildUpdatePatch(
    node: FlowGraphNode,
    update: EaCNodeCapabilityPatch<TDetails>,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    return this.buildUpdatePatch(node, update, context);
  }

  public BuildDeletePatch(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): NullableArrayOrObject<OpenIndustrialEaC> | null {
    return this.buildDeletePatch(node, context);
  }

  // ---------------- Protected helpers for subclasses ----------------

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

  protected mergeDetailsAndMetadata<T extends object>(
    details?: T,
    metadata?: EaCFlowNodeMetadata
  ): T & { Metadata?: EaCFlowNodeMetadata } {
    return {
      ...(details ?? {}),
      ...(metadata ? { Metadata: metadata } : {}),
    } as T & { Metadata?: EaCFlowNodeMetadata };
  }

  protected extractCompoundIDs(node: FlowGraphNode): [string, string] {
    const parts = node.ID.split('->');
    if (parts.length !== 2) throw new Error(`Invalid compound ID: ${node.ID}`);
    return [parts[0], parts[1]];
  }

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

export type EaCNodeCapabilityContext = {
  GetEaC: () => OpenIndustrialEaC;

  SurfaceLookup?: string;
};

export type EaCNodeCapabilityAsCode<
TDetails extends EaCVertexDetails = EaCVertexDetails
> = {
  Details: TDetails;

  Metadata?: EaCFlowNodeMetadata;
};

export type EaCNodeCapabilityPatch<
  TDetails extends EaCVertexDetails = EaCVertexDetails
> = {
  Details?: TDetails;
  
  Metadata?: EaCFlowNodeMetadata;
};
