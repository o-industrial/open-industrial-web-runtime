import { NodeProps, Position } from 'reactflow';
import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';
import NodeHandle from '../../atoms/NodeHandle.tsx';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { useLiveStats } from '../../../../src/hooks/useLiveStats.ts';
import { LinePreviewWithValue } from '../../molecules/LinePreviewWithValue.tsx';
import { FlowNodeData } from '../../../../src/flow/types/react/FlowNodeData.ts';
import { EaCVertexDetails } from '@fathym/eac';

export type DeviceStats = {
  impulseRates?: number[];
};

export type DeviceNodeData = FlowNodeData<EaCVertexDetails, DeviceStats>;

export default function DeviceNodeRenderer({
  data,
}: NodeProps<DeviceNodeData>) {
  if (!data || !data.getStats) return null;

  const stats = useLiveStats(data.getStats);
  const impulses = stats?.impulseRates ?? [];
  const latest = impulses.at(-1);

  return (
    <WorkspaceNodeRendererBase
      iconKey="device"
      label={data.label}
      onDoubleClick={data.onDoubleClick}
      isSelected={data.isSelected}
      class="data-[state=expanded]:w-[300px] data-[state=expanded]:h-auto data-[state=expanded]:rounded-md"
      preMain={
        <NodeHandle
          type="target"
          position={Position.Left}
          intentType={IntentTypes.Info}
        />
      }
      postMain={
        <NodeHandle
          type="source"
          position={Position.Right}
          intentType={IntentTypes.Info}
        />
      }
    >
      {impulses.length > 1 ? (
        <LinePreviewWithValue
          label="Impulse"
          values={impulses}
          currentValue={latest}
          intent={IntentTypes.Info}
          yMin={5}
          yMax={20}
        />
      ) : (
        <div class="text-sm text-gray-400 italic p-2">Awaiting data…</div>
      )}
    </WorkspaceNodeRendererBase>
  );
}
