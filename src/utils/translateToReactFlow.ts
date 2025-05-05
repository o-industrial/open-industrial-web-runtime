import { Edge, Node } from 'reactflow';
import { FlowGraph } from '../flow/types/graph/FlowGraph.ts';
import { FlowNodeData } from '../flow/types/react/FlowNodeData.ts';

export function translateToReactFlow(graph: FlowGraph): {
  Nodes: Node<FlowNodeData>[];
  Edges: Edge[];
} {
  return {
    Nodes: graph.Nodes.map((n) => ({
      id: n.ID,
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
    })),
    Edges: graph.Edges.map((e) => ({
      id: e.ID,
      source: e.Source,
      target: e.Target,
      label: e.Label,
    })),
  };
}
