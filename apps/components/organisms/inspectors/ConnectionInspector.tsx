import { Node } from 'reactflow';
import { useState } from 'preact/hooks';
import { useLiveStats } from '../../../../src/hooks/useLiveStats.ts';
import { LinePreviewWithValue } from '../../molecules/LinePreviewWithValue.tsx';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { Action, ActionStyleTypes } from '../../atoms/Action.tsx';
import { Input } from '../../atoms/Input.tsx';
import { SummaryRowWithAction } from '../../molecules/SummaryRowWithAction.tsx';
import { InspectorBase } from './InspectorBase.tsx';
import { MultiSelectCheckboxGroup } from '../../molecules/MultiSelectCheckboxGroup.tsx';
import { TabbedPanel } from '../../molecules/TabbedPanel.tsx';
import { Modal } from '../../molecules/Modal.tsx';
import { SimulatorLibraryModal } from '../simulators/SimulatorLibraryModal.tsx';
import { CheckboxRow } from '../../atoms/CheckboxRow.tsx';

const CONNECTION_DETAILS: Record<
  string,
  { name: string; description: string; details: Record<string, string> }
> = {
  iothub: {
    name: 'Azure IoT Hub',
    description:
      'Cloud-to-device messaging and telemetry for Azure-connected devices.',
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

export function ConnectionManagementForm({
  label,
  setLabel,
  connectionTypes,
  setConnectionTypes,
  onSave,
}: {
  label: string;
  setLabel: (val: string) => void;
  connectionTypes: string[];
  setConnectionTypes: (types: string[]) => void;
  onSave: () => void;
}) {
  const [showMarketplace, setShowMarketplace] = useState(false);

  const CONNECTION_TYPES = [
    { label: 'IoT Hub', value: 'iothub', enabled: true },
    { label: 'REST', value: 'rest', enabled: true },
    { label: 'MQTT', value: 'mqtt', enabled: false },
    { label: 'OPC UA', value: 'opcua', enabled: false },
    { label: 'MODBus', value: 'modbus', enabled: false },
    { label: 'EtherLink', value: 'etherlink', enabled: false },
  ];

  const simulator: { label: string } | undefined = undefined;

  return (
    <div class="space-y-3 pt-2">
      <Input label="Connection Label" value={label} onInput={setLabel} />

      <MultiSelectCheckboxGroup
        label="Connection Types"
        options={CONNECTION_TYPES}
        selected={connectionTypes}
        onChange={setConnectionTypes}
      />

      <SummaryRowWithAction
        label={simulator?.label ?? 'Select a simulator...'}
        actionLabel={simulator ? 'Change' : 'Browse'}
        onActionClick={() => setShowMarketplace(true)}
        intentType={IntentTypes.Info}
      />

      {showMarketplace && (
        <>
          <SimulatorLibraryModal
            onClose={() => setShowMarketplace(false)}
            onInstall={(_simId) => setShowMarketplace(false)}
          />

          <CheckboxRow
            label="Enable Sim"
            checked={false}
            disabled={false}
            onToggle={(next) => {}}
          />
        </>
      )}

      <Action
        class="text-sm"
        styleType={ActionStyleTypes.Solid | ActionStyleTypes.Thin}
        intentType={IntentTypes.Primary}
        onClick={onSave}
      >
        Save Changes
      </Action>
    </div>
  );
}

export function ConnectionInfoPanel({ types }: { types: string[] }) {
  const enabledInfo = types
    .map((key) => CONNECTION_DETAILS[key])
    .filter(Boolean);

  if (!enabledInfo.length) {
    return (
      <p class="text-sm text-neutral-400 italic">
        No connection types enabled.
      </p>
    );
  }

  return (
    <div class="space-y-6">
      {enabledInfo.map((info) => (
        <div
          key={info.name}
          class="bg-neutral-800 border border-neutral-700 rounded p-4"
        >
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

export function ConnectionInspector({ node }: { node: Node }) {
  const stats = useLiveStats(node.data.stats, node.data.getStats);
  const impulseRates = stats.impulseRates ?? [];
  const currentRate = impulseRates.at(-1) ?? null;

  const [label, setLabel] = useState(node.data.label ?? '');
  const [enabled, setEnabled] = useState(node.data.enabled ?? true);
  const [connectionTypes, setConnectionTypes] = useState<string[]>(
    node.data.connectionTypes ?? ['iothub']
  );

  const handleSave = () => {
    node.data.label = label;
    node.data.enabled = enabled;
    node.data.connectionTypes = connectionTypes;
    console.log('Updated node:', node);
  };

  return (
    <InspectorBase
      iconKey="connection"
      label={label}
      enabled={enabled}
      onToggleEnabled={setEnabled}
      onDelete={() => console.log('Delete node')}
    >
      <LinePreviewWithValue
        label="Impulse Rate"
        values={impulseRates}
        currentValue={currentRate}
        intent={IntentTypes.Warning}
        yMin={15}
        yMax={30}
      />

      <TabbedPanel
        initialTab="settings"
        tabs={[
          {
            key: 'settings',
            label: 'Settings',
            content: (
              <ConnectionManagementForm
                label={label}
                setLabel={setLabel}
                connectionTypes={connectionTypes}
                setConnectionTypes={setConnectionTypes}
                onSave={handleSave}
              />
            ),
          },
          {
            key: 'connection',
            label: 'Connection Info',
            content: <ConnectionInfoPanel types={connectionTypes} />,
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
