import { JSX } from 'preact';
import { useCallback } from 'preact/hooks';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { FeatureCard, SectionHeader } from '@o-industrial/common/atomic/molecules';

import { ProductSpotlightBackdrop } from '../shared/backgrounds.tsx';
import { marketingSectionContent } from '../shared/layout.ts';
import { trackSpotlightHighlightView } from '../../../../../src/marketing/analytics.ts';
import { homeContent } from '../../../../../src/marketing/home.ts';

const loggedSpotlightHighlights = new Set<string>();

export default function ProductSpotlightSection(): JSX.Element {
  const header = homeContent.sections.productSpotlight;
  const spotlightHighlights = homeContent.productSpotlightHighlights;

  const handleHighlightView = useCallback(
    (title: string, intent: string | undefined, index: number) => {
      const key = `${index}-${title}`;
      if (loggedSpotlightHighlights.has(key)) {
        return;
      }

      loggedSpotlightHighlights.add(key);
      trackSpotlightHighlightView(title, index, intent);
    },
    [],
  );

  return (
    <SectionSurface
      tone='default'
      width='full'
      contentClass={marketingSectionContent({ width: 'full', padding: 'none', extra: 'px-0' })}
      class='relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-28 px-0'
    >
      <ProductSpotlightBackdrop />
      <div class='relative grid min-h-[30rem] w-full grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]'>
        <div class='relative flex items-center justify-center px-6 py-16 sm:px-10 lg:order-2 lg:px-16'>
          <div class='w-full max-w-xl space-y-10'>
            <SectionHeader
              eyebrow={header.eyebrow}
              title={
                <span class='block text-balance leading-tight'>
                  {header.titleLines.map((line, index) => (
                    <span
                      key={`product-spotlight-title-${index}-${line.text}`}
                      class={`block ${
                        line.highlight
                          ? 'bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-green-400 bg-clip-text text-transparent'
                          : 'text-neutral-900 dark:text-white'
                      }`}
                    >
                      {line.text}
                    </span>
                  ))}
                </span>
              }
              description={header.description
                ? (
                  <span class='text-base text-neutral-600 dark:text-neutral-300'>
                    {header.description}
                  </span>
                )
                : undefined}
              align={header.align ?? 'left'}
              class='text-left'
            />
            <div class='space-y-4'>
              {spotlightHighlights.map((item, index) => {
                const intent = item.intent ?? 'purple';

                return (
                  <FeatureCard
                    key={`product-spotlight-${index}-${item.title}`}
                    title={item.title}
                    description={item.description ?? ''}
                    icon={item.icon}
                    intent={intent}
                    variant='dark'
                    index={index + 1}
                    showIndexBadge
                    class='w-full'
                    onMouseEnter={() => handleHighlightView(item.title, intent, index)}
                    onFocus={() => handleHighlightView(item.title, intent, index)}
                  />
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
            loading='lazy'
            decoding='async'
            class='pointer-events-none absolute inset-0 h-full w-full object-cover object-left-top'
            data-eac-bypass-base
          />
          <div class='pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.22),_rgba(255,255,255,0)_82%)] blur-[120px]' />
        </div>
      </div>
    </SectionSurface>
  );
}
