import { JSX } from 'preact';

import { MarketingPreHeadline } from '@o-industrial/atomic/atoms';
import { MarketingSectionShell } from '@o-industrial/atomic/molecules';
import { missionCopy } from '../../../../../../src/marketing/about.ts';

export default function MissionStatementSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='lavender'>
      <div class='mx-auto max-w-3xl space-y-5 text-center text-neutral-700 dark:text-neutral-200'>
        <MarketingPreHeadline value='Mission' />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {missionCopy.title}
        </h2>
        <p class='text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300'>
          {missionCopy.description}
        </p>
      </div>
    </MarketingSectionShell>
  );
}
