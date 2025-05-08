import { JSX } from 'preact';
import { classSet } from '@fathym/atomic';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { getIntentStyles } from '../../../../src/utils/getIntentClasses.ts';

export function ThematicPrincipleBlock({
  children,
  intentType = IntentTypes.Primary,
}: {
  children: JSX.Element | string;
  intentType?: IntentTypes;
}) {
  const { text, border, background } = getIntentStyles(intentType);

  return (
    <div
      class={classSet([
        'not-prose mt-6 mb-8 px-6 py-4 border-l-4 rounded text-sm leading-relaxed',
        text,
        border,
        background,
      ])}
    >
      {children}
    </div>
  );
}
