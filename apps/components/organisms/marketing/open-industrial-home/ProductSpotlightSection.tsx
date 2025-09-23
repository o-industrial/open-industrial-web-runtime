import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { SectionHeader } from '@o-industrial/common/atomic/molecules';

import { homeContent } from '../../../../../src/marketing/home.ts';

const badgeSurface: Record<string, string> = {
  purple: 'from-neon-purple-500 to-neon-indigo-500',
  orange: 'from-neon-orange-500 to-neon-yellow-400',
  blue: 'from-neon-blue-500 to-neon-cyan-400',
  green: 'from-neon-green-500 to-neon-teal-400',
};

export default function ProductSpotlightSection(): JSX.Element {
  const spotlightHighlights = homeContent.futureVisionItems.slice(0, 3);

  return (
    <SectionSurface
      tone='default'
      width='full'
      contentClass='relative mx-auto w-full px-0'
      class='relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-28 px-0'
    >
      <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
        <div class='absolute inset-y-0 left-0 w-full bg-[linear-gradient(110deg,_rgba(11,15,35,0.95)_0%,_rgba(11,18,40,0.85)_48%,_rgba(7,12,29,0.6)_70%,_rgba(7,12,29,0)_100%)]' />
        <div class='absolute left-[32%] top-[-18%] h-[26rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.28),_rgba(255,255,255,0)_82%)] blur-[220px]' />
        <div class='absolute right-[-6%] bottom-[-25%] h-[24rem] w-[28rem] rounded-full bg-[conic-gradient(from_140deg,_rgba(129,140,248,0.28),_rgba(236,72,153,0.18),_rgba(34,211,238,0.24),_rgba(255,255,255,0))] blur-[210px]' />
      </div>
      <div class='relative grid min-h-[30rem] w-full grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]'>
        <div class='relative flex items-center justify-center px-6 py-16 sm:px-10 lg:order-2 lg:px-16'>
          <div class='w-full max-w-xl space-y-10'>
            <SectionHeader
              {...homeContent.valuePropositionHeading}
              align='left'
              class='text-left'
              title={(
                <span class='block text-balance leading-tight'>
                  <span class='block text-neutral-900 dark:text-white'>
                    Connect your data.
                  </span>
                  <span class='block bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-green-400 bg-clip-text text-transparent'>
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
              {spotlightHighlights.map((item, index) => {
                const intent = item.intent ?? 'purple';
                const badgeGradient = badgeSurface[intent] ?? badgeSurface.purple;

                return (
                  <article
                    key={String(item.title)}
                    class='group relative flex items-start gap-4 overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-br from-[rgba(12,16,35,0.95)] via-[rgba(11,18,40,0.82)] to-[rgba(7,12,28,0.9)] p-5 shadow-[0_28px_80px_-70px_rgba(15,23,42,0.68)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_45px_120px_-80px_rgba(15,23,42,0.75)]'
                  >
                    <div
                      aria-hidden='true'
                      class={`pointer-events-none absolute -right-24 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-gradient-to-br opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
                        intent === 'orange'
                          ? 'from-[rgba(249,115,22,0.28)] via-[rgba(250,204,21,0.18)] to-transparent'
                          : intent === 'blue'
                          ? 'from-[rgba(59,130,246,0.28)] via-[rgba(34,211,238,0.18)] to-transparent'
                          : 'from-[rgba(139,92,246,0.32)] via-[rgba(99,102,241,0.22)] to-transparent'
                      }`}
                    />
                    <div
                      class={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg shadow-black/30 ${badgeGradient}`}
                    >
                      {item.icon ? <item.icon class='h-6 w-6' /> : <span class='text-sm font-semibold'>{index + 1}</span>}
                    </div>
                    <div class='relative space-y-1'>
                      <h4 class='text-base font-semibold text-white'>{item.title}</h4>
                      {item.description
                        ? (
                          <p class='text-sm text-neutral-300'>
                            {item.description}
                          </p>
                        )
                        : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
        <div class='relative h-full min-h-[22rem] overflow-hidden lg:order-1 lg:min-h-[30rem]'>
          <img
            src={homeContent.productSpotlightMedia.src}
            alt={homeContent.productSpotlightMedia.alt}
            width={homeContent.productSpotlightMedia.width}
            height={homeContent.productSpotlightMedia.height}
            class='pointer-events-none absolute inset-0 h-full w-full object-cover object-left-top'
            data-eac-bypass-base
          />
          <div class='pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.22),_rgba(255,255,255,0)_82%)] blur-[120px]' />
        </div>
      </div>
    </SectionSurface>
  );
}
