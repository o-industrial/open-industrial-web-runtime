import { JSX } from 'preact';

import { MarketingPreHeadline } from '../../../../../shared/MarketingPreHeadline.tsx';
import { MarketingSectionShell } from '../../../../../shared/MarketingSectionShell.tsx';
import { crossLinePerformanceProblem } from '../../../../../../../src/marketing/use-case/cross-line-performance.ts';

export default function CrossLinePerformanceProblemSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='lavender'>
      <div class='mx-auto max-w-4xl space-y-5 text-center text-neutral-700 dark:text-neutral-200'>
        <MarketingPreHeadline value={crossLinePerformanceProblem.eyebrow} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {crossLinePerformanceProblem.title}
        </h2>
        {crossLinePerformanceProblem.description
          ? (
            <p class='text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300'>
              {crossLinePerformanceProblem.description}
            </p>
          )
          : null}
      </div>
    </MarketingSectionShell>
  );
}
