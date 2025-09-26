import { JSX } from 'preact';

import { MarketingPreHeadline } from '../../../../shared/MarketingPreHeadline.tsx';
import { MarketingSectionShell } from '../../../../shared/MarketingSectionShell.tsx';

export default function UseCaseHeroSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='midnight' width='wide'>
      <div class='mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-2 text-center text-white/80'>
        <MarketingPreHeadline value='Use cases' tone='inverse' />
        <h1 class='text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl'>
          Explore industrial intelligence in action
        </h1>
        <p class='text-base leading-relaxed text-white/75 sm:text-lg'>
          Dive into curated stories that show how Open Industrial unlocks governed insights across
          batch quality, maintenance, and production performance.
        </p>
        <div class='flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/60'>
          <span class='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/80'>
            <span class='h-2 w-2 rounded-full bg-neon-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.7)]' />
            Batch quality
          </span>
          <span class='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/80'>
            <span class='h-2 w-2 rounded-full bg-neon-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.7)]' />
            Maintenance
          </span>
          <span class='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/80'>
            <span class='h-2 w-2 rounded-full bg-neon-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.7)]' />
            Performance
          </span>
        </div>
      </div>
    </MarketingSectionShell>
  );
}
