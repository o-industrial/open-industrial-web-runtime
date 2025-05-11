import { NodeProps, Position } from 'reactflow';
import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';
import NodeHandle from '../../atoms/NodeHandle.tsx';
import { IntentTypes } from '@o-industrial/common/types';
import { FlowNodeData } from '../../../../src/flow/types/react/FlowNodeData.ts';
import { LinePreviewWithValue } from '../../molecules/LinePreviewWithValue.tsx';
import { EaCSchemaDetails } from '@o-industrial/common/eac';

type SchemaStats = {
  impulseRates?: number[];
};

export type SchemaNodeData = FlowNodeData<EaCSchemaDetails, SchemaStats>;

export default function SchemaNodeRenderer({
  data,
}: NodeProps<SchemaNodeData>) {
  const stats = data.useStats();
  const impulseRates = stats?.impulseRates ?? [];
  const latest = impulseRates.at(-1);

  return (
    <WorkspaceNodeRendererBase
      iconKey='schema'
      label={data.label}
      onDoubleClick={data.onDoubleClick}
      class='transition-[width,height,border-radius,border-color,background-color] data-[state=expanded]:w-[300px] data-[state=expanded]:h-auto data-[state=expanded]:rounded-md'
      isSelected={data.isSelected}
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
          intentType={IntentTypes.Secondary}
        />
      }
    >
      {impulseRates.length > 1
        ? (
          <LinePreviewWithValue
            label='Rate'
            values={impulseRates}
            currentValue={latest}
            intent={IntentTypes.Info}
            yMin={0}
            yMax={25}
          />
        )
        : <div class='text-sm text-gray-400 italic p-2'>No live rate data</div>}
    </WorkspaceNodeRendererBase>
  );
}
