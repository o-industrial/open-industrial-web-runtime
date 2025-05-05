import { useState } from 'preact/hooks';
import { JSX } from 'preact';
import { ConnectionNodeData } from '../../../src/flow/types/ConnectionNodeData.tsx';
import { IntentTypes } from '../../../src/types/IntentTypes.ts';
import { Action, ActionStyleTypes } from '../atoms/Action.tsx';
import { Input } from '../atoms/forms/Input.tsx';
import { MultiSelectCheckboxGroup } from './MultiSelectCheckboxGroup.tsx';

type Props = {
  initial: Partial<ConnectionNodeData>;
  onSave: (next: Partial<ConnectionNodeData>) => void;
};

export function ConnectionManagementForm({ initial, onSave }: Props) {
  const [label, setLabel] = useState(initial.label ?? '');
  const [connectionTypes, setConnectionTypes] = useState<string[]>(
    initial.connectionTypes ?? ['iothub']
  );

  const CONNECTION_TYPES = [
    { label: 'IoT Hub', value: 'iothub', enabled: true },
    { label: 'REST', value: 'rest', enabled: true },
    { label: 'MQTT', value: 'mqtt', enabled: false },
    { label: 'OPC UA', value: 'opcua', enabled: false },
    { label: 'MODBus', value: 'modbus', enabled: false },
    { label: 'EtherLink', value: 'etherlink', enabled: false },
  ];

  const handleSave = () => {
    onSave({
      ...initial,
      label,
      connectionTypes,
    });
  };

  return (
    <div class="space-y-3 pt-2">
      <Input
        label="Connection Label"
        value={label}
        onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
          setLabel(e.currentTarget.value)
        }
      />

      <MultiSelectCheckboxGroup
        label="Connection Types"
        options={CONNECTION_TYPES}
        selected={connectionTypes}
        onChange={setConnectionTypes}
      />

      <Action
        class="text-sm"
        styleType={ActionStyleTypes.Solid | ActionStyleTypes.Thin}
        intentType={IntentTypes.Primary}
        onClick={handleSave}
      >
        Save Changes
      </Action>
    </div>
  );
}
