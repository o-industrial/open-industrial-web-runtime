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

export default function WhyOiGuardrailsSection(): JSX.Element {
  const { preHeadline, headline, subhead, coreBenefits, guardrails } = homeContent.whyOi;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-24'
      class='relative overflow-hidden border-y border-neutral-200/70 bg-gradient-to-br from-[#fef7ff] via-white to-[#eef9ff] shadow-[0_80px_240px_-160px_rgba(139,92,246,0.35)] dark:border-white/10 dark:bg-gradient-to-br dark:from-[#0a1323] dark:via-[#101a2f] dark:to-[#0b1424] dark:shadow-[0_100px_260px_-170px_rgba(139,92,246,0.55)]'
    >
      <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(139,92,246,0.14),rgba(255,255,255,0)_75%)] opacity-75 blur-[150px] dark:bg-[radial-gradient(circle,_rgba(139,92,246,0.28),rgba(9,13,27,0)_78%)]' />

      <div class='relative z-10 mx-auto max-w-3xl space-y-4 text-center text-neutral-700 dark:text-neutral-200'>
        <PreHeadline value={preHeadline} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {headline}
        </h2>
        <p class='text-base sm:text-lg'>{subhead}</p>
      </div>

      <div class='relative z-10 grid gap-6 sm:grid-cols-3'>
        {coreBenefits.map((benefit) => (
          <article
            key={benefit.title}
            class='group relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white px-6 py-8 text-left shadow-[0_25px_90px_-60px_rgba(139,92,246,0.35)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_35px_110px_-70px_rgba(139,92,246,0.55)]'
          >
            <div class='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 opacity-60' />
            <h3 class='text-lg font-semibold text-neutral-900 dark:text-white'>{benefit.title}</h3>
            <p class='mt-3 text-sm text-neutral-600 dark:text-neutral-300'>{benefit.body}</p>
          </article>
        ))}
      </div>

      <div class='relative z-10 border-t border-neutral-200/70 pt-12 dark:border-white/10'>
        <div class='mx-auto max-w-3xl space-y-3 text-center text-neutral-700 dark:text-neutral-200'>
          <h3 class='text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white'>
            {guardrails.title}
          </h3>
          <p class='text-sm sm:text-base'>{guardrails.body}</p>
        </div>

        <div class='mt-10 grid gap-6 sm:grid-cols-3'>
          {guardrails.items.map((item, index) => (
            <article
              key={item.title}
              class='group relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white px-6 py-8 text-left shadow-[0_25px_90px_-60px_rgba(139,92,246,0.3)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_35px_110px_-70px_rgba(139,92,246,0.55)]'
            >
              <div class='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 opacity-50' />
              <div class='mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue-500/18 via-neon-purple-500/18 to-neon-pink-500/18 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-neon-purple-500 dark:from-neon-blue-500/25 dark:via-neon-purple-500/25 dark:to-neon-pink-500/25 dark:text-neon-purple-200'>
                {String(index + 1).padStart(2, '0')}
              </div>
              <h4 class='text-lg font-semibold text-neutral-900 dark:text-white'>{item.title}</h4>
              <p class='mt-3 text-sm text-neutral-600 dark:text-neutral-300'>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionSurface>
  );
}