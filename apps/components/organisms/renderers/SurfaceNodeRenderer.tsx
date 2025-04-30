import { Handle, Position, NodeProps } from 'reactflow';
import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';

export type SurfaceNodeData = {
  label: string;
  type: string;
  isSelected: boolean;
  onDoubleClick?: () => void;
};

/**
 * SurfaceNodeRenderer
 *
 * Visualizes a UI surface (e.g. dashboard, map, chart).
 * May grow larger in future; currently styled similarly to base.
 */
export default function SurfaceNodeRenderer({
  data,
}: NodeProps<SurfaceNodeData>) {
  if (!data) return null;

  return (
    <WorkspaceNodeRendererBase
      iconKey="surface"
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
