import { Handle, Position, NodeProps } from 'reactflow';
import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';

export type DeviceNodeData = {
  label: string;
  type: string;
  isSelected: boolean;
  onDoubleClick?: () => void;
};

/**
 * DeviceNodeRenderer
 *
 * Represents an edge or runtime-connected physical device.
 * Uses chip icon, fully connectable, styled with selection state.
 */
export default function DeviceNodeRenderer({ data }: NodeProps<DeviceNodeData>) {
  if (!data) return null;

  return (
    <WorkspaceNodeRendererBase
      iconKey="device"
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
