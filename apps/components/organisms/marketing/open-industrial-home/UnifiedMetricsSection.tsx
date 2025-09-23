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
      tone='emphasis'
      width='full'
      contentClass='relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-0 sm:px-6'
      class='relative overflow-hidden !bg-transparent py-28 px-0 text-center shadow-[0_60px_200px_-140px_rgba(12,18,36,0.85)]'
    >
      <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
        <div class='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,30,80,0.35),_rgba(5,7,16,0))] opacity-90' />
        <div class='absolute -top-32 left-1/2 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(76,76,255,0.3),_rgba(64,18,137,0)_70%)] blur-[200px]' />
        <div class='absolute inset-x-[-25%] bottom-[-48%] h-[36rem] bg-[radial-gradient(circle,_rgba(80,195,255,0.22),_rgba(8,11,26,0))] blur-[220px]' />
        <div class='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-60' />
        <div class='absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-50' />
        <div class='absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-50' />
      </div>
      <SectionHeader
        {...homeContent.valuePropositionHeading}
        align='center'
        class='relative mx-auto max-w-3xl text-center'
        title={(
          <span class='block text-balance leading-tight'>
            <span class='bg-gradient-to-r from-[#7e7bff] via-neon-blue-500 to-emerald-400 bg-clip-text text-transparent'>
              Unified operational intelligence
            </span>
            <span class='mt-3 block text-3xl font-semibold text-white md:text-4xl'>
              Governing data from control room to boardroom
            </span>
          </span>
        )}
        description={(
          <span class='mt-6 block text-base text-indigo-100/80'>
            Open Industrial ingests live telemetry and orchestrates governed activation across your operational stack.
          </span>
        )}
      />
      <div class='relative grid w-full gap-6 sm:grid-cols-3'>
        {metrics.map((metric) => (
          <article
            key={metric.label}
            class='group relative overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(140deg,rgba(18,25,49,0.82),rgba(10,14,32,0.94))] p-6 shadow-[0_32px_120px_-80px_rgba(12,18,42,0.9)] transition-transform duration-200 hover:-translate-y-1'
          >
            <div
              aria-hidden='true'
              class='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(130,127,255,0.32),rgba(255,255,255,0)_70%)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100'
            />
            <div class='relative space-y-3 text-left sm:text-center'>
              <div class='text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/55'>
                {metric.label}
              </div>
              <div class='text-4xl font-semibold text-white sm:text-[2.65rem]'>
                {metric.value}
              </div>
              <p class='text-sm text-indigo-100/80'>
                {metric.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionSurface>
  );
}
