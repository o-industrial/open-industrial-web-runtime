import { JSX } from 'preact';

import { StepsSection } from '@o-industrial/common/atomic/organisms';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function GovernedFlowSection(): JSX.Element {
  return (
    <StepsSection
      header={{
        eyebrow: 'From ingestion to activation',
        title: (
          <span class='block text-balance leading-tight text-white'>
            <span class='text-white/85'>How governed insight</span>{' '}
            <span class='bg-gradient-to-r from-neon-blue-400 via-neon-purple-500 to-neon-green-400 bg-clip-text text-transparent'>
              flows to action
            </span>
          </span>
        ),
        description: (
          <span class='block text-base text-neon-indigo-100/80'>
            Three steps to move explainable answers into production workflows without leaving your
            governed boundary.
          </span>
        ),
        align: 'center',
      }}
      steps={homeContent.howItWorksSteps}
      width='full'
      tone='emphasis'
      variant='dark'
      contentClass='max-w-6xl px-0 sm:px-6'
      class='border-y border-white/10 bg-gradient-to-b from-slate-950/90 via-slate-900/95 to-slate-950/90 py-28 px-0 text-center'
    />
  );
}
