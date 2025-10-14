import { JSX } from 'preact';

import { MarketingPreHeadline } from '@o-industrial/atomic/atoms';
import { MarketingSectionShell } from '@o-industrial/atomic/molecules';
import { productionManagementIntegrationSteps } from '../../../../../../../src/marketing/solutions/production-management.ts';

const stepAccentGradients = [
  'from-violet-500 via-purple-500 to-fuchsia-500',
  'from-neon-blue-500 via-neon-purple-500 to-neon-pink-500',
  'from-rose-500 via-pink-500 to-purple-500',
  'from-indigo-500 via-blue-500 to-sky-400',
  'from-amber-500 via-orange-500 to-pink-500',
];

export default function ProductionManagementIntegrationOverviewSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='neutral'>
      <div class='space-y-12 text-neutral-700 dark:text-neutral-200'>
        <div class='mx-auto max-w-3xl space-y-4 text-center'>
          <MarketingPreHeadline value='Systems Connected' />
          <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
            Unite MES, SCADA, and Genealogy Into One Narrative
          </h2>
          <p class='text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300'>
            Tie production logs, downtime events, and genealogy data together so every KPI carries
            its own explanation.
          </p>
        </div>

        <ol class='mx-auto grid w-full max-w-4xl gap-4 text-left sm:grid-cols-2'>
          {productionManagementIntegrationSteps.map((step, index) => (
            <li
              key={step}
              class='relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white/90 px-5 py-5 shadow-[0_38px_140px_-110px_rgba(99,102,241,0.3)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900/80 dark:shadow-[0_55px_180px_-130px_rgba(168,85,247,0.45)]'
            >
              <div
                class={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                  stepAccentGradients[index % stepAccentGradients.length]
                } opacity-95`}
              />
              <div class='flex items-start gap-4'>
                <span class='mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 text-sm font-semibold text-neutral-700 dark:text-neutral-200'>
                  {index + 1}
                </span>
                <span class='text-sm font-medium leading-relaxed text-neutral-700 dark:text-neutral-200'>
                  {step}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <div class='mx-auto max-w-4xl rounded-3xl border border-neutral-200/70 bg-white/90 p-8 text-left shadow-[0_38px_140px_-110px_rgba(99,102,241,0.3)] dark:border-white/10 dark:bg-neutral-900/80 dark:text-neutral-100'>
          <h3 class='text-lg font-semibold tracking-tight text-neutral-900 dark:text-white'>
            Cross-Line Performance Layer
          </h3>
          <p class='mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300'>
            Feed the same governed dataset into dashboards, KPI endpoints, and root-cause analysis
            so every team works from the same playbook.
          </p>
        </div>
      </div>
    </MarketingSectionShell>
  );
}
