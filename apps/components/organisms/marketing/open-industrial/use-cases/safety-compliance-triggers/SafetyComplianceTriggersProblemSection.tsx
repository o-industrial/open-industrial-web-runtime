import { JSX } from 'preact';

import { MarketingPreHeadline } from '@o-industrial/atomic/atoms';
import { MarketingSectionShell } from '@o-industrial/atomic/molecules';
import { safetyComplianceTriggersProblem } from '../../../../../../../src/marketing/use-case/safety-compliance-triggers.ts';

export default function SafetyComplianceTriggersProblemSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='lavender'>
      <div class='mx-auto max-w-4xl space-y-5 text-center text-neutral-700 dark:text-neutral-200'>
        <MarketingPreHeadline value={safetyComplianceTriggersProblem.eyebrow} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {safetyComplianceTriggersProblem.title}
        </h2>
        {safetyComplianceTriggersProblem.description
          ? (
            <p class='text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300'>
              {safetyComplianceTriggersProblem.description}
            </p>
          )
          : null}
      </div>
    </MarketingSectionShell>
  );
}
