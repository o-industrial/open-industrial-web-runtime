import { EaCScopeManager } from './EaCScopeManager.ts';
import { Edge, EdgeChange, Node } from 'reactflow';
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
import { EaCNodeInspectorManager } from './EaCNodeInspectorManager.ts';
import { FlowNodeData } from '../../types/react/FlowNodeData.ts';

export class EaCSurfaceScopeManager extends EaCScopeManager {
  constructor(
    graph: GraphStateManager,
    presets: PresetManager,
    inspector: EaCNodeInspectorManager,
    protected surfaceLookup: string
  ) {
    super(graph, presets, inspector);
  }

  public BuildGraph(eac: OpenIndustrialEaC): FlowGraph {
    const wks = eac as EverythingAsCodeOIWorkspace;
    const surf = wks.Surfaces?.[this.surfaceLookup];
    if (!surf) return { Nodes: [], Edges: [] };

    const nodes: FlowGraphNode[] = [];
    const edges: FlowGraphEdge[] = [];

    const schemaEntries = wks.Schemas ?? {};

    // --- Surface-Mapped Connections
    for (const [connKey, dcSettings] of Object.entries(
      surf.DataConnections ?? {}
    )) {
      const { Metadata, ...settings } = dcSettings;

      const conn = wks.DataConnections?.[connKey];

      if (!conn || Metadata?.Enabled === false) {
        continue;
      }

      nodes.push({
        ID: `${this.surfaceLookup}->${connKey}`,
        Type: 'surface->connection',
        Label: conn.Details?.Name ?? connKey,
        Metadata: {
          ...(conn.Metadata || {}),
          ...Metadata,
        },
        Details: {
          Name: conn.Details?.Name,
          ...settings,
        },
      });
    }

    // --- Surface-Mapped Schemas (Root, Reference, Composite)
    for (const [schemaKey, { Metadata, ...settings }] of Object.entries(
      surf.Schemas ?? {}
    )) {
      if (!Metadata?.Enabled) continue;

      const schema = wks.Schemas?.[schemaKey];
      if (!schema) continue;

      const type = schema.Details?.Type;
      let nodeType: FlowGraphNode['Type'] = 'schema';
      if (type === 'Composite') nodeType = 'composite-schema';
      else if (type === 'Reference') nodeType = 'reference-schema';

      nodes.push({
        ID: schemaKey,
        Type: nodeType,
        Label: schema.Details?.Name ?? schemaKey,
        Metadata: Metadata,
        Details: { ...schema.Details, ...settings },
      });

      // --- Edge: DataConnection feeds schema (now pulled from schema.DataConnection)
      const dc = schema.DataConnection?.Lookup;
      if (dc) {
        edges.push({
          ID: `${dc}->${schemaKey}`,
          Source: `${this.surfaceLookup}->${dc}`,
          Target: schemaKey,
          Label: 'feeds',
        });
      }

      // --- Edge: joined into Composite
      for (const [compKey, compSchema] of Object.entries(schemaEntries)) {
        if (
          compSchema?.Details?.Type !== 'Composite' &&
          compSchema?.Details?.Type !== 'Reference'
        ) {
          continue;
        }

        const compJoins =
          (compSchema.Details as EaCCompositeSchemaDetails).SchemaJoins ?? {};

        if (Object.values(compJoins).includes(schemaKey)) {
          edges.push({
            ID: `${schemaKey}->${compKey}`,
            Source: schemaKey,
            Target: compKey,
            Label: 'joins',
          });
        }
      }
    }

    // --- Agents
    for (const [agentKey, settings] of Object.entries(surf.Agents ?? {})) {
      const agent = wks.Agents?.[agentKey];
      if (!agent || settings?.Enabled === false) continue;

      nodes.push({
        ID: agentKey,
        Type: 'agent',
        Label: agent.Details?.Name ?? agentKey,
        Metadata: agent.Metadata,
        Details: agent.Details,
      });

      const schemaTarget = agent.Schema?.SchemaLookup;
      if (schemaTarget) {
        edges.push({
          ID: `${agentKey}->${schemaTarget}`,
          Source: agentKey,
          Target: schemaTarget,
          Label: 'targets',
        });
      }
    }

    // --- Child Surfaces (nested inside this surface)
    for (const [key, child] of Object.entries(wks.Surfaces ?? {})) {
      if (child.ParentSurfaceLookup !== this.surfaceLookup) continue;

      nodes.push({
        ID: key,
        Type: 'surface',
        Label: child.Details?.Name ?? key,
        Metadata: child.Metadata,
        Details: child.Details,
      });
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

    if (src.Type?.includes('schema') && tgt.Type === 'composite-schema') {
      const comp = wks.Schemas?.[tgt.ID];
      if (!comp) return null;

      const compDetails = comp.Details as EaCCompositeSchemaDetails;
      return {
        Schemas: {
          [tgt.ID]: {
            ...comp,
            Details: {
              ...compDetails,
              SchemaJoins: {
                ...(compDetails.SchemaJoins ?? {}),
                [src.ID]: src.ID,
              },
            },
          },
        },
      };
    }

    if (src.Type === 'agent' && tgt.Type?.includes('schema')) {
      const agent = wks.Agents?.[src.ID];
      if (!agent) return null;

      return {
        Agents: {
          [src.ID]: {
            ...agent,
            Schema: {
              SchemaLookup: tgt.ID,
            },
          },
        },
      };
    }

    debugger;
    if (src.Type === 'surface->connection' && tgt.Type?.includes('schema')) {
      const schema = wks.Schemas?.[tgt.ID];
      if (!schema) return null;

      const [_, connLookup] = src.ID.split('->');

      return {
        Schemas: {
          [tgt.ID]: {
            ...schema,
            DataConnection: { Lookup: connLookup },
          },
        },
      };
    }

    if (src.Type?.includes('schema') && tgt.Type === 'surface') {
      const surf = wks.Surfaces?.[tgt.ID];
      if (!surf) return null;

      return {
        Surfaces: {
          [tgt.ID]: {
            ...surf,
            Schemas: {
              ...(surf.Schemas ?? {}),
              [src.ID]: { Metadata: { Enabled: true } },
            },
          },
        },
      };
    }

    return null;
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
    eac: OpenIndustrialEaC,
    edgeId: string
  ): Partial<OpenIndustrialEaC> | null {
    const wks = eac as EverythingAsCodeOIWorkspace;
    const [source, target] = edgeId.split('->');
    const src = this.graph.GetGraph().Nodes.find((n) => n.ID === source);
    const tgt = this.graph.GetGraph().Nodes.find((n) => n.ID === target);
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
    edges: Edge[],
    eac: OpenIndustrialEaC
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

  protected override findAsCode(node: Node<FlowNodeData>) {
    return this.inspector.FindAsCode({
      ID: node.id,
      Type: node.type!,
      SurfaceLookup: this.surfaceLookup,
    });
  }
}
