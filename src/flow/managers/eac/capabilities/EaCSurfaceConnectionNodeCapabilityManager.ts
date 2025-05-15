import { NullableArrayOrObject } from '@fathym/common';
import { OpenIndustrialEaC } from '@o-industrial/common/types';
import {
  EaCNodeCapabilityContext,
  EaCNodeCapabilityAsCode,
  EaCNodeCapabilityPatch,
} from './EaCNodeCapabilityManager.ts';
import { EaCNodeCapabilityManager } from './EaCNodeCapabilityManager.ts';
import { FlowGraphNode } from '../../../types/graph/FlowGraphNode.ts';
import { SurfaceDataConnectionSettings } from '@o-industrial/common/eac';

// ✅ Compound node detail type
type SurfaceConnectionNodeDetails = SurfaceDataConnectionSettings & {
  Name?: string;
  Description?: string;
};

export class EaCSurfaceConnectionNodeCapabilityManager extends EaCNodeCapabilityManager<SurfaceConnectionNodeDetails> {
  public override Type = 'surface->connection';

  protected override buildAsCode(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): EaCNodeCapabilityAsCode<SurfaceConnectionNodeDetails> | null {
    const [surfaceId, connId] = this.extractCompoundIDs(node);
    const eac = context.GetEaC();

    const surface = eac.Surfaces?.[surfaceId];
    const conn = eac.DataConnections?.[connId];
    const settings = surface?.DataConnections?.[connId];

    if (!conn || !settings) return null;

    return {
      Metadata: {
        ...(conn.Metadata ?? {}),
        ...(settings.Metadata ?? {}),
      },
      Details: {
        Name: conn.Details?.Name ?? connId,
        Description: conn.Details?.Description,
        ...settings,
      },
    };
  }

  protected override buildUpdatePatch(
    node: FlowGraphNode,
    patch: EaCNodeCapabilityPatch<SurfaceConnectionNodeDetails>,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> {
    const [surfaceId, connId] = this.extractCompoundIDs(node);

    return {
      Surfaces: {
        [surfaceId]: {
          DataConnections: {
            [connId]: {
              ...patch.Details,
              Metadata: patch.Metadata,
            },
          },
        },
      },
    };
  }

  protected override buildDeletePatch(
    node: FlowGraphNode
  ): NullableArrayOrObject<OpenIndustrialEaC> {
    const [surfaceId, connId] = this.extractCompoundIDs(node);

    return {
      Surfaces: {
        [surfaceId]: {
          DataConnections: {
            [connId]: null,
          },
        },
      },
    } as unknown as NullableArrayOrObject<OpenIndustrialEaC>;
  }
}
