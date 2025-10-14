import { JSX } from 'preact';

import { ToggleQueryCard } from '@o-industrial/atomic/molecules';

import { MarketingPreHeadline } from '@o-industrial/atomic/atoms';
import { MarketingSectionShell } from '@o-industrial/atomic/molecules';
import { crossLinePerformanceToggleQueries } from '../../../../../../../src/marketing/use-case/cross-line-performance.ts';

export default function CrossLinePerformanceToggleSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='midnight'>
      <div class='space-y-12 text-white/80'>
        <div class='mx-auto max-w-4xl space-y-4 text-center'>
          <MarketingPreHeadline value='Azi Warm Queries' tone='inverse' />
          <h2 class='text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
            Ask Cross-Line Performance Questions in Natural Language
          </h2>
          <p class='text-base leading-relaxed text-white/75 sm:text-lg'>
            Use Azi to translate plain-English requests into governed KQL. Toggle views to see the
            precise queries behind every throughput and OEE insight.
          </p>
        </div>

        <div class='grid gap-6 md:grid-cols-2'>
          {crossLinePerformanceToggleQueries.map((toggle) => (
            <ToggleQueryCard
              expandable
              key={toggle.title}
              eyebrow={toggle.eyebrow}
              title={toggle.title}
              description={toggle.description}
              options={toggle.options}
              copy={toggle.copy}
              class='relative overflow-hidden border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10 text-white shadow-[0_45px_160px_-110px_rgba(14,165,233,0.45)] backdrop-blur-md'
            />
          ))}
        </div>
      </div>
    </MarketingSectionShell>
  );
}


