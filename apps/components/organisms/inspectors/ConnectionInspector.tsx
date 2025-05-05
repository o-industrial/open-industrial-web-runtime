import { useLiveStats } from '../../../../src/hooks/useLiveStats.ts';
import { InspectorBase } from './InspectorBase.tsx';
import { TabbedPanel } from '../../molecules/TabbedPanel.tsx';
import { ConnectionManagementForm } from '../../molecules/ConnectionManagementForm.tsx';
import { ConnectionNodeData } from '../../../../src/flow/types/ConnectionNodeData.tsx';
import { InspectorCommonProps } from '../InspectorPanel.tsx';

export const CONNECTION_DETAILS: Record<
  string,
  { name: string; description: string; details: Record<string, string> }
> = {
  iothub: {
    name: 'Azure IoT Hub',
    description: 'Cloud-to-device messaging and telemetry for Azure-connected devices.',
    details: {
      Endpoint: 'mqtts://iothub.azure.net',
      Port: '8883',
      Protocol: 'MQTT over TLS',
      Auth: 'SAS Token',
    },
  },
  rest: {
    name: 'REST API',
    description: 'Push or pull data via standard HTTP endpoints.',
    details: {
      BaseURL: 'https://api.yourdomain.com/data',
      Method: 'POST / PUT',
      Headers: 'Authorization, Content-Type',
    },
  },
  mqtt: {
    name: 'MQTT Broker',
    description: 'Lightweight publish/subscribe messaging protocol.',
    details: {
      Broker: 'mqtt://broker.example.com',
      Port: '1883 / 8883',
      Auth: 'Username / Password',
    },
  },
  opcua: {
    name: 'OPC UA Server',
    description: 'Industrial automation server using OPC Unified Architecture.',
    details: {
      Endpoint: 'opc.tcp://localhost:4840',
      Security: 'Basic256Sha256',
    },
  },
  modbus: {
    name: 'MODBus RTU',
    description: 'Serial communication protocol used in OT networks.',
    details: {
      Interface: 'RS485',
      BaudRate: '9600',
      Parity: 'Even',
    },
  },
  etherlink: {
    name: 'EtherLink Device',
    description: 'Custom Ethernet protocol used in proprietary equipment.',
    details: {
      Interface: 'eth0',
      IP: '192.168.1.100',
      Protocol: 'UDP Binary Frame',
    },
  },
};

export function ConnectionInfoPanel({ types }: { types: string[]; }) {
  const enabled = types.map((key) => CONNECTION_DETAILS[key]).filter(Boolean);

  if (!enabled.length) {
    return (
      <p class="text-sm text-neutral-400 italic">
        No connection types enabled.
      </p>
    );
  }

  return (
    <div class="space-y-6">
      {enabled.map((info) => (
        <div key={info.name} class="bg-neutral-800 border border-neutral-700 rounded p-4">
          <h4 class="text-sm font-semibold text-white mb-1">{info.name}</h4>
          <p class="text-xs text-neutral-400 mb-2">{info.description}</p>
          <ul class="text-xs text-neutral-300 space-y-1">
            {Object.entries(info.details).map(([key, val]) => (
              <li key={key} class="flex justify-between">
                <span class="text-neutral-400">{key}</span>
                <span class="font-mono">{val}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

type ConnectionInspectorProps = InspectorCommonProps<ConnectionNodeData>;

export function ConnectionInspector({
  settings,
  onSettingsChanged,
}: ConnectionInspectorProps) {
  const stats = useLiveStats(settings.stats, settings.getStats);
  const impulseRates = stats.impulseRates ?? [];

  return (
    <InspectorBase
      iconKey="connection"
      label={settings.label}
      enabled={settings.enabled}
      impulseRates={impulseRates}
      onToggleEnabled={(enabled) => onSettingsChanged({ enabled })}
      onDelete={() => console.log('🗑️ Delete connection node')}
    >
      <TabbedPanel
        initialTab="settings"
        class="mt-2"
        tabs={[
          {
            key: 'settings',
            label: 'Settings',
            content: (
              <ConnectionManagementForm
                initial={settings}
                onSave={onSettingsChanged}
              />
            ),
          },
          {
            key: 'connection',
            label: 'Connection Info',
            content: (
              <ConnectionInfoPanel types={settings.connectionTypes ?? []} />
            ),
          },
          {
            key: 'analytics',
            label: 'Analytics',
            content: (
              <p class="text-sm text-neutral-300">
                📈 Connection analytics will appear here.
              </p>
            ),
          },
          {
            key: 'stream',
            label: 'Impulse Stream',
            content: (
              <p class="text-sm text-neutral-300">
                📡 Live impulse logs and stream filtering.
              </p>
            ),
          },
        ]}
      />
    </InspectorBase>
  );
}
