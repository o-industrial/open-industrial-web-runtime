import { NodeProps, Position } from 'reactflow';
import WorkspaceNodeRendererBase from './WorkspaceNodeRendererBase.tsx';
import NodeHandle from '../../atoms/NodeHandle.tsx';
import { Action, ActionStyleTypes } from '../../atoms/Action.tsx';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { TriggerMatchIcon } from '../../../../build/iconset/icons/TriggerMatchIcon.tsx';
import { DeleteIcon } from '../../../../build/iconset/icons/DeleteIcon.tsx';
import { useLiveStats } from '../../../../src/hooks/useLiveStats.ts';
import { LinePreviewWithValue } from '../../molecules/LinePreviewWithValue.tsx';
import { DataConnectionNodeData } from '../../../../src/flow/types/DataConnectionNodeData.tsx';

export default function ConnectionNodeRenderer({
  data,
}: NodeProps<DataConnectionNodeData>) {
  if (!data || !data.getStats) return null;

  const stats = useLiveStats(data.getStats);

  const {
    impulseRates = [],
    connectionInfo = {},
  } = stats ?? {};

  const latest = impulseRates.at(-1);

  const classes = `
    transition-[width,height,border-radius,border-color,background-color]
    data-[state=expanded]:w-[300px] data-[state=expanded]:h-auto data-[state=expanded]:rounded-md
  `;

  return (
    <WorkspaceNodeRendererBase
      iconKey="connection"
      label={data.label}
      onDoubleClick={data.onDoubleClick}
      isSelected={data.isSelected}
      class={classes}
      preMain={
        <NodeHandle
          type="target"
          position={Position.Left}
          intentType={IntentTypes.Tertiary}
        />
      }
      postMain={
        <NodeHandle
          type="source"
          position={Position.Right}
          intentType={IntentTypes.Tertiary}
        />
      }
    >
      <div class="w-full flex flex-col items-center justify-center py-2 px-2 gap-2">
        {/* Live Impulse Rate Chart */}
        {impulseRates.length > 1 ? (
          <LinePreviewWithValue
            label="Rate"
            values={impulseRates}
            currentValue={latest}
            intent={IntentTypes.Warning}
            yMin={15}
            yMax={30}
          />
        ) : (
          <div class="text-sm text-gray-400 italic mb-2">No live rate data</div>
        )}

        {/* Optional Connection Info Preview */}
        {Object.keys(connectionInfo).length > 0 && (
          <div class="w-full border border-neutral-700 rounded p-2 bg-neutral-800">
            <h4 class="text-xs font-semibold text-white mb-1">Connection</h4>
            <ul class="text-xs text-neutral-300 space-y-1">
              {Object.entries(connectionInfo).map(([key, val]) => (
                <li key={key} class="flex justify-between">
                  <span class="text-neutral-400">{key}</span>
                  <span class="font-mono">{val}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer Actions */}
        <div class="flex justify-end gap-2 w-full mt-1 px-2">
          <Action
            title="Filter Stream"
            styleType={ActionStyleTypes.Icon}
            intentType={IntentTypes.Tertiary}
            onClick={() => console.log('Filter stream for:', data.label)}
          >
            <TriggerMatchIcon class="w-4 h-4" />
          </Action>

          <Action
            title="Delete Connection"
            styleType={ActionStyleTypes.Icon}
            intentType={IntentTypes.Error}
            onClick={() => console.log('Delete node:', data.label)}
          >
            <DeleteIcon class="w-4 h-4" />
          </Action>
        </div>
      </div>
    </WorkspaceNodeRendererBase>
  );
}
