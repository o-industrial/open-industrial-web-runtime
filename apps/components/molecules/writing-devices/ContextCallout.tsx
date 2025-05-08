import { JSX } from 'preact';
import { classSet } from '@fathym/atomic';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { getIntentClasses } from '../../../../src/utils/getIntentClasses.ts';

export type ContextCalloutProps = {
  intentType?: IntentTypes;
  children: JSX.Element | string | (JSX.Element | string)[];
} & JSX.HTMLAttributes<HTMLDivElement>;

export function ContextCallout({
  intentType = IntentTypes.Info,
  children,
  ...rest
}: ContextCalloutProps) {
  const intentClasses = getIntentClasses(intentType);

  return (
    <div
      {...rest}
      class={classSet(
        ['mt-6 mb-8 px-6 py-4 border-l-4 rounded', intentClasses],
        rest
      )}
    >
      {children}
    </div>
  );
}
