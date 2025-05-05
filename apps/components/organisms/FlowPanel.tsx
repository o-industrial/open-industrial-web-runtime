import {
  Background,
  MiniMap,
  Node,
  Edge,
  EdgeChange,
  NodeChange,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  Connection,
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
  onShowSimulatorLibrary?: () => void;
};

function FlowPanel({ flowMgr, onShowSimulatorLibrary }: FlowPanelProps) {
  const [showMap, setShowMap] = useState(true);
  const { screenToFlowPosition } = useReactFlow();

  const { nodes, edges } = flowMgr.UseGraphView();
  const {
    handleDrop,
    handleConnect,
    handleNodeClick,
    handleNodesChange,
    handleEdgesChange,
  } = flowMgr.UseInteraction();
  const { presets, nodeTypes } = flowMgr.UseUIContext();

  console.log('🎨 FlowPanel render triggered');
  console.log('🧩 Current graph state:', {
    nodeCount: nodes.length,
    edgeCount: edges.length,
    nodeKeys: nodes.map((n) => n.id),
    edgeKeys: edges.map((e) => e.id),
  });

  return (
    <FlowPanelTemplate
      bank={<FlowPanelBank presets={presets} />}
      systemControls={
        <SystemControls onOpenSimulatorLibrary={onShowSimulatorLibrary} />
      }
      canvas={
        <div
          class="absolute inset-0 w-full h-full"
          onDrop={(e) => {
            console.log('📥 Drop event received');
            handleDrop(e, screenToFlowPosition);
          }}
          onDragOver={(e) => {
            console.log('🛸 DragOver event');
            e.preventDefault();
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={(changes: NodeChange[], nodes: Node[]) => {
              console.log('🔧 Node changes:', changes);
              handleNodesChange(changes, nodes);
            }}
            onEdgesChange={(changes: EdgeChange[], edges: Edge[]) => {
              console.log('🔗 Edge changes:', changes);
              handleEdgesChange(changes, edges);
            }}
            onConnect={(conn: Connection) => {
              console.log('🔌 Connect triggered:', conn);
              handleConnect(conn);
            }}
            onNodeClick={(e: unknown, node: Node) => {
              console.log('🖱️ Node click:', node.id);
              handleNodeClick(e, node);
            }}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.3}
            maxZoom={4}
            defaultZoom={1.25}
          >
            <Background />

            <div class="absolute bottom-4 right-4 z-20 pointer-events-none flex flex-col items-end gap-2">
              {showMap && (
                <div class="pointer-events-auto rounded-md border border-neutral-700 bg-neutral-900/90 backdrop-blur-md shadow-lg">
                  <MiniMap
                    nodeColor={(node: Node) => {
                      const status = node.data?.status;
                      const color =
                        status === 'error'
                          ? '#F43F5E'
                          : status === 'warning'
                          ? '#EAB308'
                          : '#06B6D4';

                      console.log(`🗺️ MiniMap color for ${node.id}: ${color}`);
                      return color;
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
                <FlowControls
                  showMap={showMap}
                  onToggleMap={(val) => {
                    console.log('🧭 Toggling MiniMap:', val);
                    setShowMap(val);
                  }}
                />
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
    console.log('🚫 FlowPanel rendering skipped (not browser)');
    return <LoadingSpinner intentType={IntentTypes.Primary} />;
  }

  console.log('🌐 Rendering WrappedFlowPanel in browser');

  return (
    <ReactFlowProvider>
      <FlowPanel {...props} />
    </ReactFlowProvider>
  );
}
