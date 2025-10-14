import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';

import { MarketingActionGroup } from '../../../../shared/marketing/MarketingActions.tsx';
import { governedCollaborationContent } from '../../../../../../src/marketing/liberty/governed-collaboration.ts';

export default function GovernedCollaborationCtaStack(): JSX.Element {
  const { preheadline, headline, subhead, primaryCta, secondaryCta, proofPoints } =
    governedCollaborationContent.ctaStack;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 text-white text-center'
      class='relative overflow-hidden border border-white/10 bg-gradient-to-br from-[#050713] via-[#101b36] to-[#02050d] shadow-[0_200px_400px_-240px_rgba(59,130,246,0.7)]'
    >
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.24),transparent_70%)] blur-[220px]'
      />

      <div class='relative z-10 space-y-4'>
        <span class='inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/70'>
          <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-purple-500 via-neon-blue-500 to-neon-pink-500 shadow-[0_0_12px_rgba(129,140,248,0.7)]' />
          {preheadline}
        </span>
        <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
          {headline}
        </h2>
        <p class='mx-auto max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg'>
          {subhead}
        </p>
      </div>

      <MarketingActionGroup primary={primaryCta} secondary={secondaryCta} class='justify-center' />

      <div class='relative z-10 grid gap-4 text-left text-sm text-white/75 sm:grid-cols-3'>
        {proofPoints.map((point) => (
          <div
            key={point}
            class='rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_32px_110px_-95px_rgba(129,140,248,0.65)]'
          >
            {point}
          </div>
        ))}
      </div>
    </SectionSurface>
  );
}
