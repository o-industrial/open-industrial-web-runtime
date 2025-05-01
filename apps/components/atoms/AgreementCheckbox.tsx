import { JSX } from 'preact';
import { classSet } from '@fathym/atomic';

export const IsIsland = true;

export type AgreementCheckboxProps = {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
} & JSX.HTMLAttributes<HTMLLabelElement>;

export function AgreementCheckbox({
  label,
  checked,
  onCheckedChange,
  ...props
}: AgreementCheckboxProps) {
  return (
    <label
      {...props}
      class={classSet(
        [
          'flex items-center gap-2 cursor-pointer select-none text-sm text-neutral-600 dark:text-neutral-300',
        ],
        props
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.currentTarget.checked)}
        class="h-4 w-4 rounded border-neutral-400 text-neon-violet-500 focus:ring-neon-violet-400"
      />
      {label}
    </label>
  );
}
