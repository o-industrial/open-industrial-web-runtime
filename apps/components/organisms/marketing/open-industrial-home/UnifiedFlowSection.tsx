import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../src/marketing/home.ts';

const bulletGlows = [
  'bg-neon-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.7)]',
  'bg-neon-purple-500 shadow-[0_0_8px_rgba(139,92,246,0.7)]',
  'bg-neon-pink-500 shadow-[0_0_8px_rgba(244,114,182,0.7)]',
];

function PreHeadline({ value }: { value?: string }): JSX.Element | null {
  if (!value) {
    return null;
  }

  return (
    <span class='inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-neutral-600 dark:text-neutral-300'>
      <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_10px_rgba(129,140,248,0.45)]' />
      {value}
    </span>
  );
}

export default function UnifiedFlowSection(): JSX.Element {
  const { preHeadline, headline, subhead, bullets } = homeContent.unifiedHub;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-20 text-center'
      class='border-y border-neutral-200/70 bg-white dark:border-white/10 dark:bg-neutral-950'
    >
      <div class='space-y-4'>
        <PreHeadline value={preHeadline} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {headline}
        </h2>
        <p class='text-base text-neutral-600 sm:text-lg dark:text-neutral-300'>{subhead}</p>
      </div>

      <ul class='grid gap-4 sm:grid-cols-3'>
        {bullets.map((bullet, index) => (
          <li
            key={bullet}
            class='rounded-2xl border border-neutral-200/70 bg-white px-5 py-4 text-sm shadow-sm dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_20px_60px_-40px_rgba(15,23,42,0.85)]'
          >
            <div class='flex items-start gap-3 text-left text-neutral-700 dark:text-neutral-200'>
              <span class={`mt-1 h-2.5 w-2.5 rounded-full ${bulletGlows[index % bulletGlows.length]}`} />
              <span>{bullet}</span>
            </div>
          </li>
        ))}
      </ul>
    </SectionSurface>
  );
}