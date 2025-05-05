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

export class GraphStateManager {
  protected graph: FlowGraph = { Nodes: [], Edges: [] };
  protected nodeCache: Record<string, Node<FlowNodeData>> = {};
  protected edgeCache: Record<string, Edge> = {};
  protected listeners: (() => void)[] = [];

  /**
   * Public API: Returns canonical FlowGraph structure.
   */
  public GetGraph(): FlowGraph {
    return this.graph;
  }

  /**
   * Alias for GetGraph.
   */
  public ExportGraph(): FlowGraph {
    return this.graph;
  }

  /**
   * Load and merge a new FlowGraph, triggering events only on change.
   */
  public LoadFromGraph(graph: FlowGraph): void {
    console.log('📥 Loading new graph structure:', graph);
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
      console.log('🔁 Graph changed — updating');
      this.clearCaches();
      this.emitGraphChanged();
    } else {
      console.log('✅ No changes detected — graph unchanged');
    }
  }

  /**
   * Apply React Flow-style node changes and immediately update FlowGraph.
   */
  public ApplyNodesChange(changes: NodeChange[], currentNodes: Node<FlowNodeData>[]): Node[] {
    const updated = applyNodeChanges(changes, currentNodes);
    this.nodeCache = {};
    this.graph.Nodes = updated.map((node) => this.toFlowGraphNode(node));
    // this.emitGraphChanged();
    return updated;
  }

  /**
   * Apply React Flow-style edge changes and immediately update FlowGraph.
   */
  public ApplyEdgesChange(changes: EdgeChange[], currentEdges: Edge[]): Edge[] {
    const updated = applyEdgeChanges(changes, currentEdges);
    this.edgeCache = {};
    this.graph.Edges = updated.map((edge) => this.toFlowGraphEdge(edge));
    // this.emitGraphChanged();

    return updated;
  }

  /**
   * Returns React Flow nodes.
   */
  public GetNodes(): Node<FlowNodeData>[] {
    return this.toReactFlowNodes();
  }

  /**
   * Returns React Flow edges.
   */
  public GetEdges(): Edge[] {
    return this.toReactFlowEdges();
  }

  /**
   * Register a listener for graph structure changes.
   */
  public OnGraphChanged(cb: () => void): void {
    this.listeners.push(cb);
  }

  /**
   * Unregister a previously added graph change listener.
   */
  public OffGraphChanged(cb: () => void): void {
    this.listeners = this.listeners.filter((fn) => fn !== cb);
  }

  protected emitGraphChanged(): void {
    this.listeners.forEach((cb) => cb());
  }

  protected clearCaches(): void {
    this.nodeCache = {};
    this.edgeCache = {};
  }

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

  protected toFlowGraphNode(n: Node<FlowNodeData>): FlowGraphNode {
    return {
      ID: n.id,
      Type: n.type ?? 'empty',
      Label: n.data?.label ?? n.id,
      Details: n.data?.details,
      Metadata: {
        Position: { X: n.position.x, Y: n.position.y },
        Enabled: n.data?.enabled,
      },
    };
  }

  protected toFlowGraphEdge(e: Edge): FlowGraphEdge {
    return {
      ID: e.id,
      Source: e.source,
      Target: e.target,
      Label: e.label,
    };
  }
}
