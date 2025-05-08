import { IntentTypes } from '../../src/types/IntentTypes.ts';

type IntentStyleMap = {
  text: string;
  border: string;
  background: string;
  ring: string;
  glow: string;
};

const intentStyleMap: Record<IntentTypes, IntentStyleMap> = {
  [IntentTypes.Primary]: {
    text: 'text-neon-violet-600 dark:text-neon-violet-400',
    border: 'border-neon-violet-500',
    background: 'bg-neon-violet-100/30 dark:bg-neon-violet-900/30',
    ring: 'ring-neon-violet-400/30',
    glow: 'drop-shadow-[0_0_8px_rgba(165,105,255,0.4)]',
  },
  [IntentTypes.Secondary]: {
    text: 'text-neon-indigo-600 dark:text-neon-indigo-400',
    border: 'border-neon-indigo-500',
    background: 'bg-neon-indigo-100/30 dark:bg-neon-indigo-900/30',
    ring: 'ring-neon-indigo-400/30',
    glow: 'drop-shadow-[0_0_8px_rgba(129,140,248,0.4)]',
  },
  [IntentTypes.Tertiary]: {
    text: 'text-neon-blue-600 dark:text-neon-blue-400',
    border: 'border-neon-blue-500',
    background: 'bg-neon-blue-100/30 dark:bg-neon-blue-900/30',
    ring: 'ring-neon-blue-400/30',
    glow: 'drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]',
  },
  [IntentTypes.Warning]: {
    text: 'text-neon-yellow-600 dark:text-neon-yellow-300',
    border: 'border-neon-yellow-500',
    background: 'bg-neon-yellow-100/30 dark:bg-neon-yellow-900/30',
    ring: 'ring-neon-yellow-400/30',
    glow: 'drop-shadow-[0_0_8px_rgba(253,224,71,0.5)]',
  },
  [IntentTypes.Error]: {
    text: 'text-neon-red-600 dark:text-neon-red-400',
    border: 'border-neon-red-500',
    background: 'bg-neon-red-100/30 dark:bg-neon-red-900/30',
    ring: 'ring-neon-red-400/30',
    glow: 'drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]',
  },
  [IntentTypes.Info]: {
    text: 'text-neon-cyan-600 dark:text-neon-cyan-400',
    border: 'border-neon-cyan-500',
    background: 'bg-neon-cyan-100/30 dark:bg-neon-cyan-900/30',
    ring: 'ring-neon-cyan-400/30',
    glow: 'drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]',
  },
  [IntentTypes.None]: {
    text: 'text-neutral-700 dark:text-neutral-300',
    border: 'border-neutral-400',
    background: 'bg-neutral-100/30 dark:bg-neutral-800/30',
    ring: 'ring-white/10',
    glow: '',
  },
};

export function getIntentStyles(intent: IntentTypes = IntentTypes.Info): IntentStyleMap {
  return intentStyleMap[intent] ?? intentStyleMap[IntentTypes.Info];
}

export function getIntentClasses(intent: IntentTypes = IntentTypes.Info): string {
  const { text, border, background } = getIntentStyles(intent);
  return `${text} ${border} ${background}`;
}

export function getIntentBackgroundMap(intent: IntentTypes = IntentTypes.Info): string {
  return getIntentStyles(intent).background;
}
