import { JSX } from 'preact';

import { FlowDiagramSection } from '@o-industrial/common/atomic/organisms';

import { UnifiedFlowBackdrop } from '../shared/backgrounds.tsx';
import { marketingSectionContent } from '../shared/layout.ts';
import { homeContent } from '../../../../../src/marketing/home.ts';

export default function UnifiedFlowSection(): JSX.Element {
  const header = homeContent.sections.unifiedFlow;

  return (
    <section class='relative overflow-hidden border-y border-white/10'>
      <UnifiedFlowBackdrop />
      <FlowDiagramSection
        header={{
          eyebrow: header.eyebrow,
          title: (
            <span class='block text-balance leading-tight text-white'>
              {header.titleLines.map((line, index) => (
                <span
                  key={'unified-flow-title-' + index + '-' + line.text}
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
        content={homeContent.flowDiagram}
        width='wide'
        contentClass={marketingSectionContent({ width: 'wide', padding: 'none' })}
        class='relative py-24 text-white'
      />
    </section>
  );
}
