import { Node } from 'reactflow';
import { useLiveStats } from '../../../../src/hooks/useLiveStats.ts';
import { NodeStatTile } from '../../atoms/NodeStatTile.tsx';
import { LinePreviewWithValue } from '../../molecules/LinePreviewWithValue.tsx';
import { InspectorBase } from './InspectorBase.tsx';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';

export function AgentInspector({ node }: { node: Node }) {
  const stats = useLiveStats(node.data.stats, node.data.getStats);

  return (
    <InspectorBase iconKey="agent" label="Agent Node">
      <LinePreviewWithValue
        label="Impulse Rate"
        values={stats.impulseRates ?? []}
        intent={IntentTypes.Tertiary}
      />
      <NodeStatTile label="Matches" value={stats.matchesHandled} />
      <NodeStatTile label="Avg Latency" value={`${stats.avgLatencyMs}ms`} />
    </InspectorBase>
  );
}
