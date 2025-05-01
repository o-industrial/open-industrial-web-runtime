import { Node } from 'reactflow';
import { WorkspaceNodeData } from '../../../src/managers/WorkspaceNodeData.ts';
import InspectorPanelTemplate from '../templates/InspectorPanelTemplate.tsx';

import { AgentInspector } from './inspectors/AgentInspector.tsx';
import { ConnectionInspector } from './inspectors/ConnectionInspector.tsx';

type InspectorPanelProps = {
  selectedNode: Node<WorkspaceNodeData> | null;
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
        No node selected. Click a node to inspect.
      </div>
    );
  }

  return (
    <InspectorPanelTemplate onClose={onClose}>
      {inspectorContent}
    </InspectorPanelTemplate>
  );
}
