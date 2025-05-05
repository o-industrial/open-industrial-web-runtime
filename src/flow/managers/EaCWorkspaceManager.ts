import { EaCManager } from './EaCManager.ts';
import { NodeScopeTypes } from '../types/graph/NodeScopeTypes.ts';
import { FlowGraphNode } from '../types/graph/FlowGraphNode.ts';
import { FlowGraphEdge } from '../types/graph/FlowGraphEdge.ts';

import { EverythingAsCodeOIWorkspace } from '../../eac/EverythingAsCodeOIWorkspace.ts';
import { EaCDataConnectionAsCode } from '../../eac/EaCDataConnectionAsCode.ts';
import { EaCSimulatorAsCode } from '../../eac/EaCSimulatorAsCode.ts';
import {
  EaCSurfaceAsCode,
  SurfaceDataConnectionSettings,
} from '../../eac/EaCSurfaceAsCode.ts';
import { EaCSimulatorDetails } from '../../eac/EaCSimulatorDetails.ts';
import { EaCDataConnectionDetails } from '../../eac/EaCDataConnectionDetails.ts';
import { EaCSurfaceDetails } from '../../eac/EaCSurfaceDetails.ts';
import { EaCFlowNodeMetadata } from '../../eac/EaCFlowNodeMetadata.ts';
import { GraphStateManager } from './GraphStateManager.ts';

export class EaCWorkspaceManager extends EaCManager {
  constructor(scope: NodeScopeTypes, graph: GraphStateManager) {
    super(scope, graph);
  }

  public LoadFrom(eac: EverythingAsCodeOIWorkspace): void {
    const nodes: FlowGraphNode[] = [];
    const edges: FlowGraphEdge[] = [];

    // === Load Data Connections ===
    for (const [key, conn] of Object.entries(eac.DataConnections ?? {})) {
      const { Details, Metadata } = conn;

      nodes.push({
        ID: key,
        Type: 'connection',
        Label: Details?.Name ?? key,
        Metadata,
        Details,
      });
    }

    // === Load Simulators ===
    for (const [key, sim] of Object.entries(eac.Simulators ?? {})) {
      const { Details, Metadata } = sim;

      nodes.push({
        ID: key,
        Type: 'simulator',
        Label: Details?.Name ?? key,
        Metadata,
        Details,
      });

      // Simulator → DataConnection
      for (const [connKey, conn] of Object.entries(eac.DataConnections ?? {})) {
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

    // === Load Surfaces ===
    for (const [key, surf] of Object.entries(eac.Surfaces ?? {})) {
      const { Details, Metadata } = surf;

      nodes.push({
        ID: key,
        Type: 'surface',
        Label: Details?.Name ?? key,
        Metadata,
        Details,
      });

      // DataConnection → Surface
      for (const connKey of Object.keys(surf.DataConnections ?? {})) {
        edges.push({
          ID: `${connKey}->${key}`,
          Source: connKey,
          Target: key,
          Label: 'feeds',
        });
      }

      // ParentSurface → Surface
      if (surf.ParentSurfaceLookup) {
        edges.push({
          ID: `${surf.ParentSurfaceLookup}->${key}`,
          Source: surf.ParentSurfaceLookup,
          Target: key,
          Label: 'parent',
        });
      }
    }

    this.graph.LoadFromGraph({ Nodes: nodes, Edges: edges });
  }

  public ExportTo(): Partial<EverythingAsCodeOIWorkspace> {
    const graph = this.graph.ExportGraph();

    const dataConnections: Record<string, EaCDataConnectionAsCode> = {};
    const simulators: Record<string, EaCSimulatorAsCode> = {};
    const surfaces: Record<string, EaCSurfaceAsCode> = {};

    const surfaceDataConnections: Record<string, Set<string>> = {};
    const surfaceParents: Record<string, string> = {};
    const connectionSimulators: Record<string, string> = {};

    // Reconstruct relationships from edges
    for (const edge of graph.Edges) {
      if (edge.Label === 'feeds') {
        if (!surfaceDataConnections[edge.Target]) {
          surfaceDataConnections[edge.Target] = new Set();
        }
        surfaceDataConnections[edge.Target].add(edge.Source);
      } else if (edge.Label === 'parent') {
        surfaceParents[edge.Target] = edge.Source;
      } else if (edge.Label === 'simulates') {
        connectionSimulators[edge.Target] = edge.Source;
      }
    }

    for (const node of graph.Nodes) {
      const { ID, Type, Metadata, Details } = node;

      switch (Type) {
        case 'connection': {
          dataConnections[ID] = {
            Metadata: Metadata as EaCFlowNodeMetadata,
            Details: Details as EaCDataConnectionDetails,
            SimulatorLookup: connectionSimulators[ID],
          };
          break;
        }

        case 'simulator': {
          simulators[ID] = {
            Metadata: Metadata as EaCFlowNodeMetadata,
            Details: Details as EaCSimulatorDetails,
          };
          break;
        }

        case 'surface': {
          const dataConnKeys = Array.from(surfaceDataConnections[ID] ?? []);
          const dataConnMap = dataConnKeys.reduce(
            (acc, connKey) => ({
              ...acc,
              [connKey]: {} as SurfaceDataConnectionSettings,
            }),
            {} as Record<string, SurfaceDataConnectionSettings>
          );

          surfaces[ID] = {
            Metadata: Metadata as EaCFlowNodeMetadata,
            Details: Details as EaCSurfaceDetails,
            ParentSurfaceLookup: surfaceParents[ID],
            DataConnections: dataConnKeys.length > 0 ? dataConnMap : undefined,
          };

          break;
        }
      }
    }

    return {
      DataConnections: dataConnections,
      Simulators: simulators,
      Surfaces: surfaces,
    };
  }
}
