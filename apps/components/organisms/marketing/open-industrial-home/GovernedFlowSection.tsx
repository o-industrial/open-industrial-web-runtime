import { JSX } from 'preact';

import { StepsSection } from '@o-industrial/common/atomic/organisms';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function GovernedFlowSection(): JSX.Element {
  return (
    <StepsSection
      header={{
        eyebrow: 'From ingestion to activation',
        title: (
          <span class='block text-balance'>
            How governed insight flows to action
          </span>
        ),
        description:
          'Three steps to get governed answers into production workflows.',
        align: 'center',
      }}
      steps={homeContent.howItWorksSteps}
      width='wide'
      contentClass='max-w-6xl'
      class='relative overflow-hidden border-y border-white/60 bg-gradient-to-br from-white via-[#eef3ff] to-[#f8f1ff] shadow-[0_45px_140px_-100px_rgba(62,45,171,0.55)] dark:border-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10'
    />
  );
}

