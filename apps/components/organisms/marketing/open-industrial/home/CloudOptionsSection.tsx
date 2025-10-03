import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';

import { homeContent } from '../../../../../../src/marketing/home.ts';

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

export default function CloudOptionsSection(): JSX.Element {
  const { preHeadline, headline, subhead, options, sovereignty } = homeContent.cloud;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-24'
      class='relative overflow-hidden border-y border-neutral-200/70 bg-white shadow-[0_45px_150px_-120px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-slate-950 dark:shadow-[0_60px_200px_-140px_rgba(15,23,42,0.55)]'
    >
      <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(59,130,246,0.08),rgba(255,255,255,0)_72%)] opacity-70 blur-[150px] dark:bg-[radial-gradient(circle,_rgba(59,130,246,0.18),rgba(6,10,25,0)_76%)]' />

      <div class='relative z-10 mx-auto max-w-3xl space-y-4 text-center text-neutral-700 dark:text-neutral-200'>
        <PreHeadline value={preHeadline} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {headline}
        </h2>
        <p class='text-base sm:text-lg'>{subhead}</p>
      </div>

      <div class='relative z-10 grid gap-6 sm:grid-cols-3'>
        {options.map((option) => (
          <article
            key={option.title}
            class='group relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white px-6 py-8 text-left shadow-[0_25px_90px_-60px_rgba(59,130,246,0.32)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_35px_110px_-70px_rgba(59,130,246,0.55)]'
          >
            <div class='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 opacity-55' />
            <h3 class='text-lg font-semibold text-neutral-900 dark:text-white'>{option.title}</h3>
            <p class='mt-3 text-sm text-neutral-600 dark:text-neutral-300'>{option.body}</p>
          </article>
        ))}
      </div>

      <div class='relative z-10 rounded-3xl border border-neutral-200/70 bg-white px-6 py-10 text-center shadow-[0_25px_90px_-60px_rgba(59,130,246,0.32)] dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_35px_110px_-70px_rgba(59,130,246,0.55)]'>
        <h3 class='text-2xl font-semibold text-neutral-900 dark:text-white'>{sovereignty.title}</h3>
        <p class='mt-3 text-sm text-neutral-600 sm:text-base dark:text-neutral-300'>
          {sovereignty.body}
        </p>
        <ul class='mt-6 grid gap-3 text-sm sm:grid-cols-2'>
          {sovereignty.bullets.map((bullet, index) => (
            <li
              key={bullet}
              class='flex items-start gap-3 rounded-2xl border border-neutral-200/60 bg-white px-4 py-3 text-left shadow-sm dark:border-white/10 dark:bg-neutral-900'
            >
              <span
                class={`mt-1 h-2.5 w-2.5 rounded-full ${
                  index % 2 === 0
                    ? 'bg-neon-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.75)]'
                    : 'bg-neon-purple-500 shadow-[0_0_8px_rgba(139,92,246,0.75)]'
                }`}
              />
              <span class='text-neutral-700 dark:text-neutral-200'>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionSurface>
  );
}


