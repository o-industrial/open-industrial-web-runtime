import { ComponentChildren, JSX } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';
import { getIntentClasses } from '../../../../src/utils/getIntentStyles.ts';
import { classSet } from '@fathym/atomic';

export type AziInnerVoiceProps = {
  children: ComponentChildren;
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
