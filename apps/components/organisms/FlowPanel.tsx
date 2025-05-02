import { JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
  NodeProps,
} from 'reactflow';
import { IS_BROWSER } from '@fathym/atomic';

import { LoadingSpinner } from '../atoms/LoadingSpinner.tsx';
import FlowPanelTemplate from '../templates/FlowPanelTemplate.tsx';
import FlowPanelBank from './FlowPanelBank.tsx';
import { IntentTypes } from '../../../src/types/IntentTypes.ts';
import { NodePreset } from '../../../src/managers/NodePreset.ts';
import { NodeScopeTypes } from '../../../src/managers/FlowManager.ts';
import { FlowNodeData } from '../../../src/managers/FlowNodeData.ts';

export const IsIsland = true;

type FlowPanelProps = {
  presets: Record<string, NodePreset>;
  nodeTypes: Record<
    string,
    (props: NodeProps<FlowNodeData>) => JSX.Element | null
  >;
  handleDrop: (
    event: DragEvent,
    nodes: Node<FlowNodeData>[],
    project: ReturnType<typeof useReactFlow>['project']
  ) => {
    newNode: Node<FlowNodeData>;
    selectedId?: string;
  } | null;
  onNodeSelect?: (node: Node<FlowNodeData>) => void;
};

function FlowPanel({
  presets,
  nodeTypes,
  handleDrop,
  onNodeSelect,
}: FlowPanelProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  const [selectedNode, setSelectedNode] = useState<Node<FlowNodeData> | null>(
    null
  );

  const { project } = useReactFlow();

  const onDrop = (event: DragEvent) => {
    const result = handleDrop(event, nodes, project);
    if (!result) return;

    const { newNode } = result;

    newNode.data.onDoubleClick = () => {
      setSelectedNode(newNode);
      onNodeSelect?.(newNode);
    };

    setNodes((nds: Node[]) => [...nds, newNode]);
    setSelectedNode(newNode);
  };

  const onConnect = (params: Connection) => {
    setEdges((prevEdges: Edge[]) => addEdge(params, prevEdges));
  };

  const handleNodeClick = (_e: unknown, node: Node<FlowNodeData>) => {
    setSelectedNode(node);
    onNodeSelect?.(node);
  };

  useEffect(() => {
    setNodes((prevNodes: Node[]) =>
      prevNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isSelected: node.id === selectedNode?.id,
        },
      }))
    );
  }, [selectedNode]);

  return (
    <FlowPanelTemplate
      bank={<FlowPanelBank presets={presets} />}
      canvas={
        <div
          class="absolute inset-0 w-full h-full"
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={handleNodeClick}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.3}
            maxZoom={4}
            defaultZoom={1.25}
          >
            <Background />
            <Controls position="bottom-left" />
            <MiniMap
              nodeColor={(node) => {
                if (node.data?.status === 'error') return '#F43F5E';
                if (node.data?.status === 'warning') return '#EAB308';
                return '#06B6D4';
              }}
              maskColor="rgba(0,0,0,0.2)"
              style={{
                borderRadius: '0.5rem',
                boxShadow: '0 0 8px rgba(0,0,0,0.3)',
              }}
              className="-:!bg-neutral-800 -:!border -:!border-neutral-700"
            />
          </ReactFlow>
        </div>
      }
    />
  );
}

export default function WrappedFlowPanel(props: FlowPanelProps) {
  if (!IS_BROWSER) return <LoadingSpinner intentType={IntentTypes.Primary} />;
  return (
    <ReactFlowProvider>
      <FlowPanel {...props} />
    </ReactFlowProvider>
  );
}
