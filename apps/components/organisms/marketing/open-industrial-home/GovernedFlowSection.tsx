import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { ConnectionIcon, StackIcon, WarmQueryIcon } from '@o-industrial/common/atomic/icons';

import { homeContent } from '../../../../../src/marketing/home.ts';

const stepIcons = [ConnectionIcon, WarmQueryIcon, StackIcon];

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

export default function GovernedFlowSection(): JSX.Element {
  const { preHeadline, headline, steps } = homeContent.howItWorks;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20'
      class='relative overflow-hidden border-y border-neutral-200/70 bg-gradient-to-br from-[#f3f6ff] via-white to-[#f8f4ff] shadow-[0_60px_180px_-120px_rgba(129,140,248,0.35)] dark:border-white/10 dark:bg-gradient-to-br dark:from-[#0a121f] dark:via-[#0d1527] dark:to-[#080f1d] dark:shadow-[0_90px_240px_-150px_rgba(129,140,248,0.55)]'
    >
      <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(236,72,153,0.12),rgba(255,255,255,0)_75%)] opacity-70 blur-[140px] dark:bg-[radial-gradient(circle,_rgba(59,130,246,0.28),rgba(8,12,24,0)_75%)]' />

      <div class='relative z-10 mx-auto max-w-3xl space-y-4 text-center text-neutral-700 dark:text-neutral-200'>
        <PreHeadline value={preHeadline} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {headline}
        </h2>
      </div>

      <div class='relative z-10 grid gap-6 sm:grid-cols-3'>
        {steps.map((step, index) => {
          const Icon = stepIcons[index % stepIcons.length];

          return (
            <div
              key={step.title}
              class='group relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white px-6 py-8 text-left shadow-[0_20px_70px_-50px_rgba(15,23,42,0.4)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_30px_90px_-50px_rgba(15,23,42,0.9)]'
            >
              <div class='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 opacity-70' />
              <div class='mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-blue-500/18 via-neon-purple-500/18 to-neon-pink-500/18 text-neon-purple-500 shadow-[0_12px_32px_-16px_rgba(129,140,248,0.65)] dark:from-neon-blue-500/25 dark:via-neon-purple-500/25 dark:to-neon-pink-500/25 dark:text-neon-purple-200'>
                <Icon class='h-5 w-5' />
              </div>
              <h3 class='text-lg font-semibold text-neutral-900 dark:text-white'>{step.title}</h3>
              <p class='mt-3 text-sm text-neutral-600 dark:text-neutral-300'>{step.body}</p>
            </div>
          );
        })}
      </div>
    </SectionSurface>
  );
}