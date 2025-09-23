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
            <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-neon-green-400 bg-clip-text text-transparent'>
              Operational clarity for every team
            </span>
            <span class='mt-2 block text-neutral-100 dark:text-white'>
              Shared truth across operations, quality, and IT
            </span>
          </span>
        ),
        description: (
          <span class='text-base text-neutral-300 dark:text-neutral-300'>
            Give operations, quality, and IT the same live source of truth to coordinate faster
            decisions.
          </span>
        ),
        align: 'center',
      }}
      items={homeContent.benefitsItems}
      width='wide'
      contentClass='max-w-7xl'
      class='relative overflow-hidden border-y border-white/10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),rgba(9,11,24,0.9)),linear-gradient(155deg,rgba(8,11,24,0.97),rgba(13,17,33,0.94))]'
    />
  );
}
