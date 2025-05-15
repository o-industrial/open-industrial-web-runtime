import { OpenIndustrialEaC } from '@o-industrial/common/types';
import {
  SurfaceSchemaSettings,
  EaCSchemaDetails,
} from '@o-industrial/common/eac';
import { NullableArrayOrObject } from '@fathym/common';
import { FlowGraphNode } from '../../../types/graph/FlowGraphNode.ts';

import {
  EaCNodeCapabilityContext,
  EaCNodeCapabilityAsCode,
  EaCNodeCapabilityPatch,
} from './EaCNodeCapabilityManager.ts';

import { EaCNodeCapabilityManager } from './EaCNodeCapabilityManager.ts';

// ✅ Compound node detail type
type SurfaceSchemaNodeDetails = EaCSchemaDetails & SurfaceSchemaSettings;

export class EaCSurfaceSchemaNodeCapabilityManager extends EaCNodeCapabilityManager<SurfaceSchemaNodeDetails> {
  public override Type = 'surface->schema';

  protected override buildAsCode(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): EaCNodeCapabilityAsCode<SurfaceSchemaNodeDetails> | null {
    const [surfaceId, schemaId] = this.extractCompoundIDs(node);
    const eac = context.GetEaC();

    const global = eac.Schemas?.[schemaId];
    const local = eac.Surfaces?.[surfaceId]?.Schemas?.[schemaId];

    if (!global || !local) return null;

    const { Metadata, ...surfaceOverrides } = local;

    return {
      Metadata,
      Details: {
        ...global.Details,
        ...surfaceOverrides,
      } as SurfaceSchemaNodeDetails
    };
  }

  protected override buildUpdatePatch(
    node: FlowGraphNode,
    update: EaCNodeCapabilityPatch<SurfaceSchemaNodeDetails>,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> {
    const [surfaceId, schemaId] = this.extractCompoundIDs(node);

    const surfaceSettings: SurfaceSchemaSettings = {
      ...(update.Metadata ? { Metadata: update.Metadata } : {}),
    };

    if (update.Details?.DisplayMode) {
      surfaceSettings.DisplayMode = update.Details.DisplayMode;
    }

    const { DisplayMode, ...rest } = update.Details ?? {};
    const schemaDetails: Partial<EaCSchemaDetails> = rest;

    const patch: Partial<OpenIndustrialEaC> = {};

    if (Object.keys(surfaceSettings).length > 0) {
      patch.Surfaces = {
        [surfaceId]: {
          Schemas: {
            [schemaId]: surfaceSettings,
          },
        },
      };
    }

    if (Object.keys(schemaDetails).length > 0) {
      patch.Schemas = {
        [schemaId]: {
          Details: schemaDetails as EaCSchemaDetails,
        },
      };
    }

    return patch;
  }

  protected override buildDeletePatch(
    node: FlowGraphNode
  ): NullableArrayOrObject<OpenIndustrialEaC> {
    const [surfaceId, schemaId] = this.extractCompoundIDs(node);

    return {
      Surfaces: {
        [surfaceId]: {
          Schemas: {
            [schemaId]: null,
          },
        },
      },
    } as unknown as NullableArrayOrObject<OpenIndustrialEaC>;
  }
}
