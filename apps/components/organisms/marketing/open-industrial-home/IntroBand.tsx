import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function IntroBand(): JSX.Element {
  const { headline, body } = homeContent.intro;

  return (
    <SectionSurface
      tone='muted'
      width='wide'
      contentClass='mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-14 text-center'
      class='relative border-y border-neutral-200/70 bg-white dark:border-white/10 dark:bg-neutral-950'
    >
      <div class='pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 opacity-50' />
      <h2 class='text-balance text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-white'>
        {headline}
      </h2>
      <p class='text-base text-neutral-600 sm:text-lg dark:text-neutral-300'>{body}</p>
    </SectionSurface>
  );
}