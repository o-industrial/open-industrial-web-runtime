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
import { translateToReactFlow } from '../../utils/translateToReactFlow.ts';

export class GraphStateManager {
  protected nodeCache: Record<string, Node<FlowNodeData>> = {};
  protected edgeCache: Record<string, Edge> = {};

  protected graph: FlowGraph = { Nodes: [], Edges: [] };
  protected listeners: (() => void)[] = [];
  protected emitTimeout?: number;

  // === Canonical Access ===
  public GetGraph(): FlowGraph {
    return this.graph;
  }

  public LoadFromGraph(graph: FlowGraph): void {
    this.graph = graph;
    this.EmitGraphChanged();
  }

  public ExportGraph(): FlowGraph {
    return this.graph;
  }

  // === React Flow View ===
  public GetNodes(): Node<FlowNodeData>[] {
    return translateToReactFlow(this.graph).Nodes;
  }

  public GetEdges(): Edge[] {
    return translateToReactFlow(this.graph).Edges;
  }

  public UpdateFromReactFlow(nodes: Node<FlowNodeData>[], edges: Edge[]): void {
    this.graph = translateFromReactFlow(nodes, edges);
    this.EmitGraphChanged();
  }

  // === React Flow Mutation Hooks ===
  public ApplyNodeChanges(changes: NodeChange[]): void {
    const currentNodes = this.GetNodes();
    const updated = applyNodeChanges(changes, currentNodes);
    this.UpdateFromReactFlow(updated, this.GetEdges());
  }

  public ApplyEdgeChanges(changes: EdgeChange[]): void {
    const currentEdges = this.GetEdges();
    const updated = applyEdgeChanges(changes, currentEdges);
    this.UpdateFromReactFlow(this.GetNodes(), updated);
  }

  // === Manual FlowGraph Mutation ===
  public AddNode(node: FlowGraphNode): void {
    this.graph.Nodes.push(node);
    this.EmitGraphChanged();
  }

  public AddEdge(edge: FlowGraphEdge): void {
    if (!this.HasEdge(edge.ID)) {
      this.graph.Edges.push(edge);
      this.EmitGraphChanged();
    }
  }

  public HasEdge(id: string): boolean {
    return this.graph.Edges.some((e) => e.ID === id);
  }

  // === Event Handling ===
  public OnGraphChanged(callback: () => void): void {
    this.listeners.push(callback);
  }

  public OffGraphChanged(callback: () => void): void {
    this.listeners = this.listeners.filter((cb) => cb !== callback);
  }

  protected EmitGraphChanged(): void {
    if (this.emitTimeout) {
      clearTimeout(this.emitTimeout);
    }

    this.emitTimeout = setTimeout(() => {
      this.listeners.forEach((cb) => cb());
    }, 75);
  }

  protected ToReactFlowNodes(): Node<FlowNodeData>[] {
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
  
  protected ToReactFlowEdges(): Edge[] {
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
