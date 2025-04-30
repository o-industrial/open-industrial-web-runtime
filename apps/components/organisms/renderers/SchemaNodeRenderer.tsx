import { Handle, Position, NodeProps } from 'reactflow';
import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';

export type SchemaNodeData = {
  label: string;
  type: string;
  isSelected: boolean;
  onDoubleClick?: () => void;
};

/**
 * SchemaNodeRenderer
 *
 * Specialized node renderer for schema nodes.
 * Inherits from WorkspaceNodeRendererBase and overrides base visuals:
 * - Expands to a 150x300 square
 * - Removes rounded borders
 * - Supports animated transitions
 */
export default function SchemaNodeRenderer({
  data,
}: NodeProps<SchemaNodeData>) {
  if (!data) return null;

  const classes = `
    data-[state=expanded]:w-[300px] data-[state=expanded]:h-[150px] data-[state=expanded]:rounded-md
  `;

  return (
    <WorkspaceNodeRendererBase
      iconKey="schema"
      onDoubleClick={data.onDoubleClick}
      class={classes}
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
