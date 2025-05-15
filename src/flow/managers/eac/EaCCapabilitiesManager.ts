// deno-lint-ignore-file no-explicit-any
import { ComponentType } from 'preact';
import { NullableArrayOrObject } from '@fathym/common';

import { OpenIndustrialEaC } from '../../../types/OpenIndustrialEaC.ts';
import { NodeScopeTypes } from '../../types/graph/NodeScopeTypes.ts';
import { FlowGraphEdge } from '../../types/graph/FlowGraphEdge.ts';
import { FlowGraphNode } from '../../types/graph/FlowGraphNode.ts';

import { EaCNodeCapabilityContext } from '../../types/nodes/EaCNodeCapabilityContext.ts';
import { EaCNodeCapabilityAsCode } from '../../types/nodes/EaCNodeCapabilityAsCode.ts';
import { EaCNodeCapabilityPatch } from '../../types/nodes/EaCNodeCapabilityPatch.ts';

import { EaCNodeCapabilityManager } from './capabilities/EaCNodeCapabilityManager.ts';
import { EaCConnectionNodeCapabilityManager } from './capabilities/EaCConnectionNodeCapabilityManager.ts';
import { EaCSimulatorNodeCapabilityManager } from './capabilities/EaCSimulatorNodeCapabilityManager.ts';
import { EaCSurfaceAgentNodeCapabilityManager } from './capabilities/EaCSurfaceAgentNodeCapabilityManager.ts';
import { EaCSurfaceConnectionNodeCapabilityManager } from './capabilities/EaCSurfaceConnectionNodeCapabilityManager.ts';
import { EaCSurfaceNodeCapabilityManager } from './capabilities/EaCSurfaceNodeCapabilityManager.ts';
import { EaCSurfaceSchemaNodeCapabilityManager } from './capabilities/EaCSurfaceSchemaNodeCapabilityManager.ts';
import { Position } from '@o-industrial/common/eac';
import { NodePreset } from '../../types/react/NodePreset.ts';

/**
 * Dispatcher and registry for node capability managers, scoped to either workspace or surface.
 *
 * Routes node-based operations (update, delete, render, edge generation) to the correct capability
 * handler based on the `Type` of the node.
 */
export class EaCCapabilitiesManager {
  protected rendererMap: Record<string, ComponentType<any>>;

  /**
   * Internal list of active capability managers based on current scope.
   */
  protected capabilities: EaCNodeCapabilityManager[] = [];

  constructor(protected scope: NodeScopeTypes) {
    // Register capability implementations by scope
    if (scope === 'surface') {
      this.capabilities = [
        new EaCSurfaceSchemaNodeCapabilityManager(),
        new EaCSurfaceAgentNodeCapabilityManager(),
        new EaCSurfaceConnectionNodeCapabilityManager(),
      ];
    } else if (scope === 'workspace') {
      this.capabilities = [
        new EaCConnectionNodeCapabilityManager(),
        new EaCSurfaceNodeCapabilityManager(),
        new EaCSimulatorNodeCapabilityManager(),
      ];
    }

    this.rendererMap = Object.fromEntries(
      this.capabilities
        .map((c) => [c.Type, c.GetRenderer()])
        .filter(([, r]) => !!r)
    );
  }

  /**
   * Generates a patch for creating a connection (edge) between two nodes.
   */
  public BuildConnectionPatch(
    source: FlowGraphNode,
    target: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    return (
      this.GetCapabilityFor(source)?.BuildConnectionPatch?.(
        source,
        target,
        context
      ) ?? null
    );
  }

  /**
   * Returns all outbound edges from the given node, if supported.
   */
  public BuildEdgesForNode(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): FlowGraphEdge[] {
    return (
      this.GetCapabilityFor(node)?.BuildEdgesForNode?.(node, context) ?? []
    );
  }

  /**
   * Attempts to render a full FlowGraphNode from an ID and type string.
   */
  public BuildNode(
    id: string,
    type: string,
    context: EaCNodeCapabilityContext
  ): FlowGraphNode | null {
    return (
      this.GetCapabilityFor({ ID: id, Type: type })?.BuildNode?.(id, context) ??
      null
    );
  }

  /**
   * Generates a delete patch to remove the node from the current EaC model.
   */
  public BuildDeletePatch(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): NullableArrayOrObject<OpenIndustrialEaC> | null {
    return this.GetCapabilityFor(node)?.BuildDeletePatch(node, context) ?? null;
  }

  /**
   * Generates a patch for deleting a connection (edge) between two nodes.
   */
  public BuildDisconnectionPatch(
    source: FlowGraphNode,
    target: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    return (
      this.GetCapabilityFor(source)?.BuildDisconnectionPatch?.(
        source,
        target,
        context
      ) ?? null
    );
  }

  /**
   * Generates a scoped partial EaC structure from a preset drop action.
   *
   * This is typically called when a user drags a new node type (e.g. `agent`, `schema`)
   * onto the canvas. It creates the minimal initial EaC structure, with surface bindings
   * if applicable to the current scope.
   *
   * @param type - Node type (e.g., 'agent', 'connection', 'schema')
   * @param id - Unique ID for the new node
   * @param position - Flow position where the node was dropped
   * @param context - Scope-aware node context (e.g., includes surface lookup)
   */
  public BuildPresetPatch(
    type: string,
    id: string,
    position: Position,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    const capability = this.GetCapabilityFor({ ID: id, Type: type });

    if (!capability?.BuildPresetPatch) {
      throw new Error(
        `❌ Capability for type '${type}' does not support preset patching.`
      );
    }

    return capability.BuildPresetPatch(id, position, context);
  }

  /**
   * Builds a partial EaC update patch based on modifications to the node.
   */
  public BuildUpdatePatch(
    node: FlowGraphNode,
    patch: EaCNodeCapabilityPatch,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    return (
      this.GetCapabilityFor(node)?.BuildUpdatePatch(node, patch, context) ??
      null
    );
  }

  /**
   * Extracts the current state of a node as metadata and details (AsCode form).
   */
  public GetAsCode(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): EaCNodeCapabilityAsCode | null {
    return this.GetCapabilityFor(node)?.GetAsCode(node, context) ?? null;
  }

  /**
   * Returns the registered capability that supports the given node, if any.
   */
  public GetCapabilityFor(
    node: FlowGraphNode
  ): EaCNodeCapabilityManager | undefined {
    return this.capabilities.find((cap) => cap.Matches(node));
  }

  public GetPresets(): Record<string, NodePreset> {
    return Object.fromEntries(
      this.capabilities
        .map((c) => [c.Type, c.GetPreset()])
        .filter(([_, p]) => !!p)
    );
  }

  public GetInspector(id: string, type: string): ComponentType<any> | null {
    return (
      this.GetCapabilityFor({ ID: id, Type: type })?.GetInspector() ?? null
    );
  }

  public GetRendererMap(): Record<string, ComponentType<any>> {
    return this.rendererMap;
  }

  /**
   * Delegates to the capability responsible for the given node to retrieve stats.
   * This supports both default and customized capability-level stat logic.
   */
  public async GetStats(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): Promise<Record<string, unknown>>;

  /**
   * Delegates to the capability responsible for the given node to retrieve stats.
   * This supports both default and customized capability-level stat logic.
   */
  public async GetStats(
    type: string,
    id: string,
    context: EaCNodeCapabilityContext
  ): Promise<Record<string, unknown>>;

  /**
   * Delegates to the capability responsible for the given node to retrieve stats.
   * This supports both default and customized capability-level stat logic.
   */
  public async GetStats(
    nodeOrType: FlowGraphNode | string,
    contextOrId: EaCNodeCapabilityContext | string,
    context?: EaCNodeCapabilityContext
  ): Promise<Record<string, unknown>> {
    let node: FlowGraphNode =
      typeof nodeOrType === 'string'
        ? ({
            Type: nodeOrType,
          } as FlowGraphNode)
        : nodeOrType;

    if (typeof contextOrId === 'string') {
      node = {
        ...node,
        ID: contextOrId,
      } as FlowGraphNode;
    } else {
      context = contextOrId;
    }

    const capability = this.GetCapabilityFor(node)!;

    return await capability.GetStats(node.Type, node.ID, context!);
  }
}
