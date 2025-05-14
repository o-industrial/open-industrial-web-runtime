import { NodeProps, Position } from 'reactflow';
import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';
import NodeHandle from '../../atoms/NodeHandle.tsx';
import { IntentTypes } from '@o-industrial/common/types';
import { LinePreviewWithValue } from '../../molecules/LinePreviewWithValue.tsx';
import { Action, ActionStyleTypes } from '../../atoms/Action.tsx';
import { DeleteIcon } from '../../../../build/iconset/icons/DeleteIcon.tsx';
import { SchemaNodeData } from '../../../../src/flow/types/nodes/schemas/SchemaNodeData.tsx';

export default function SchemaNodeRenderer({
  data,
}: NodeProps<SchemaNodeData>) {
  const stats = data.useStats();
  const impulseRates = stats?.impulseRates ?? [];
  const latest = impulseRates.at(-1);

  const classes = `
    transition-[width,height,border-radius,border-color,background-color]
    data-[state=expanded]:w-[300px] data-[state=expanded]:h-auto data-[state=expanded]:rounded-md
  `;

  return (
    <WorkspaceNodeRendererBase
      iconKey="schema"
      label={data.label}
      enabled={data.enabled}
      onDoubleClick={data.onDoubleClick}
      isSelected={data.isSelected}
      class={classes}
      preMain={
        <NodeHandle
          type="target"
          position={Position.Left}
          intentType={IntentTypes.Secondary}
        />
      }
      postMain={
        <NodeHandle
          type="source"
          position={Position.Right}
          intentType={IntentTypes.Secondary}
        />
      }
    >
      <div class="w-full flex flex-col items-center justify-center py-2 px-2 gap-2">
        {/* Live Impulse Chart */}
        {impulseRates.length > 1 ? (
          <LinePreviewWithValue
            label="Rate"
            values={impulseRates}
            currentValue={latest}
            intent={IntentTypes.Info}
            yMin={0}
            yMax={25}
          />
        ) : (
          <div class="text-sm text-gray-400 italic mb-2">No live rate data</div>
        )}

        {/* Footer Actions */}
        <div class="flex justify-end gap-2 w-full mt-1 px-2">
          <Action
            title="Delete Schema"
            styleType={ActionStyleTypes.Icon}
            intentType={IntentTypes.Error}
            onClick={() => console.log('Delete schema:', data.label)}
          >
            <DeleteIcon class="w-6 h-6" />
          </Action>
        </div>
      </div>
    </WorkspaceNodeRendererBase>
  );
}
