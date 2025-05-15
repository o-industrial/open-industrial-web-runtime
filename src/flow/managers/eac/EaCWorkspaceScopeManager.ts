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

export class EaCWorkspaceScopeManager extends EaCScopeManager {
  public BuildGraph(): FlowGraph {
    const ctx = this.getCapabilityContext();

    const wks = this.getEaC();
    const nodes: FlowGraphNode[] = [];
    const edges: FlowGraphEdge[] = [];

    // --- DataConnections
    for (const key of Object.keys(wks.DataConnections ?? {})) {
      const node = this.capabilities.BuildNode(key, 'connection', ctx);
      if (node) {
        nodes.push(node);
        edges.push(...this.capabilities.BuildEdgesForNode(node, ctx));
      }
    }

    // --- Simulators
    for (const key of Object.keys(wks.Simulators ?? {})) {
      const node = this.capabilities.BuildNode(key, 'simulator', ctx);
      if (node) {
        nodes.push(node);
        edges.push(...this.capabilities.BuildEdgesForNode(node, ctx));
      }
    }

    // --- Root-level Surfaces
    for (const [key, surf] of Object.entries(wks.Surfaces ?? {})) {
      if (surf.ParentSurfaceLookup) continue;

      const node = this.capabilities.BuildNode(key, 'surface', ctx);
      if (node) {
        nodes.push(node);
        edges.push(...this.capabilities.BuildEdgesForNode(node, ctx));
      }
    }

    return { Nodes: nodes, Edges: edges };
  }

  public CreateConnectionEdge(
    source: string,
    target: string
  ): Partial<OpenIndustrialEaC> | null {
    debugger;
    const src = this.findNode(source);
    const tgt = this.findNode(target);

    if (!src || !tgt) return null;

    return this.capabilities.BuildConnectionPatch(
      src,
      tgt,
      this.getCapabilityContext()
    );
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
    edgeId: string
  ): Partial<OpenIndustrialEaC> | null {
    const wks = this.getEaC();
    const [source, target] = edgeId.split('->');

    const src = this.findNode(source);
    const tgt = this.findNode(target);
    if (!src || !tgt) return null;

    let partial: Partial<OpenIndustrialEaC> | null = null;

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
    _updated: Edge[]
  ): OpenIndustrialEaC | null {
    return null;
  }
}
