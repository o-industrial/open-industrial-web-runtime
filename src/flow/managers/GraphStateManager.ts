import { Edge, Node } from 'reactflow';

import { FlowNodeData } from '../types/react/FlowNodeData.ts';
import { FlowGraph } from '../types/graph/FlowGraph.ts';
import { FlowGraphNode } from '../types/graph/FlowGraphNode.ts';
import { FlowGraphEdge } from '../types/graph/FlowGraphEdge.ts';
import { StatManager } from './StatManager.ts';
import { SelectionManager } from './SelectionManager.ts';

export class GraphStateManager {
  protected graph: FlowGraph = { Nodes: [], Edges: [] };
  protected nodeCache: Record<string, Node<FlowNodeData>> = {};
  protected edgeCache: Record<string, Edge> = {};
  protected listeners = new Set<() => void>();

  constructor(
    protected selection: SelectionManager,
    protected stats: StatManager,
  ) {}

  // === Public API ===

  public GetGraph(): FlowGraph {
    return this.graph;
  }

  public ExportGraph(): FlowGraph {
    return this.graph;
  }

  public GetNodes(): Node<FlowNodeData>[] {
    return this.toReactFlowNodes();
  }

  public GetEdges(): Edge[] {
    return this.toReactFlowEdges();
  }

  public LoadFromGraph(graph: FlowGraph): void {
    console.log('📥 [GraphState] Loading new graph structure:', graph);

    let changed = false;
    const newNodeIDs = new Set(graph.Nodes.map((n) => n.ID));
    const newEdgeIDs = new Set(graph.Edges.map((e) => e.ID));

    // Nodes: Add/update
    for (const node of graph.Nodes) {
      const existingIdx = this.graph.Nodes.findIndex((n) => n.ID === node.ID);
      if (existingIdx === -1) {
        console.log(`➕ [GraphState] New node: ${node.ID}`);
        this.graph.Nodes.push(node);
        changed = true;
      } else if (
        JSON.stringify(this.graph.Nodes[existingIdx]) !== JSON.stringify(node)
      ) {
        console.log(`✏️ [GraphState] Node updated: ${node.ID}`);
        this.graph.Nodes[existingIdx] = node;
        changed = true;
      }
    }

    // Nodes: Remove deleted
    const beforeNodeCount = this.graph.Nodes.length;
    this.graph.Nodes = this.graph.Nodes.filter((n) => newNodeIDs.has(n.ID));
    if (this.graph.Nodes.length !== beforeNodeCount) {
      console.log('🗑️ [GraphState] Nodes removed');
      changed = true;
    }

    // Edges: Add/update
    for (const edge of graph.Edges) {
      const existingIdx = this.graph.Edges.findIndex((e) => e.ID === edge.ID);
      if (existingIdx === -1) {
        console.log(`➕ [GraphState] New edge: ${edge.ID}`);
        this.graph.Edges.push(edge);
        changed = true;
      } else if (
        JSON.stringify(this.graph.Edges[existingIdx]) !== JSON.stringify(edge)
      ) {
        console.log(`✏️ [GraphState] Edge updated: ${edge.ID}`);
        this.graph.Edges[existingIdx] = edge;
        changed = true;
      }
    }

    // Edges: Remove deleted
    const beforeEdgeCount = this.graph.Edges.length;
    this.graph.Edges = this.graph.Edges.filter((e) => newEdgeIDs.has(e.ID));
    if (this.graph.Edges.length !== beforeEdgeCount) {
      console.log('🗑️ [GraphState] Edges removed');
      changed = true;
    }

    if (changed) {
      console.log('🔁 [GraphState] Graph changed — emitting');
      this.clearCaches();
      this.emit();
    } else {
      console.log('✅ [GraphState] No changes detected');
    }
  }

  public OnGraphChanged(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  // === Internal Emit ===

  protected emit(): void {
    console.log(`[GraphState] Emitting to ${this.listeners.size} listener(s)`);
    for (const cb of this.listeners) cb();
  }

  // === Caching ===

  protected clearCaches(): void {
    console.log('[GraphState] Clearing caches');
    this.nodeCache = {};
    this.edgeCache = {};
  }

  // === ReactFlow Conversion ===

  protected toReactFlowNodes(): Node<FlowNodeData>[] {
    return this.graph.Nodes.map((n) => {
      const id = n.ID;
      const label = n.Label ?? n.Details?.Name ?? id;
      const enabled = n.Metadata?.Enabled ?? true;
      const details = n.Details ?? {};
      const position = {
        x: n.Metadata?.Position?.X ?? 0,
        y: n.Metadata?.Position?.Y ?? 0,
      };

      const enriched: FlowNodeData = {
        type: n.Type,
        label,
        enabled,
        details,
        useStats: () => this.stats.UseStats(n.Type, n.ID),
        onDoubleClick: () => {
          console.log('🖱️ [FlowNode] double clicked → selecting', id);
          this.selection.SelectNode(id);
        },
      };

      const updated: Node<FlowNodeData> = {
        id,
        type: n.Type,
        position,
        data: enriched,
      };

      const cached = this.nodeCache[id];
      this.nodeCache[id] = cached ? Object.assign(cached, updated) : updated;

      return this.nodeCache[id];
    });
  }

  protected toReactFlowEdges(): Edge[] {
    return this.graph.Edges.map((e) => {
      const id = e.ID;
      const updated: Edge = {
        id,
        source: e.Source,
        target: e.Target,
        label: e.Label,
      };

      const cached = this.edgeCache[id];
      this.edgeCache[id] = cached ? Object.assign(cached, updated) : updated;

      return this.edgeCache[id];
    });
  }

  // === Serialization ===

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
