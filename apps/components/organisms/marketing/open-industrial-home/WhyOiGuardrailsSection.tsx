import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../src/marketing/home.ts';

const PRE_HEADLINE_CLASS = 'text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400';

export default function WhyOiGuardrailsSection(): JSX.Element {
  const { preHeadline, headline, subhead, coreBenefits, guardrails } = homeContent.whyOi;

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
        {coreBenefits.map((benefit) => (
          <article
            key={benefit.title}
            class='h-full rounded-3xl border border-neutral-200/70 bg-white px-6 py-8 text-left shadow-sm dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_35px_95px_-70px_rgba(15,23,42,0.85)]'
          >
            <h3 class='text-lg font-semibold'>{benefit.title}</h3>
            <p class='mt-3 text-sm'>{benefit.body}</p>
          </article>
        ))}
      </div>

      <div class='border-t border-neutral-200/60 pt-12 dark:border-white/10'>
        <div class='mx-auto max-w-3xl text-center space-y-3'>
          <h3 class='text-2xl font-semibold tracking-tight'>{guardrails.title}</h3>
          <p class='text-sm sm:text-base'>{guardrails.body}</p>
        </div>

        <div class='mt-10 grid gap-6 sm:grid-cols-3'>
          {guardrails.items.map((item) => (
            <article
              key={item.title}
              class='h-full rounded-3xl border border-neutral-200/70 bg-white px-6 py-8 text-left shadow-sm dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_30px_85px_-70px_rgba(15,23,42,0.85)]'
            >
              <h4 class='text-lg font-semibold'>{item.title}</h4>
              <p class='mt-3 text-sm'>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionSurface>
  );
}