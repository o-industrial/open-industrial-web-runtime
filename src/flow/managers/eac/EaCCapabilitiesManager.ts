import { OpenIndustrialEaC } from '../../../types/OpenIndustrialEaC.ts';
import { FlowGraphNode } from '../../types/graph/FlowGraphNode.ts';

import {
  EaCNodeCapabilityContext,
  EaCNodeCapabilityPatch,
  EaCNodeCapabilityAsCode,
} from './capabilities/EaCNodeCapabilityManager.ts';

import { EaCNodeCapabilityManager } from './capabilities/EaCNodeCapabilityManager.ts';

import { EaCSurfaceConnectionNodeCapabilityManager } from './capabilities/EaCSurfaceConnectionNodeCapabilityManager.ts';
import { EaCSurfaceSchemaNodeCapabilityManager } from './capabilities/EaCSurfaceSchemaNodeCapabilityManager.ts';
import { EaCSurfaceNodeCapabilityManager } from './capabilities/EaCSurfaceNodeCapabilityManager.ts';
import { EaCAgentNodeCapabilityManager } from './capabilities/EaCAgentNodeCapabilityManager.ts';
import { EaCSchemaNodeCapabilityManager } from './capabilities/EaCSchemaNodeCapabilityManager.ts';
import { EaCSimulatorNodeCapabilityManager } from './capabilities/EaCSimulatorNodeCapabilityManager.ts';
import { EaCConnectionNodeCapabilityManager } from './capabilities/EaCConnectionNodeCapabilityManager.ts';
import { NullableArrayOrObject } from '@fathym/common';
import { EaCNodeInspectorManager } from './EaCNodeInspectorManager.ts';

export class EaCCapabilitiesManager {
  protected capabilities: EaCNodeCapabilityManager[] = [];

  constructor(protected inspector: EaCNodeInspectorManager) {
    this.capabilities = [
      // new EaCSurfaceConnectionNodeCapabilityManager(),
      // new EaCSurfaceSchemaNodeCapabilityManager(),
      // new EaCSurfaceNodeCapabilityManager(),
      // new EaCAgentNodeCapabilityManager(),
      // new EaCSchemaNodeCapabilityManager(),
      // new EaCSimulatorNodeCapabilityManager(),
      // new EaCConnectionNodeCapabilityManager(),
    ];
  }

  public GetCapabilityFor(node: FlowGraphNode): EaCNodeCapabilityManager | undefined {
    return this.capabilities.find((cap) => cap.Matches(node));
  }

  public GetAsCode(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): EaCNodeCapabilityAsCode | null {
    const capability = this.GetCapabilityFor(node);
    if (capability) return capability.GetAsCode(node, context);

    // Fallback to inspector
    return this.inspector.GetNodeAsCode(node.ID);
  }

  public BuildUpdatePatch(
    node: FlowGraphNode,
    patch: EaCNodeCapabilityPatch,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    const capability = this.GetCapabilityFor(node);
    if (capability) return capability.BuildUpdatePatch(node, patch, context);

    return this.inspector.BuildPartialForNodeUpdate(node.ID, patch);
  }

  public BuildDeletePatch(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): NullableArrayOrObject<OpenIndustrialEaC> | null {
    const capability = this.GetCapabilityFor(node);
    if (capability) return capability.BuildDeletePatch(node, context);

    return this.inspector.BuildPartialForNodeDelete(node.ID);
  }
}
