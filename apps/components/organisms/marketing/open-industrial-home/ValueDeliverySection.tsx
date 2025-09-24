import { JSX } from 'preact';

import { ValueGridSection } from '@o-industrial/common/atomic/organisms';

import { marketingSectionContent } from '../shared/layout.ts';
import { homeContent } from '../../../../../src/marketing/home.ts';

export default function ValueDeliverySection(): JSX.Element {
  const header = homeContent.sections.valueDelivery;

  return (
    <ValueGridSection
      header={{
        eyebrow: header.eyebrow,
        title: (
          <span class='block text-balance leading-tight text-white'>
            {header.titleLines.map((line, index) => (
              <span
                key={'value-delivery-title-' + index + '-' + line.text}
                class={'block ' +
                  (index === 0
                    ? 'text-3xl font-semibold sm:text-[2.75rem] '
                    : 'mt-3 text-3xl font-semibold sm:text-[2.2rem] ') +
                  (line.highlight
                    ? 'bg-gradient-to-r from-neon-blue-400 via-neon-purple-500 to-neon-green-400 bg-clip-text text-transparent'
                    : 'text-white')}
              >
                {line.text}
              </span>
            ))}
          </span>
        ),
        description: header.description
          ? (
            <span class='mx-auto mt-4 block max-w-3xl text-base text-white/70'>
              {header.description}
            </span>
          )
          : undefined,
        align: header.align ?? 'center',
      }}
      items={homeContent.featureGridItems.map((item) => ({ ...item }))}
      width='full'
      tone='emphasis'
      variant='dark'
      cardVariant='dark'
      showIndexBadge
      columns={2}
      contentClass={marketingSectionContent({
        width: 'wide',
        padding: 'md',
        center: true,
        extra: 'flex flex-col gap-16',
      })}
      class='border-y border-white/10 py-28 text-white'
    />
  );
}
