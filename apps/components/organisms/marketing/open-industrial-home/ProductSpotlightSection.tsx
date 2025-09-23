import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { SectionHeader } from '@o-industrial/common/atomic/molecules';

import { homeContent } from '../../../../../src/marketing/home.ts';

const badgeSurface: Record<string, string> = {
  purple: 'from-[#a855f7] to-[#6366f1]',
  orange: 'from-[#f97316] to-[#facc15]',
  blue: 'from-[#3b82f6] to-[#22d3ee]',
  green: 'from-[#10b981] to-[#34d399]',
};

export default function ProductSpotlightSection(): JSX.Element {
  const spotlightHighlights = homeContent.futureVisionItems.slice(0, 3);

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6'
      class='relative overflow-hidden bg-gradient-to-b from-[#05070f] via-[#060a18] to-[#03040a] py-28'
    >
      <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
        <div class='absolute inset-y-0 left-0 w-full bg-[linear-gradient(115deg,_rgba(12,17,36,0.92)_0%,_rgba(12,17,36,0.9)_42%,_rgba(6,10,24,0.75)_62%,_rgba(6,9,24,0)_100%)]' />
        <div class='absolute left-1/3 top-[-18%] h-[26rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(82,206,255,0.32),_rgba(255,255,255,0)_80%)] blur-[220px]' />
        <div class='absolute right-[-6%] bottom-[-25%] h-[24rem] w-[28rem] rounded-full bg-[conic-gradient(from_140deg,_rgba(167,139,250,0.32),_rgba(56,189,248,0.2),_rgba(34,211,238,0.24),_rgba(255,255,255,0))] blur-[210px]' />
      </div>
      <div class='relative grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center'>
        <div class='relative min-h-[28rem] overflow-hidden rounded-[52px] border border-white/10 shadow-[0_65px_200px_-110px_rgba(10,12,30,0.9)]'>
          <img
            src={homeContent.productSpotlightMedia.src}
            alt={homeContent.productSpotlightMedia.alt}
            width={homeContent.productSpotlightMedia.width}
            height={homeContent.productSpotlightMedia.height}
            class='h-full w-full object-cover object-left-top opacity-85'
            data-eac-bypass-base
          />
          <div class='pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(5,7,15,0.35)] to-[rgba(5,7,15,0.88)]' />
          <div class='pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(82,206,255,0.28),_rgba(255,255,255,0)_80%)] blur-[120px]' />
        </div>
        <div class='relative space-y-10'>
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
            {spotlightHighlights.map((item, index) => {
              const intent = item.intent ?? 'purple';
              const badgeGradient = badgeSurface[intent] ?? badgeSurface.purple;

              return (
                <article
                  key={String(item.title)}
                  class='group relative flex items-start gap-4 overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-br from-[rgba(16,21,38,0.95)] via-[rgba(18,24,44,0.82)] to-[rgba(9,14,29,0.88)] p-5 shadow-[0_28px_80px_-70px_rgba(20,27,54,0.7)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_45px_120px_-80px_rgba(32,40,80,0.75)]'
                >
                  <div
                    aria-hidden='true'
                    class={`pointer-events-none absolute -right-24 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-gradient-to-br opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
                      intent === 'orange'
                        ? 'from-[rgba(249,115,22,0.28)] via-[rgba(250,204,21,0.18)] to-transparent'
                        : intent === 'blue'
                        ? 'from-[rgba(59,130,246,0.28)] via-[rgba(34,211,238,0.18)] to-transparent'
                        : 'from-[rgba(168,85,247,0.32)] via-[rgba(99,102,241,0.22)] to-transparent'
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
    </SectionSurface>
  );
}





