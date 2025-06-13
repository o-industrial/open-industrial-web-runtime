import { NodeProps, Position } from 'reactflow';
import { useMemo } from 'preact/hooks';

import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';
import NodeHandle from '../../atoms/NodeHandle.tsx';
import { Action, ActionStyleTypes } from '../../atoms/Action.tsx';
import { IntentTypes } from '@o-industrial/common/types';
import { NodeStatTile } from '../../atoms/NodeStatTile.tsx';
import { LinePreviewWithValue } from '../../molecules/LinePreviewWithValue.tsx';

import { parseTimeAgoString } from '../../../../src/utils/parseTimeAgoString.tsx';
import { WarmQueryNodeData } from '../../../../src/flow/types/nodes/warm-queries/WarmQueryNodeData.ts';

export default function WarmQueryNodeRenderer({
  data,
  id,
}: NodeProps<WarmQueryNodeData>) {
  const stats = data.useStats();

  const impulseRates = stats?.impulseRates ?? [];
  const inputCount = stats?.inputCount ?? 0;
  const agentCount = stats?.agentCount ?? 0;
  const lastSignalAt = stats?.lastSignalAt ?? '—';
  const lastSignalAge = useMemo(
    () => parseTimeAgoString(lastSignalAt),
    [lastSignalAt],
  );
  const currentRate = impulseRates.at(-1);

  return (
    <WorkspaceNodeRendererBase
      iconKey='warmQuery'
      label={data.label}
      enabled={data.enabled}
      onDoubleClick={data.onDoubleClick}
      isSelected={data.isSelected}
      class='data-[state=expanded]:w-[300px] data-[state=expanded]:h-auto data-[state=expanded]:rounded-md'
      preMain={
        <NodeHandle
          type='target'
          position={Position.Left}
          intentType={IntentTypes.Secondary}
        />
      }
      postMain={
        <NodeHandle
          type='source'
          position={Position.Right}
          intentType={IntentTypes.Tertiary}
        />
      }
    >
      <div class='w-full flex flex-col gap-2 items-center justify-center py-2 px-2'>
        <div class='w-full flex justify-between mt-2 mb-2 gap-2'>
          <NodeStatTile
            label='Inputs'
            value={inputCount}
            intent={IntentTypes.Tertiary}
          />
          <NodeStatTile
            label='Agents'
            value={agentCount}
            intent={IntentTypes.Secondary}
          />
          <NodeStatTile
            label='Last Signal'
            value={lastSignalAt}
            intent={lastSignalAge > 60 ? IntentTypes.Error : IntentTypes.Primary}
            animate={lastSignalAge > 60}
          />
        </div>

        {impulseRates.length > 1
          ? (
            <LinePreviewWithValue
              label='Rate'
              values={impulseRates}
              currentValue={currentRate}
              intent={IntentTypes.Tertiary}
              yMin={5}
              yMax={20}
            />
          )
          : <div class='text-sm text-gray-400 italic mb-2'>No live rate data</div>}

        <div class='flex justify-end gap-2 w-full mt-1 px-2'>
          <Action
            title='Manage Warm Query'
            styleType={ActionStyleTypes.Icon}
            intentType={IntentTypes.Info}
            onClick={() => data.onNodeEvent?.({ Type: 'manage', NodeID: id })}
          >
            <svg class='w-6 h-6' viewBox='0 0 24 24' fill='none'>
              <path
                d='M9 18V5l12-2v13'
                stroke='currentColor'
                stroke-width='2'
              />
              <path d='M3 6v13l12 2V8' stroke='currentColor' stroke-width='2' />
            </svg>
          </Action>
        </div>
      </div>
    </WorkspaceNodeRendererBase>
  );
}
