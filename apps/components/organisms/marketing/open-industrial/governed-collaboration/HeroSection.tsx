import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';

import { MarketingActionGroup } from '../../../../shared/marketing/MarketingActions.tsx';
import { governedCollaborationContent } from '../../../../../../src/marketing/liberty/governed-collaboration.ts';

export default function GovernedCollaborationHeroSection(): JSX.Element {
  const { eyebrow, badge, headline, subhead, quote, stat, primaryCta, secondaryCta } =
    governedCollaborationContent.hero;

  return (
    <section class='relative isolate'>
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-purple-400/60 to-transparent'
      />

      <SectionSurface
        tone='default'
        width='wide'
        contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-20 text-white lg:flex-row lg:items-end'
        class='relative overflow-hidden border border-white/10 bg-gradient-to-br from-[#050b1f] via-[#0c1233] to-[#02040d] shadow-[0_180px_360px_-220px_rgba(129,140,248,0.75)]'
      >
        <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
          <div class='absolute left-[-24%] top-[-30%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.35),rgba(5,11,31,0)_78%)] blur-[220px]' />
          <div class='absolute right-[-20%] bottom-[-32%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.28),rgba(5,11,31,0)_78%)] blur-[210px]' />
        </div>

        <div class='relative z-10 flex flex-1 flex-col gap-8 text-center lg:text-left'>
          <div class='space-y-5'>
            <span class='inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/80 shadow-[0_18px_45px_-20px_rgba(129,140,248,0.6)]'>
              <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-purple-500 via-neon-blue-500 to-neon-pink-500 shadow-[0_0_12px_rgba(129,140,248,0.7)]' />
              {eyebrow}
              <span class='text-white/60'>/</span>
              {badge}
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
            class='justify-center lg:justify-start'
          />

          <div class='grid gap-6 text-left text-sm text-white/75 sm:grid-cols-2'>
            <div class='rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_25px_90px_-65px_rgba(129,140,248,0.7)]'>
              <p class='text-xs uppercase tracking-[0.42em] text-white/60'>Liberty Proof</p>
              <p class='mt-3 text-base font-semibold text-white'>
                {quote.quote}
              </p>
              <p class='mt-2 text-xs uppercase tracking-[0.32em] text-white/60'>
                {quote.role} · {quote.attribution}
              </p>
            </div>
            <div class='rounded-3xl border border-white/10 bg-gradient-to-br from-neon-blue-500/15 via-neon-purple-500/10 to-neon-pink-500/20 p-5 shadow-[0_25px_90px_-65px_rgba(59,130,246,0.7)]'>
              <p class='text-xs uppercase tracking-[0.42em] text-white/70'>
                Governance Signal
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
          <div class='relative w-full max-w-[420px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_80px_200px_-140px_rgba(129,140,248,0.8)] backdrop-blur-lg'>
            <div class='space-y-5'>
              <div class='flex items-center justify-between text-xs uppercase tracking-[0.32em] text-white/60'>
                <span>Invite</span>
                <span>Assign</span>
                <span>Empower</span>
              </div>
              <div class='space-y-4 rounded-2xl bg-white/5 p-4'>
                <div class='flex items-center justify-between text-sm text-white'>
                  <span>Governed Collaboration</span>
                  <span class='rounded-full bg-neon-purple-500/30 px-3 py-1 text-xs font-semibold text-neon-purple-100'>
                    Audit Ready
                  </span>
                </div>
                <p class='text-sm leading-relaxed text-white/70'>
                  Token scopes, Azi reviews, and workspace guardrails assemble evidence before a
                  single change hits production.
                </p>
                <div class='grid gap-2 text-xs text-white/65'>
                  <div class='flex items-center justify-between rounded-xl bg-white/5 px-4 py-2'>
                    <span>Invites</span>
                    <span class='font-semibold text-white'>Explainable</span>
                  </div>
                  <div class='flex items-center justify-between rounded-xl bg-white/5 px-4 py-2'>
                    <span>Roles</span>
                    <span class='font-semibold text-white'>Opinionated</span>
                  </div>
                  <div class='flex items-center justify-between rounded-xl bg-white/5 px-4 py-2'>
                    <span>Audits</span>
                    <span class='font-semibold text-white'>Automatic</span>
                  </div>
                </div>
              </div>
              <p class='text-[0.7rem] leading-relaxed text-white/60'>
                Azi keeps humans in the loop: every recommendation cites the policy, query, and
                scope it touches.
              </p>
            </div>
          </div>
        </div>
      </SectionSurface>
    </section>
  );
}
