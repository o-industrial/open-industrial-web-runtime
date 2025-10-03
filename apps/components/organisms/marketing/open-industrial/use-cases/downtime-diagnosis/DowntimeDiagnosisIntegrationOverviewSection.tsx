import { JSX } from 'preact';

import { MarketingPreHeadline } from '../../../../../shared/MarketingPreHeadline.tsx';
import { MarketingSectionShell } from '../../../../../shared/MarketingSectionShell.tsx';
import { downtimeDiagnosisIntegrationSteps } from '../../../../../../../src/marketing/use-case/downtime-diagnosis.ts';

const stepAccentGradients = [
  'from-neon-blue-500 via-cyan-400 to-teal-400',
  'from-neon-purple-500 via-neon-blue-500 to-neon-pink-500',
  'from-neon-green-500 via-teal-400 to-cyan-400',
  'from-neon-orange-500 via-neon-pink-500 to-neon-purple-500',
  'from-neon-teal-500 via-neon-blue-500 to-neon-green-500',
];

export default function DowntimeDiagnosisIntegrationOverviewSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='neutral'>
      <div class='space-y-12 text-neutral-700 dark:text-neutral-200'>
        <div class='mx-auto max-w-3xl space-y-4 text-center'>
          <MarketingPreHeadline value='Integration Blueprint' />
          <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
            Bring Every Downtime Signal into One Hub
          </h2>
          <p class='text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300'>
            Open Industrial ingests and normalizes events from controls, historians, and
            manufacturing systems so you can correlate root causes without manual exports.
          </p>
        </div>

        <ol class='mx-auto grid w-full max-w-4xl gap-4 text-left sm:grid-cols-2'>
          {downtimeDiagnosisIntegrationSteps.map((step, index) => (
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
      </div>
    </MarketingSectionShell>
  );
}
