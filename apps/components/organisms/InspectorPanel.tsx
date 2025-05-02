import { Node } from 'reactflow';
import { FlowNodeData } from '../../../src/managers/FlowNodeData.ts';
import InspectorPanelTemplate from '../templates/InspectorPanelTemplate.tsx';

import { AgentInspector } from './inspectors/AgentInspector.tsx';
import { ConnectionInspector } from './inspectors/ConnectionInspector.tsx';
import { SurfaceInspector } from './inspectors/SurfaceInspector.tsx';

type InspectorPanelProps = {
  selectedNode: Node<FlowNodeData> | null;
  onClose?: () => void;
};

export default function InspectorPanel({
  selectedNode,
  onClose,
}: InspectorPanelProps) {
  let inspectorContent = null;

  if (selectedNode) {
    switch (selectedNode.type) {
      case 'agent':
        inspectorContent = <AgentInspector node={selectedNode} />;
        break;
      case 'connection':
        inspectorContent = <ConnectionInspector node={selectedNode} />;
        break;
      case 'surface':
        inspectorContent = <SurfaceInspector node={selectedNode} />;
        break;
      default:
        inspectorContent = (
          <div class="text-neutral-500 text-xs italic">
            No inspector available for <strong>{selectedNode.type}</strong>.
          </div>
        );
    }
  } else {
    inspectorContent = (
      <div class="text-neutral-500 text-xs italic">
        No node selected. Double click a node to inspect.
      </div>
    );
  }

  return (
    <InspectorPanelTemplate onClose={onClose}>
      {inspectorContent}
    </InspectorPanelTemplate>
  );
}
