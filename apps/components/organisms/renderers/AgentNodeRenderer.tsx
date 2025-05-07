import { NodeProps, Position } from 'reactflow';
import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';
import NodeHandle from '../../atoms/NodeHandle.tsx';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { NodeStatTile } from '../../atoms/NodeStatTile.tsx';
import { LinePreviewWithValue } from '../../molecules/LinePreviewWithValue.tsx';
import { parseTimeAgoString } from '../../../../src/utils/parseTimeAgoString.tsx';
import { AgentNodeData } from '../../../../src/flow/types/AgentNodeData.tsx';

export default function AgentNodeRenderer({ data }: NodeProps<AgentNodeData>) {
  const stats = data.useStats();

  const {
    impulseRates = [],
    matchesHandled = 0,
    avgLatencyMs = 0,
    lastRunAgo = '—',
  } = stats || {};

  const lastRunAge = parseTimeAgoString(lastRunAgo);
  const currentRate = impulseRates.at(-1);

  return (
    <WorkspaceNodeRendererBase
      iconKey='agent'
      label={data.label}
      onDoubleClick={data.onDoubleClick}
      isSelected={data.isSelected}
      class='data-[state=expanded]:w-[300px] data-[state=expanded]:h-auto data-[state=expanded]:rounded-md'
      preMain={
        <NodeHandle
          type='target'
          position={Position.Left}
          intentType={IntentTypes.Tertiary}
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
        {impulseRates.length > 1 && (
          <LinePreviewWithValue
            label='Rate'
            values={impulseRates}
            currentValue={currentRate}
            intent={IntentTypes.Tertiary}
            yMin={5}
            yMax={20}
          />
        )}

        <div class='w-full flex justify-between gap-2 px-2'>
          <NodeStatTile
            label='Matches'
            value={matchesHandled}
            intent={IntentTypes.Tertiary}
          />
          <NodeStatTile
            label='Latency'
            value={`${avgLatencyMs}ms`}
            intent={IntentTypes.Warning}
          />
          <NodeStatTile
            label='Last Run'
            value={lastRunAgo}
            intent={lastRunAge > 30 ? IntentTypes.Error : IntentTypes.Secondary}
            animate={lastRunAge > 30}
          />
        </div>
      </div>
    </WorkspaceNodeRendererBase>
  );
}
