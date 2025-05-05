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

  public GetGraph(): FlowGraph {
    return this.graph;
  }

  public ExportGraph(): FlowGraph {
    return this.graph;
  }

  public LoadFromGraph(graph: FlowGraph): void {
    console.log('📥 [GraphState] Loading new graph structure:', graph);
    let changed = false;

    for (const node of graph.Nodes) {
      const idx = this.graph.Nodes.findIndex((n) => n.ID === node.ID);
      if (idx === -1) {
        console.log(`➕ [GraphState] New node added: ${node.ID}`);
        this.graph.Nodes.push(node);
        changed = true;
      } else if (
        JSON.stringify(this.graph.Nodes[idx]) !== JSON.stringify(node)
      ) {
        console.log(`✏️ [GraphState] Node updated: ${node.ID}`);
        this.graph.Nodes[idx] = node;
        changed = true;
      }
    }

    for (const edge of graph.Edges) {
      const idx = this.graph.Edges.findIndex((e) => e.ID === edge.ID);
      if (idx === -1) {
        console.log(`➕ [GraphState] New edge added: ${edge.ID}`);
        this.graph.Edges.push(edge);
        changed = true;
      } else if (
        JSON.stringify(this.graph.Edges[idx]) !== JSON.stringify(edge)
      ) {
        console.log(`✏️ [GraphState] Edge updated: ${edge.ID}`);
        this.graph.Edges[idx] = edge;
        changed = true;
      }
    }

    if (changed) {
      console.log(
        '🔁 [GraphState] Graph changed — updating caches and notifying listeners'
      );
      this.clearCaches();
      this.emitGraphChanged();
    } else {
      console.log('✅ [GraphState] No changes detected — graph unchanged');
    }
  }

  public ApplyNodesChange(
    changes: NodeChange[],
    currentNodes: Node<FlowNodeData>[]
  ): Node[] {
    console.log(
      `🧩 [GraphState] Applying ${changes.length} node changes`,
      changes
    );

    const updated = applyNodeChanges(changes, currentNodes);
    let shouldEmit = false;

    for (const node of updated) {
      const flowNode = this.toFlowGraphNode(node);
      const cached = this.nodeCache[node.id];

      if (cached) {
        const posChanged =
          cached.position.x !== node.position.x ||
          cached.position.y !== node.position.y;
        const labelChanged = cached.data.label !== node.data.label;
        const enabledChanged = cached.data.enabled !== node.data.enabled;

        if (posChanged || labelChanged || enabledChanged) {
          console.log(`🔄 [GraphState] Updating node ${node.id}`);
          cached.position = { ...node.position };
          cached.data = { ...cached.data, ...node.data };
          cached.type = node.type;
          shouldEmit = true;
        }
      } else {
        console.log(`➕ [GraphState] New node ${node.id}`);
        this.nodeCache[node.id] = { ...node };
        shouldEmit = true;
      }

      const idx = this.graph.Nodes.findIndex((n) => n.ID === node.id);
      if (idx !== -1) {
        this.graph.Nodes[idx] = flowNode;
      } else {
        this.graph.Nodes.push(flowNode);
      }
    }

    if (shouldEmit) {
      console.log('✅ [GraphState] Emitting graph change due to node updates');
      this.emitGraphChanged();
    }

    return updated;
  }

  public ApplyEdgesChange(changes: EdgeChange[], currentEdges: Edge[]): Edge[] {
    console.log(
      `🔗 [GraphState] Applying ${changes.length} edge changes`,
      changes
    );

    const updated = applyEdgeChanges(changes, currentEdges);
    let shouldEmit = false;

    for (const edge of updated) {
      const flowEdge = this.toFlowGraphEdge(edge);
      const cached = this.edgeCache[edge.id];

      const hasChanged =
        !cached ||
        cached.source !== edge.source ||
        cached.target !== edge.target ||
        cached.label !== edge.label;

      if (hasChanged) {
        if (cached) {
          console.log(`🔄 [GraphState] Updating edge ${edge.id}`);
          Object.assign(cached, edge);
        } else {
          console.log(`➕ [GraphState] New edge ${edge.id}`);
          this.edgeCache[edge.id] = { ...edge };
        }

        const idx = this.graph.Edges.findIndex((e) => e.ID === edge.id);
        if (idx !== -1) {
          this.graph.Edges[idx] = flowEdge;
        } else {
          this.graph.Edges.push(flowEdge);
        }

        shouldEmit = true;
      }
    }

    if (shouldEmit) {
      console.log('✅ [GraphState] Emitting graph change due to edge updates');
      this.emitGraphChanged();
    }

    return updated;
  }

  public GetNodes(): Node<FlowNodeData>[] {
    return this.toReactFlowNodes();
  }

  public GetEdges(): Edge[] {
    return this.toReactFlowEdges();
  }

  public OnGraphChanged(cb: () => void): void {
    this.listeners.push(cb);
    console.log(
      `[GraphState] Listener added — total: ${this.listeners.length}`
    );
  }

  public OffGraphChanged(cb: () => void): void {
    this.listeners = this.listeners.filter((fn) => fn !== cb);
    console.log(
      `[GraphState] Listener removed — total: ${this.listeners.length}`
    );
  }

  protected emitGraphChanged(): void {
    console.log(
      `[GraphState] Emitting change to ${this.listeners.length} listener(s)`
    );
    this.listeners.forEach((cb) => cb());
  }

  protected clearCaches(): void {
    console.log('[GraphState] Clearing node and edge caches');
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

      this.nodeCache[id] = existing
        ? Object.assign(existing, updated)
        : updated;
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

      this.edgeCache[id] = existing
        ? Object.assign(existing, updated)
        : updated;
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
