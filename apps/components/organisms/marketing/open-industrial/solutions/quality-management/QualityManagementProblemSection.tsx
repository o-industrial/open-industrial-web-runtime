import { JSX } from 'preact';

import { MarketingPreHeadline } from '@o-industrial/atomic/atoms';
import { MarketingSectionShell } from '@o-industrial/atomic/molecules';
import { qualityManagementProblem } from '../../../../../../../src/marketing/solutions/quality-management.ts';

export default function QualityManagementProblemSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='lavender'>
      <div class='mx-auto max-w-4xl space-y-5 text-center text-neutral-700 dark:text-neutral-200'>
        <MarketingPreHeadline value={qualityManagementProblem.eyebrow} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {qualityManagementProblem.title}
        </h2>
        {qualityManagementProblem.description
          ? (
            <p class='text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300'>
              {qualityManagementProblem.description}
            </p>
          )
          : null}
      </div>
    </MarketingSectionShell>
  );
}
