import { FlowGraph } from './FlowGraph.ts';
import { applyEdgeChanges, applyNodeChanges, Edge, EdgeChange, Node, NodeChange } from 'reactflow';
import { FlowNodeData } from './FlowNodeData.ts';
import { translateFromReactFlow, translateToReactFlow } from './FlowGraphAdapter.ts';

export class GraphStateManager {
  private graph: FlowGraph = { Nodes: [], Edges: [] };
  private nodes: Node<FlowNodeData>[] = [];
  private edges: Edge[] = [];

  LoadFromGraph(graph: FlowGraph): void {
    this.graph = graph;
    const { Nodes, Edges } = translateToReactFlow(graph);
    this.nodes = Nodes;
    this.edges = Edges;
  }

  ExportGraph(): FlowGraph {
    return translateFromReactFlow(this.nodes, this.edges);
  }

  // === Getters ===
  GetNodes(): Node<FlowNodeData>[] {
    return this.nodes;
  }

  GetEdges(): Edge[] {
    return this.edges;
  }

  // === Setters ===
  SetNodes(nodes: Node<FlowNodeData>[]): void {
    this.nodes = nodes;
  }

  SetEdges(edges: Edge[]): void {
    this.edges = edges;
  }

  // === Additions ===
  AddNode(node: Node<FlowNodeData>): void {
    this.nodes.push(node);
  }

  AddEdge(edge: Edge): void {
    this.edges.push(edge);
  }

  HasEdge(id: string): boolean {
    return this.edges.some((e) => e.id === id);
  }

  // === React Flow Change Handlers ===
  ApplyNodeChanges(changes: NodeChange[]): void {
    this.nodes = applyNodeChanges(changes, this.nodes);
  }

  ApplyEdgeChanges(changes: EdgeChange[]): void {
    this.edges = applyEdgeChanges(changes, this.edges);
  }
}
