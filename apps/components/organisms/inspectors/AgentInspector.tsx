import { useLiveStats } from '../../../../src/hooks/useLiveStats.ts';
import { NodeStatTile } from '../../atoms/NodeStatTile.tsx';
import { LinePreviewWithValue } from '../../molecules/LinePreviewWithValue.tsx';
import { InspectorBase } from './InspectorBase.tsx';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { InspectorCommonProps } from '../InspectorPanel.tsx';
import { AgentStats } from '../../../../src/flow/types/AgentStats.tsx';
import { EaCAgentDetails } from '../../../../src/eac/EaCAgentDetails.ts';

type AgentInspectorProps = InspectorCommonProps<EaCAgentDetails, AgentStats>;

export function AgentInspector({
  details,
  enabled,
  getStats,
  onDetailsChanged,
}: AgentInspectorProps) {
  const stats = useLiveStats(getStats);

  return (
    <InspectorBase
      iconKey="agent"
      label={details.Name ?? 'Agent Node'}
      enabled={enabled}
      onToggleEnabled={(enabled) => onDetailsChanged({ Enabled: enabled })}
      onDelete={() => console.log('🗑️ TODO: Delete agent node')}
    >
      <LinePreviewWithValue
        label="Impulse Rate"
        values={stats?.impulseRates ?? []}
        intent={IntentTypes.Tertiary}
      />
      <NodeStatTile label="Matches" value={stats?.matchesHandled || 0} />
      <NodeStatTile label="Avg Latency" value={`${stats?.avgLatencyMs}ms`} />
    </InspectorBase>
  );
}
