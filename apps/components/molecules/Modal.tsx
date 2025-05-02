import { JSX } from 'preact';
import { classSet } from '@fathym/atomic';
import { Action, ActionStyleTypes } from '../atoms/Action.tsx';
import { IntentTypes } from '../../../src/types/IntentTypes.ts';
import { useEscapeKey } from '../../../src/hooks/useEscapeKey.ts';

export type ModalProps = {
  title?: string;
  onClose: () => void;
  fullscreen?: boolean;
  children: JSX.Element | JSX.Element[];
} & JSX.HTMLAttributes<HTMLDivElement>;

export function Modal({
  title,
  onClose,
  fullscreen = false,
  children,
  ...props
}: ModalProps) {
  useEscapeKey(onClose);

  return (
    <div
      class='fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center'
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        class={classSet(
          [
            'relative bg-neutral-900 border border-neutral-700 rounded-md shadow-xl overflow-hidden flex flex-col transition-all',
            fullscreen ? 'w-full h-full m-4' : 'w-full max-w-5xl max-h-[90vh] m-4',
          ],
          props,
        )}
        {...props}
      >
        {/* Header */}
        <div class='flex items-center justify-between px-4 py-3 border-b border-neutral-700'>
          <h2 class='text-sm font-bold text-white uppercase tracking-wide'>
            {title}
          </h2>
          <Action
            title='Close'
            onClick={onClose}
            intentType={IntentTypes.Error}
            styleType={ActionStyleTypes.Icon}
          >
            ✕
          </Action>
        </div>

        {/* Scrollable Content */}
        <div class='flex-1 overflow-y-auto p-4'>{children}</div>
      </div>
    </div>
  );
}
