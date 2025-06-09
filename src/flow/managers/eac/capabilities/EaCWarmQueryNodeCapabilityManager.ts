import { ComponentType, FunctionComponent } from 'preact';
import { memo } from 'preact/compat';
import { NullableArrayOrObject } from '@fathym/common';

import { EaCNodeCapabilityManager } from './EaCNodeCapabilityManager.ts';
import { EaCNodeCapabilityContext } from '../../../types/nodes/EaCNodeCapabilityContext.ts';
import { EaCNodeCapabilityAsCode } from '../../../types/nodes/EaCNodeCapabilityAsCode.ts';
import { EaCNodeCapabilityPatch } from '../../../types/nodes/EaCNodeCapabilityPatch.ts';
import { EaCSurfaceAsCode, SurfaceWarmQuerySettings } from '@o-industrial/common/eac';

import {
  EverythingAsCodeOIWorkspace,
  EaCFlowNodeMetadata,
  EaCWarmQueryAsCode,
  Position,
} from '@o-industrial/common/eac';

import { OpenIndustrialEaC } from '../../../../types/OpenIndustrialEaC.ts';
import { FlowGraphNode } from '../../../types/graph/FlowGraphNode.ts';
import { FlowGraphEdge } from '../../../types/graph/FlowGraphEdge.ts';
import { WarmQueryInspector } from '../../../../../apps/components/organisms/inspectors/WarmQueryInspector.tsx';
import WarmQueryNodeRenderer from '../../../../../apps/components/organisms/renderers/WarmQueryNodeRenderer.tsx';
import { WarmQueryStats } from '../../../types/nodes/warm-queries/WarmQueryStats.ts';
import { WorkspaceManager } from '../../WorkspaceManager.ts';
import { WarmQueryEventRouter } from '../../node-events/WarmQueryEventRouter.ts';

/**
 * Capability manager for root-level warm queries (in workspace scope).
 * Handles rendering and parent-child warm query edge creation.
 */
export class EaCWarmQueryNodeCapabilityManager extends EaCNodeCapabilityManager {
  protected static renderer: ComponentType = memo(
    WarmQueryNodeRenderer as FunctionComponent
  );

  public override Type = 'warmquery';

  protected override buildAsCode(
    node: FlowGraphNode,
    ctx: EaCNodeCapabilityContext
  ): EaCNodeCapabilityAsCode | null {
    const wq = ctx.GetEaC().WarmQueries?.[node.ID];

    if (!wq) return null;

    return {
      Metadata: wq.Metadata,
      Details: wq.Details ?? {},
    };
  }

  protected override buildConnectionPatch(
    source: FlowGraphNode,
    target: FlowGraphNode,
    ctx: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    const eac = ctx.GetEaC() as EverythingAsCodeOIWorkspace;

    // warmquery → surface
    if (source.Type === this.Type && target.Type === 'surface') {
      const surface = eac.Surfaces?.[target.ID];
      const wqs: Record<string, SurfaceWarmQuerySettings> = {
        ...(surface?.WarmQueries ?? {}),
        [source.ID]: {
          Metadata: { Enabled: true },
        },
      };

      return {
        Surfaces: {
          [target.ID]: {
            ...surface,
            WarmQueries: wqs,
          } as EaCSurfaceAsCode,
        },
      };
    }

    if (source.Type === this.Type && target.Type === this.Type) {
      const existing = eac.WarmQueries?.[target.ID]?.ParentWarmQueryLookup;
      if (existing === source.ID) return null;

      return {
        WarmQueries: {
          [target.ID]: {
            ...eac.WarmQueries?.[target.ID],
            ParentWarmQueryLookup: source.ID,
          } as EaCWarmQueryAsCode,
        },
      };
    }

    return null;
  }

  protected override buildDeletePatch(
    node: FlowGraphNode
  ): NullableArrayOrObject<OpenIndustrialEaC> {
    return this.wrapDeletePatch('WarmQueries', node.ID);
  }

  protected override buildDisconnectionPatch(
    source: FlowGraphNode,
    target: FlowGraphNode,
    ctx: EaCNodeCapabilityContext
  ): Partial<OpenIndustrialEaC> | null {
    const eac = ctx.GetEaC() as EverythingAsCodeOIWorkspace;

    // Remove parent-child warm query relationship
    if (source.Type === this.Type && target.Type === this.Type) {
      const targetWQ = eac.WarmQueries?.[target.ID];

      if (targetWQ?.ParentWarmQueryLookup === source.ID) {
        return {
          WarmQueries: {
            [target.ID]: {
              ...targetWQ,
              ParentWarmQueryLookup: undefined,
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

    const wq = eac.WarmQueries?.[node.ID];
    if (!wq) return edges;

    // --- connections feeding this warm query
    for (const connKey of Object.keys(wq.DataConnections ?? {})) {
      edges.push({
        ID: `${connKey}->${node.ID}`,
        Source: connKey,
        Target: node.ID,
        Label: 'queries',
      });
    }

    // --- children that this warm query is parent of
    for (const [childKey, childWQ] of Object.entries(eac.WarmQueries ?? {})) {
      if (childWQ.ParentWarmQueryLookup === node.ID) {
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
    const wq = ctx.GetEaC().WarmQueries?.[id];

    // Only emit root warm queries
    if (!wq || wq.ParentWarmQueryLookup) return null;

    return {
      ID: id,
      Type: this.Type,
      Label: wq.Details?.Name ?? id,
      Metadata: wq.Metadata!,
      Details: wq.Details,
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
          ...(context.WarmQueryLookup
            ? {
                ParentWarmQueryLookup: context.WarmQueryLookup,
              }
            : {}),
        } as EaCWarmQueryAsCode,
      },
    };
  }

  protected override buildUpdatePatch(
    node: FlowGraphNode,
    update: EaCNodeCapabilityPatch
  ): Partial<OpenIndustrialEaC> {
    return {
      WarmQueries: {
        [node.ID]: this.mergeDetailsAndMetadata(
          update.Details,
          update.Metadata
        ),
      },
    };
  }

  protected override getEventRouter(workspace: WorkspaceManager) {
    return new WarmQueryEventRouter(workspace);
  }

  protected override getInspector() {
    return WarmQueryInspector;
  }

  protected override getPreset() {
    return { Type: this.Type, Label: 'WarmQuery', IconKey: 'warmquery' };
  }

  protected override getRenderer() {
    return EaCWarmQueryNodeCapabilityManager.renderer;
  }

  protected override async getStats(
    type: string,
    id: string,
    context: EaCNodeCapabilityContext
  ): Promise<WarmQueryStats> {
    const stats = await super.getStats(type, id, context);

    return {
      ...stats,
      inputCount: Math.floor(Math.random() * 4) + 1,
      agentCount: Math.floor(Math.random() * 3) + 1,
      lastSignalAt: `${Math.floor(Math.random() * 60)}s ago`,
    };
  }
}
