import { JSX } from 'preact';

import { GradientIconBadge, SectionSurface } from '@o-industrial/common/atomic/atoms';
import { MediaSpotlight, SectionHeader } from '@o-industrial/common/atomic/molecules';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function ProductSpotlightSection(): JSX.Element {
  const spotlightHighlights = homeContent.futureVisionItems.slice(0, 3);

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='max-w-7xl'
      class='relative overflow-hidden pb-32'
    >
      <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
        <div class='absolute -left-24 top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(96,165,250,0.25),_rgba(255,255,255,0)_65%)] blur-3xl dark:bg-[radial-gradient(circle,_rgba(96,165,250,0.35),_rgba(255,255,255,0)_70%)]' />
        <div class='absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(167,139,250,0.25),_rgba(255,255,255,0)_65%)] blur-3xl dark:bg-[radial-gradient(circle,_rgba(167,139,250,0.35),_rgba(255,255,255,0)_70%)]' />
      </div>
      <div class='relative grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center'>
        <div class='relative'>
          <div class='absolute -inset-6 rounded-[36px] border border-white/60 bg-gradient-to-br from-[#dbe7ff]/70 via-white/90 to-[#f3e9ff]/70 opacity-70 blur-[30px] dark:border-white/10 dark:from-white/20 dark:via-white/10 dark:to-white/20' />
          <MediaSpotlight media={homeContent.productSpotlightMedia} class='relative z-10 shadow-2xl' />
        </div>
        <div class='relative space-y-8'>
          <SectionHeader
            {...homeContent.valuePropositionHeading}
            align='left'
            class='max-w-md text-left'
            title={(
              <span class='block text-balance leading-tight'>
                <span class='block text-neutral-900 dark:text-white'>
                  Connect your data.
                </span>
                <span class='block bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-emerald-400 bg-clip-text text-transparent'>
                  Ask anything. Share anywhere.
                </span>
              </span>
            )}
            description={(
              <span class='text-base text-neutral-600 dark:text-neutral-300'>
                {homeContent.valuePropositionHeading.description}
              </span>
            )}
          />
          <div class='space-y-4'>
            {spotlightHighlights.map((item) => (
              <div
                key={String(item.title)}
                class='flex items-start gap-4 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_20px_60px_-50px_rgba(62,45,171,0.55)] backdrop-blur-md dark:border-white/10 dark:bg-white/10'
              >
                {item.icon
                  ? (
                    <GradientIconBadge
                      icon={item.icon}
                      intent={item.intent ?? 'purple'}
                      size='md'
                      class='shrink-0 shadow-lg'
                    />
                  )
                  : null}
                <div class='space-y-1'>
                  <h4 class='text-base font-semibold text-neutral-900 dark:text-white'>
                    {item.title}
                  </h4>
                  {item.description
                    ? (
                      <p class='text-sm text-neutral-600 dark:text-neutral-300'>
                        {item.description}
                      </p>
                    )
                    : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionSurface>
  );
}

