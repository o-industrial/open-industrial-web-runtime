import { JSX } from 'preact';
import { classSet } from '@fathym/atomic';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { Badge } from '../../atoms/Badge.tsx';

export type AziChatMessageProps = {
  align?: 'left' | 'right';
  content: string;
  badge: JSX.Element | string;
  intentType?: IntentTypes;
  inline?: boolean;
} & JSX.HTMLAttributes<HTMLDivElement>;

export function AziChatMessage({
  align = 'left',
  content,
  badge,
  intentType = IntentTypes.Info,
  inline = false,
  ...rest
}: AziChatMessageProps) {
  const isRight = align === 'right';

  const bubbleColorMap: Record<IntentTypes, string> = {
    [IntentTypes.Primary]: 'bg-neon-violet-900 border-neon-violet-500',
    [IntentTypes.Secondary]: 'bg-neon-indigo-900 border-neon-indigo-500',
    [IntentTypes.Tertiary]: 'bg-neon-blue-900 border-neon-blue-500',
    [IntentTypes.Info]: 'bg-neon-cyan-900 border-neon-cyan-500',
    [IntentTypes.Warning]: 'bg-neon-yellow-900 border-neon-yellow-500',
    [IntentTypes.Error]: 'bg-neon-red-900 border-neon-red-500',
    [IntentTypes.None]: 'bg-neutral-800 border-neutral-700',
  };

  const bubbleClass =
    bubbleColorMap[intentType] ?? bubbleColorMap[IntentTypes.Info];
  const rootAlign = isRight ? 'justify-end' : 'justify-start';
  const containerAlign = isRight ? 'items-end' : 'items-start';
  const rowDirection = isRight ? 'flex-row-reverse' : 'flex-row';

  return (
    <div {...rest} class={classSet(['flex', rootAlign], rest)}>
      {inline ? (
        <div
          class={`flex ${rowDirection} items-center gap-2 max-w-[80%]`}
        >
          <Badge intentType={intentType}>{badge}</Badge>
          <div class={`border rounded px-3 py-2 text-sm ${bubbleClass}`}>
            {content}
          </div>
        </div>
      ) : (
        <div class={`flex flex-col ${containerAlign} max-w-[80%]`}>
          <Badge intentType={intentType} class="mb-1">
            {badge}
          </Badge>
          <div class={`border rounded px-3 py-2 text-sm ${bubbleClass}`}>
            {content}
          </div>
        </div>
      )}
    </div>
  );
}
