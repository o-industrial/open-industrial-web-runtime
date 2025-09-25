import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../src/marketing/home.ts';

const PRE_HEADLINE_CLASS = 'text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400';

export default function AIConversationsSection(): JSX.Element {
  const { preHeadline, headline, body, examples } = homeContent.azi;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 py-20 text-center'
      class='border-y border-neutral-200/60 bg-white dark:border-white/10 dark:bg-neutral-950'
    >
      <div class='space-y-4'>
        <span class={PRE_HEADLINE_CLASS}>{preHeadline}</span>
        <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
          {headline}
        </h2>
        <p class='mx-auto max-w-2xl text-base sm:text-lg'>{body}</p>
      </div>

      <ul class='grid w-full gap-4 sm:grid-cols-3'>
        {examples.map((example) => (
          <li
            key={example}
            class='rounded-2xl border border-neutral-200/70 bg-white px-5 py-4 text-left text-sm shadow-sm dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_25px_70px_-45px_rgba(15,23,42,0.9)]'
          >
            <span class='block font-mono text-xs uppercase tracking-[0.2em] text-neutral-400'>Prompt</span>
            <span class='mt-2 block text-base font-medium'>{example}</span>
          </li>
        ))}
      </ul>
    </SectionSurface>
  );
}