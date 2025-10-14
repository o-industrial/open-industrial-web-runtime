import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';

import { MarketingActionGroup } from '../../../../shared/marketing/MarketingActions.tsx';
import { workspaceLibertyContent } from '../../../../../../src/marketing/liberty/index.ts';

export default function WorkspaceLibertyQuickWinsSection(): JSX.Element {
  const { eyebrow, headline, intro, cards, cta } = workspaceLibertyContent.quickWins;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 text-white'
      class='relative overflow-hidden border-y border-white/10 bg-[#050713]'
    >
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#38bdf833,transparent_70%)] blur-[220px]'
      />

      <div class='relative z-10 flex flex-col gap-6 text-center md:text-left'>
        <span class='inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-neon-blue-100/80 md:self-start'>
          <span class='h-2 w-2 rounded-full bg-neon-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.85)]' />
          {eyebrow}
        </span>
        <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
          {headline}
        </h2>
        <p class='mx-auto max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg md:mx-0'>
          {intro}
        </p>
        <MarketingActionGroup primary={cta} align='start' class='md:justify-start' />
      </div>

      <div class='relative z-10 grid gap-6 md:grid-cols-2'>
        {cards.map((card) => (
          <article
            key={card.title}
            class='group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 text-left shadow-[0_60px_180px_-140px_rgba(59,130,246,0.6)] transition-transform duration-200 hover:-translate-y-1 hover:bg-white/8'
          >
            <div class='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 opacity-90' />
            <h3 class='text-xl font-semibold text-white'>{card.title}</h3>
            <p class='text-sm font-semibold uppercase tracking-[0.24em] text-white/60'>
              Prompt
            </p>
            <p class='rounded-2xl bg-white/8 px-5 py-3 text-sm text-white/80 shadow-[0_25px_90px_-75px_rgba(129,140,248,0.6)]'>
              {card.prompt}
            </p>
            <p class='text-sm leading-relaxed text-white/70'>{card.description}</p>
          </article>
        ))}
      </div>
    </SectionSurface>
  );
}
