import { JSX } from 'preact';
import { Input } from '../atoms/forms/Input.tsx';
import { EaCWarmQueryDetails } from '@o-industrial/common/eac';

type Props = {
  details: Partial<EaCWarmQueryDetails>;
  onChange: (next: Partial<EaCWarmQueryDetails>) => void;
};

export function WarmQueryManagementForm({ details, onChange }: Props) {
  const handleLabelInput = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    onChange({ Name: e.currentTarget.value });
  };

  return (
    <div class='space-y-3 pt-2'>
      <Input
        label='Warm Query Name'
        value={details.Name ?? ''}
        onInput={handleLabelInput}
      />
    </div>
  );
}
