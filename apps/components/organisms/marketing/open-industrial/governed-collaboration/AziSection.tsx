import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';

import { governedCollaborationContent } from '../../../../../../src/marketing/liberty/governed-collaboration.ts';

export default function GovernedCollaborationAziSection(): JSX.Element {
  const { headline, intro, capabilities, conversation, assurances } =
    governedCollaborationContent.azi;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 text-white'
      class='relative overflow-hidden border-y border-white/10 bg-[#030615]'
    >
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.22),transparent_70%)] blur-[210px]'
      />

      <div class='relative z-10 space-y-4'>
        <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
          {headline}
        </h2>
        <p class='max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg'>
          {intro}
        </p>
      </div>

      <ul class='relative z-10 grid gap-4 text-sm text-white/80 sm:grid-cols-3'>
        {capabilities.map((capability) => (
          <li
            key={capability}
            class='rounded-3xl border border-white/10 bg-white/5 p-5 leading-relaxed shadow-[0_26px_110px_-90px_rgba(59,130,246,0.6)]'
          >
            {capability}
          </li>
        ))}
      </ul>

      <div class='relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'>
        <div class='space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm leading-relaxed text-white/85 shadow-[0_26px_110px_-90px_rgba(236,72,153,0.6)]'>
          <p class='text-xs uppercase tracking-[0.32em] text-white/60'>
            Conversation
          </p>
          <ul class='space-y-4'>
            {conversation.map((line, index) => (
              <li key={`${line.speaker}-${index}`} class='space-y-1'>
                <p class='text-xs uppercase tracking-[0.32em] text-white/55'>
                  {line.speaker === 'azi' ? 'Azi Inner Voice' : 'Operations Leader'}
                </p>
                <p
                  class={`rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80 ${
                    line.speaker === 'azi'
                      ? 'shadow-[0_20px_70px_-50px_rgba(236,72,153,0.7)]'
                      : 'shadow-[0_18px_60px_-50px_rgba(59,130,246,0.6)]'
                  }`}
                >
                  {line.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div class='space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm leading-relaxed text-white/80 shadow-[0_26px_110px_-90px_rgba(59,130,246,0.6)]'>
          <p class='text-xs uppercase tracking-[0.32em] text-white/60'>
            Assurance Checks
          </p>
          <ul class='space-y-3'>
            {assurances.map((assurance) => (
              <li
                key={assurance}
                class='flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4'
              >
                <span class='mt-1 h-2 w-2 flex-none rounded-full bg-neon-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.8)]' />
                <span>{assurance}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionSurface>
  );
}
