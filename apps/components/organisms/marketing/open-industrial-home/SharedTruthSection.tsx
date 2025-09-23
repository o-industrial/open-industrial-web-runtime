import { JSX } from 'preact';

import { BenefitsSection } from '@o-industrial/common/atomic/organisms';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function SharedTruthSection(): JSX.Element {
  return (
    <BenefitsSection
      header={{
        eyebrow: 'Why teams choose Open Industrial',
        title: (
          <span class='block text-balance leading-tight'>
            <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-emerald-400 bg-clip-text text-transparent'>
              Operational clarity for every team
            </span>
            <span class='mt-2 block text-neutral-900 dark:text-white'>
              Shared truth across operations, quality, and IT
            </span>
          </span>
        ),
        description: (
          <span class='text-base text-neutral-600 dark:text-neutral-300'>
            Give operations, quality, and IT the same live source of truth to coordinate faster decisions.
          </span>
        ),
        align: 'center',
      }}
      items={homeContent.benefitsItems}
      width='wide'
      contentClass='max-w-7xl'
      class='relative overflow-hidden border-y border-white/60 bg-gradient-to-br from-[#f7faff] via-white to-[#f6f0ff] dark:border-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10'
    />
  );
}

