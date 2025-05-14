import { JSX } from 'preact';
import { Input } from '../atoms/forms/Input.tsx';
import { SurfaceDataConnectionSettings } from '@o-industrial/common/eac';

type Props = {
  details: Partial<SurfaceDataConnectionSettings>;
  onChange: (next: Partial<SurfaceDataConnectionSettings>) => void;
};

export function SurfaceConnectionManagementForm({ details, onChange }: Props) {
  const handleTumblingWindowSecondsInput = (
    e: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    onChange({ TumblingWindowSeconds: parseInt(e.currentTarget.value) });
  };

  return (
    <div class='space-y-3 pt-2'>
      <Input
        label='Tumbling Window Seconds'
        value={details.TumblingWindowSeconds ?? ''}
        onInput={handleTumblingWindowSecondsInput}
      />
    </div>
  );
}
