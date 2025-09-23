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
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6'
      class='relative overflow-hidden border-y border-white/10 bg-[radial-gradient(circle_at_top,_rgba(78,70,160,0.28),_rgba(8,10,20,0)),radial-gradient(circle_at_bottom,_rgba(52,211,153,0.18),_rgba(10,12,24,0)),linear-gradient(160deg,_rgba(7,9,20,0.96),_rgba(4,6,14,0.92))] py-24 text-center text-white'
    >
      <SectionHeader
        {...homeContent.valuePropositionHeading}
        align='center'
        class='relative mx-auto max-w-3xl text-center'
        title={(
          <span class='block text-balance leading-tight'>
            <span class='block text-sm font-semibold uppercase tracking-[0.34em] text-white/55'>Unified operational intelligence</span>
            <span class='mt-4 block text-3xl font-semibold sm:text-[2.6rem]'>
              Governing data from control room to boardroom
            </span>
            <span class='mt-2 inline-block bg-gradient-to-r from-neon-blue-400 via-neon-purple-500 to-emerald-400 bg-clip-text text-base font-medium text-transparent'>
              Metrics ready for every workflow
            </span>
          </span>
        )}
        description={(
          <span class='mt-6 block text-base text-white/70'>
            Open Industrial ingests live telemetry and orchestrates governed activation across your operational stack.
          </span>
        )}
      />
      <div class='grid w-full gap-6 md:grid-cols-3'>
        {metrics.map((metric) => (
          <article
            key={metric.label}
            class='group relative overflow-hidden rounded-[24px] border border-white/12 bg-[linear-gradient(130deg,rgba(19,23,44,0.92),rgba(8,11,26,0.96))] p-6 text-left shadow-[0_36px_140px_-110px_rgba(10,14,42,0.95)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_56px_170px_-120px_rgba(18,26,76,0.95)] sm:text-center'
          >
            <div
              aria-hidden='true'
              class='pointer-events-none absolute -top-16 right-[-18%] h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(130,127,255,0.38),rgba(255,255,255,0)_70%)] opacity-0 blur-[110px] transition-opacity duration-500 group-hover:opacity-100'
            />
            <div class='relative space-y-3'>
              <div class='text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/55'>
                {metric.label}
              </div>
              <div class='text-4xl font-semibold text-white sm:text-[2.65rem]'>
                {metric.value}
              </div>
              <p class='text-sm text-white/65'>
                {metric.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionSurface>
  );
}
