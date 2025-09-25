import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../src/marketing/home.ts';

function PreHeadline({ value }: { value?: string }): JSX.Element | null {
  if (!value) {
    return null;
  }

  return (
    <span class='inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-neutral-600 dark:text-neutral-300'>
      <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_10px_rgba(129,140,248,0.45)]' />
      {value}
    </span>
  );
}

export default function AIConversationsSection(): JSX.Element {
  const { preHeadline, headline, body, examples } = homeContent.azi;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 py-20 text-center'
      class='border-y border-neutral-200/70 bg-white dark:border-white/10 dark:bg-neutral-950'
    >
      <div class='space-y-4'>
        <PreHeadline value={preHeadline} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {headline}
        </h2>
        <p class='mx-auto max-w-2xl text-base text-neutral-600 sm:text-lg dark:text-neutral-300'>{body}</p>
      </div>

      <ul class='grid w-full gap-4 sm:grid-cols-3'>
        {examples.map((example) => (
          <li
            key={example}
            class='rounded-2xl border border-neutral-200/70 bg-white px-5 py-5 text-left text-sm shadow-sm transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_25px_70px_-45px_rgba(15,23,42,0.9)]'
          >
            <span class='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-blue-500/15 to-neon-purple-500/15 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-neon-purple-500 dark:from-neon-blue-500/25 dark:to-neon-purple-500/25 dark:text-neon-purple-200'>
              <span class='h-1.5 w-1.5 rounded-full bg-neon-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.85)]' />
              Prompt
            </span>
            <span class='mt-3 block text-base font-medium text-neutral-900 dark:text-white'>{example}</span>
          </li>
        ))}
      </ul>
    </SectionSurface>
  );
}