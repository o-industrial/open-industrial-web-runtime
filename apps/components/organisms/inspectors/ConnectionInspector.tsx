import { useLiveStats } from '../../../../src/hooks/useLiveStats.ts';
import { InspectorBase } from './InspectorBase.tsx';
import { TabbedPanel } from '../../molecules/TabbedPanel.tsx';
import { ConnectionManagementForm } from '../../molecules/ConnectionManagementForm.tsx';
import { InspectorCommonProps } from '../InspectorPanel.tsx';
import { EaCDataConnectionDetails } from '@o-industrial/common/eac';
import { DataConnectionStats } from '../../../../src/flow/types/DataConnectionStats.ts';
import { ConnectionInfoPanel } from '../../atoms/ConnectionInfoPanel.tsx';
import { DataConnectionConfig } from '../../../../src/flow/types/DataConnectionConfig.ts';

type ConnectionInspectorProps = InspectorCommonProps<
  EaCDataConnectionDetails,
  DataConnectionStats,
  DataConnectionConfig
>;

export function ConnectionInspector({
  config,
  details,
  enabled,
  getStats,
  onDelete,
  onDetailsChanged,
  onToggleEnabled,
}: ConnectionInspectorProps) {
  const stats = useLiveStats(getStats);
  const ingestOptions = config?.ingestOptions ?? [];

  return (
    <InspectorBase
      iconKey='connection'
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
              <ConnectionManagementForm
                details={details}
                onChange={onDetailsChanged}
                ingestOptions={ingestOptions}
              />
            ),
          },
          {
            key: 'connection',
            label: 'Connection Info',
            content: <ConnectionInfoPanel connectionInfo={stats?.connectionInfo} />,
          },
          {
            key: 'analytics',
            label: 'Analytics',
            content: (
              <p class='text-sm text-neutral-300'>
                📈 Connection analytics will appear here.
              </p>
            ),
          },
          {
            key: 'stream',
            label: 'Impulse Stream',
            content: (
              <p class='text-sm text-neutral-300'>
                📡 Live impulse logs and stream filtering.
              </p>
            ),
          },
        ]}
      />
    </InspectorBase>
  );
}
