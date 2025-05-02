import { Node } from 'reactflow';
import { useState } from 'preact/hooks';
import { useLiveStats } from '../../../../src/hooks/useLiveStats.ts';
import { InspectorBase } from './InspectorBase.tsx';
import { Input } from '../../atoms/forms/Input.tsx';
import { Action, ActionStyleTypes } from '../../atoms/Action.tsx';
import { TabbedPanel } from '../../molecules/TabbedPanel.tsx';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';

export function SurfaceSettingsTab({
  label,
  setLabel,
  onSave,
}: {
  label: string;
  setLabel: (val: string) => void;
  onSave: () => void;
}) {
  return (
    <div class='space-y-3 pt-2'>
      <Input label='Surface Name' value={label} onInput={setLabel} />
      <Action
        class='text-sm'
        styleType={ActionStyleTypes.Solid | ActionStyleTypes.Thin}
        intentType={IntentTypes.Primary}
        onClick={onSave}
      >
        Save Changes
      </Action>
    </div>
  );
}

export function SurfaceAnalyticsTab() {
  return (
    <p class='text-sm text-neutral-300'>
      📈 Surface-level analytics will appear here.
    </p>
  );
}

export function SurfaceStreamTab() {
  return (
    <p class='text-sm text-neutral-300'>
      📡 Impulses received and routed on this surface.
    </p>
  );
}

export function SurfaceInspector({ node }: { node: Node }) {
  const stats = useLiveStats(node.data.stats, node.data.getStats);
  const impulseRates = stats.impulseRates ?? [];

  const [label, setLabel] = useState(node.data.label ?? '');
  const [enabled, setEnabled] = useState(node.data.enabled ?? true);

  const handleSave = () => {
    node.data.label = label;
    node.data.enabled = enabled;
    console.log('Updated surface node:', node);
  };

  return (
    <InspectorBase
      iconKey='surface'
      label={label}
      enabled={enabled}
      impulseRates={impulseRates}
      yMin={5}
      yMax={20}
      onToggleEnabled={setEnabled}
      onDelete={() => console.log('Delete surface')}
    >
      <TabbedPanel
        initialTab='settings'
        class='mt-2'
        tabs={[
          {
            key: 'settings',
            label: 'Settings',
            content: (
              <SurfaceSettingsTab
                label={label}
                setLabel={setLabel}
                onSave={handleSave}
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
