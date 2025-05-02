import { NodeProps, Position } from 'reactflow';
import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';
import NodeHandle from '../../atoms/NodeHandle.tsx';
import { Action, ActionStyleTypes } from '../../atoms/Action.tsx';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { TriggerMatchIcon } from '../../../../build/iconset/icons/TriggerMatchIcon.tsx';
import { DeleteIcon } from '../../../../build/iconset/icons/DeleteIcon.tsx';
import { useLiveStats } from '../../../../src/hooks/useLiveStats.ts';
import { FlowNodeData } from '../../../../src/flow/FlowNodeData.ts';
import { LinePreviewWithValue } from '../../molecules/LinePreviewWithValue.tsx';

type ConnectionStats = {
  impulseRates?: number[];
};

export type ConnectionNodeData = FlowNodeData<ConnectionStats>;

export default function ConnectionNodeRenderer({
  data,
}: NodeProps<ConnectionNodeData>) {
  if (!data) return null;

  const stats = useLiveStats(data.stats, data.getStats);
  const impulses = stats.impulseRates ?? [];
  const latest = impulses.at(-1);

  const classes = `
    transition-[width,height,border-radius,border-color,background-color]
    data-[state=expanded]:w-[300px] data-[state=expanded]:h-auto data-[state=expanded]:rounded-md
  `;

  return (
    <WorkspaceNodeRendererBase
      iconKey='connection'
      label={data.label}
      onDoubleClick={data.onDoubleClick}
      isSelected={data.isSelected}
      class={classes}
      postMain={
        <NodeHandle
          type='source'
          position={Position.Right}
          intentType={IntentTypes.Tertiary}
        />
      }
    >
      <div class='w-full flex flex-col items-center justify-center py-2 px-2'>
        {/* Rate Line + Stat */}
        {impulses.length > 1
          ? (
            <LinePreviewWithValue
              label='Rate'
              values={impulses}
              currentValue={latest}
              intent={IntentTypes.Warning}
              yMin={15}
              yMax={30}
            />
          )
          : <div class='text-sm text-gray-400 italic mb-2'>No live rate data</div>}

        {/* Footer Actions */}
        <div class='flex justify-end gap-2 w-full mt-1 px-2'>
          <Action
            title='Filter Stream'
            styleType={ActionStyleTypes.Icon}
            intentType={IntentTypes.Tertiary}
            onClick={() => console.log('Filter stream for:', data.label)}
          >
            <TriggerMatchIcon class='w-4 h-4' />
          </Action>

          <Action
            title='Delete Connection'
            styleType={ActionStyleTypes.Icon}
            intentType={IntentTypes.Error}
            onClick={() => console.log('Delete node:', data.label)}
          >
            <DeleteIcon class='w-4 h-4' />
          </Action>
        </div>
      </div>
    </WorkspaceNodeRendererBase>
  );
}
