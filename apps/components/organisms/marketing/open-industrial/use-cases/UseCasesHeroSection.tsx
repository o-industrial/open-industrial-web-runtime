import { JSX } from 'preact';

import { MarketingPreHeadline } from '@o-industrial/atomic/atoms';
import { MarketingSectionShell } from '@o-industrial/atomic/molecules';

export default function UseCasesHeroSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='midnight' width='wide'>
      <div class='mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-2 text-center text-white/80'>
        <MarketingPreHeadline value='Workflow use cases' tone='inverse' />
        <h1 class='text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl'>
          See governed workflows in motion
        </h1>
        <p class='text-base leading-relaxed text-white/75 sm:text-lg'>
          Dive into outcome-driven walkthroughs that pair real telemetry, warm queries, and demo
          steps -- so you can experience Open Industrial value in minutes.
        </p>
      </div>
    </MarketingSectionShell>
  );
}
