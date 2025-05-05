// components/organisms/inspectors/SurfaceInspector.tsx
import { useLiveStats } from '../../../../src/hooks/useLiveStats.ts';
import { InspectorBase } from './InspectorBase.tsx';
import { TabbedPanel } from '../../molecules/TabbedPanel.tsx';
import { SurfaceManagementForm } from '../../molecules/SurfaceManagementForm.tsx';
import { InspectorCommonProps } from '../InspectorPanel.tsx';
import { EaCSurfaceDetails } from '../../../../src/eac/EaCSurfaceDetails.ts';
import { SurfaceStats } from '../renderers/SurfaceNodeRenderer.tsx';

type SurfaceInspectorProps = InspectorCommonProps<
  EaCSurfaceDetails,
  SurfaceStats
>;

function SurfaceAnalyticsTab() {
  return (
    <p class="text-sm text-neutral-300">
      📈 Surface-level analytics will appear here.
    </p>
  );
}

function SurfaceStreamTab() {
  return (
    <p class="text-sm text-neutral-300">
      📡 Impulses received and routed on this surface.
    </p>
  );
}

export function SurfaceInspector({
  details,
  enabled,
  getStats,
  onDetailsChanged,
}: SurfaceInspectorProps) {
  const stats = useLiveStats(getStats);

  return (
    <InspectorBase
      iconKey="surface"
      label={details.Name}
      enabled={enabled}
      impulseRates={stats?.impulseRates ?? []}
      yMin={5}
      yMax={20}
      onToggleEnabled={(val) => onDetailsChanged({ Enabled: val })}
      onDelete={() => console.log('🗑️ TODO: Delete surface node')}
    >
      <TabbedPanel
        initialTab="settings"
        class="mt-2"
        tabs={[
          {
            key: 'settings',
            label: 'Settings',
            content: (
              <SurfaceManagementForm
                details={details}
                onChange={onDetailsChanged}
              />
            ),
          },
          {
            key: 'analytics',
            label: 'Analytics',
            content: <SurfaceAnalyticsTab />,
          },
          {
            key: 'stream',
            label: 'Impulse Stream',
            content: <SurfaceStreamTab />,
          },
        ]}
      />
    </InspectorBase>
  );
}
