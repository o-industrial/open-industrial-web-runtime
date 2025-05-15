import { NullableArrayOrObject } from '@fathym/common';

import { OpenIndustrialEaC } from '../../../types/OpenIndustrialEaC.ts';
import { NodeScopeTypes } from '../../types/graph/NodeScopeTypes.ts';
import { FlowGraphEdge } from '../../types/graph/FlowGraphEdge.ts';
import { FlowGraphNode } from '../../types/graph/FlowGraphNode.ts';

import { EaCNodeInspectorManager } from './EaCNodeInspectorManager.ts';

import {
  EaCNodeCapabilityAsCode,
  EaCNodeCapabilityContext,
  EaCNodeCapabilityPatch,
} from './capabilities/EaCNodeCapabilityManager.ts';

import { EaCNodeCapabilityManager } from './capabilities/EaCNodeCapabilityManager.ts';
import { EaCConnectionNodeCapabilityManager } from './capabilities/EaCConnectionNodeCapabilityManager.ts';
import { EaCSimulatorNodeCapabilityManager } from './capabilities/EaCSimulatorNodeCapabilityManager.ts';
import { EaCSurfaceAgentNodeCapabilityManager } from './capabilities/EaCSurfaceAgentNodeCapabilityManager.ts';
import { EaCSurfaceConnectionNodeCapabilityManager } from './capabilities/EaCSurfaceConnectionNodeCapabilityManager.ts';
import { EaCSurfaceNodeCapabilityManager } from './capabilities/EaCSurfaceNodeCapabilityManager.ts';
import { EaCSurfaceSchemaNodeCapabilityManager } from './capabilities/EaCSurfaceSchemaNodeCapabilityManager.ts';

/**
 * Dispatcher and registry for node capability managers, scoped to either workspace or surface.
 *
 * Routes node-based operations (update, delete, render, edge generation) to the correct capability
 * handler based on the `Type` of the node.
 */
export class EaCCapabilitiesManager {
  /**
   * Internal list of active capability managers based on current scope.
   */
  protected capabilities: EaCNodeCapabilityManager[] = [];

  constructor(
    protected scope: NodeScopeTypes,
    protected inspector: EaCNodeInspectorManager
  ) {
    // Register capability implementations by scope
    if (scope === 'surface') {
      this.capabilities = [
        new EaCSurfaceAgentNodeCapabilityManager(),
        new EaCSurfaceConnectionNodeCapabilityManager(),
        new EaCSurfaceSchemaNodeCapabilityManager(),
      ];
    } else if (scope === 'workspace') {
      this.capabilities = [
        new EaCConnectionNodeCapabilityManager(),
        new EaCSimulatorNodeCapabilityManager(),
        new EaCSurfaceNodeCapabilityManager(),
      ];
    }
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
}
