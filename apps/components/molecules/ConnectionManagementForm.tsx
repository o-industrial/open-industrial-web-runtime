import { JSX } from 'preact';
import { Input } from '../atoms/forms/Input.tsx';
import { MultiSelectCheckboxGroup } from './MultiSelectCheckboxGroup.tsx';
import {
  EaCAzureIoTHubDataConnectionDetails,
  MultiProtocolIngestOption,
} from '@o-industrial/common/eac';
import { IngestOption } from '@o-industrial/common/types';

type Props = {
  details: EaCAzureIoTHubDataConnectionDetails;
  onChange: (next: Partial<EaCAzureIoTHubDataConnectionDetails>) => void;
  ingestOptions: IngestOption[];
};

export function ConnectionManagementForm({
  details,
  onChange,
  ingestOptions,
}: Props) {
  const handleStringChange = (key: keyof EaCAzureIoTHubDataConnectionDetails) =>
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
      onChange({ ...details, [key]: e.currentTarget.value });

  const handleBooleanChange = (key: keyof EaCAzureIoTHubDataConnectionDetails) =>
    (e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
      onChange({ ...details, [key]: e.currentTarget.checked });

  const handleProtocolsChange = (next: string[]) => {
    onChange({
      ...details,
      MultiProtocolIngest: next as MultiProtocolIngestOption[],
    });
  };

  return (
    <div class='space-y-4 pt-2'>

      {/* Label */}
      <Input
        label='Connection Label'
        value={details.Name ?? ''}
        onInput={handleStringChange('Name')}
      />

      {/* Device ID */}
      <Input
        label='Device ID'
        value={details.DeviceID ?? ''}
        onInput={handleStringChange('DeviceID')}
      />

      {/* Is IoT Edge Device */}
      <label class='flex items-center space-x-2'>
        <input
          type='checkbox'
          checked={details.IsIoTEdge ?? false}
          onChange={handleBooleanChange('IsIoTEdge')}
        />
        <span class='text-sm'>Is IoT Edge Device</span>
      </label>

      {/* Subscription ID */}
      {/* <Input
        label='Subscription ID'
        value={details.SubscriptionID ?? ''}
        onInput={handleStringChange('SubscriptionID')}
      /> */}

      {/* Resource Group */}
      {/* <Input
        label='Resource Group Name'
        value={details.ResourceGroupName ?? ''}
        onInput={handleStringChange('ResourceGroupName')}
      /> */}

      {/* IoT Hub Name */}
      {/* <Input
        label='IoT Hub Name'
        value={details.IoTHubName ?? ''}
        onInput={handleStringChange('IoTHubName')}
      /> */}

      {/* Ingest Protocols */}
      <MultiSelectCheckboxGroup
        label='Ingest Protocols'
        options={ingestOptions}
        selected={details.MultiProtocolIngest ?? []}
        onChange={handleProtocolsChange}
      />
    </div>
  );
}
