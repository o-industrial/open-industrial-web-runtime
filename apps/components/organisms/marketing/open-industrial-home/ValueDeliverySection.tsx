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
            <span class='text-sm font-semibold uppercase tracking-[0.36em] text-white/55'>
              Turn industrial data
            </span>
            <span class='mt-4 block text-3xl font-semibold sm:text-[2.6rem]'>
              Into trusted, governed insight
            </span>
            <span class='mt-3 inline-block bg-gradient-to-r from-neon-blue-400 via-neon-purple-500 to-emerald-400 bg-clip-text text-base font-medium text-transparent'>
              Break silos with explainable results
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
      width='wide'
      tone='emphasis'
      variant='dark'
      cardVariant='dark'
      contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6'
      class='relative overflow-hidden border-y border-white/10 bg-[radial-gradient(circle_at_top,_rgba(72,63,143,0.28),rgba(6,9,20,0)),radial-gradient(circle_at_bottom,_rgba(45,212,191,0.18),rgba(6,8,16,0)),linear-gradient(160deg,rgba(6,9,20,0.95),rgba(3,5,12,0.92))] py-24 text-white'
    />
  );
}
