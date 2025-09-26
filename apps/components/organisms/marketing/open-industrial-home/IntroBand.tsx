import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function IntroBand(): JSX.Element {
  const { headline, body } = homeContent.intro;

  return (
    <SectionSurface
      tone='muted'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-14 text-center text-neutral-900 dark:text-white'
      class='relative overflow-hidden border-y border-neutral-200/70 bg-white shadow-[0_45px_140px_-120px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-slate-950 dark:shadow-[0_55px_180px_-140px_rgba(15,23,42,0.55)]'
    >
      <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(129,140,248,0.08),rgba(255,255,255,0)_72%)] opacity-70 blur-[160px] dark:bg-[radial-gradient(circle,_rgba(129,140,248,0.18),rgba(2,6,23,0)_74%)]' />
      <div class='relative z-10 space-y-3 text-neutral-700 dark:text-neutral-300'>
        <h2 class='text-balance text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-white'>
          {headline}
        </h2>
        <p class='text-base sm:text-lg'>{body}</p>
      </div>
    </SectionSurface>
  );
}
