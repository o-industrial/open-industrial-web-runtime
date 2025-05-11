import { JSX } from 'preact';
import { Input } from '../atoms/forms/Input.tsx';
import { MultiSelectCheckboxGroup } from './MultiSelectCheckboxGroup.tsx';
import {
  EaCDataConnectionDetails,
  MultiProtocolIngestOption,
} from '@o-industrial/common/eac';
import { IngestOption } from '@o-industrial/common/types';

type Props = {
  details: Partial<EaCDataConnectionDetails>;
  onChange: (next: Partial<EaCDataConnectionDetails>) => void;
  ingestOptions: IngestOption[];
};

export function ConnectionManagementForm({
  details,
  onChange,
  ingestOptions,
}: Props) {
  const handleLabelInput = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    onChange({ Name: e.currentTarget.value });
  };

  const handleProtocolsChange = (next: string[]) => {
    onChange({ MultiProtocolIngest: next as MultiProtocolIngestOption[] });
  };

  return (
    <div class="space-y-3 pt-2">
      <Input
        label="Connection Label"
        value={details.Name ?? ''}
        onInput={handleLabelInput}
      />

      <MultiSelectCheckboxGroup
        label="Ingest Protocols"
        options={ingestOptions}
        selected={details.MultiProtocolIngest ?? []}
        onChange={handleProtocolsChange}
      />
    </div>
  );
}
