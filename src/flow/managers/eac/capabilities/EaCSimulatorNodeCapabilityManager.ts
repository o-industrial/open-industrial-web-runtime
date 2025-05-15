import { NullableArrayOrObject } from '@fathym/common';

import {
  EaCNodeCapabilityAsCode,
  EaCNodeCapabilityContext,
  EaCNodeCapabilityManager,
  EaCNodeCapabilityPatch,
} from './EaCNodeCapabilityManager.ts';

import { OpenIndustrialEaC } from '../../../../types/OpenIndustrialEaC.ts';
import { FlowGraphEdge } from '../../../types/graph/FlowGraphEdge.ts';
import { FlowGraphNode } from '../../../types/graph/FlowGraphNode.ts';

import {
  EverythingAsCodeOIWorkspace,
  EaCAzureDockerSimulatorDetails,
} from '@o-industrial/common/eac';

/**
 * Capability manager for workspace-scoped Simulators.
 * Responsible for projecting simulator nodes, simulates edges,
 * and binding connections via SimulatorLookup.
 */
export class EaCSimulatorNodeCapabilityManager extends EaCNodeCapabilityManager<EaCAzureDockerSimulatorDetails> {
  public override Type = 'simulator';

  protected override buildAsCode(
    node: FlowGraphNode,
    ctx: EaCNodeCapabilityContext
  ): EaCNodeCapabilityAsCode<EaCAzureDockerSimulatorDetails> | null {
    const sim = ctx.GetEaC().Simulators?.[node.ID];
    if (!sim) return null;

    return {
      Metadata: sim.Metadata,
      Details: (sim.Details ?? {}) as EaCAzureDockerSimulatorDetails,
    };
  }

  protected override buildConnectionPatch(
    source: FlowGraphNode,
    target: FlowGraphNode,
    ctx: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    debugger;
    if (source.Type !== 'simulator' || target.Type !== 'connection')
      return null;

    const eac = ctx.GetEaC() as EverythingAsCodeOIWorkspace;
    const existing = eac.DataConnections?.[target.ID]?.SimulatorLookup;

    if (existing === source.ID) return null;

    return {
      DataConnections: {
        [target.ID]: {
          ...eac.DataConnections?.[target.ID],
          SimulatorLookup: source.ID,
        },
      },
    };
  }

  protected override buildEdgesForNode(
    node: FlowGraphNode,
    ctx: EaCNodeCapabilityContext
  ): FlowGraphEdge[] {
    const eac = ctx.GetEaC() as EverythingAsCodeOIWorkspace;

    const edges: FlowGraphEdge[] = [];

    for (const [connKey, conn] of Object.entries(eac.DataConnections ?? {})) {
      if (conn.SimulatorLookup === node.ID) {
        edges.push({
          ID: `${node.ID}->${connKey}`,
          Source: node.ID,
          Target: connKey,
          Label: 'simulates',
        });
      }
    }

    return edges;
  }

  protected override buildNode(
    id: string,
    ctx: EaCNodeCapabilityContext
  ): FlowGraphNode | null {
    const sim = ctx.GetEaC().Simulators?.[id];
    if (!sim) return null;

    return {
      ID: id,
      Type: this.Type,
      Label: sim.Details?.Name ?? id,
      Metadata: sim.Metadata,
      Details: sim.Details,
    };
  }

  protected override buildUpdatePatch(
    node: FlowGraphNode,
    update: EaCNodeCapabilityPatch<EaCAzureDockerSimulatorDetails>
  ): Partial<OpenIndustrialEaC> {
    return {
      Simulators: {
        [node.ID]: this.mergeDetailsAndMetadata(
          update.Details,
          update.Metadata
        ),
      },
    };
  }

  protected override buildDeletePatch(
    node: FlowGraphNode
  ): NullableArrayOrObject<OpenIndustrialEaC> {
    return this.wrapDeletePatch('Simulators', node.ID);
  }
}
