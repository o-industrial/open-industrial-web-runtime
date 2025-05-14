import { ComponentChildren, JSX } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';
import { getIntentStyles } from '../../../../src/utils/getIntentStyles.ts';
import { classSet } from '@fathym/atomic';

export function InlineUXTip({
  label = 'Thinking Tip:',
  children,
  intentType = IntentTypes.Secondary,
}: {
  label?: string;
  children: ComponentChildren;
  intentType?: IntentTypes;
}) {
  const { text, border, background } = getIntentStyles(intentType);

  return (
    <div
      class={`mt-4 mb-6 px-4 py-2 text-sm leading-relaxed border-l-4 rounded ${text} ${border} ${background}`}
    >
      <strong class={classSet(['font-semibold', text])}>{label}</strong>{' '}
      <span class='text-neutral-700 dark:text-neutral-300'>{children}</span>
    </div>
  );
}
