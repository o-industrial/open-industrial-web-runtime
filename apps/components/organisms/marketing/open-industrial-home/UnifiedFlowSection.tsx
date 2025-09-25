import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../src/marketing/home.ts';

const PRE_HEADLINE_CLASS = 'text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400';

export default function UnifiedFlowSection(): JSX.Element {
  const { preHeadline, headline, subhead, bullets } = homeContent.unifiedHub;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-20 text-center'
      class='border-y border-neutral-200/60 bg-white dark:border-white/10 dark:bg-neutral-950'
    >
      <div class='space-y-4'>
        <span class={PRE_HEADLINE_CLASS}>{preHeadline}</span>
        <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
          {headline}
        </h2>
        <p class='text-base sm:text-lg'>{subhead}</p>
      </div>

      <ul class='grid gap-4 sm:grid-cols-3'>
        {bullets.map((bullet) => (
          <li
            key={bullet}
            class='rounded-2xl border border-neutral-200/70 bg-white px-5 py-4 text-sm shadow-sm dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_20px_60px_-40px_rgba(15,23,42,0.85)]'
          >
            {bullet}
          </li>
        ))}
      </ul>
    </SectionSurface>
  );
}