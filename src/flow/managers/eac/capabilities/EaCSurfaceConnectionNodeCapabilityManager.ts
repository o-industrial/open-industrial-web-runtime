import { ComponentType, FunctionComponent } from 'preact';
import { memo } from 'preact/compat';
import { NullableArrayOrObject } from '@fathym/common';

import {
  SurfaceDataConnectionSettings,
  EverythingAsCodeOIWorkspace,
} from '@o-industrial/common/eac';

import { OpenIndustrialEaC } from '@o-industrial/common/types';

import { EaCNodeCapabilityManager } from './EaCNodeCapabilityManager.ts';
import { EaCNodeCapabilityContext } from '../../../types/nodes/EaCNodeCapabilityContext.ts';
import { EaCNodeCapabilityAsCode } from '../../../types/nodes/EaCNodeCapabilityAsCode.ts';
import { EaCNodeCapabilityPatch } from '../../../types/nodes/EaCNodeCapabilityPatch.ts';

import { FlowGraphEdge } from '../../../types/graph/FlowGraphEdge.ts';
import { FlowGraphNode } from '../../../types/graph/FlowGraphNode.ts';
import SurfaceConnectionNodeRenderer from '../../../../../apps/components/organisms/renderers/SurfaceConnectionNodeRenderer.tsx';
import { SurfaceConnectionInspector } from '../../../../../apps/components/organisms/inspectors/SurfaceConnectionInspector.tsx';

type SurfaceConnectionNodeDetails = SurfaceDataConnectionSettings & {
  Name?: string;
  Description?: string;
};

/**
 * Capability for `surface->connection` nodes within scoped surfaces.
 *
 * Supports rendering, edge inference to downstream schemas, and patch generation.
 */
export class EaCSurfaceConnectionNodeCapabilityManager extends EaCNodeCapabilityManager<SurfaceConnectionNodeDetails> {
  protected static renderer: ComponentType = memo(
    SurfaceConnectionNodeRenderer as FunctionComponent
  );

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

  protected override buildConnectionPatch(
    source: FlowGraphNode,
    target: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    const [surfaceId, connId] = this.extractCompoundIDs(source);

    if (!target.Type?.includes('schema')) return null;

    const schema = context.GetEaC().Schemas?.[target.ID];
    if (!schema) return null;

    return {
      Schemas: {
        [target.ID]: {
          ...schema,
          DataConnection: { Lookup: connId },
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

  protected override buildDisconnectionPatch(
    source: FlowGraphNode,
    target: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    const eac = context.GetEaC() as EverythingAsCodeOIWorkspace;
    const [_, connId] = this.extractCompoundIDs(source);

    if (!target.Type?.includes('schema')) return null;

    const schema = eac.Schemas?.[target.ID];
    if (!schema || schema.DataConnection?.Lookup !== connId) return null;

    const { DataConnection, ...rest } = schema;

    return {
      Schemas: {
        [target.ID]: rest,
      },
    };
  }

  protected override buildEdgesForNode(
    node: FlowGraphNode,
    context: EaCNodeCapabilityContext
  ): FlowGraphEdge[] {
    const eac = context.GetEaC() as EverythingAsCodeOIWorkspace;
    const [_, connId] = this.extractCompoundIDs(node);
    const surfaceId = context.SurfaceLookup;

    const edges: FlowGraphEdge[] = [];

    for (const [schemaKey, schema] of Object.entries(eac.Schemas ?? {})) {
      if (schema.DataConnection?.Lookup === connId) {
        edges.push({
          ID: `${connId}->${schemaKey}`,
          Source: `${surfaceId}->${connId}`,
          Target: schemaKey,
          Label: 'feeds',
        });
      }
    }

    return edges;
  }

  protected override buildNode(
    id: string,
    context: EaCNodeCapabilityContext
  ): FlowGraphNode | null {
    const [surfaceId, connId] = this.extractCompoundIDs({
      ID: id,
      Type: this.Type,
    });

    const eac = context.GetEaC() as EverythingAsCodeOIWorkspace;

    const surface = eac.Surfaces?.[surfaceId];
    const dcSettings = surface?.DataConnections?.[connId];
    const conn = eac.DataConnections?.[connId];

    if (!conn || !dcSettings || dcSettings.Metadata?.Enabled === false)
      return null;

    const { Metadata, ...settings } = dcSettings;

    return {
      ID: id,
      Type: this.Type,
      Label: conn.Details?.Name ?? connId,
      Metadata: {
        ...(conn.Metadata || {}),
        ...Metadata,
      },
      Details: {
        Name: conn.Details?.Name,
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

  protected override getInspector() {
    return SurfaceConnectionInspector;
  }

  protected override getRenderer() {
    return EaCSurfaceConnectionNodeCapabilityManager.renderer;
  }
    
}
