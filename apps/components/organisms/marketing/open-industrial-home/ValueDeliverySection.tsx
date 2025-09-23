import { JSX } from 'preact';

import { ValueGridSection } from '@o-industrial/common/atomic/organisms';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function ValueDeliverySection(): JSX.Element {
  return (
    <ValueGridSection
      header={{
        eyebrow: 'Operational intelligence, delivered',
        title: (
          <span class='block text-balance leading-tight'>
            <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-emerald-400 bg-clip-text text-transparent'>
              Turn industrial data
            </span>
            <span class='mt-2 block text-neutral-900 dark:text-white'>
              Into trusted, governed insight
            </span>
          </span>
        ),
        description: (
          <span class='text-base text-neutral-600 dark:text-neutral-300'>
            Break down data silos across OT and IT systems by turning live plant data into actionable, audit-ready insight your teams can act on.
          </span>
        ),
        align: 'center',
      }}
      items={homeContent.featureGridItems}
      width='wide'
      contentClass='max-w-7xl'
      class='relative overflow-hidden border-y border-white/60 bg-gradient-to-br from-white via-[#eef4ff] to-white dark:border-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10'
    />
  );
}

