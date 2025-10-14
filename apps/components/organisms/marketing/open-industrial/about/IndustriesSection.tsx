import { JSX } from 'preact';

import { ChecklistGroup } from '@o-industrial/atomic/molecules';

import { MarketingPreHeadline } from '@o-industrial/atomic/atoms';
import { MarketingSectionShell } from '@o-industrial/atomic/molecules';
import { industriesServed } from '../../../../../../src/marketing/about.ts';

export default function IndustriesSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='neutral'>
      <div class='space-y-12 text-neutral-700 dark:text-neutral-200'>
        <div class='mx-auto max-w-3xl space-y-4 text-center'>
          <MarketingPreHeadline value='Industries' />
          <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
            Who we serve
          </h2>
          <p class='text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300'>
            We partner with OT engineers, process automation leads, lab managers, and industrial IT
            teams across manufacturing, life sciences, energy, utilities, and more.
          </p>
        </div>

        <ChecklistGroup items={industriesServed} columns={3} variant='light' />
      </div>
    </MarketingSectionShell>
  );
}
