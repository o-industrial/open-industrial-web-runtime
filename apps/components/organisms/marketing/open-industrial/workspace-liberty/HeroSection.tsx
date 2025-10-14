import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';

import { workspaceLibertyContent } from '../../../../../../src/marketing/liberty/index.ts';
import { MarketingActionGroup } from '../../../../shared/marketing/MarketingActions.tsx';

export default function WorkspaceLibertyHeroSection(): JSX.Element {
  const { headline, subhead, quote, stat, primaryCta, secondaryCta } = workspaceLibertyContent.hero;

  return (
    <section class='relative isolate'>
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue-400/60 to-transparent'
      />
      <SectionSurface
        tone='default'
        width='wide'
        contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-20 text-white lg:flex-row lg:items-end lg:gap-14'
        class='relative overflow-hidden border border-white/10 bg-gradient-to-br from-[#060b1c] via-[#0b1532] to-[#030712] shadow-[0_160px_340px_-200px_rgba(59,130,246,0.6)]'
      >
        <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
          <div class='absolute left-[-22%] top-[-35%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.35),rgba(6,11,28,0)_78%)] blur-[220px]' />
          <div class='absolute right-[-18%] bottom-[-28%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.28),rgba(6,11,28,0)_78%)] blur-[210px]' />
        </div>

        <div class='relative z-10 flex flex-1 flex-col gap-8 text-center lg:text-left'>
          <div class='space-y-5'>
            <span class='inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/80 shadow-[0_18px_45px_-20px_rgba(59,130,246,0.6)]'>
              <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_12px_rgba(129,140,248,0.7)]' />
              Workspace Liberty
            </span>
            <h1 class='text-balance text-4xl font-semibold tracking-tight sm:text-5xl'>
              {headline}
            </h1>
            <p class='text-lg leading-relaxed text-white/75 sm:text-xl'>
              {subhead}
            </p>
          </div>

          <MarketingActionGroup
            primary={primaryCta}
            secondary={secondaryCta}
            class='lg:justify-start'
          />

          <div class='grid gap-6 text-left text-sm text-white/75 sm:grid-cols-2'>
            <div class='rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_25px_90px_-65px_rgba(59,130,246,0.7)]'>
              <p class='text-base font-semibold text-white'>
                {quote.quote}
              </p>
            </div>
            <div class='rounded-3xl border border-white/10 bg-gradient-to-br from-neon-blue-500/15 via-neon-purple-500/15 to-neon-pink-500/15 p-5 shadow-[0_25px_90px_-65px_rgba(129,140,248,0.7)]'>
              <p class='text-xs uppercase tracking-[0.42em] text-white/70'>
                Case study proof
              </p>
              <p class='mt-2 text-lg font-semibold text-white'>
                {stat.headline}
              </p>
              <p class='mt-1 text-sm text-white/70'>
                {stat.supporting}
              </p>
            </div>
          </div>
        </div>

        <div class='relative z-10 flex flex-1 justify-center lg:justify-end'>
          <div class='relative w-full max-w-[420px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_60px_160px_-120px_rgba(129,140,248,0.8)] backdrop-blur-lg'>
            <div class='space-y-5'>
              <div class='flex items-center justify-between text-xs uppercase tracking-[0.32em] text-white/60'>
                <span>Save</span>
                <span>Commit</span>
                <span>Deploy</span>
              </div>
              <div class='space-y-4 rounded-2xl bg-white/5 p-4'>
                <div class='flex items-center justify-between text-sm text-white'>
                  <span>Workspace Liberty</span>
                  <span class='rounded-full bg-neon-blue-500/30 px-3 py-1 text-xs font-semibold text-neon-blue-100'>
                    Evaluation
                  </span>
                </div>
                <p class='text-sm leading-relaxed text-white/70'>
                  Azi guides each step so teams move from insight to deployment without waiting on
                  legacy gatekeepers.
                </p>
                <div class='flex items-center justify-between rounded-xl bg-white/5 px-4 py-2 text-xs text-white/60'>
                  <span>Diff preview</span>
                  <span>Rollback ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionSurface>
    </section>
  );
}
