import { JSX } from 'preact';

import { FlowDiagramSection } from '@o-industrial/common/atomic/organisms';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function UnifiedFlowSection(): JSX.Element {
  return (
    <FlowDiagramSection
      header={{
        eyebrow: 'Unified intelligence hub',
        title: (
          <span class='block text-balance leading-tight'>
            <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-emerald-400 bg-clip-text text-transparent'>
              Data in, insight out
            </span>
            <span class='mt-2 block text-neutral-900 dark:text-white'>
              Trace governed telemetry from edge to action
            </span>
          </span>
        ),
        description: (
          <span class='text-base text-neutral-600 dark:text-neutral-300'>
            Visualize how telemetry lands in Open Industrial and flows back out into apps, agents, and APIs.
          </span>
        ),
        align: 'center',
      }}
      content={homeContent.flowDiagram}
      width='wide'
      contentClass='max-w-7xl'
      class='relative overflow-hidden border-y border-white/60 bg-gradient-to-br from-white via-[#f2f4ff] to-white dark:border-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10'
    />
  );
}

