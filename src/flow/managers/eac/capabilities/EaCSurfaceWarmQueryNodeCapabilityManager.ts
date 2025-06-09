import { OpenIndustrialEaC } from '@o-industrial/common/types';
import {
  SurfaceWarmQuerySettings,
  EaCWarmQueryDetails,
  EverythingAsCodeOIWorkspace,
  EaCCompositeWarmQueryDetails,
  EaCFlowNodeMetadata,
  EaCRootWarmQueryDetails,
  EaCWarmQueryAsCode,
  Position,
} from '@o-industrial/common/eac';
import { NullableArrayOrObject } from '@fathym/common';
import { FlowGraphNode } from '../../../types/graph/FlowGraphNode.ts';

import { EaCNodeCapabilityContext } from '../../../types/nodes/EaCNodeCapabilityContext.ts';
import { EaCNodeCapabilityAsCode } from '../../../types/nodes/EaCNodeCapabilityAsCode.ts';
import { EaCNodeCapabilityPatch } from '../../../types/nodes/EaCNodeCapabilityPatch.ts';

import { EaCNodeCapabilityManager } from './EaCNodeCapabilityManager.ts';
import { FlowGraphEdge } from '../../../types/graph/FlowGraphEdge.ts';
import SurfaceWarmQueryNodeRenderer from '../../../../../apps/components/organisms/renderers/SurfaceWarmQueryNodeRenderer.tsx';
import { ComponentType, FunctionComponent } from 'preact';
import { memo } from 'react';

// ✅ Compound node detail type
type SurfaceWarmQueryNodeDetails = EaCWarmQueryDetails & SurfaceWarmQuerySettings;

export class EaCSurfaceWarmQueryNodeCapabilityManager extends EaCNodeCapabilityManager<SurfaceWarmQueryNodeDetails> {
  protected static renderer: ComponentType = memo(
    SurfaceWarmQueryNodeRenderer as FunctionComponent
  );

  public override Type = 'surface->warmquery';

  protected override buildAsCode(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): EaCNodeCapabilityAsCode<SurfaceWarmQueryNodeDetails> | null {
    const wqId = node.ID;

    const eac = context.GetEaC();

    const warmQueryAsCode = eac.WarmQueries?.[wqId];
    const surfaceSettings =
      eac.Surfaces?.[context.SurfaceLookup!]?.WarmQueries?.[wqId];

    if (!warmQueryAsCode || !surfaceSettings) return null;

    const { Metadata, ...surfaceOverrides } = surfaceSettings;

    return {
      Metadata,
      Details: {
        ...warmQueryAsCode.Details,
        ...surfaceOverrides,
      } as SurfaceWarmQueryNodeDetails,
    };
  }

  protected override buildConnectionPatch(
    source: FlowGraphNode,
    target: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    const eac = context.GetEaC();

    if (source.Type?.includes('warmquery') && target.Type === 'composite-warmquery') {
      const comp = eac.WarmQueries?.[target.ID];
      if (!comp) return null;

      const compDetails = comp.Details as EaCCompositeWarmQueryDetails;

      return {
        WarmQueries: {
          [target.ID]: {
            ...comp,
            Details: {
              ...compDetails,
            },
          },
        },
      };
    }

    if (source.Type?.includes('warmquery') && target.Type === 'agent') {
      const agent = eac.Agents?.[target.ID];
      if (!agent) return null;

      return {
        Agents: {
          [target.ID]: {
            ...agent,
            WarmQuery: {
              WarmQueryLookup: source.ID,
            },
          },
        },
      };
    }

    return null;
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

  protected override buildDisconnectionPatch(
    source: FlowGraphNode,
    target: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    const eac = context.GetEaC() as EverythingAsCodeOIWorkspace;

    if (source.Type?.includes('warmquery') && target.Type === 'composite-warmquery') {
      const comp = eac.WarmQueries?.[target.ID];
      if (!comp) return null;

      const compDetails = comp.Details as EaCCompositeWarmQueryDetails;
      if (!compDetails.SchemaJoins?.[source.ID]) return null;

      const updated = { ...compDetails.SchemaJoins };
      delete updated[source.ID];

      return {
        WarmQueries: {
          [target.ID]: {
            ...comp,
            Details: {
              ...compDetails,
              SchemaJoins: updated,
            },
          },
        },
      };
     }

    if (source.Type === 'agent' && target.Type?.includes('warmquery')) {
      const agent = eac.Agents?.[source.ID];
      if (!agent || agent.WarmQuery?.WarmQueryLookup !== target.ID) return null;

      const { WarmQuery, ...rest } = agent;

      return {
        Agents: {
          [source.ID]: rest,
        },
      };
    }

    return null;
  }

  protected override buildEdgesForNode(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): FlowGraphEdge[] {
    const eac = context.GetEaC() as EverythingAsCodeOIWorkspace;
    const wqId = node.ID;
    const surfaceId = context.SurfaceLookup!;

    const edges: FlowGraphEdge[] = [];

    // Edge: DataConnection feeds warm query
    const dc = eac.WarmQueries?.[wqId]?.DataConnection?.Lookup;
    if (dc) {
      edges.push({
        ID: `${dc}->${wqId}`,
        Source: `${surfaceId}->${dc}`,
        Target: wqId,
        Label: 'queries',
      });
    }

    // Edge: Schema joined into Composite(s)
    for (const [compKey, compWQ] of Object.entries(eac.WarmQueries ?? {})) {
      if (
        compWQ?.Details?.Type !== 'Composite' &&
        compWQ?.Details?.Type !== 'Reference'
      ) {
        continue;
      }

      const compJoins =
        (compWQ.Details as EaCCompositeWarmQueryDetails).SchemaJoins ?? {};

      if (Object.values(compJoins).includes(wqId)) {
        edges.push({
          ID: `${wqId}->${compKey}`,
          Source: wqId,
          Target: compKey,
          Label: 'joins',
        });
      }
    }

    return edges;
  }

  // protected override buildNode(
  //   id: string,
  //   context: EaCNodeCapabilityContext
  // ): FlowGraphNode | null {
  //   const eac = context.GetEaC();
  //   const [surfaceId, wqId] = this.extractCompoundIDs({
  //     ID: id,
  //     Type: this.Type,
  //   });

  //   const surface = eac.Surfaces?.[surfaceId];
  //   const surfaceSettings = surface?.WarmQueries?.[wqId];
  //   const wq = eac.WarmQueries?.[wqId];

  //   if (
  //     !wq ||
  //     !surfaceSettings ||
  //     surfaceSettings.Metadata?.Enabled === false
  //   ) {
  //     return null;
  //   }

  //   const { Metadata, ...settings } = surfaceSettings;
  //   const type = wq.Details?.Type;

  //   let nodeType: FlowGraphNode['Type'] = 'warmquery';
  //   if (type === 'Composite') nodeType = 'composite-warmquery';
  //   else if (type === 'Reference') nodeType = 'reference-schema';

  //   return {
  //     ID: wqId,
  //     Type: nodeType,
  //     Label: wq.Details?.Name ?? wqId,
  //     Metadata: Metadata,
  //     Details: {
  //       ...wq.Details,
  //       ...settings,
  //     },
  //   };
  // }

  protected override buildNode(
    id: string,
    context: EaCNodeCapabilityContext
  ): FlowGraphNode | null {
    const [surfaceId, wqId] = this.extractCompoundIDs({
      ID: id,
      Type: this.Type,
    });
    console.log("Test ID:" + surfaceId);
    console.log("Test Type:" + wqId);

    const eac = context.GetEaC() as EverythingAsCodeOIWorkspace;

    const surface = eac.Surfaces?.[surfaceId];
    const wqSettings = surface?.WarmQueries?.[wqId];
    const wq = eac.WarmQueries?.[wqId];

    if (!wq || !wqSettings || wqSettings.Metadata?.Enabled === false)
      return null;

    const { Metadata, ...settings } = wqSettings;

    return {
      ID: id,
      Type: this.Type,
      Label: wq.Details?.Name ?? wqId,
      Metadata: {
        ...(wq.Metadata || {}),
        ...Metadata,
      },
      Details: {
        Name: wq.Details?.Name,
        ...settings,
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
          Details: { ...details, Type: 'Root' } as EaCRootWarmQueryDetails,
        } as EaCWarmQueryAsCode,
      },
      ...(context.SurfaceLookup
        ? {
            Surfaces: {
              [context.SurfaceLookup]: {
                WarmQueries: {
                  [id]: {
                    DisplayMode: 'table',
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

    if (update.Details?.DisplayMode) {
      settings.DisplayMode = update.Details.DisplayMode;
    }

    const { DisplayMode: _, ...rest } = update.Details ?? {};
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

  // protected override getInspector() {
  //   return SurfaceInspector;
  // }

  protected override getPreset() {
    return { Type: this.Type, Label: 'WarmQuery', IconKey: 'warmquery' };
  }

  protected override getRenderer() {
    return EaCSurfaceWarmQueryNodeCapabilityManager.renderer;
  }
  
}
