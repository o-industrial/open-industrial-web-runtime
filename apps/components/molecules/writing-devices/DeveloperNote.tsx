import { JSX } from 'preact';
import { classSet } from '@fathym/atomic';

export type DeveloperNoteProps = {
  children: JSX.Element | string;
} & JSX.HTMLAttributes<HTMLElement>;

export function DeveloperNote({ children, ...rest }: DeveloperNoteProps) {
  return (
    <aside
      {...rest}
      class={classSet(
        [
          'text-sm font-mono',
          'bg-neutral-100 text-neutral-700 border-neutral-300',
          'dark:bg-neutral-950 dark:text-neutral-400 dark:border-neutral-700',
          'border-l-4 px-4 py-2 my-4 rounded-sm',
        ],
        rest,
      )}
    >
      {children}
    </aside>
  );
}
