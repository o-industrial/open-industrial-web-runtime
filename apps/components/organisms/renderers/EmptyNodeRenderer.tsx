import { Handle, Position, NodeProps } from 'reactflow';
import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';

export type EmptyNodeData = {
  label: string;
  type: string;
  isSelected: boolean;
  onDoubleClick?: () => void;
};

/**
 * EmptyNodeRenderer
 *
 * Minimal node used for placeholders, stubs, or visual gaps.
 * Default icon is a faint circle. Fully connectable.
 */
export default function EmptyNodeRenderer({
  data,
}: NodeProps<EmptyNodeData>) {
  if (!data) return null;

  return (
    <WorkspaceNodeRendererBase
      iconKey="empty"
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
