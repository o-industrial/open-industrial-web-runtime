import { ComponentType, FunctionComponent } from 'preact';
import { memo } from 'preact/compat';
import { OpenIndustrialEaC } from '@o-industrial/common/types';
import { EaCWarmQueryDetails } from '@fathym/eac-azure';
import {
  EaCFlowNodeMetadata,
  Position,
  SurfaceWarmQuerySettings,
} from '@o-industrial/common/eac';
import { NullableArrayOrObject } from '@fathym/common';
import { FlowGraphNode } from '../../../types/graph/FlowGraphNode.ts';

import { EaCNodeCapabilityContext } from '../../../types/nodes/EaCNodeCapabilityContext.ts';
import { EaCNodeCapabilityAsCode } from '../../../types/nodes/EaCNodeCapabilityAsCode.ts';
import { EaCNodeCapabilityPatch } from '../../../types/nodes/EaCNodeCapabilityPatch.ts';

import { EaCNodeCapabilityManager } from './EaCNodeCapabilityManager.ts';
import { FlowGraphEdge } from '../../../types/graph/FlowGraphEdge.ts';
import { WarmQueryInspector } from '../../../../../apps/components/organisms/inspectors/WarmQueryInspector.tsx';
import SurfaceWarmQueryNodeRenderer from '../../../../../apps/components/organisms/renderers/SurfaceWarmQueryNodeRenderer.tsx';
import { WarmQueryStats } from '../../../types/nodes/warm-queries/WarmQueryStats.ts';

// ✅ Compound node detail type
type SurfaceWarmQueryNodeDetails = EaCWarmQueryDetails & SurfaceWarmQuerySettings;

export class EaCSurfaceWarmQueryNodeCapabilityManager extends EaCNodeCapabilityManager<SurfaceWarmQueryNodeDetails> {
  protected static renderer: ComponentType = memo(
    SurfaceWarmQueryNodeRenderer as FunctionComponent
  );
  
  public override Type = 'warmquery';

  protected override buildAsCode(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): EaCNodeCapabilityAsCode<SurfaceWarmQueryNodeDetails> | null {
    const wqId = node.ID;

    const eac = context.GetEaC();

    const wqAsCode = eac.WarmQueries?.[wqId];
    const surfaceSettings =
      eac.Surfaces?.[context.SurfaceLookup!]?.WarmQueries?.[wqId];

    if (!wqAsCode || !surfaceSettings) return null;

    const { Metadata, ...surfaceOverrides } = surfaceSettings;

    return {
      Metadata,
      Details: {
        ...wqAsCode.Details,
        ...surfaceOverrides,
      } as SurfaceWarmQueryNodeDetails,
    };
  }

  protected override buildConnectionPatch(
    source: FlowGraphNode,
    target: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    debugger;
    if (source.Type === 'warmquery' && target.Type?.includes('schema')) {
      const eac = context.GetEaC();
      const wq = eac.WarmQueries?.[source.ID];
      if (!wq) return null;

      return {
        WarmQueries: {
          [source.ID]: {
            ...wq,
            Schema: {
              SchemaLookup: target.ID,
            },
          },
        },
      };
    }

    return null;
  }

  protected override buildDisconnectionPatch(
    source: FlowGraphNode,
    target: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    if (source.Type !== 'warmquery' || !target.Type?.includes('schema'))
      return null;

    const eac = context.GetEaC();
    const wq = eac.WarmQueries?.[source.ID];

    if (!wq || wq.Schema?.SchemaLookup !== target.ID) return null;

    const { Schema, ...rest } = wq;

    return {
      WarmQueries: {
        [source.ID]: rest,
      },
    };
  }

  protected override buildDeletePatch(
    node: FlowGraphNode
  ): NullableArrayOrObject<OpenIndustrialEaC> {
    const [surfaceId, wqId] = this.extractCompoundIDs(node);

    return {
      Surfaces: {
        [surfaceId]: {
          WarmQueries: {
            [wqId]: null,
          },
        },
      },
    } as unknown as NullableArrayOrObject<OpenIndustrialEaC>;
  }

  protected override buildEdgesForNode(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): FlowGraphEdge[] {
    const eac = context.GetEaC();
    const wqId = node.ID;
    const wq = eac.WarmQueries?.[wqId];

    const edges: FlowGraphEdge[] = [];

    const targetSchema = wq?.Schema?.SchemaLookup;

    if (targetSchema) {
      edges.push({
        ID: `${targetSchema}->${wqId}`,
        Source: targetSchema,
        Target: wqId,
        Label: 'targets',
      });
    }

    return edges;
  }

  protected override buildNode(
    id: string,
    context: EaCNodeCapabilityContext
  ): FlowGraphNode | null {
    const surfaceId = context.SurfaceLookup!;
    const wqId = id;

    const eac = context.GetEaC();
    const surface = eac.Surfaces?.[surfaceId];
    const settings = surface?.WarmQueries?.[wqId];
    const wq = eac.WarmQueries?.[wqId];

    if (!wq || !settings || settings.Metadata?.Enabled === false) {
      return null;
    }

    const { Metadata, ...rest } = settings;

    return {
      ID: wqId,
      Type: this.Type,
      Label: wq.Details?.Name ?? wqId,
      Metadata: {
        ...(wq.Metadata ?? {}),
        ...Metadata,
      },
      Details: {
        ...wq.Details,
        ...rest,
      },
    };
  }

  protected override buildPresetPatch(
    id: string,
    position: Position,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> {
    const metadata: EaCFlowNodeMetadata = {
      Position: position,
      Enabled: true,
    };

    const details = { Name: id };

    return {
      WarmQueries: {
        [id]: {
          Metadata: metadata,
          Details: details,
        },
      },
      ...(context.SurfaceLookup
        ? {
            Surfaces: {
              [context.SurfaceLookup]: {
                WarmQueries: {
                  [id]: {
                    ShowHistory: false,
                    Metadata: metadata,
                  },
                },
              },
            },
          }
        : {}),
    };
  }

  protected override buildUpdatePatch(
    node: FlowGraphNode,
    update: EaCNodeCapabilityPatch<SurfaceWarmQueryNodeDetails>,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> {
    const wqId = node.ID;

    const settings: SurfaceWarmQuerySettings = {
      ...(update.Metadata ? { Metadata: update.Metadata } : {}),
    };

    const { ShowHistory: _, ...rest } = update.Details ?? {};
    const wqDetails: Partial<EaCWarmQueryDetails> = rest;

    const patch: Partial<OpenIndustrialEaC> = {};

    if (Object.keys(settings).length > 0) {
      patch.Surfaces = {
        [context.SurfaceLookup!]: {
          WarmQueries: {
            [wqId]: settings,
          },
        },
      };
    }

    if (Object.keys(wqDetails).length > 0) {
      patch.WarmQueries = {
        [wqId]: {
          Details: wqDetails as EaCWarmQueryDetails,
        },
      };
    }

    return patch;
  }

  protected override getInspector() {
    return WarmQueryInspector;
  }

  protected override getPreset() {
    return { Type: this.Type, Label: 'Warm Query', IconKey: 'warmQuery' };
  }

  protected override getRenderer() {
    return EaCSurfaceWarmQueryNodeCapabilityManager.renderer;
  }  

  protected override async getStats(
    type: string,
    id: string,
    context: EaCNodeCapabilityContext
  ): Promise<WarmQueryStats> {
    const stats = await super.getStats(type, id, context);

    return {
      ...stats,
      matchesHandled: Math.floor(Math.random() * 200),
      avgLatencyMs: Number((Math.random() * 40 + 10).toFixed(1)),
      lastRunAgo: `${Math.floor(Math.random() * 90)}s ago`,
    };
  }
}
