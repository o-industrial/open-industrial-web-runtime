import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function IntroBand(): JSX.Element {
  const { headline, body } = homeContent.intro;

  return (
    <SectionSurface
      tone='muted'
      width='wide'
      contentClass='mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-14 text-center'
      class='border-y border-neutral-200/60 dark:border-white/10'
    >
      <h2 class='text-balance text-2xl font-semibold tracking-tight sm:text-3xl'>
        {headline}
      </h2>
      <p class='text-base sm:text-lg'>{body}</p>
    </SectionSurface>
  );
}