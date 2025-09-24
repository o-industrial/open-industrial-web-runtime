import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { FeatureCard, SectionHeader } from '@o-industrial/common/atomic/molecules';

import { StrategicPillarsBackdrop } from '../shared/backgrounds.tsx';
import { marketingSectionContent } from '../shared/layout.ts';
import { homeContent } from '../../../../../src/marketing/home.ts';

const pillarIntents = ['purple', 'blue', 'green'] as const;

export default function StrategicPillarsSection(): JSX.Element {
  const header = homeContent.sections.strategicPillars;

  return (
    <SectionSurface
      tone='emphasis'
      width='wide'
      contentClass={marketingSectionContent({
        width: 'wide',
        padding: 'md',
        center: true,
        extra: 'flex flex-col items-center gap-12',
      })}
      class='relative overflow-hidden border-y border-white/10 py-24 text-white'
    >
      <StrategicPillarsBackdrop />
      <SectionHeader
        title={
          <span class='block text-balance leading-tight'>
            {header.strapline
              ? (
                <span class='text-xs font-semibold uppercase tracking-[0.4em] text-white/55'>
                  {header.strapline}
                </span>
              )
              : null}
            {header.titleLines.map((line, index) => (
              <span
                key={'strategic-pillars-title-' + index + '-' + line.text}
                class={'mt-4 block text-3xl font-semibold sm:text-[2.4rem] ' +
                  (line.highlight
                    ? 'bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-neon-green-400 bg-clip-text text-transparent'
                    : 'text-white')}
              >
                {line.text}
              </span>
            ))}
          </span>
        }
        description={header.description
          ? (
            <span class='mx-auto mt-5 block max-w-3xl text-base text-white/70'>
              {header.description}
            </span>
          )
          : undefined}
        align={header.align ?? 'center'}
        class='relative text-center'
      />
      <div class='grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {homeContent.strategicPillars.map((pillar, index) => {
          const intent = pillarIntents[index % pillarIntents.length];

          return (
            <FeatureCard
              key={'strategic-pillar-' + pillar.title}
              title={pillar.title}
              description={pillar.description}
              variant='dark'
              intent={intent}
              chips={[pillar.badge]}
              showIndexBadge
              index={index}
              class='h-full'
            />
          );
        })}
      </div>
    </SectionSurface>
  );
}
