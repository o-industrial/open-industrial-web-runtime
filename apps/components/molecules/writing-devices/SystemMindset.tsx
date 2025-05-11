import { ComponentChildren, JSX } from 'preact';
import { classSet } from '@fathym/atomic';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { getIntentStyles } from '../../../../src/utils/getIntentStyles.ts';

export type SystemMindsetProps = {
  intentType?: IntentTypes;
  children: ComponentChildren;
} & JSX.HTMLAttributes<HTMLElement>;

export function SystemMindset({
  intentType = IntentTypes.Tertiary,
  children,
  ...rest
}: SystemMindsetProps) {
  const { border, text } = getIntentStyles(intentType);

  return (
    <aside
      {...rest}
      class={classSet(
        ['border-l-4 pl-4 italic text-sm leading-relaxed', border, text],
        rest,
      )}
    >
      {children}
    </aside>
  );
}
