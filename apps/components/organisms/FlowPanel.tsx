import { JSX } from 'preact';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import { IS_BROWSER } from '@fathym/atomic';

import FlowPanelTemplate from '../templates/FlowPanelTemplate.tsx';
import FlowPanelBank from './FlowPanelBank.tsx';
import { LoadingSpinner } from '../atoms/LoadingSpinner.tsx';
import { IntentTypes } from '../../../src/types/IntentTypes.ts';
import { FlowManager } from '../../../src/flow/FlowManager.ts';

export const IsIsland = true;

type FlowPanelProps = {
  flowMgr: FlowManager;
};

function FlowPanel({ flowMgr }: FlowPanelProps) {
  const { screenToFlowPosition } = useReactFlow();

  const {
    nodes,
    edges,
    presets,
    nodeTypes,
    onNodesChange,
    onEdgesChange,
    handleDrop,
    handleConnect,
    handleNodeClick,
  } = flowMgr.Use();

  return (
    <FlowPanelTemplate
      bank={<FlowPanelBank presets={presets} />}
      canvas={
        <div
          class="absolute inset-0 w-full h-full"
          onDrop={(e) => handleDrop(e, screenToFlowPosition)}
          onDragOver={(e) => e.preventDefault()}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={handleConnect}
            onNodeClick={handleNodeClick}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.3}
            maxZoom={4}
            defaultZoom={1.25}
          >
            <Background />
            <Controls position="bottom-left" />
            <MiniMap
              nodeColor={(node: Node) => {
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
  if (!IS_BROWSER) {
    return <LoadingSpinner intentType={IntentTypes.Primary} />;
  }

  return (
    <ReactFlowProvider>
      <FlowPanel {...props} />
    </ReactFlowProvider>
  );
}
