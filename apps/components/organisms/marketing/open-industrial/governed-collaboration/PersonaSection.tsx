import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';

import { governedCollaborationContent } from '../../../../../../src/marketing/liberty/governed-collaboration.ts';

export default function GovernedCollaborationPersonaSection(): JSX.Element {
  const { eyebrow, headline, intro, cards } = governedCollaborationContent.personas;

  return (
    <SectionSurface
      tone='muted'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 text-white'
      class='relative overflow-hidden border-y border-white/10 bg-[#050816]'
    >
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),transparent_68%)] blur-[180px]'
      />

      <div class='relative z-10 space-y-4'>
        <span class='inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-neon-blue-100/80'>
          <span class='h-2 w-2 rounded-full bg-neon-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.85)]' />
          {eyebrow}
        </span>
        <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
          {headline}
        </h2>
        <p class='max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg'>
          {intro}
        </p>
      </div>

      <div class='relative z-10 grid gap-6 lg:grid-cols-3'>
        {cards.map((card) => (
          <article
            key={card.id}
            class='flex h-full flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 text-left text-white/80 shadow-[0_28px_110px_-85px_rgba(59,130,246,0.65)] backdrop-blur'
          >
            <header class='space-y-3 text-white'>
              <span class='inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-white/60'>
                <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-purple-500 via-neon-blue-500 to-neon-pink-500 shadow-[0_0_12px_rgba(129,140,248,0.7)]' />
                {card.label}
              </span>
              <div>
                <p class='text-xs uppercase tracking-[0.32em] text-white/55'>
                  {card.role}
                </p>
                <h3 class='mt-1 text-xl font-semibold text-white sm:text-2xl'>
                  {card.headline}
                </h3>
              </div>
            </header>

            <dl class='space-y-3 text-sm leading-relaxed'>
              <div class='rounded-2xl border border-white/10 bg-white/5 p-4'>
                <dt class='text-xs uppercase tracking-[0.32em] text-white/60'>Pain</dt>
                <dd class='mt-1 text-white/80'>
                  {card.pain}
                </dd>
              </div>
              <div class='rounded-2xl border border-white/10 bg-white/5 p-4'>
                <dt class='text-xs uppercase tracking-[0.32em] text-white/60'>Liberty</dt>
                <dd class='mt-1 text-white/80'>
                  {card.liberty}
                </dd>
              </div>
              <div class='rounded-2xl border border-white/10 bg-white/5 p-4'>
                <dt class='text-xs uppercase tracking-[0.32em] text-white/60'>Outcome</dt>
                <dd class='mt-1 text-white/80'>
                  {card.outcome}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </SectionSurface>
  );
}
