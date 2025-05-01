import { JSX } from 'preact';
import { ForwardedRef, forwardRef } from 'preact/compat';
import { IntentTypes } from '../../../src/types/IntentTypes.ts';
import { classSet } from '@fathym/atomic';

export type InputBaseProps = {
  label?: string;
  intentType?: IntentTypes;
  multiline?: boolean;
  rows?: number;
};

// Union of input and textarea props
export type InputProps = InputBaseProps &
  (
    | (JSX.HTMLAttributes<HTMLInputElement> & { multiline?: false })
    | (JSX.HTMLAttributes<HTMLTextAreaElement> & { multiline: true })
  );

function getIntentClasses(intent?: IntentTypes) {
  switch (intent) {
    case IntentTypes.Warning:
      return 'border-neon-yellow-400 focus:ring-neon-yellow-500';
    case IntentTypes.Error:
      return 'border-neon-red-400 focus:ring-neon-red-500';
    case IntentTypes.Info:
      return 'border-neon-cyan-400 focus:ring-neon-cyan-500';
    case IntentTypes.Secondary:
      return 'border-neon-indigo-400 focus:ring-neon-indigo-500';
    case IntentTypes.Tertiary:
      return 'border-neon-blue-500 focus:ring-neon-blue-500';
    case IntentTypes.Primary:
      return 'border-neon-violet-500 focus:ring-neon-violet-500';
    default:
      return 'border-neutral-600 focus:ring-neon-blue-500';
  }
}

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(function Input(
  { label, intentType, multiline = false, rows = 4, disabled, ...rest },
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
) {
  const baseClasses =
    'w-full px-2 py-1 rounded text-sm placeholder-slate-400 bg-neutral-700 focus:outline-none focus:ring-2';
  const intentClass = getIntentClasses(intentType);
  const disabledClass = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  return (
    <div class={classSet([`w-full`], rest)}>
      {label && (
        <label class="block text-xs font-semibold text-neutral-300 mb-1">
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          ref={ref as ForwardedRef<HTMLTextAreaElement>}
          rows={rows}
          disabled={disabled}
          class={`${baseClasses} ${intentClass} ${disabledClass}`}
          {...(rest as JSX.HTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={ref as ForwardedRef<HTMLInputElement>}
          disabled={disabled}
          class={`${baseClasses} ${intentClass} ${disabledClass}`}
          {...(rest as JSX.HTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
});
