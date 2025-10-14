import { JSX } from 'preact';

import { MarketingPreHeadline } from '@o-industrial/atomic/atoms';
import { MarketingSectionShell } from '@o-industrial/atomic/molecules';
import { deviceIntegrationProblem } from '../../../../../../../src/marketing/solutions/device-integration.ts';

export default function DeviceIntegrationProblemSection(): JSX.Element {
  return (
    <MarketingSectionShell
      variant='neutral'
      class='bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-[#020d1b] dark:via-[#051527] dark:to-[#010812]'
    >
      <div class='mx-auto max-w-4xl space-y-5 text-center text-neutral-700 dark:text-neutral-200'>
        <MarketingPreHeadline value={deviceIntegrationProblem.eyebrow} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {deviceIntegrationProblem.title}
        </h2>
        {deviceIntegrationProblem.description
          ? (
            <p class='text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300'>
              {deviceIntegrationProblem.description}
            </p>
          )
          : null}
      </div>
    </MarketingSectionShell>
  );
}


