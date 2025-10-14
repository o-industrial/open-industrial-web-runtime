import { JSX } from 'preact';

import { MarketingPreHeadline } from '@o-industrial/atomic/atoms';
import { MarketingSectionShell } from '@o-industrial/atomic/molecules';
import { qualityManagementIntegrationSteps } from '../../../../../../../src/marketing/solutions/quality-management.ts';

const stepAccentGradients = [
  'from-neon-blue-500 via-cyan-400 to-teal-400',
  'from-neon-purple-500 via-neon-blue-500 to-neon-pink-500',
  'from-neon-green-500 via-teal-400 to-cyan-400',
  'from-neon-pink-500 via-neon-purple-500 to-neon-blue-500',
  'from-neon-orange-500 via-neon-pink-500 to-neon-purple-500',
];

export default function QualityManagementIntegrationOverviewSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='neutral'>
      <div class='space-y-12 text-neutral-700 dark:text-neutral-200'>
        <div class='mx-auto max-w-3xl space-y-4 text-center'>
          <MarketingPreHeadline value='Data Integration' />
          <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
            Connect Every Quality Record to One Governed Hub
          </h2>
          <p class='text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300'>
            Stitch batches, tests, deviations, and calibrations into a governed model so release
            decisions, CAPAs, and audits share the exact same context.
          </p>
        </div>

        <ol class='mx-auto grid w-full max-w-4xl gap-4 text-left sm:grid-cols-2'>
          {qualityManagementIntegrationSteps.map((step, index) => (
            <li
              key={step}
              class='relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white/90 px-5 py-5 shadow-[0_38px_140px_-110px_rgba(59,130,246,0.3)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900/80 dark:shadow-[0_55px_180px_-130px_rgba(129,140,248,0.45)]'
            >
              <div
                class={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                  stepAccentGradients[index % stepAccentGradients.length]
                } opacity-95`}
              />
              <div class='flex items-start gap-4'>
                <span class='mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue-500/20 via-neon-purple-500/20 to-neon-pink-500/20 text-sm font-semibold text-neutral-700 dark:text-neutral-200'>
                  {index + 1}
                </span>
                <span class='text-sm font-medium leading-relaxed text-neutral-700 dark:text-neutral-200'>
                  {step}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <div class='mx-auto max-w-4xl rounded-3xl border border-neutral-200/70 bg-white/90 p-8 text-left shadow-[0_38px_140px_-110px_rgba(59,130,246,0.3)] dark:border-white/10 dark:bg-neutral-900/80 dark:text-neutral-100'>
          <h3 class='text-lg font-semibold tracking-tight text-neutral-900 dark:text-white'>
            Audit Bundle Blueprint
          </h3>
          <p class='mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300'>
            Generate a deterministic release package with governed queries, deviation lineage,
            calibration state, and CAPA coverage in one click.
          </p>
        </div>
      </div>
    </MarketingSectionShell>
  );
}


