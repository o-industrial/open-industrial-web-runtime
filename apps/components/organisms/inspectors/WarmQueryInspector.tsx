import { NodeStatTile } from '../../atoms/NodeStatTile.tsx';
import { InspectorBase } from './InspectorBase.tsx';
import { InspectorCommonProps } from '../../../../src/flow/types/nodes/InspectorCommonProps.ts';
import { AgentStats } from '../../../../src/flow/types/nodes/agents/AgentStats.tsx';
import { EaCWarmQueryDetails } from '@o-industrial/common/eac';

type WarmQueryInspectorProps = InspectorCommonProps<EaCWarmQueryDetails, WarmQueryStats>;

export function WarmQueryInspector({
  details,
  enabled,
  useStats,
  onDelete,
  onDetailsChanged: _onDetailsChanged,
  onToggleEnabled,
}: WarmQueryInspectorProps) {
  const stats = useStats();

  return (
    <InspectorBase
      iconKey="warmQuery"
      label={details.Name ?? 'Warm Query Node'}
      enabled={enabled}
      impulseRates={stats?.impulseRates ?? []}
      onToggleEnabled={onToggleEnabled}
      onDelete={onDelete}
    >
      <NodeStatTile label="Matches" value={stats?.matchesHandled || 0} />
      <NodeStatTile label="Avg Latency" value={`${stats?.avgLatencyMs}ms`} />
    </InspectorBase>
  );
}
