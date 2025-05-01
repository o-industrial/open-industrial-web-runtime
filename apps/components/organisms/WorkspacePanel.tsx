import { memo } from 'preact/compat';
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
} from 'reactflow';
import { IS_BROWSER } from '@fathym/atomic';

import { LoadingSpinner } from '../atoms/LoadingSpinner.tsx';
import WorkspacePanelTemplate from '../templates/WorkspacePanelTemplate.tsx';
import WorkspacePanelBank from './WorkspacePanelBank.tsx';
import { NodeScopeTypes, WorkspaceManager } from '../../../src/managers/WorkspaceManager.ts';
import { WorkspaceNodeData } from '../../../src/managers/WorkspaceNodeData.ts';
import { IntentTypes } from '../../../src/types/IntentTypes.ts';

export const IsIsland = true;

type WorkspacePanelProps = {
  onNodeSelect?: (nodeId: string) => void;
};

function WorkspacePanel({ onNodeSelect }: WorkspacePanelProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<WorkspaceNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null); // ✅ Add this

  const { project } = useReactFlow();

  const onDrop = (event: DragEvent) => {
    const result = WorkspaceManager.HandleDrop(event, nodes, project);

    if (!result) return;
  
    const { newNode, selectedId } = result;
  
    newNode.data.onDoubleClick = () => {
      setSelectedNodeId(selectedId);
      
      onNodeSelect?.(selectedId);
    };
  
    setNodes((nds: Node[]) => [...nds, newNode]);

    setSelectedNodeId(selectedId);
  };
   
  const onConnect = (params: Connection) => {
    setEdges((prevEdges: Edge[]) => {
      const newEdges = addEdge(params, prevEdges);

      return newEdges;
    });
  };

  const handleNodeClick = (_e: unknown, node: Node) => {
    setSelectedNodeId(node.id);
    onNodeSelect?.(node.id);
  };

  useEffect(() => {
    setNodes((prevNodes: Node[]) =>
      prevNodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isSelected: node.id === selectedNodeId,
        },
      }))
    );
  }, [selectedNodeId]);

  const scope: NodeScopeTypes = 'workspace';

  return (
    <WorkspacePanelTemplate
      bank={<WorkspacePanelBank presets={WorkspaceManager.GetAvailablePresets(scope)} />}
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
            nodeTypes={WorkspaceManager.GetAvailableTypes(scope)}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      }
    />
  );
}

// 👇 Wrap the export in the provider!
export default function WrappedWorkspacePanel(props: WorkspacePanelProps) {
  if (!IS_BROWSER) return <LoadingSpinner intentType={IntentTypes.Primary} />;

  return (
    <ReactFlowProvider>
      <WorkspacePanel {...props} />
    </ReactFlowProvider>
  );
}
