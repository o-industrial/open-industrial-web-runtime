import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../src/marketing/home.ts';

function PreHeadline({ value }: { value?: string }): JSX.Element | null {
  if (!value) {
    return null;
  }

  return (
    <span class='inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-neutral-600 dark:text-neutral-300'>
      <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]' />
      {value}
    </span>
  );
}

function ColumnLabel({ value }: { value: string }): JSX.Element {
  return (
    <span class='text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-300'>
      {value}
    </span>
  );
}

function FlowDivider(): JSX.Element {
  return (
    <div aria-hidden='true' class='lg:hidden flex justify-center'>
      <div class='h-14 w-px bg-gradient-to-b from-neon-blue-400/45 via-neon-purple-400/40 to-transparent' />
    </div>
  );
}

const inputTopBarGradients = [
  'from-neon-blue-500 via-cyan-400 to-teal-400',
  'from-neon-purple-500 via-neon-blue-500 to-cyan-400',
  'from-neon-pink-500 via-neon-purple-500 to-neon-blue-500',
  'from-cyan-400 via-neon-blue-500 to-neon-purple-500',
];

const outputTopBarGradients = [
  'from-neon-pink-500 via-neon-purple-500 to-neon-blue-500',
  'from-neon-blue-500 via-cyan-400 to-neon-purple-500',
  'from-neon-purple-500 via-neon-blue-500 to-teal-400',
  'from-neon-blue-500 via-neon-pink-500 to-neon-purple-500',
];

export default function UnifiedFlowSection(): JSX.Element {
  const {
    preHeadline,
    headline,
    subhead,
    inputsLabel,
    inputs,
    hub,
    outputsLabel,
    outputs,
  } = homeContent.unifiedHub;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 text-neutral-900 dark:text-white'
      class='relative overflow-hidden border-y border-neutral-200/70 bg-white shadow-[0_40px_130px_-110px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-slate-950 dark:shadow-[0_55px_180px_-130px_rgba(15,23,42,0.55)]'
    >
      <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(59,130,246,0.07),rgba(255,255,255,0)_72%)] opacity-75 blur-[150px] dark:bg-[radial-gradient(circle,_rgba(59,130,246,0.18),rgba(6,12,30,0)_78%)]' />

      <div class='relative z-10 mx-auto max-w-3xl space-y-4 text-center text-neutral-700 dark:text-neutral-200'>
        <PreHeadline value={preHeadline} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {headline}
        </h2>
        <p class='text-base sm:text-lg'>{subhead}</p>
      </div>

      <div class='relative z-10 flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)_minmax(0,1fr)] lg:items-center lg:gap-12'>
        <div class='flex flex-col gap-5 text-left'>
          <ColumnLabel value={inputsLabel} />
          <div class='grid gap-4 sm:grid-cols-2 lg:grid-cols-1'>
            {inputs.map((group, index) => (
              <article
                key={group.title}
                class='relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white px-6 py-6 shadow-[0_30px_110px_-70px_rgba(59,130,246,0.25)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900/80 dark:shadow-[0_40px_130px_-80px_rgba(59,130,246,0.5)]'
              >
                <div
                  class={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                    inputTopBarGradients[index % inputTopBarGradients.length]
                  } opacity-90`}
                />
                <h3 class='text-lg font-semibold text-neutral-900 dark:text-white'>
                  {group.title}
                </h3>
                <div class='mt-3 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-300'>
                  {group.items.map((item) => (
                    <span
                      key={item}
                      class='rounded-full bg-neutral-100 px-3 py-1 dark:bg-white/10 dark:text-white'
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div class='flex flex-col items-center gap-8'>
          <FlowDivider />

          <div class='relative flex items-center justify-center'>
            <div aria-hidden='true' class='hidden lg:block absolute left-[-7rem] top-1/2 h-px w-[5.5rem] -translate-y-1/2 bg-gradient-to-r from-transparent via-neon-blue-400/40 to-neon-purple-400/70' />
            <div aria-hidden='true' class='hidden lg:block absolute right-[-7rem] top-1/2 h-px w-[5.5rem] -translate-y-1/2 bg-gradient-to-r from-neon-purple-400/70 via-neon-pink-400/40 to-transparent' />

            <article class='relative overflow-hidden rounded-[32px] border border-neutral-200/70 bg-gradient-to-br from-[#12ffe9] via-[#0ad8ff] to-[#28f2ff] px-10 py-12 text-center shadow-[0_55px_160px_-85px_rgba(10,216,232,0.62)] backdrop-blur-sm dark:border-white/10 dark:bg-gradient-to-br dark:from-[#00a6be] dark:via-[#007a90] dark:to-[#025068] dark:shadow-[0_65px_195px_-110px_rgba(10,216,232,0.78)]'>
              <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(18,255,233,0.48),rgba(255,255,255,0)_72%)] opacity-85 blur-[150px] dark:bg-[radial-gradient(circle,_rgba(10,216,232,0.5),rgba(0,19,28,0)_76%)]' />

              <div class='relative z-10 space-y-5'>
                <span class='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-blue-500/15 via-neon-purple-500/15 to-neon-pink-500/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-neutral-600 dark:text-neutral-200'>
                  {hub.subtitle}
                </span>
                <h3 class='text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white'>
                  {hub.title}
                </h3>
                <ul class='mx-auto flex w-full max-w-sm flex-col gap-3 text-sm text-neutral-600 dark:text-neutral-200'>
                  {hub.bullets.map((bullet) => (
                    <li key={bullet} class='flex items-center justify-center gap-3 text-left'>
                      <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_10px_rgba(129,140,248,0.7)]' />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>

          <FlowDivider />
        </div>

        <div class='flex flex-col gap-5 text-left'>
          <ColumnLabel value={outputsLabel} />
          <div class='grid gap-4 sm:grid-cols-2 lg:grid-cols-1'>
            {outputs.map((group, index) => (
              <article
                key={group.title}
                class='relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white px-6 py-6 shadow-[0_30px_110px_-70px_rgba(236,72,153,0.25)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900/80 dark:shadow-[0_40px_130px_-80px_rgba(236,72,153,0.5)]'
              >
                <div
                  class={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                    outputTopBarGradients[index % outputTopBarGradients.length]
                  } opacity-90`}
                />
                <h3 class='text-lg font-semibold text-neutral-900 dark:text-white'>
                  {group.title}
                </h3>
                <div class='mt-3 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-300'>
                  {group.items.map((item) => (
                    <span
                      key={item}
                      class='rounded-full bg-neutral-100 px-3 py-1 dark:bg-white/10 dark:text-white'
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionSurface>
  );
}
