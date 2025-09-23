import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { SectionHeader } from '@o-industrial/common/atomic/molecules';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function UnifiedMetricsSection(): JSX.Element {
  const integrationCount = homeContent.integrationColumns.reduce(
    (total, column) => total + column.items.length,
    0,
  );

  const metrics = [
    {
      label: 'Pre-built integrations',
      value: `${integrationCount}+`,
      description:
        'Protocols, middleware, and line-of-business systems ready to connect.',
    },
    {
      label: 'Steps to governed insight',
      value: `${homeContent.howItWorksSteps.length}`,
      description: 'From ingestion to activation in a guided, explainable flow.',
    },
    {
      label: 'Cloud control options',
      value: `${homeContent.cloudControlItems.length}`,
      description:
        'Run in your tenant, shared cloud, or fully managed environments.',
    },
  ];

  return (
    <SectionSurface
      tone='muted'
      width='wide'
      contentClass='max-w-6xl'
      class='relative overflow-hidden border-y border-white/60 bg-gradient-to-r from-white via-[#eef5ff] to-[#fbf0ff] text-center shadow-[0_45px_140px_-100px_rgba(71,45,171,0.55)] dark:border-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10'
    >
      <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
        <div class='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/10' />
        <div class='absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/50 to-transparent dark:via-white/10' />
      </div>
      <div class='relative space-y-12'>
        <SectionHeader
          {...homeContent.valuePropositionHeading}
          align='center'
          class='mx-auto max-w-3xl text-center'
          title={(
            <span class='block text-balance leading-tight'>
              <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-emerald-400 bg-clip-text text-transparent'>
                Unified operational intelligence
              </span>
              <span class='mt-2 block text-neutral-900 dark:text-white'>
                Governing data from control room to boardroom
              </span>
            </span>
          )}
        />
        <div class='grid gap-6 sm:grid-cols-3'>
          {metrics.map((metric) => (
            <div
              key={metric.label}
              class='group relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_30px_90px_-70px_rgba(62,45,171,0.6)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-white/10'
            >
              <div
                aria-hidden='true'
                class='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(167,139,250,0.32),_rgba(255,255,255,0)_70%)] opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_top,_rgba(167,139,250,0.45),_rgba(255,255,255,0)_72%)]'
              />
              <div class='relative space-y-2 text-left sm:text-center'>
                <div class='text-xs uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500'>
                  {metric.label}
                </div>
                <div class='text-4xl font-semibold text-neutral-900 dark:text-white'>
                  {metric.value}
                </div>
                <p class='text-sm text-neutral-600 dark:text-neutral-300'>
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionSurface>
  );
}

