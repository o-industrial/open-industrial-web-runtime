import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../src/marketing/home.ts';

function PreHeadline({ value }: { value?: string }): JSX.Element | null {
  if (!value) {
    return null;
  }

  return (
    <span class='inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/70'>
      <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_10px_rgba(129,140,248,0.45)]' />
      {value}
    </span>
  );
}

function Headline({ value }: { value: string }): JSX.Element {
  const parts = value.split('->').map((part) => part.trim());

  if (parts.length !== 2) {
    return <>{value}</>;
  }

  const [start, end] = parts;

  return (
    <>
      <span>{start}</span>
      <span class='mx-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 via-cyan-300 to-sky-400 text-slate-900 shadow-[0_0_28px_rgba(10,216,232,0.45)] dark:text-slate-950'>
        <svg
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          class='h-4 w-4 text-slate-900 dark:text-white'
        >
          <path
            d='M5 12h14m0 0-5-5m5 5-5 5'
            stroke='currentColor'
            stroke-width='1.8'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
        <span class='sr-only'>to</span>
      </span>
      <span>{end}</span>
    </>
  );
}

export default function FutureVisionSection(): JSX.Element {
  const { preHeadline, headline, body, pillars } = homeContent.future;

  return (
    <SectionSurface
      tone='muted'
      width='wide'
      contentClass='mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-24 text-center text-white'
      class='relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#0f0a1f] via-[#171035] to-[#070415] shadow-[0_130px_320px_-190px_rgba(236,72,153,0.55)]'
    >
      <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(236,72,153,0.32),rgba(9,6,21,0)_78%)] opacity-85 blur-[190px]' />

      <div class='relative z-10 space-y-4 text-white/80'>
        <PreHeadline value={preHeadline} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
          <Headline value={headline} />
        </h2>
        <p class='text-base sm:text-lg text-white/75'>{body}</p>
      </div>

      <div class='relative z-10 grid gap-6 text-left sm:grid-cols-3'>
        {pillars.map((pillar) => (
          <article
            key={pillar.title}
            class='group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-sm shadow-[0_35px_120px_-70px_rgba(236,72,153,0.5)] backdrop-blur-md transition-transform duration-200 hover:-translate-y-1'
          >
            <div class='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 opacity-55' />
            <h3 class='text-lg font-semibold text-white'>{pillar.title}</h3>
            <p class='mt-3 text-white/70'>{pillar.body}</p>
          </article>
        ))}
      </div>
    </SectionSurface>
  );
}