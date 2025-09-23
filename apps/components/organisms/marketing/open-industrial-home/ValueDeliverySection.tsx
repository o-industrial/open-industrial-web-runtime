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
      class='relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(66,72,177,0.25),rgba(4,5,12,0)),radial-gradient(circle_at_bottom,_rgba(33,196,180,0.18),rgba(3,5,10,0)),linear-gradient(150deg,rgba(6,8,18,0.95),rgba(2,3,8,0.92))] py-28 text-white'
    />
  );
}
