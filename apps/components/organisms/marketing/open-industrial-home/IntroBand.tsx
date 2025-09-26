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
      class='relative overflow-hidden border-y border-neutral-200/80 bg-gradient-to-r from-[#f7faff] via-white to-[#f9f6ff] shadow-[0_60px_180px_-140px_rgba(129,140,248,0.25)] dark:border-white/10 dark:bg-gradient-to-r dark:from-[#070d18] dark:via-[#0a1223] dark:to-[#070d18] dark:shadow-[0_70px_210px_-150px_rgba(129,140,248,0.35)]'
    >
      <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(129,140,248,0.12),rgba(255,255,255,0)_74%)] opacity-70 blur-[140px] dark:bg-[radial-gradient(circle,_rgba(129,140,248,0.22),rgba(7,13,24,0)_72%)]' />
      <div class='relative z-10 space-y-3 text-neutral-700 dark:text-neutral-300'>
        <h2 class='text-balance text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-white'>
          {headline}
        </h2>
        <p class='text-base sm:text-lg'>{body}</p>
      </div>
    </SectionSurface>
  );
}