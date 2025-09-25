import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../src/marketing/home.ts';

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

export default function FutureVisionSection(): JSX.Element {
  const { preHeadline, headline, body, pillars } = homeContent.future;

  return (
    <SectionSurface
      tone='muted'
      width='wide'
      contentClass='mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-24 text-center'
      class='border-y border-neutral-200/70 bg-white dark:border-white/10 dark:bg-neutral-950'
    >
      <div class='space-y-4'>
        <PreHeadline value={preHeadline} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {headline}
        </h2>
        <p class='text-base text-neutral-600 sm:text-lg dark:text-neutral-300'>{body}</p>
      </div>

      <div class='grid gap-6 text-left sm:grid-cols-3'>
        {pillars.map((pillar) => (
          <article
            key={pillar.title}
            class='group relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white px-6 py-8 text-sm shadow-sm transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_30px_90px_-70px_rgba(15,23,42,0.85)]'
          >
            <div class='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 opacity-50' />
            <h3 class='text-lg font-semibold text-neutral-900 dark:text-white'>{pillar.title}</h3>
            <p class='mt-3 text-neutral-600 dark:text-neutral-300'>{pillar.body}</p>
          </article>
        ))}
      </div>
    </SectionSurface>
  );
}
