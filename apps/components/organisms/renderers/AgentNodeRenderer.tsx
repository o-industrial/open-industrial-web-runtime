import { Handle, Position, NodeProps } from 'reactflow';
import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';

export type AgentNodeData = {
  label: string;
  type: string;
  isSelected: boolean;
  onDoubleClick?: () => void;
};

/**
 * AgentNodeRenderer
 *
 * Represents a live reflex agent.
 * Fully connectable with selection handling and dynamic transitions.
 */
export default function AgentNodeRenderer({ data }: NodeProps<AgentNodeData>) {
  if (!data) return null;

  return (
    <WorkspaceNodeRendererBase
      iconKey="agent" // 🧠 using the zap icon for agent (unless you want something custom)
      onDoubleClick={data.onDoubleClick}
      isSelected={data.isSelected}
      preMain={
        <Handle
          type="target"
          position={Position.Left}
          isConnectable
          className="!bg-white w-2 h-2 rounded-sm cursor-crosshair z-20"
          style={{ pointerEvents: 'auto' }}
        />
      }
      postMain={
        <Handle
          type="source"
          position={Position.Right}
          isConnectable
          className="!bg-white w-2 h-2 rounded-sm cursor-crosshair z-20"
          style={{ pointerEvents: 'auto' }}
        />
      }
    />
  );
}
