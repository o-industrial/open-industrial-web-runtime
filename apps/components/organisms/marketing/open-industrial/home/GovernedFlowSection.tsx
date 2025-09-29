import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { ConnectionIcon, StackIcon, WarmQueryIcon } from '@o-industrial/common/atomic/icons';

import { homeContent } from '../../../../../../src/marketing/home.ts';

const stepIcons = [ConnectionIcon, WarmQueryIcon, StackIcon];

function PreHeadline({ value }: { value?: string }): JSX.Element | null {
  if (!value) {
    return null;
  }

  return (
    <span class='inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/70'>
      <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_12px_rgba(129,140,248,0.6)]' />
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
      contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 text-white'
      class='relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#060d1d] via-[#0d1530] to-[#050913] shadow-[0_110px_260px_-160px_rgba(59,130,246,0.55)]'
    >
      <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(59,130,246,0.28),rgba(6,12,25,0)_75%)] opacity-80 blur-[160px]' />

      <div class='relative z-10 mx-auto max-w-3xl space-y-4 text-center text-white'>
        <PreHeadline value={preHeadline} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
          {headline}
        </h2>
      </div>

      <div class='relative z-10 grid gap-6 sm:grid-cols-3'>
        {steps.map((step, index) => {
          const Icon = stepIcons[index % stepIcons.length];

          return (
            <div
              key={step.title}
              class='group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-left shadow-[0_30px_110px_-70px_rgba(129,140,248,0.6)] backdrop-blur-md transition-transform duration-200 hover:-translate-y-1'
            >
              <div class='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 opacity-80' />
              <div class='mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-blue-500/30 via-neon-purple-500/30 to-neon-pink-500/30 text-white shadow-[0_18px_40px_-20px_rgba(129,140,248,0.7)]'>
                <Icon class='h-5 w-5' />
              </div>
              <h3 class='text-lg font-semibold text-white'>{step.title}</h3>
              <p class='mt-3 text-sm text-white/70'>{step.body}</p>
            </div>
          );
        })}
      </div>
    </SectionSurface>
  );
}
