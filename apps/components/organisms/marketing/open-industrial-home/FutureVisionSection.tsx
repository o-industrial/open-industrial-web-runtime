import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../src/marketing/home.ts';

const PRE_HEADLINE_CLASS = 'text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400';

export default function FutureVisionSection(): JSX.Element {
  const { preHeadline, headline, body, pillars } = homeContent.future;

  return (
    <SectionSurface
      tone='muted'
      width='wide'
      contentClass='mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-24 text-center'
      class='border-y border-neutral-200/60 bg-white dark:border-white/10 dark:bg-neutral-950'
    >
      <div class='space-y-4'>
        <span class={PRE_HEADLINE_CLASS}>{preHeadline}</span>
        <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
          {headline}
        </h2>
        <p class='text-base sm:text-lg'>{body}</p>
      </div>

      <div class='grid gap-6 sm:grid-cols-3 text-left'>
        {pillars.map((pillar) => (
          <article
            key={pillar.title}
            class='h-full rounded-3xl border border-neutral-200/70 bg-white px-6 py-8 text-sm shadow-sm dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_30px_90px_-70px_rgba(15,23,42,0.85)]'
          >
            <h3 class='text-lg font-semibold'>{pillar.title}</h3>
            <p class='mt-3'>{pillar.body}</p>
          </article>
        ))}
      </div>
    </SectionSurface>
  );
}