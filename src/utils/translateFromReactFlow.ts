import { Edge, Node } from 'reactflow';
import { FlowGraph } from '../flow/types/graph/FlowGraph.ts';
import { FlowGraphNode } from '../flow/types/graph/FlowGraphNode.ts';
import { FlowNodeData } from '../flow/types/react/FlowNodeData.ts';

export function translateFromReactFlow(
  nodes: Node<FlowNodeData>[],
  edges: Edge[]
): FlowGraph {
  return {
    Nodes: nodes.map((n) => {
      const { label, type, enabled, details } = n.data;

      const graphNode: FlowGraphNode = {
        ID: n.id,
        Type: type,
        Label: label,
        Metadata: {
          Position: { X: n.position.x, Y: n.position.y },
          Enabled: enabled ?? true,
        },
        Details: details,
      };

      return graphNode;
    }),

    Edges: edges.map((e) => ({
      ID: e.id,
      Source: e.source,
      Target: e.target,
      Label: e.label,
    })),
  };
}
