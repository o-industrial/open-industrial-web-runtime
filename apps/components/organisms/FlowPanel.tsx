import {
  Background,
  Connection,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import { useState } from 'preact/hooks';
import { IS_BROWSER } from '@fathym/atomic';

import FlowPanelTemplate from '../templates/FlowPanelTemplate.tsx';
import FlowPanelBank from '../molecules/flows/FlowPanelBank.tsx';
import { LoadingSpinner } from '../atoms/LoadingSpinner.tsx';
import { IntentTypes } from '@o-industrial/common/types';
import { WorkspaceManager } from '../../../src/flow/managers/WorkspaceManager.ts';
import { FlowControls } from '../molecules/flows/FlowControls.tsx';
import { ManagementControls } from '../molecules/flows/ManagementControls.tsx';
import { SystemControls } from '../molecules/flows/SystemControls.tsx';
import { neonColors } from '../../../tailwind.config.ts';

export const IsIsland = true;

type FlowPanelProps = {
  workspaceMgr: WorkspaceManager;
  onShowSimulatorLibrary?: () => void;
};

function FlowPanel({
  workspaceMgr,
  onShowSimulatorLibrary,
}: FlowPanelProps) {
  const [showMap, setShowMap] = useState(true);
  const { screenToFlowPosition } = useReactFlow();

  const { nodes, edges } = workspaceMgr.UseGraphView();
  const {
    handleDrop,
    handleConnect,
    handleNodeClick,
    handleNodesChange,
    handleEdgesChange: _handleEdgesChange,
  } = workspaceMgr.UseInteraction();
  const { presets, nodeTypes } = workspaceMgr.UseUIContext();

  const history = workspaceMgr.UseHistory();

  return (
    <FlowPanelTemplate
      bank={<FlowPanelBank presets={presets} />}
      systemControls={<SystemControls onOpenSimulatorLibrary={onShowSimulatorLibrary} />}
      managementControls={
        <ManagementControls
          hasChanges={history.hasChanges}
          onUndo={history.canUndo ? history.undo : undefined}
          onRedo={history.canRedo ? history.redo : undefined}
          onCommit={history.commit}
          onRevert={history.revert}
          onFork={history.fork}
        />
      }
      canvas={
        <div
          class='absolute inset-0 w-full h-full'
          onDrop={(e) => {
            handleDrop(e, screenToFlowPosition);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={(changes: NodeChange[], nodes: Node[]) => {
              handleNodesChange(changes, nodes);
            }}
            onEdgesChange={(_changes: EdgeChange[], _edges: Edge[]) => {
              // handleEdgesChange(changes, edges); // Uncomment when logic is in place
            }}
            onConnect={(conn: Connection) => {
              handleConnect(conn);
            }}
            onNodeClick={(e: unknown, node: Node) => {
              handleNodeClick(e, node);
            }}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.3}
            maxZoom={4}
            defaultZoom={1.25}
          >
            <Background />

            <div class='absolute bottom-4 right-4 z-20 pointer-events-none flex flex-col items-end gap-2'>
              {showMap && (
                <div class='pointer-events-auto rounded-md border border-neutral-700 bg-neutral-900/90 backdrop-blur-md shadow-lg'>
                  <MiniMap
                    nodeColor={(node: Node) => {
                      const status = node.data?.status;
                      const color = status === 'error'
                        ? neonColors['neon-red']['500']
                        : status === 'warning'
                        ? neonColors['neon-yellow']['500']
                        : neonColors['neon-cyan']['500'];

                      return color;
                    }}
                    maskColor='rgba(0,0,0,0.2)'
                    style={{ borderRadius: '0.5rem' }}
                    className='-:!bg-neutral-800 -:!border -:!border-neutral-700'
                  />
                </div>
              )}

              <div class='pointer-events-auto'>
                <FlowControls
                  mapIntent={showMap ? IntentTypes.Info : IntentTypes.Tertiary}
                  showMap={showMap}
                  onToggleMap={setShowMap}
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
