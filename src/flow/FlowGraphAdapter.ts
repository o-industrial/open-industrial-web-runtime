import { Edge, Node } from 'reactflow';
import { FlowGraph } from './FlowGraph.ts';
import { FlowNodeData } from './FlowNodeData.ts';
import { FlowGraphNode } from './FlowGraphNode.ts';

export function translateToReactFlow(graph: FlowGraph): {
  Nodes: Node<FlowNodeData>[];
  Edges: Edge[];
} {
  return {
    Nodes: graph.Nodes.map((n) => ({
      id: n.Id,
      type: n.Type,
      position: n.Position,
      data: {
        ...n.Props,
        type: n.Type,
        label: n.Label,
      },
    })) as Node[],
    Edges: graph.Edges.map((e) => ({
      id: e.Id,
      source: e.Source,
      target: e.Target,
      label: e.Label,
    })),
  };
}

export function translateFromReactFlow(
  nodes: Node<FlowNodeData>[],
  edges: Edge[],
): FlowGraph {
  return {
    Nodes: nodes.map((n) => ({
      Id: n.id,
      Type: n.type,
      Label: n.data.label,
      Position: n.position,
      Props: { ...n.data },
    })) as FlowGraphNode[],
    Edges: edges.map((e) => ({
      Id: e.id,
      Source: e.source,
      Target: e.target,
      Label: e.label,
    })),
  };
}
