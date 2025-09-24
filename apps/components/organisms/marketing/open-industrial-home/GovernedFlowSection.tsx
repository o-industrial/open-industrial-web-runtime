import { JSX } from 'preact';

import { StepsSection } from '@o-industrial/common/atomic/organisms';

import { marketingSectionContent } from '../shared/layout.ts';
import { homeContent } from '../../../../../src/marketing/home.ts';

export default function GovernedFlowSection(): JSX.Element {
  const header = homeContent.sections.governedFlow;

  return (
    <StepsSection
      header={{
        eyebrow: header.eyebrow,
        title: (
          <span class='block text-balance leading-tight text-white'>
            {header.titleLines.map((line, index) => (
              <span
                key={'governed-flow-title-' + index + '-' + line.text}
                class={'inline-block ' +
                  (line.highlight
                    ? 'bg-gradient-to-r from-neon-blue-400 via-neon-purple-500 to-neon-green-400 bg-clip-text text-transparent'
                    : index === 0
                    ? 'text-white/85'
                    : 'text-white')}
              >
                {index > 0 ? ' ' : null}
                {line.text}
              </span>
            ))}
          </span>
        ),
        description: header.description
          ? (
            <span class='block text-base text-neon-indigo-100/80'>
              {header.description}
            </span>
          )
          : undefined,
        align: header.align ?? 'center',
      }}
      steps={homeContent.howItWorksSteps}
      width='full'
      tone='emphasis'
      variant='dark'
      contentClass={marketingSectionContent({
        width: 'wide',
        padding: 'none',
        extra: 'px-0 sm:px-6',
      })}
      class='border-y border-white/10 py-28 px-0 text-center'
    />
  );
}
