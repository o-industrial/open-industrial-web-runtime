import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';

import { governedCollaborationContent } from '../../../../../../src/marketing/liberty/governed-collaboration.ts';

export default function GovernedCollaborationDeepDiveSection(): JSX.Element {
  const { headline, intro, diagram, sections } = governedCollaborationContent.governanceDeepDive;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 text-white'
      class='relative overflow-hidden border-y border-white/10 bg-[#030610]'
    >
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.18),transparent_70%)] blur-[210px]'
      />

      <div class='relative z-10 space-y-4'>
        <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
          {headline}
        </h2>
        <p class='max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg'>
          {intro}
        </p>
      </div>

      <div class='relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]'>
        <aside class='flex h-full flex-col justify-between gap-4 rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-sm text-white/70 shadow-[0_26px_110px_-90px_rgba(236,72,153,0.5)]'>
          <div>
            <p class='text-xs uppercase tracking-[0.32em] text-white/60'>
              Diagram Request
            </p>
            <h3 class='mt-2 text-lg font-semibold text-white'>
              {diagram.caption}
            </h3>
            <p class='mt-3 text-sm leading-relaxed text-white/70'>
              Visual cue showing how invites move through approval, Azi review, and activation.
            </p>
          </div>
          <dl class='grid gap-3 text-xs uppercase tracking-[0.3em] text-white/55'>
            <div class='flex items-center justify-between rounded-2xl bg-white/5 px-4 py-2'>
              <dt>Asset</dt>
              <dd class='font-semibold text-white'>{diagram.id}</dd>
            </div>
            <div class='flex items-center justify-between rounded-2xl bg-white/5 px-4 py-2'>
              <dt>Owner</dt>
              <dd class='font-semibold text-white'>{diagram.owner}</dd>
            </div>
            <div class='flex items-center justify-between rounded-2xl bg-white/5 px-4 py-2'>
              <dt>Status</dt>
              <dd class='font-semibold text-white capitalize'>{diagram.status}</dd>
            </div>
          </dl>
        </aside>

        <div class='grid gap-6'>
          {sections.map((section) => (
            <article
              key={section.id}
              class='rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 shadow-[0_26px_110px_-90px_rgba(59,130,246,0.6)]'
            >
              <header class='space-y-2 text-white'>
                <span class='inline-flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-white/60'>
                  <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-pink-500 via-neon-purple-500 to-neon-blue-500 shadow-[0_0_12px_rgba(236,72,153,0.7)]' />
                  {section.title}
                </span>
                <h3 class='text-xl font-semibold text-white sm:text-2xl'>
                  {section.summary}
                </h3>
              </header>
              <ul class='mt-4 space-y-3 text-sm leading-relaxed'>
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    class='flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80'
                  >
                    <span class='mt-1 h-2 w-2 flex-none rounded-full bg-neon-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.9)]' />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </SectionSurface>
  );
}
