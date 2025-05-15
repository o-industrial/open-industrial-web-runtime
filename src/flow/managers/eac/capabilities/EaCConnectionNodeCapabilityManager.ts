import { NullableArrayOrObject } from '@fathym/common';

import {
  EaCNodeCapabilityManager,
  EaCNodeCapabilityContext,
  EaCNodeCapabilityAsCode,
  EaCNodeCapabilityPatch,
} from './EaCNodeCapabilityManager.ts';

import { OpenIndustrialEaC } from '../../../../types/OpenIndustrialEaC.ts';
import { FlowGraphNode } from '../../../types/graph/FlowGraphNode.ts';
import { FlowGraphEdge } from '../../../types/graph/FlowGraphEdge.ts';

import {
  EaCDataConnectionAsCode,
  EaCSurfaceAsCode,
  EverythingAsCodeOIWorkspace,
  SurfaceDataConnectionSettings,
} from '@o-industrial/common/eac';

/**
 * Capability manager for workspace-scoped Data Connections.
 * Handles simulator binding, surface association, and node projection.
 */
export class EaCConnectionNodeCapabilityManager extends EaCNodeCapabilityManager {
  public override Type = 'connection';

  protected override buildAsCode(
    node: FlowGraphNode,
    ctx: EaCNodeCapabilityContext
  ): EaCNodeCapabilityAsCode | null {
    const conn = ctx.GetEaC().DataConnections?.[node.ID];
    if (!conn) return null;

    return {
      Metadata: conn.Metadata,
      Details: conn.Details ?? {},
    };
  }

  protected override buildConnectionPatch(
    source: FlowGraphNode,
    target: FlowGraphNode,
    ctx: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    const eac = ctx.GetEaC() as EverythingAsCodeOIWorkspace;

    // simulator → connection
    if (source.Type === 'simulator' && target.Type === 'connection') {
      const existing = eac.DataConnections?.[target.ID]?.SimulatorLookup;
      if (existing === source.ID) return null;

      return {
        DataConnections: {
          [target.ID]: {
            ...eac.DataConnections?.[target.ID],
            SimulatorLookup: source.ID,
          } as EaCDataConnectionAsCode,
        },
      };
    }

    // connection → surface
    if (source.Type === 'connection' && target.Type === 'surface') {
      const surface = eac.Surfaces?.[target.ID];
      const connSet: Record<string, SurfaceDataConnectionSettings> = {
        ...(surface?.DataConnections ?? {}),
        [source.ID]: {
          Metadata: { Enabled: true },
        },
      };

      return {
        Surfaces: {
          [target.ID]: {
            ...surface,
            DataConnections: connSet,
          } as EaCSurfaceAsCode,
        },
      };
    }

    return null;
  }

  protected override buildDeletePatch(
    node: FlowGraphNode
  ): NullableArrayOrObject<OpenIndustrialEaC> {
    return this.wrapDeletePatch('DataConnections', node.ID);
  }

  protected override buildDisconnectionPatch(
    source: FlowGraphNode,
    target: FlowGraphNode,
    ctx: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    const eac = ctx.GetEaC() as EverythingAsCodeOIWorkspace;

    // simulator → connection
    if (source.Type === 'simulator' && target.Type === 'connection') {
      const existing = eac.DataConnections?.[target.ID]?.SimulatorLookup;

      if (existing === source.ID) {
        return {
          DataConnections: {
            [target.ID]: {
              ...eac.DataConnections?.[target.ID],
              SimulatorLookup: undefined,
            },
          },
        };
      }
    }

    // connection → surface
    if (source.Type === 'connection' && target.Type === 'surface') {
      const surface = eac.Surfaces?.[target.ID];
      if (surface?.DataConnections?.[source.ID]) {
        const updatedConnections = { ...surface.DataConnections };
        delete updatedConnections[source.ID];

        return {
          Surfaces: {
            [target.ID]: {
              ...surface,
              DataConnections: updatedConnections,
            },
          },
        };
      }
    }

    return null;
  }

  protected override buildEdgesForNode(
    node: FlowGraphNode,
    ctx: EaCNodeCapabilityContext
  ): FlowGraphEdge[] {
    const eac = ctx.GetEaC() as EverythingAsCodeOIWorkspace;
    const edges: FlowGraphEdge[] = [];

    for (const [surfKey, surf] of Object.entries(eac.Surfaces ?? {})) {
      if (surf.DataConnections?.[node.ID]) {
        edges.push({
          ID: `${node.ID}->${surfKey}`,
          Source: node.ID,
          Target: surfKey,
          Label: 'feeds',
        });
      }
    }

    return edges;
  }

  protected override buildNode(
    id: string,
    ctx: EaCNodeCapabilityContext
  ): FlowGraphNode | null {
    const conn = ctx.GetEaC().DataConnections?.[id];
    if (!conn) return null;

    return {
      ID: id,
      Type: this.Type,
      Label: conn.Details?.Name ?? id,
      Metadata: conn.Metadata,
      Details: conn.Details,
    };
  }

  protected override buildUpdatePatch(
    node: FlowGraphNode,
    update: EaCNodeCapabilityPatch
  ): Partial<OpenIndustrialEaC> {
    return {
      DataConnections: {
        [node.ID]: this.mergeDetailsAndMetadata(
          update.Details,
          update.Metadata
        ),
      },
    };
  }
}
