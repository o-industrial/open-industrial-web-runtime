import { NodeProps, Position } from 'reactflow';
import { useMemo } from 'preact/hooks';

import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';
import NodeHandle from '../../atoms/NodeHandle.tsx';
import { IntentTypes } from '@o-industrial/common/types';
import { Action, ActionStyleTypes } from '../../atoms/Action.tsx';

import { LinePreviewWithValue } from '../../molecules/LinePreviewWithValue.tsx';
import { NodeStatTile } from '../../atoms/NodeStatTile.tsx';
import { parseTimeAgoString } from '../../../../src/utils/parseTimeAgoString.tsx';

import { FlowNodeData } from '../../../../src/flow/types/react/FlowNodeData.ts';
import { EaCSimulatorDetails } from '@o-industrial/common/eac';

export type SimulatorStats = {
  impulseRates?: number[];
  instanceCount?: number;
  avgStartupMs?: number;
  lastDeploymentAt?: string;
};

export type SimulatorNodeData = FlowNodeData<EaCSimulatorDetails, SimulatorStats>;

export default function SimulatorNodeRenderer({
  data,
}: NodeProps<SimulatorNodeData>) {
  const stats = data.useStats();
  const {
    impulseRates = [],
    instanceCount = 0,
    avgStartupMs = 0,
    lastDeploymentAt = '—',
  } = stats || {};

  const lastDeployAge = useMemo(
    () => parseTimeAgoString(lastDeploymentAt),
    [lastDeploymentAt],
  );
  const currentRate = impulseRates.at(-1);

  return (
    <WorkspaceNodeRendererBase
      iconKey='simulator'
      label={data.label}
      enabled={data.enabled}
      onDoubleClick={data.onDoubleClick}
      isSelected={data.isSelected}
      class='data-[state=expanded]:w-[300px] data-[state=expanded]:h-auto data-[state=expanded]:rounded-md'
      // preMain={
      //   <NodeHandle
      //     type="target"
      //     position={Position.Left}
      //     intentType={IntentTypes.Secondary}
      //   />
      // }
      postMain={
        <NodeHandle
          type='source'
          position={Position.Right}
          intentType={IntentTypes.Secondary}
        />
      }
    >
      <div class='w-full flex flex-col gap-2 items-center justify-center py-2 px-2'>
        {/* Stat Tiles */}
        <div class='w-full flex justify-between gap-2 px-2'>
          <NodeStatTile
            label='Instances'
            value={instanceCount}
            intent={IntentTypes.Tertiary}
          />
          <NodeStatTile
            label='Startup'
            value={`${avgStartupMs}ms`}
            intent={IntentTypes.Warning}
          />
          <NodeStatTile
            label='Last Deploy'
            value={lastDeploymentAt}
            intent={lastDeployAge > 60 ? IntentTypes.Error : IntentTypes.Secondary}
            animate={lastDeployAge > 60}
          />
        </div>

        {/* Impulse Rate Preview */}
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

        {/* Footer Actions */}
        <div class='flex justify-end gap-2 w-full mt-1 px-2'>
          <Action
            title='Open Simulator Settings'
            styleType={ActionStyleTypes.Icon}
            intentType={IntentTypes.Info}
            onClick={() => console.log('Open simulator settings:', data.label)}
          >
            <svg class='w-6 h-6' viewBox='0 0 24 24' fill='none'>
              <path
                d='M3 12h18M3 6h18M3 18h18'
                stroke='currentColor'
                stroke-width='2'
              />
            </svg>
          </Action>
        </div>
      </div>
    </WorkspaceNodeRendererBase>
  );
}
