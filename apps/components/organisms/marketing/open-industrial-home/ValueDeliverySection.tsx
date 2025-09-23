import { JSX } from 'preact';

import { ValueGridSection } from '@o-industrial/common/atomic/organisms';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function ValueDeliverySection(): JSX.Element {
  return (
    <ValueGridSection
      header={{
        eyebrow: 'Operational intelligence, delivered',
        title: (
          <span class='block text-balance leading-tight text-white'>
            <span class='block text-3xl font-semibold sm:text-[2.75rem]'>
              <span class='bg-gradient-to-r from-neon-blue-400 via-neon-purple-500 to-neon-green-400 bg-clip-text text-transparent'>
                Turn industrial data
              </span>
            </span>
            <span class='mt-3 block text-3xl font-semibold sm:text-[2.2rem]'>
              Into trusted, governed insight
            </span>
          </span>
        ),
        description: (
          <span class='mx-auto mt-4 block max-w-3xl text-base text-white/70'>
            Break down data silos across OT and IT systems by turning live plant data into actionable, audit-ready insight your teams can act on.
          </span>
        ),
        align: 'center',
      }}
      items={homeContent.featureGridItems}
      width='full'
      tone='emphasis'
      variant='dark'
      cardVariant='dark'
      showIndexBadge
      columns={2}
      contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6'
      disableAccents
      class='bg-slate-950 py-28 text-white'
    />
  );
}
