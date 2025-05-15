import { EaCScopeManager } from './EaCScopeManager.ts';
import { FlowGraph } from '../../types/graph/FlowGraph.ts';
import { FlowGraphEdge } from '../../types/graph/FlowGraphEdge.ts';
import { FlowGraphNode } from '../../types/graph/FlowGraphNode.ts';
import {
  EaCAzureDockerSimulatorDetails,
  EaCDataConnectionAsCode,
  EaCSurfaceAsCode,
  EverythingAsCodeOIWorkspace,
  SurfaceDataConnectionSettings,
} from '@o-industrial/common/eac';
import { Edge, EdgeChange } from 'reactflow';
import { OpenIndustrialEaC } from '../../../types/OpenIndustrialEaC.ts';
import { FlowPosition } from '../../types/graph/FlowPosition.ts';
import { SimulatorDefinition } from '../SimulatorLibraryManager.ts';

/**
 * Workspace-scoped logic handler for EaC state.
 * Converts the workspace EaC into a flow graph and defines connection logic.
 */
export class EaCWorkspaceScopeManager extends EaCScopeManager {
  public BuildGraph(eac: OpenIndustrialEaC): FlowGraph {
    const wks = eac as EverythingAsCodeOIWorkspace;

    const nodes: FlowGraphNode[] = [];
    const edges: FlowGraphEdge[] = [];

    // --- Data Connections
    for (const [key, conn] of Object.entries(wks.DataConnections ?? {})) {
      nodes.push({
        ID: key,
        Type: 'connection',
        Label: conn.Details?.Name ?? key,
        Metadata: conn.Metadata,
        Details: conn.Details,
      });
    }

    // --- Simulators
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

    // --- Root Surfaces Only
    for (const [key, surf] of Object.entries(wks.Surfaces ?? {})) {
      if (surf.ParentSurfaceLookup) continue; // ❌ Skip nested surfaces

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

      // ⚠️ Optional: could include edge to known children if needed
      // but rendering of those will occur in surface scope
    }

    return { Nodes: nodes, Edges: edges };
  }

  public CreateConnectionEdge(
    eac: OpenIndustrialEaC,
    source: string,
    target: string
  ): Partial<OpenIndustrialEaC> | null {
    const wks = eac as EverythingAsCodeOIWorkspace;

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
      const connSet: Record<string, SurfaceDataConnectionSettings> = {
        ...(wks.Surfaces?.[tgt.ID]?.DataConnections ?? {}),
        [src.ID]: {
          Metadata: {
            Enabled: true,
          },
        },
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

    return partial;
  }

  public CreatePartialEaCFromPreset(
    type: string,
    id: string,
    position: FlowPosition
  ): Partial<OpenIndustrialEaC> {
    return this.presets.CreatePartialEaCFromPreset(type, id, position);
  }

  public HasConnection(source: string, target: string): boolean {
    return this.graph
      .GetGraph()
      .Edges.some((e) => e.Source === source && e.Target === target);
  }

  public override InstallSimulators(
    simDefs: SimulatorDefinition[]
  ): Partial<OpenIndustrialEaC> {
    const partial: Partial<OpenIndustrialEaC> = { Simulators: {} };

    for (const sim of simDefs) {
      partial.Simulators![sim.ID] = {
        Details: {
          Type: 'AzureDocker',
          Name: sim.Label,
          Description: sim.Description,
        } as EaCAzureDockerSimulatorDetails,
      };
    }

    return partial;
  }

  public RemoveConnectionEdge(
    eac: OpenIndustrialEaC,
    edgeId: string
  ): Partial<OpenIndustrialEaC> | null {
    const wks = eac as EverythingAsCodeOIWorkspace;

    const [source, target] = edgeId.split('->');

    const src = this.graph.GetGraph().Nodes.find((n) => n.ID === source);
    const tgt = this.graph.GetGraph().Nodes.find((n) => n.ID === target);
    if (!src || !tgt) return null;

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

    return partial;
  }

  public UpdateConnections(
    _changes: EdgeChange[],
    _updated: Edge[],
    _eac: OpenIndustrialEaC
  ): OpenIndustrialEaC | null {
    // TODO: implement connection diffing logic if needed
    return null;
  }
}
