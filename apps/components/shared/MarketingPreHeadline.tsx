import type { JSX } from 'preact';

type MarketingPreHeadlineTone = 'default' | 'inverse';

type MarketingPreHeadlineProps = {
  value?: string;
  tone?: MarketingPreHeadlineTone;
};

const toneStyles: Record<MarketingPreHeadlineTone, { text: string; dot: string; pill: string }> = {
  default: {
    text:
      'text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-neutral-600 dark:text-neutral-300',
    dot:
      'h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_10px_rgba(129,140,248,0.45)]',
    pill: 'inline-flex items-center gap-2',
  },
  inverse: {
    text: 'text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/70',
    dot:
      'h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-400 via-neon-purple-400 to-neon-pink-400 shadow-[0_0_12px_rgba(59,130,246,0.55)]',
    pill: 'inline-flex items-center gap-2',
  },
};

export function MarketingPreHeadline({
  value,
  tone = 'default',
}: MarketingPreHeadlineProps): JSX.Element | null {
  if (!value) {
    return null;
  }

  const styles = toneStyles[tone];

  return (
    <span class={styles.pill}>
      <span class={styles.dot} />
      <span class={styles.text}>{value}</span>
    </span>
  );
}
