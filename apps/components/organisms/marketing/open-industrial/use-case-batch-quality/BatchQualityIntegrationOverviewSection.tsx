import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { SectionHeader } from '@o-industrial/common/atomic/molecules';

import { batchQualityIntegrationSteps } from '../../../../../../src/marketing/use-case-batch-quality.ts';

export default function BatchQualityIntegrationOverviewSection(): JSX.Element {
  return (
    <SectionSurface
      tone='default'
      class='bg-gradient-to-br from-[#f7f9ff] via-white to-[#f4efff] py-20 dark:from-[#080c1f] dark:via-[#0f1533] dark:to-[#060916]'
    >
      <div class='mx-auto flex w-full max-w-6xl flex-col gap-16 px-6'>
        <div class='space-y-8 text-center'>
          <SectionHeader
            title='Unified system integration'
            description='Open Industrial connects across ERP, MES, QMS, and LIMS to unify the electronic batch record into a governed query layer.'
            align='center'
          />
          <ol class='mx-auto grid w-full max-w-3xl gap-3 text-left text-sm text-neutral-700 dark:text-neutral-300 sm:grid-cols-2'>
            {batchQualityIntegrationSteps.map((step, index) => (
              <li
                key={step}
                class='flex items-center gap-3 rounded-2xl border border-neutral-200/70 bg-white/80 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-neutral-900/60'
              >
                <span class='inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue-500 to-neon-purple-500 text-sm font-semibold text-white'>
                  {index + 1}
                </span>
                <span class='text-sm font-medium'>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div class='overflow-hidden rounded-3xl border border-neutral-200/60 bg-white shadow-[0_35px_120px_-80px_rgba(40,44,82,0.35)] dark:border-white/10 dark:bg-neutral-900/60'>
          <img
            src='/assets/marketing/batch-quality-compliance-diagram.jpg'
            alt='Batch quality and compliance integration diagram'
            data-eac-bypass-base
            class='h-full w-full object-cover'
          />
        </div>
      </div>
    </SectionSurface>
  );
}
