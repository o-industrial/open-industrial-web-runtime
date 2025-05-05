import {
  Background,
  MiniMap,
  Node,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import { useState } from 'preact/hooks';
import { IS_BROWSER } from '@fathym/atomic';

import FlowPanelTemplate from '../templates/FlowPanelTemplate.tsx';
import FlowPanelBank from './FlowPanelBank.tsx';
import { LoadingSpinner } from '../atoms/LoadingSpinner.tsx';
import { IntentTypes } from '../../../src/types/IntentTypes.ts';
import { FlowManager } from '../../../src/flow/managers/FlowManager.ts';
import { FlowControls } from '../molecules/flows/FlowControls.tsx';
import { SystemControls } from '../molecules/flows/SystemControls.tsx';

export const IsIsland = true;

type FlowPanelProps = {
  flowMgr: FlowManager;

  // 👇 Surface-level UI triggers can be handled in page-level template
  onShowSimulatorLibrary?: () => void;
};

function FlowPanel({ flowMgr, onShowSimulatorLibrary }: FlowPanelProps) {
  const [showMap, setShowMap] = useState(true);
  const { screenToFlowPosition } = useReactFlow();

  const { nodes, edges, onNodesChange, onEdgesChange, refresh } =
    flowMgr.UseGraph();
  const { handleDrop, handleConnect, handleNodeClick } =
    flowMgr.UseInteraction(refresh);
  const { presets, nodeTypes } = flowMgr.UseUIContext();

  return (
    <FlowPanelTemplate
      bank={<FlowPanelBank presets={presets} />}
      systemControls={
        <SystemControls onOpenSimulatorLibrary={onShowSimulatorLibrary} />
      }
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

            {/* 🧭 Overlays inside flow context */}
            <div class="absolute bottom-4 right-4 z-20 pointer-events-none flex flex-col items-end gap-2">
              {showMap && (
                <div class="pointer-events-auto rounded-md border border-neutral-700 bg-neutral-900/90 backdrop-blur-md shadow-lg">
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
                </div>
              )}

              <div class="pointer-events-auto">
                <FlowControls showMap={showMap} onToggleMap={setShowMap} />
              </div>
            </div>
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
