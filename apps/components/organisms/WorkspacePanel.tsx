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
import { WorkspaceManager } from '../../../src/managers/WorkspaceManager.ts';
import SchemaNodeRenderer from './renderers/SchemaNodeRenderer.tsx';
import WorkspaceNodeRendererBase from './renderers/WorkspaceNodeRendererBase.tsx';
import { IntentTypes } from '../../../src/types/IntentTypes.ts';

export const IsIsland = true;

type WorkspacePanelProps = {
  onNodeSelect?: (nodeId: string) => void;
};

const nodeTypes = {
  schema: memo(SchemaNodeRenderer),
  connection: memo(WorkspaceNodeRendererBase),
  surface: memo(WorkspaceNodeRendererBase),
  empty: memo(WorkspaceNodeRendererBase),
};

function WorkspacePanel({ onNodeSelect }: WorkspacePanelProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null); // ✅ Add this

  const { project } = useReactFlow();

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    const transfer = event.dataTransfer;
    if (!transfer) return;

    const type = transfer.getData('application/node-type');
    if (!type) return;

    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();

    // 🔥 Use project to get correct canvas coordinates
    const position = project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });

    const preset = WorkspaceManager.GetPreset(type);
    if (!preset) return;

    const id = `${type}-${Date.now()}`;

    setNodes((nds: Node[]) => [
      ...nds,
      {
        id,
        type: preset.Type,
        position,
        data: {
          type: preset.Type,
          label: preset.Label,
          iconKey: preset.IconKey,
          onDoubleClick: () => {
            setSelectedNodeId(id);

            onNodeSelect?.(id);
          },
        },
      },
    ]);
    
    setSelectedNodeId(id);
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
  
  return (
    <WorkspacePanelTemplate
      bank={<WorkspacePanelBank presets={WorkspaceManager.Presets} />}
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
