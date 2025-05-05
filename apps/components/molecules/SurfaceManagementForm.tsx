// components/molecules/SurfaceManagementForm.tsx
import { JSX } from 'preact';
import { Input } from '../atoms/forms/Input.tsx';
import { EaCSurfaceDetails } from '../../../src/eac/EaCSurfaceDetails.ts';

type Props = {
  details: Partial<EaCSurfaceDetails>;
  onChange: (next: Partial<EaCSurfaceDetails>) => void;
};

export function SurfaceManagementForm({ details, onChange }: Props) {
  const handleLabelInput = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    onChange({ Name: e.currentTarget.value });
  };

  return (
    <div class="space-y-3 pt-2">
      <Input
        label="Surface Name"
        value={details.Name ?? ''}
        onInput={handleLabelInput}
      />
    </div>
  );
}
