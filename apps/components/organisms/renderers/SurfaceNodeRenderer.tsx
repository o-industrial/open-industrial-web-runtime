import { Position, NodeProps } from 'reactflow';
import { useMemo } from 'preact/hooks';
import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';
import NodeHandle from '../../atoms/NodeHandle.tsx';
import { Action, ActionStyleTypes } from '../../atoms/Action.tsx';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { useLiveStats } from '../../../../src/hooks/useLiveStats.ts';
import { FlowNodeData } from '../../../../src/managers/FlowNodeData.ts';
import { NodeStatTile } from '../../atoms/NodeStatTile.tsx';
import { LineSparkSVG } from '../../atoms/LineSparkSVG.tsx';
import { LinePreviewWithValue } from '../../molecules/LinePreviewWithValue.tsx';

export type SurfaceStats = {
  impulseRates?: number[];
  inputCount?: number;
  agentCount?: number;
  lastSignalAt?: string;
};

export type SurfaceNodeData = FlowNodeData<SurfaceStats>;

function parseLastSignalToSeconds(value: string): number {
  const seconds = parseInt(value.replace(/[^\d]/g, ''), 10);
  return isNaN(seconds) ? 0 : seconds;
}

export default function SurfaceNodeRenderer({
  data,
}: NodeProps<SurfaceNodeData>) {
  if (!data) return null;

  const stats = useLiveStats(data.stats, data.getStats);
  const impulseRates = stats.impulseRates ?? [];
  const inputCount = stats.inputCount ?? 0;
  const agentCount = stats.agentCount ?? 0;
  const lastSignalAt = stats.lastSignalAt ?? '—';
  const lastSignalAge = useMemo(
    () => parseLastSignalToSeconds(lastSignalAt),
    [lastSignalAt]
  );

  const currentRate = impulseRates.at(-1);

  const classes = `
    transition-[width,height,border-radius,border-color,background-color]
    data-[state=expanded]:w-[300px] data-[state=expanded]:h-auto data-[state=expanded]:rounded-md
  `;

  return (
    <WorkspaceNodeRendererBase
      iconKey="surface"
      label={data.label}
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
      // postMain={
      //   <NodeHandle
      //     type="source"
      //     position={Position.Right}
      //     intentType={IntentTypes.Secondary}
      //   />
      // }
    >
      <div class="w-full flex flex-col gap-2 items-center justify-center py-2 px-2">
        {/* Rate Row */}
        {impulseRates.length > 1 ? (
          <LinePreviewWithValue
            label="Rate"
            values={impulseRates}
            currentValue={currentRate}
            intent={IntentTypes.Tertiary}
            yMin={5}
            yMax={20}
          />
        ) : (
          <div class="text-sm text-gray-400 italic mb-2">No live rate data</div>
        )}

        {/* Stat Trio */}
        <div class="w-full flex justify-between mt-2 mb-2 gap-2">
          <NodeStatTile
            label="Inputs"
            value={inputCount}
            intent={IntentTypes.Tertiary}
          />
          <NodeStatTile
            label="Agents"
            value={agentCount}
            intent={IntentTypes.Secondary}
          />
          <NodeStatTile
            label="Last Signal"
            value={lastSignalAt}
            intent={
              lastSignalAge > 60 ? IntentTypes.Error : IntentTypes.Primary
            }
            animate={lastSignalAge > 60}
          />
        </div>

        {/* Footer Actions */}
        <div class="flex justify-end gap-2 w-full mt-1 px-2">
          <Action
            title="Manage Surface"
            styleType={ActionStyleTypes.Icon}
            intentType={IntentTypes.Info}
            onClick={() => console.log('Open surface panel:', data.label)}
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18V5l12-2v13"
                stroke="currentColor"
                stroke-width="2"
              />
              <path d="M3 6v13l12 2V8" stroke="currentColor" stroke-width="2" />
            </svg>
          </Action>

          {/* <Action
            title="Test Signal"
            styleType={ActionStyleTypes.Icon}
            intentType={IntentTypes.Tertiary}
            onClick={() => console.log('Trigger signal test on:', data.label)}
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M13 4L3 14h9v6l10-10h-9z"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
          </Action> */}
        </div>
      </div>
    </WorkspaceNodeRendererBase>
  );
}
