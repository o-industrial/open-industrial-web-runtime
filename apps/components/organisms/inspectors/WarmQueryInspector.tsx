import { InspectorBase } from './InspectorBase.tsx';
import { TabbedPanel } from '../../molecules/TabbedPanel.tsx';
import { WarmQueryManagementForm } from '../../molecules/WarmQueryManagementForm.tsx';
import { InspectorCommonProps } from '../../../../src/flow/types/nodes/InspectorCommonProps.ts';
import { EaCWarmQueryDetails } from '@o-industrial/common/eac';
import { WarmQueryStats } from '../../../../src/flow/types/nodes/warm-queries/WarmQueryStats.ts';

type WarmQueryInspectorProps = InspectorCommonProps<
  EaCWarmQueryDetails,
  WarmQueryStats
>;

function WarmQueryAnalyticsTab() {
  return (
    <p class='text-sm text-neutral-300'>
      📈 Warm query-level analytics will appear here.
    </p>
  );
}

function WarmQueryStreamTab() {
  return (
    <p class='text-sm text-neutral-300'>
      📡 Impulses received and routed on this warm query.
    </p>
  );
}

export function WarmQueryInspector({
  details,
  enabled,
  useStats,
  onDelete,
  onDetailsChanged,
  onToggleEnabled,
}: WarmQueryInspectorProps) {
  const stats = useStats();

  return (
    <InspectorBase
      iconKey='warmquery'
      label={details.Name}
      enabled={enabled}
      impulseRates={stats?.impulseRates ?? []}
      onToggleEnabled={onToggleEnabled}
      onDelete={onDelete}
    >
      <TabbedPanel
        initialTab='settings'
        class='mt-2'
        tabs={[
          {
            key: 'settings',
            label: 'Settings',
            content: (
              <WarmQueryManagementForm
                details={details}
                onChange={onDetailsChanged}
              />
            ),
          },
          {
            key: 'analytics',
            label: 'Analytics',
            content: <WarmQueryAnalyticsTab />,
          },
          {
            key: 'stream',
            label: 'Impulse Stream',
            content: <WarmQueryStreamTab />,
          },
        ]}
      />
    </InspectorBase>
  );
}
