import { JSX } from 'preact';

import { IntegrationMatrixSection } from '@o-industrial/common/atomic/organisms';

import { IntegrationEcosystemBackdrop } from '../shared/backgrounds.tsx';
import { marketingSectionContent } from '../shared/layout.ts';
import { homeContent } from '../../../../../src/marketing/home.ts';

export default function IntegrationEcosystemSection(): JSX.Element {
  const header = homeContent.sections.integrationEcosystem;

  return (
    <section class='relative overflow-hidden border-y border-white/10'>
      <IntegrationEcosystemBackdrop />
      <IntegrationMatrixSection
        header={{
          eyebrow: header.eyebrow,
          title: (
            <span class='block text-balance leading-tight text-white'>
              {header.titleLines.map((line, index) => (
                <span
                  key={'integration-title-' + index + '-' + line.text}
                  class={'block ' +
                    (index > 0 ? 'mt-2 ' : '') +
                    (line.highlight
                      ? 'bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-green-400 bg-clip-text text-transparent'
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
          kicker: header.kicker
            ? (
              <span class='mt-4 inline-block text-xs uppercase tracking-[0.3em] text-white/65'>
                {header.kicker}
              </span>
            )
            : undefined,
        }}
        columns={homeContent.integrationColumns}
        width='wide'
        contentClass={marketingSectionContent({ width: 'xwide', padding: 'none' })}
        class='relative py-24 text-white'
      />
    </section>
  );
}
