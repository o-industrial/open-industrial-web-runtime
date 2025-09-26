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

const bulletGlows = [
  'bg-neon-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.75)]',
  'bg-neon-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.75)]',
  'bg-neon-pink-500 shadow-[0_0_10px_rgba(244,114,182,0.75)]',
];

export default function UnifiedFlowSection(): JSX.Element {
  const { preHeadline, headline, subhead, bullets } = homeContent.unifiedHub;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-20 text-center'
      class='relative overflow-hidden border-y border-neutral-200/70 bg-gradient-to-r from-[#eef9ff] via-white to-[#f9f5ff] shadow-[0_70px_220px_-150px_rgba(59,130,246,0.35)] dark:border-white/10 dark:bg-gradient-to-r dark:from-[#081425] dark:via-[#0c1a2f] dark:to-[#081425] dark:shadow-[0_90px_240px_-160px_rgba(59,130,246,0.55)]'
    >
      <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(59,130,246,0.18),rgba(255,255,255,0)_72%)] opacity-75 blur-[140px] dark:bg-[radial-gradient(circle,_rgba(139,92,246,0.3),rgba(8,12,24,0)_74%)]' />

      <div class='relative z-10 space-y-4 text-neutral-700 dark:text-neutral-200'>
        <PreHeadline value={preHeadline} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {headline}
        </h2>
        <p class='text-base sm:text-lg'>{subhead}</p>
      </div>

      <ul class='relative z-10 grid gap-4 sm:grid-cols-3'>
        {bullets.map((bullet, index) => (
          <li
            key={bullet}
            class='rounded-2xl border border-neutral-200/70 bg-white px-5 py-4 text-sm shadow-[0_25px_90px_-60px_rgba(59,130,246,0.35)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_30px_100px_-60px_rgba(99,102,241,0.55)]'
          >
            <div class='flex items-start gap-3 text-left text-neutral-700 dark:text-neutral-200'>
              <span class={`mt-1 h-2.5 w-2.5 rounded-full ${bulletGlows[index % bulletGlows.length]}`} />
              <span>{bullet}</span>
            </div>
          </li>
        ))}
      </ul>
    </SectionSurface>
  );
}