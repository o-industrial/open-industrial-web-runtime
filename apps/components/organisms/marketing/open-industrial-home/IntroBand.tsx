import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function IntroBand(): JSX.Element {
  const { headline, body } = homeContent.intro;

  return (
    <SectionSurface
      tone='muted'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-14 text-center'
      class='relative overflow-hidden border-y border-neutral-200/70 bg-gradient-to-r from-[#f4f8ff] via-white to-[#f7f1ff] shadow-[0_40px_120px_-110px_rgba(99,102,241,0.45)] dark:border-white/10 dark:bg-gradient-to-r dark:from-[#0b1220] dark:via-[#0d1528] dark:to-[#09101f] dark:shadow-[0_40px_140px_-110px_rgba(129,140,248,0.6)]'
    >
      <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(129,140,248,0.18),rgba(255,255,255,0)_72%)] opacity-80 blur-[120px] dark:bg-[radial-gradient(circle,_rgba(129,140,248,0.35),rgba(9,13,27,0)_74%)]' />
      <div class='relative z-10 space-y-3 text-neutral-700 dark:text-neutral-300'>
        <h2 class='text-balance text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-white'>
          {headline}
        </h2>
        <p class='text-base sm:text-lg'>{body}</p>
      </div>
    </SectionSurface>
  );
}