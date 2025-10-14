import { JSX } from 'preact';

import { MarketingPreHeadline } from '@o-industrial/atomic/atoms';
import { MarketingSectionShell } from '@o-industrial/atomic/molecules';
import { downtimeDiagnosisProblem } from '../../../../../../../src/marketing/use-case/downtime-diagnosis.ts';

export default function DowntimeDiagnosisProblemSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='lavender'>
      <div class='mx-auto max-w-4xl space-y-5 text-center text-neutral-700 dark:text-neutral-200'>
        <MarketingPreHeadline value={downtimeDiagnosisProblem.eyebrow} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {downtimeDiagnosisProblem.title}
        </h2>
        {downtimeDiagnosisProblem.description
          ? (
            <p class='text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300'>
              {downtimeDiagnosisProblem.description}
            </p>
          )
          : null}
      </div>
    </MarketingSectionShell>
  );
}
