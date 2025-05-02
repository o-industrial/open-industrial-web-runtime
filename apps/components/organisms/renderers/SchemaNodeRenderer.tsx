import { NodeProps, Position } from 'reactflow';
import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';
import NodeHandle from '../../atoms/NodeHandle.tsx';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { useLiveStats } from '../../../../src/hooks/useLiveStats.ts';
import { FlowNodeData } from '../../../../src/flow/FlowNodeData.ts';
import { LinePreviewWithValue } from '../../molecules/LinePreviewWithValue.tsx';

type SchemaStats = {
  impulseRates?: number[];
};

export type SchemaNodeData = FlowNodeData<SchemaStats>;

export default function SchemaNodeRenderer({
  data,
}: NodeProps<SchemaNodeData>) {
  if (!data) return null;

  const stats = useLiveStats(data.stats, data.getStats);
  const impulseRates = stats.impulseRates ?? [];
  const latest = impulseRates.at(-1);

  const classes = `
    transition-[width,height,border-radius,border-color,background-color]
    data-[state=expanded]:w-[300px] data-[state=expanded]:h-auto data-[state=expanded]:rounded-md
  `;

  return (
    <WorkspaceNodeRendererBase
      iconKey="schema"
      label={data.label}
      onDoubleClick={data.onDoubleClick}
      class={classes}
      isSelected={data.isSelected}
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
        <div class="text-sm text-gray-400 italic p-2">No live rate data</div>
      )}
    </WorkspaceNodeRendererBase>
  );
}
