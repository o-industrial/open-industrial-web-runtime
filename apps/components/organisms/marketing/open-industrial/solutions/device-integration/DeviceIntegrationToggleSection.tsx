import { JSX } from 'preact';

import { ToggleQueryCard } from '@o-industrial/atomic/molecules';

import { MarketingPreHeadline } from '../../../../shared/MarketingPreHeadline.tsx';
import { MarketingSectionShell } from '../../../../shared/MarketingSectionShell.tsx';
import { deviceIntegrationToggleQueries } from '../../../../../../../../src/marketing/solutions/device-integration.ts';

export default function DeviceIntegrationToggleSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='midnight'>
      <div class='space-y-12 text-white/80'>
        <div class='mx-auto max-w-4xl space-y-4 text-center'>
          <MarketingPreHeadline value='Governed Warm Queries' tone='inverse' />
          <h2 class='text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
            Ask Governance Questions in Plain English
          </h2>
          <p class='text-base leading-relaxed text-white/75 sm:text-lg'>
            Reveal newly onboarded sensors, governance gaps, and enforced token scopes with
            explainable queries you can share.
          </p>
        </div>

        <div class='grid gap-6 md:grid-cols-2'>
          {deviceIntegrationToggleQueries.map((toggle) => (
            <ToggleQueryCard
              expandable
              key={toggle.title}
              eyebrow={toggle.eyebrow}
              title={toggle.title}
              description={toggle.description}
              options={toggle.options}
              copy={toggle.copy}
              class='relative overflow-hidden border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10 text-white shadow-[0_45px_160px_-110px_rgba(59,130,246,0.45)] backdrop-blur-md'
            />
          ))}
        </div>
      </div>
    </MarketingSectionShell>
  );
}
