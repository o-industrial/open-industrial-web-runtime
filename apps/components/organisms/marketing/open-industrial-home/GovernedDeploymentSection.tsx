import { JSX } from 'preact';

import { CloudControlSection } from '@o-industrial/common/atomic/organisms';

import { GovernedDeploymentBackdrop } from '../shared/backgrounds.tsx';
import { marketingSectionContent } from '../shared/layout.ts';
import { homeContent } from '../../../../../src/marketing/home.ts';

export default function GovernedDeploymentSection(): JSX.Element {
  const header = homeContent.sections.governedDeployment;

  return (
    <section class='relative overflow-hidden border-y border-white/10'>
      <GovernedDeploymentBackdrop />
      <CloudControlSection
        header={{
          eyebrow: header.eyebrow,
          title: (
            <span class='block text-balance leading-tight text-white'>
              {header.titleLines.map((line, index) => (
                <span
                  key={'governed-deployment-title-' + index + '-' + line.text}
                  class={'block ' +
                    (index > 0 ? 'mt-2 ' : '') +
                    (line.highlight
                      ? 'bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-neon-green-400 bg-clip-text text-transparent'
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
        items={homeContent.cloudControlItems}
        width='wide'
        contentClass={marketingSectionContent({ width: 'xwide', padding: 'none' })}
        class='relative py-24 text-white'
      />
    </section>
  );
}
