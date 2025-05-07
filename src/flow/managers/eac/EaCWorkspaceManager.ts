import { EaCManager } from '../EaCManager.ts';
import { FlowGraph } from '../../types/graph/FlowGraph.ts';
import { FlowGraphNode } from '../../types/graph/FlowGraphNode.ts';
import { FlowGraphEdge } from '../../types/graph/FlowGraphEdge.ts';

import { GraphStateManager } from '../GraphStateManager.ts';
import { PresetManager } from '../PresetManager.ts';

import { OpenIndustrialEaC } from '../../../types/OpenIndustrialEaC.ts';
import {
  EaCDataConnectionAsCode,
  EaCSurfaceAsCode,
  EverythingAsCodeOIWorkspace,
} from '@o-industrial/common/eac';

import { Edge, EdgeChange } from 'reactflow';
import { HistoryManager } from '../HistoryManager.ts';
import { OpenIndustrialAPIClient } from '@o-industrial/common/api';

/**
 * Workspace-level Everything-as-Code manager.
 * Handles conversion between structured EaC and flow graph representation,
 * as well as tracking simulator, connection, and surface relationships.
 */
export class EaCWorkspaceManager extends EaCManager {
  constructor(
    eac: EverythingAsCodeOIWorkspace,
    oiSvc: OpenIndustrialAPIClient,
    graph: GraphStateManager,
    presets: PresetManager,
    history: HistoryManager,
  ) {
    super(eac, oiSvc, 'workspace', graph, presets, history);
  }

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

      for (const connKey of Object.keys(surf.DataConnections ?? {})) {
        edges.push({
          ID: `${connKey}->${key}`,
          Source: connKey,
          Target: key,
          Label: 'feeds',
        });
      }

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

  public CreateConnectionEdge(
    source: string,
    target: string,
  ): Partial<OpenIndustrialEaC> | null {
    const wks = this.GetEaC() as EverythingAsCodeOIWorkspace;

    const src = this.graph.GetGraph().Nodes.find((n) => n.ID === source);
    const tgt = this.graph.GetGraph().Nodes.find((n) => n.ID === target);
    if (!src || !tgt) return null;

    let partial: Partial<EverythingAsCodeOIWorkspace> | null = null;

    if (src.Type === 'simulator' && tgt.Type === 'connection') {
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

  protected updateConnections(
    _changes: EdgeChange[],
    _updated: Edge[],
  ): OpenIndustrialEaC | null {
    // Future implementation: diff edges and update EaC
    return null;
  }

  protected hasConnection(source: string, target: string): boolean {
    return this.graph
      .GetGraph()
      .Edges.some((e) => e.Source === source && e.Target === target);
  }

  protected removeConnectionEdge(edgeId: string): void {
    const [source, target] = edgeId.split('->');
    const wks = this.GetEaC() as EverythingAsCodeOIWorkspace;

    const src = this.graph.GetGraph().Nodes.find((n) => n.ID === source);
    const tgt = this.graph.GetGraph().Nodes.find((n) => n.ID === target);
    if (!src || !tgt) return;

    let partial: Partial<EverythingAsCodeOIWorkspace> | null = null;

    if (src.Type === 'simulator' && tgt.Type === 'connection') {
      if (wks.DataConnections?.[tgt.ID]?.SimulatorLookup === src.ID) {
        partial = {
          DataConnections: {
            [tgt.ID]: {
              ...wks.DataConnections?.[tgt.ID],
              SimulatorLookup: undefined,
            },
          },
        };
      }
    } else if (src.Type === 'connection' && tgt.Type === 'surface') {
      const surface = wks.Surfaces?.[tgt.ID];
      if (surface?.DataConnections?.[src.ID]) {
        const updatedConnections = { ...surface.DataConnections };
        delete updatedConnections[src.ID];

        partial = {
          Surfaces: {
            [tgt.ID]: {
              ...surface,
              DataConnections: updatedConnections,
            },
          },
        };
      }
    } else if (src.Type === 'surface' && tgt.Type === 'surface') {
      const surface = wks.Surfaces?.[tgt.ID];
      if (surface?.ParentSurfaceLookup === src.ID) {
        partial = {
          Surfaces: {
            [tgt.ID]: {
              ...surface,
              ParentSurfaceLookup: undefined,
            },
          },
        };
      }
    }

    if (partial) {
      this.MergePartial(partial);
    }
  }
}
