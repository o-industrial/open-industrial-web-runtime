import { NullableArrayOrObject } from '@fathym/common';

import {
  EaCNodeCapabilityManager,
  EaCNodeCapabilityContext,
  EaCNodeCapabilityAsCode,
  EaCNodeCapabilityPatch,
} from './EaCNodeCapabilityManager.ts';

import {
  EverythingAsCodeOIWorkspace,
  EaCSurfaceAsCode,
} from '@o-industrial/common/eac';

import { OpenIndustrialEaC } from '../../../../types/OpenIndustrialEaC.ts';
import { FlowGraphNode } from '../../../types/graph/FlowGraphNode.ts';
import { FlowGraphEdge } from '../../../types/graph/FlowGraphEdge.ts';

/**
 * Capability manager for root-level surfaces (in workspace scope).
 * Handles rendering and parent-child surface edge creation.
 */
export class EaCSurfaceNodeCapabilityManager extends EaCNodeCapabilityManager {
  public override Type = 'surface';

  protected override buildAsCode(
    node: FlowGraphNode,
    ctx: EaCNodeCapabilityContext
  ): EaCNodeCapabilityAsCode | null {
    const surf = ctx.GetEaC().Surfaces?.[node.ID];
    if (!surf) return null;

    return {
      Metadata: surf.Metadata,
      Details: surf.Details ?? {},
    };
  }

  protected override buildConnectionPatch(
    source: FlowGraphNode,
    target: FlowGraphNode,
    ctx: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    const eac = ctx.GetEaC() as EverythingAsCodeOIWorkspace;

    // surface -> surface (assign parent)
    if (source.Type === 'surface' && target.Type === 'surface') {
      const existing = eac.Surfaces?.[target.ID]?.ParentSurfaceLookup;
      if (existing === source.ID) return null;

      return {
        Surfaces: {
          [target.ID]: {
            ...eac.Surfaces?.[target.ID],
            ParentSurfaceLookup: source.ID,
          } as EaCSurfaceAsCode,
        },
      };
    }

    return null;
  }

  protected override buildEdgesForNode(
    node: FlowGraphNode,
    ctx: EaCNodeCapabilityContext
  ): FlowGraphEdge[] {
    const eac = ctx.GetEaC() as EverythingAsCodeOIWorkspace;

    const edges: FlowGraphEdge[] = [];

    const surf = eac.Surfaces?.[node.ID];
    if (!surf) return edges;

    // --- connections feeding this surface
    for (const connKey of Object.keys(surf.DataConnections ?? {})) {
      edges.push({
        ID: `${connKey}->${node.ID}`,
        Source: connKey,
        Target: node.ID,
        Label: 'feeds',
      });
    }

    // --- children that this surface is parent of
    for (const [childKey, childSurf] of Object.entries(eac.Surfaces ?? {})) {
      if (childSurf.ParentSurfaceLookup === node.ID) {
        edges.push({
          ID: `${node.ID}->${childKey}`,
          Source: node.ID,
          Target: childKey,
          Label: 'parent',
        });
      }
    }

    return edges;
  }

  protected override buildNode(
    id: string,
    ctx: EaCNodeCapabilityContext
  ): FlowGraphNode | null {
    const surf = ctx.GetEaC().Surfaces?.[id];

    // Only emit root surfaces
    if (!surf || surf.ParentSurfaceLookup) return null;

    return {
      ID: id,
      Type: this.Type,
      Label: surf.Details?.Name ?? id,
      Metadata: surf.Metadata,
      Details: surf.Details,
    };
  }

  protected override buildUpdatePatch(
    node: FlowGraphNode,
    update: EaCNodeCapabilityPatch
  ): Partial<OpenIndustrialEaC> {
    return {
      Surfaces: {
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
    return this.wrapDeletePatch('Surfaces', node.ID);
  }
}
