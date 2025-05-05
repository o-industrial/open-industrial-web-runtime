import {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

import { FlowNodeData } from '../types/react/FlowNodeData.ts';
import { FlowGraph } from '../types/graph/FlowGraph.ts';
import { FlowGraphNode } from '../types/graph/FlowGraphNode.ts';
import { FlowGraphEdge } from '../types/graph/FlowGraphEdge.ts';
import { translateFromReactFlow } from '../../utils/translateFromReactFlow.ts';

export class GraphStateManager {
  protected graph: FlowGraph = { Nodes: [], Edges: [] };
  protected nodeCache: Record<string, Node<FlowNodeData>> = {};
  protected edgeCache: Record<string, Edge> = {};
  protected listeners: (() => void)[] = [];
  protected emitTimeout?: number;

  // === Canonical Access ===
  public GetGraph(): FlowGraph {
    return this.graph;
  }

  public ExportGraph(): FlowGraph {
    return this.graph;
  }

  // === Load Full or Partial Graph ===
  public LoadFromGraph(graph: FlowGraph): void {
    let changed = false;

    for (const node of graph.Nodes) {
      const idx = this.graph.Nodes.findIndex((n) => n.ID === node.ID);

      if (idx === -1) {
        this.graph.Nodes.push(node);
        changed = true;
      } else if (JSON.stringify(this.graph.Nodes[idx]) !== JSON.stringify(node)) {
        this.graph.Nodes[idx] = node;
        changed = true;
      }
    }

    for (const edge of graph.Edges) {
      const idx = this.graph.Edges.findIndex((e) => e.ID === edge.ID);

      if (idx === -1) {
        this.graph.Edges.push(edge);
        changed = true;
      } else if (JSON.stringify(this.graph.Edges[idx]) !== JSON.stringify(edge)) {
        this.graph.Edges[idx] = edge;
        changed = true;
      }
    }

    if (changed) {
      this.clearCaches();
      this.emitGraphChanged();
    }
  }

  // === React Flow View ===
  public GetNodes(): Node<FlowNodeData>[] {
    return this.toReactFlowNodes();
  }

  public GetEdges(): Edge[] {
    return this.toReactFlowEdges();
  }

  public UpdateFromReactFlow(nodes: Node<FlowNodeData>[], edges: Edge[]): void {
    this.graph = translateFromReactFlow(nodes, edges);
    this.clearCaches();
    this.emitGraphChanged();
  }

  // === React Flow Mutation Hooks ===
  public ApplyNodeChanges(changes: NodeChange[]): void {
    const updated = applyNodeChanges(changes, this.GetNodes());
    this.UpdateFromReactFlow(updated, this.GetEdges());
  }

  public ApplyEdgeChanges(changes: EdgeChange[]): void {
    const updated = applyEdgeChanges(changes, this.GetEdges());
    this.UpdateFromReactFlow(this.GetNodes(), updated);
  }

  // === Manual Mutation ===
  public AddNode(node: FlowGraphNode): void {
    if (!this.HasNode(node.ID)) {
      this.graph.Nodes.push(node);
      this.clearCaches();
      this.emitGraphChanged();
    }
  }

  public AddEdge(edge: FlowGraphEdge): void {
    if (!this.HasEdge(edge.ID)) {
      this.graph.Edges.push(edge);
      this.clearCaches();
      this.emitGraphChanged();
    }
  }

  public HasNode(id: string): boolean {
    return this.graph.Nodes.some((n) => n.ID === id);
  }

  public HasEdge(id: string): boolean {
    return this.graph.Edges.some((e) => e.ID === id);
  }

  // === Events ===
  public OnGraphChanged(callback: () => void): void {
    this.listeners.push(callback);
  }

  public OffGraphChanged(callback: () => void): void {
    this.listeners = this.listeners.filter((cb) => cb !== callback);
  }

  protected emitGraphChanged(): void {
    if (this.emitTimeout) clearTimeout(this.emitTimeout);

    this.emitTimeout = setTimeout(() => {
      this.listeners.forEach((cb) => cb());
    }, 75);
  }

  protected clearCaches(): void {
    this.nodeCache = {};
    this.edgeCache = {};
  }

  // === React Flow Translation ===
  protected toReactFlowNodes(): Node<FlowNodeData>[] {
    return this.graph.Nodes.map((n) => {
      const id = n.ID;
      const existing = this.nodeCache[id];

      const updated: Node<FlowNodeData> = {
        id,
        type: n.Type,
        position: {
          x: n.Metadata?.Position?.X ?? 0,
          y: n.Metadata?.Position?.Y ?? 0,
        },
        data: {
          type: n.Type,
          label: n.Label ?? n.Details?.Name ?? n.ID,
          enabled: n.Metadata?.Enabled ?? true,
          details: n.Details ?? {},
        },
      };

      this.nodeCache[id] = existing ? Object.assign(existing, updated) : updated;
      return this.nodeCache[id];
    });
  }

  protected toReactFlowEdges(): Edge[] {
    return this.graph.Edges.map((e) => {
      const id = e.ID;
      const existing = this.edgeCache[id];

      const updated: Edge = {
        id,
        source: e.Source,
        target: e.Target,
        label: e.Label,
      };

      this.edgeCache[id] = existing ? Object.assign(existing, updated) : updated;
      return this.edgeCache[id];
    });
  }
}
