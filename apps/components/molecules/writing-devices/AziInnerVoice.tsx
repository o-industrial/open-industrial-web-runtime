import { JSX } from 'preact';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { getIntentClasses } from '../../../../src/utils/getIntentClasses.ts';
import { classSet } from '@fathym/atomic';

export type AziInnerVoiceProps = {
  children: JSX.Element | string;
  intentType?: IntentTypes;
} & JSX.HTMLAttributes<HTMLElement>;

export function AziInnerVoice({
  children,
  intentType = IntentTypes.Tertiary,
  ...rest
}: AziInnerVoiceProps) {
  return (
    <aside
      {...rest}
      class={classSet(
        [`border-l-4 pl-4 italic rounded-sm`, getIntentClasses(intentType)],
        rest,
      )}
    >
      {children}
    </aside>
  );
}
