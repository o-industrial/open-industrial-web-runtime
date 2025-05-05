import { EaCManager } from './EaCManager.ts';
import { FlowGraph } from '../types/graph/FlowGraph.ts';
import { FlowGraphNode } from '../types/graph/FlowGraphNode.ts';
import { FlowGraphEdge } from '../types/graph/FlowGraphEdge.ts';

import { GraphStateManager } from './GraphStateManager.ts';
import { PresetManager } from './PresetManager.ts';

import { OpenIndustrialEaC } from '../../types/OpenIndustrialEaC.ts';
import { EverythingAsCodeOIWorkspace } from '../../eac/EverythingAsCodeOIWorkspace.ts';
import { EaCDataConnectionAsCode } from '../../eac/EaCDataConnectionAsCode.ts';
import { EaCSurfaceAsCode } from '../../eac/EaCSurfaceAsCode.ts';

/**
 * Manages a full Workspace-scope Everything-as-Code model and its
 * corresponding flow graph. This includes data connections, simulators,
 * surfaces, and their interlinked relationships.
 */
export class EaCWorkspaceManager extends EaCManager {
  constructor(
    eac: EverythingAsCodeOIWorkspace,
    graph: GraphStateManager,
    presets: PresetManager
  ) {
    super(eac, 'workspace', graph, presets);
  }

  /**
   * Derives the canonical flow graph (nodes + edges) from current EaC state.
   * This is used after every mutation to rehydrate the topology.
   */
  protected buildGraph(eac: OpenIndustrialEaC): FlowGraph {
    const nodes: FlowGraphNode[] = [];
    const edges: FlowGraphEdge[] = [];

    const wks = eac as EverythingAsCodeOIWorkspace;

    // === Data Connections ===
    for (const [key, conn] of Object.entries(wks.DataConnections ?? {})) {
      nodes.push({
        ID: key,
        Type: 'connection',
        Label: conn.Details?.Name ?? key,
        Metadata: conn.Metadata,
        Details: conn.Details,
      });
    }

    // === Simulators ===
    for (const [key, sim] of Object.entries(wks.Simulators ?? {})) {
      nodes.push({
        ID: key,
        Type: 'simulator',
        Label: sim.Details?.Name ?? key,
        Metadata: sim.Metadata,
        Details: sim.Details,
      });

      // simulates → data connection
      for (const [connKey, conn] of Object.entries(wks.DataConnections ?? {})) {
        if (conn.SimulatorLookup === key) {
          edges.push({
            ID: `${key}->${connKey}`,
            Source: key,
            Target: connKey,
            Label: 'simulates',
          });
        }
      }
    }

    // === Surfaces ===
    for (const [key, surf] of Object.entries(wks.Surfaces ?? {})) {
      nodes.push({
        ID: key,
        Type: 'surface',
        Label: surf.Details?.Name ?? key,
        Metadata: surf.Metadata,
        Details: surf.Details,
      });

      // connection → surface
      for (const connKey of Object.keys(surf.DataConnections ?? {})) {
        edges.push({
          ID: `${connKey}->${key}`,
          Source: connKey,
          Target: key,
          Label: 'feeds',
        });
      }

      // parent → surface
      if (surf.ParentSurfaceLookup) {
        edges.push({
          ID: `${surf.ParentSurfaceLookup}->${key}`,
          Source: surf.ParentSurfaceLookup,
          Target: key,
          Label: 'parent',
        });
      }
    }

    return { Nodes: nodes, Edges: edges };
  }

  /**
   * Creates an EaC partial structure based on a proposed connection between two nodes.
   * Returns the EaC delta and triggers downstream graph rebuild if the relationship is valid.
   *
   * Supports:
   * - simulator → connection (`simulates`)
   * - connection → surface (`feeds`)
   * - surface → surface (`parent`)
   */
  public CreateConnectionEdge(
    source: string,
    target: string
  ): Partial<OpenIndustrialEaC> | null {
    const wks = this.GetEaC() as EverythingAsCodeOIWorkspace;

    const src = this.graph.GetGraph().Nodes.find((n) => n.ID === source);
    const tgt = this.graph.GetGraph().Nodes.find((n) => n.ID === target);
    if (!src || !tgt) return null;

    let partial: Partial<EverythingAsCodeOIWorkspace> | null = null;

    if (src.Type === 'simulator' && tgt.Type === 'connection') {
      // simulator → connection
      const existing = wks.DataConnections?.[tgt.ID]?.SimulatorLookup;
      if (existing === src.ID) return null;

      partial = {
        DataConnections: {
          [tgt.ID]: {
            ...wks.DataConnections?.[tgt.ID],
            SimulatorLookup: src.ID,
          } as EaCDataConnectionAsCode,
        },
      };
    } else if (src.Type === 'connection' && tgt.Type === 'surface') {
      // connection → surface
      const connSet = {
        ...(wks.Surfaces?.[tgt.ID]?.DataConnections ?? {}),
        [src.ID]: {},
      };

      partial = {
        Surfaces: {
          [tgt.ID]: {
            ...wks.Surfaces?.[tgt.ID],
            DataConnections: connSet,
          } as EaCSurfaceAsCode,
        },
      };
    } else if (src.Type === 'surface' && tgt.Type === 'surface') {
      // parent → surface
      const existing = wks.Surfaces?.[tgt.ID]?.ParentSurfaceLookup;
      if (existing === src.ID) return null;

      partial = {
        Surfaces: {
          [tgt.ID]: {
            ...wks.Surfaces?.[tgt.ID],
            ParentSurfaceLookup: src.ID,
          } as EaCSurfaceAsCode,
        },
      };
    }

    if (partial) {
      this.MergePartial(partial);
    }

    return partial;
  }
}
