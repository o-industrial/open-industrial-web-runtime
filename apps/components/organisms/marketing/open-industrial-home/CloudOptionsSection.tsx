import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../src/marketing/home.ts';

const PRE_HEADLINE_CLASS = 'text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400';

export default function CloudOptionsSection(): JSX.Element {
  const { preHeadline, headline, subhead, options, sovereignty } = homeContent.cloud;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-24'
      class='border-y border-neutral-200/60 bg-white dark:border-white/10 dark:bg-neutral-950'
    >
      <div class='mx-auto max-w-3xl text-center space-y-4'>
        <span class={PRE_HEADLINE_CLASS}>{preHeadline}</span>
        <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
          {headline}
        </h2>
        <p class='text-base sm:text-lg'>{subhead}</p>
      </div>

      <div class='grid gap-6 sm:grid-cols-3'>
        {options.map((option) => (
          <article
            key={option.title}
            class='h-full rounded-3xl border border-neutral-200/70 bg-white px-6 py-8 text-left shadow-sm dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_30px_85px_-70px_rgba(15,23,42,0.85)]'
          >
            <h3 class='text-lg font-semibold'>{option.title}</h3>
            <p class='mt-3 text-sm'>{option.body}</p>
          </article>
        ))}
      </div>

      <div class='rounded-3xl border border-neutral-200/70 bg-white px-6 py-8 text-center shadow-sm dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_35px_90px_-70px_rgba(15,23,42,0.85)]'>
        <h3 class='text-2xl font-semibold'>{sovereignty.title}</h3>
        <p class='mt-3 text-sm sm:text-base'>{sovereignty.body}</p>
        <ul class='mt-6 grid gap-3 text-sm sm:grid-cols-2'>
          {sovereignty.bullets.map((bullet) => (
            <li key={bullet} class='rounded-2xl border border-neutral-200/60 bg-white px-4 py-3 text-left shadow-sm dark:border-white/10 dark:bg-neutral-900'>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </SectionSurface>
  );
}