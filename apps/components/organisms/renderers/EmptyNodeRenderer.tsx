import { NodeProps, Position } from 'reactflow';
import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';
import NodeHandle from '../../atoms/NodeHandle.tsx';
import { useLiveStats } from '../../../../src/hooks/useLiveStats.ts';
import { FlowNodeData } from '../../../../src/flow/types/react/FlowNodeData.ts';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { LinePreviewWithValue } from '../../molecules/LinePreviewWithValue.tsx';
import { EaCVertexDetails } from '@fathym/eac';

type EmptyStats = {
  impulseRates?: number[];
};

export type EmptyNodeData = FlowNodeData<EaCVertexDetails, EmptyStats>;

export default function EmptyNodeRenderer({ data }: NodeProps<EmptyNodeData>) {
  if (!data || !data.getStats) return null;

  const stats = useLiveStats(data.getStats);
  const impulses = stats?.impulseRates ?? [];
  const latest = impulses.at(-1);

  return (
    <WorkspaceNodeRendererBase
      iconKey='empty'
      label={data.label}
      onDoubleClick={data.onDoubleClick}
      isSelected={data.isSelected}
      class='data-[state=expanded]:w-[300px] data-[state=expanded]:h-auto data-[state=expanded]:rounded-md'
      preMain={
        <NodeHandle
          type='target'
          position={Position.Left}
          intentType={IntentTypes.None}
        />
      }
      postMain={
        <NodeHandle
          type='source'
          position={Position.Right}
          intentType={IntentTypes.None}
        />
      }
    >
      {impulses.length > 1
        ? (
          <LinePreviewWithValue
            label='Impulse'
            values={impulses}
            currentValue={latest}
            intent={IntentTypes.None}
            yMin={0}
            yMax={15}
          />
        )
        : <div class='text-sm text-gray-500 italic p-2'>Idle</div>}
    </WorkspaceNodeRendererBase>
  );
}
