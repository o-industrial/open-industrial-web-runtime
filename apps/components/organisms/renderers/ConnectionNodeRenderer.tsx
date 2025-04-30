import { Handle, Position, NodeProps } from 'reactflow';
import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';

export type ConnectionNodeData = {
  label: string;
  type: string;
  isSelected: boolean;
  onDoubleClick?: () => void;
};

/**
 * ConnectionNodeRenderer
 *
 * Visualizes a connection-style node (e.g. data flow pipe or protocol).
 * Reuses base styling with subtle tweaks for visual identity.
 */
export default function ConnectionNodeRenderer({
  data,
}: NodeProps<ConnectionNodeData>) {
  if (!data) return null;

  return (
    <WorkspaceNodeRendererBase
      iconKey="connection"
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
