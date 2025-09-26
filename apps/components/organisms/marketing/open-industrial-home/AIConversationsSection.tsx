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

const promptGlow = [
  'bg-neon-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]',
  'bg-neon-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]',
  'bg-neon-pink-500 shadow-[0_0_10px_rgba(244,114,182,0.6)]',
];

export default function AIConversationsSection(): JSX.Element {
  const { preHeadline, headline, body, examples } = homeContent.azi;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 py-20 text-center'
      class='relative overflow-hidden border-y border-neutral-200/70 bg-gradient-to-r from-[#f9f5ff] via-white to-[#f0f7ff] shadow-[0_70px_220px_-140px_rgba(236,72,153,0.35)] dark:border-white/10 dark:bg-gradient-to-r dark:from-[#0b1023] dark:via-[#0d152a] dark:to-[#0a1322] dark:shadow-[0_90px_240px_-150px_rgba(236,72,153,0.45)]'
    >
      <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(236,72,153,0.12),rgba(255,255,255,0)_72%)] opacity-80 blur-[130px] dark:bg-[radial-gradient(circle,_rgba(236,72,153,0.26),rgba(8,12,24,0)_78%)]' />

      <div class='relative z-10 space-y-4 text-neutral-700 dark:text-neutral-200'>
        <PreHeadline value={preHeadline} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {headline}
        </h2>
        <p class='mx-auto max-w-2xl text-base sm:text-lg'>{body}</p>
      </div>

      <ul class='relative z-10 grid w-full gap-4 sm:grid-cols-3'>
        {examples.map((example, index) => (
          <li
            key={example}
            class='rounded-2xl border border-neutral-200/70 bg-white px-5 py-5 text-left text-sm shadow-[0_25px_80px_-50px_rgba(99,102,241,0.45)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_35px_90px_-60px_rgba(59,130,246,0.6)]'
          >
            <span class='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-blue-500/18 via-neon-purple-500/18 to-neon-pink-500/18 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-neon-purple-500 dark:from-neon-blue-500/25 dark:via-neon-purple-500/25 dark:to-neon-pink-500/25 dark:text-neon-purple-200'>
              <span class={`h-1.5 w-1.5 rounded-full ${promptGlow[index % promptGlow.length]}`} />
              Prompt
            </span>
            <span class='mt-3 block text-base font-medium text-neutral-900 dark:text-white'>{example}</span>
          </li>
        ))}
      </ul>
    </SectionSurface>
  );
}