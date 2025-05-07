import { NodeStatTile } from '../../atoms/NodeStatTile.tsx';
import { InspectorBase } from './InspectorBase.tsx';
import { InspectorCommonProps } from '../InspectorPanel.tsx';
import { AgentStats } from '../../../../src/flow/types/AgentStats.tsx';
import { EaCAgentDetails } from '@o-industrial/common/eac';

type AgentInspectorProps = InspectorCommonProps<EaCAgentDetails, AgentStats>;

export function AgentInspector({
  details,
  enabled,
  useStats,
  onDelete,
  onDetailsChanged: _onDetailsChanged,
  onToggleEnabled,
}: AgentInspectorProps) {
  const stats = useStats();

  return (
    <InspectorBase
      iconKey='agent'
      label={details.Name ?? 'Agent Node'}
      enabled={enabled}
      impulseRates={stats?.impulseRates ?? []}
      onToggleEnabled={onToggleEnabled}
      onDelete={onDelete}
    >
      <NodeStatTile label='Matches' value={stats?.matchesHandled || 0} />
      <NodeStatTile label='Avg Latency' value={`${stats?.avgLatencyMs}ms`} />
    </InspectorBase>
  );
}
