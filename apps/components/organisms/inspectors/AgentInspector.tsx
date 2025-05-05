import { useLiveStats } from '../../../../src/hooks/useLiveStats.ts';
import { NodeStatTile } from '../../atoms/NodeStatTile.tsx';
import { LinePreviewWithValue } from '../../molecules/LinePreviewWithValue.tsx';
import { InspectorBase } from './InspectorBase.tsx';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { InspectorCommonProps } from '../InspectorPanel.tsx';
import { AgentNodeData } from '../renderers/AgentNodeRenderer.tsx';

type AgentInspectorProps = InspectorCommonProps<AgentNodeData>;

export function AgentInspector({
  settings,
  onSettingsChanged,
}: AgentInspectorProps) {
  const stats = useLiveStats(settings.stats, settings.getStats);

  return (
    <InspectorBase
      iconKey="agent"
      label={settings.label ?? 'Agent Node'}
      enabled={settings.enabled}
      onToggleEnabled={(val) => onSettingsChanged({ enabled: val })}
      onDelete={() => console.log('TODO: Delete agent node')}
    >
      <LinePreviewWithValue
        label="Impulse Rate"
        values={stats.impulseRates ?? []}
        intent={IntentTypes.Tertiary}
      />
      <NodeStatTile label="Matches" value={stats.matchesHandled || 0} />
      <NodeStatTile label="Avg Latency" value={`${stats.avgLatencyMs}ms`} />
    </InspectorBase>
  );
}
