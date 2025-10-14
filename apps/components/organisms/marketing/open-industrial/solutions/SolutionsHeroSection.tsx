import { JSX } from 'preact';

import { MarketingPreHeadline } from '@o-industrial/atomic/atoms';
import { MarketingSectionShell } from '@o-industrial/atomic/molecules';

export default function SolutionsHeroSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='midnight' width='wide'>
      <div class='mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-2 text-center text-white/80'>
        <MarketingPreHeadline value='Solutions' tone='inverse' />
        <h1 class='text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl'>
          Match Open Industrial to your operations focus
        </h1>
        <p class='text-base leading-relaxed text-white/75 sm:text-lg'>
          Start with the domain where you need governed insight most -- then branch into the
          workflow-level use cases and demo paths that deliver value fastest.
        </p>
        <div class='flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/60'>
          <span class='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/80'>
            <span class='h-2 w-2 rounded-full bg-neon-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.7)]' />
            Quality
          </span>
          <span class='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/80'>
            <span class='h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.7)]' />
            Asset health
          </span>
          <span class='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/80'>
            <span class='h-2 w-2 rounded-full bg-neon-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.7)]' />
            Production
          </span>
          <span class='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/80'>
            <span class='h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]' />
            Device governance
          </span>
        </div>
      </div>
    </MarketingSectionShell>
  );
}
