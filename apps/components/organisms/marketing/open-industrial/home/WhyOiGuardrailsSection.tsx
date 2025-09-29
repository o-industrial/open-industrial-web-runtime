import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../../src/marketing/home.ts';

function PreHeadline({ value }: { value?: string }): JSX.Element | null {
  if (!value) {
    return null;
  }

  return (
    <span class='inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/70'>
      <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]' />
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
      contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-24 text-white'
      class='relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#190b29] via-[#1f1038] to-[#0c081b] shadow-[0_130px_300px_-180px_rgba(139,92,246,0.55)]'
    >
      <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(139,92,246,0.3),rgba(12,8,27,0)_78%)] opacity-85 blur-[180px]' />

      <div class='relative z-10 mx-auto max-w-3xl space-y-4 text-center text-white/80'>
        <PreHeadline value={preHeadline} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
          {headline}
        </h2>
        <p class='text-base sm:text-lg'>{subhead}</p>
      </div>

      <div class='relative z-10 grid gap-6 sm:grid-cols-3'>
        {coreBenefits.map((benefit) => (
          <article
            key={benefit.title}
            class='group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-left shadow-[0_30px_110px_-70px_rgba(139,92,246,0.55)] backdrop-blur-md transition-transform duration-200 hover:-translate-y-1'
          >
            <div class='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 opacity-65' />
            <h3 class='text-lg font-semibold text-white'>{benefit.title}</h3>
            <p class='mt-3 text-sm text-white/70'>{benefit.body}</p>
          </article>
        ))}
      </div>

      <div class='relative z-10 border-t border-white/10 pt-12'>
        <div class='mx-auto max-w-3xl space-y-3 text-center text-white/80'>
          <h3 class='text-2xl font-semibold tracking-tight text-white'>
            {guardrails.title}
          </h3>
          <p class='text-sm sm:text-base'>{guardrails.body}</p>
        </div>

        <div class='mt-10 grid gap-6 sm:grid-cols-3'>
          {guardrails.items.map((item, index) => (
            <article
              key={item.title}
              class='group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-left shadow-[0_30px_110px_-70px_rgba(139,92,246,0.45)] backdrop-blur-md transition-transform duration-200 hover:-translate-y-1'
            >
              <div class='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 opacity-55' />
              <div class='mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue-500/30 via-neon-purple-500/30 to-neon-pink-500/30 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_16px_35px_-20px_rgba(139,92,246,0.6)]'>
                {String(index + 1).padStart(2, '0')}
              </div>
              <h4 class='text-lg font-semibold text-white'>{item.title}</h4>
              <p class='mt-3 text-sm text-white/70'>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionSurface>
  );
}
