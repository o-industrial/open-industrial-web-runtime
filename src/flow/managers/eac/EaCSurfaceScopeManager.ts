import { EaCScopeManager } from './EaCScopeManager.ts';
import { Edge, EdgeChange } from 'reactflow';
import { GraphStateManager } from '../GraphStateManager.ts';

import {
  EaCCompositeSchemaDetails,
  EverythingAsCodeOIWorkspace,
} from '@o-industrial/common/eac';

import { OpenIndustrialEaC } from '../../../types/OpenIndustrialEaC.ts';
import { FlowGraph } from '../../types/graph/FlowGraph.ts';
import { FlowGraphNode } from '../../types/graph/FlowGraphNode.ts';
import { FlowGraphEdge } from '../../types/graph/FlowGraphEdge.ts';
import { FlowPosition } from '../../types/graph/FlowPosition.ts';
import { PresetManager } from '../PresetManager.ts';
import { EaCNodeCapabilityContext } from './capabilities/EaCNodeCapabilityManager.ts';
import { EaCCapabilitiesManager } from './EaCCapabilitiesManager.ts';

export class EaCSurfaceScopeManager extends EaCScopeManager {
  constructor(
    graph: GraphStateManager,
    presets: PresetManager,
    capabilities: EaCCapabilitiesManager,
    getEaC: () => OpenIndustrialEaC,
    protected surfaceLookup: string
  ) {
    super(graph, presets, capabilities, getEaC);
  }

  public BuildGraph(): FlowGraph {
    const ctx = this.getCapabilityContext();

    const nodes: FlowGraphNode[] = [];
    const edges: FlowGraphEdge[] = [];

    const surface = this.getEaC().Surfaces?.[this.surfaceLookup];
    if (!surface) return { Nodes: [], Edges: [] };

    for (const schemaKey of Object.keys(surface.Schemas ?? {})) {
      const node = this.capabilities.BuildNode(schemaKey, 'schema', ctx);
      if (node) {
        nodes.push(node);
        edges.push(...this.capabilities.BuildEdgesForNode(node, ctx));
      }
    }

    for (const agentKey of Object.keys(surface.Agents ?? {})) {
      const node = this.capabilities.BuildNode(agentKey, 'agent', ctx);
      if (node) {
        nodes.push(node);
        edges.push(...this.capabilities.BuildEdgesForNode(node, ctx));
      }
    }

    for (const connKey of Object.keys(surface.DataConnections ?? {})) {
      const node = this.capabilities.BuildNode(
        `${this.surfaceLookup}->${connKey}`,
        'surface->connection',
        ctx
      );
      if (node) {
        nodes.push(node);
        edges.push(...this.capabilities.BuildEdgesForNode(node, ctx));
      }
    }

    // // Child surfaces
    // for (const [key, child] of Object.entries(
    //   (eac as EverythingAsCodeOIWorkspace).Surfaces ?? {}
    // )) {
    //   if (child.ParentSurfaceLookup !== this.surfaceLookup) continue;

    //   nodes.push({
    //     ID: key,
    //     Type: 'surface',
    //     Label: child.Details?.Name ?? key,
    //     Metadata: child.Metadata,
    //     Details: child.Details,
    //   });
    // }

    return { Nodes: nodes, Edges: edges };
  }

  public CreateConnectionEdge(
    source: string,
    target: string
  ): Partial<OpenIndustrialEaC> | null {
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
    return this.presets.CreatePartialEaCFromPreset(
      type,
      id,
      position,
      this.surfaceLookup
    );
  }

  public HasConnection(source: string, target: string): boolean {
    return this.graph
      .GetGraph()
      .Edges.some((e) => e.Source === source && e.Target === target);
  }

  public RemoveConnectionEdge(
    edgeId: string
  ): Partial<OpenIndustrialEaC> | null {
    const wks = this.getEaC();
    const [source, target] = edgeId.split('->');
    const src = this.findNode(source);
    const tgt = this.findNode(target);
    if (!src || !tgt) return null;

    // -- Remove schema from composite join
    if (src.Type?.includes('schema') && tgt.Type === 'composite-schema') {
      const comp = wks.Schemas?.[tgt.ID];
      if (!comp) return null;

      const compDetails = comp.Details as EaCCompositeSchemaDetails;
      if (!compDetails.SchemaJoins?.[src.ID]) return null;

      const updated = { ...compDetails.SchemaJoins };
      delete updated[src.ID];

      return {
        Schemas: {
          [tgt.ID]: {
            ...comp,
            Details: {
              ...compDetails,
              SchemaJoins: updated,
            },
          },
        },
      };
    }

    // -- Remove agent schema connection
    if (src.Type === 'agent' && tgt.Type?.includes('schema')) {
      const agent = wks.Agents?.[src.ID];
      if (!agent || agent.Schema?.SchemaLookup !== tgt.ID) return null;

      // Remove Schema block entirely (since it’s required, this is a partial update)
      const { Schema, ...rest } = agent;

      return {
        Agents: {
          [src.ID]: rest,
        },
      };
    }

    return null;
  }

  public UpdateConnections(
    changes: EdgeChange[],
    edges: Edge[]
  ): OpenIndustrialEaC | null {
    // let changed = false;
    // const partial: OpenIndustrialEaC = {};

    // for (const change of changes) {
    //   if (change.type === 'add') {
    //     const edge = edges.find((e) => e.id === change.item.id);
    //     if (!edge) continue;

    //     const update = this.CreateConnectionEdge(eac, edge.source, edge.target);
    //     if (update) {
    //       merge(partial, update);
    //       changed = true;
    //     }
    //   }

    //   if (change.type === 'remove') {
    //     const update = this.RemoveConnectionEdge(eac, change.id);
    //     if (update) {
    //       merge(partial, update);
    //       changed = true;
    //     }
    //   }
    // }

    // return changed ? partial : null;

    return null;
  }

  protected override getCapabilityContext(): EaCNodeCapabilityContext {
    const ctx = super.getCapabilityContext();

    return {
      ...ctx,
      SurfaceLookup: this.surfaceLookup,
    };
  }
}
