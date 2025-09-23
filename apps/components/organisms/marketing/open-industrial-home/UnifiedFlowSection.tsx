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
            <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-neon-green-400 bg-clip-text text-transparent'>
              Data in, insight out
            </span>
            <span class='mt-2 block text-neutral-100 dark:text-white'>
              Trace governed telemetry from edge to action
            </span>
          </span>
        ),
        description: (
          <span class='text-base text-neutral-300 dark:text-neutral-300'>
            Visualize how telemetry lands in Open Industrial and flows back out into apps, agents, and APIs.
          </span>
        ),
        align: 'center',
      }}
      content={homeContent.flowDiagram}
      width='wide'
      contentClass='max-w-6xl'
      class='relative overflow-hidden border-y border-white/10 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.12),rgba(11,15,32,0.92)),radial-gradient(circle_at_bottom,_rgba(34,211,238,0.12),rgba(11,15,32,0.9)),linear-gradient(160deg,rgba(9,12,26,0.96),rgba(6,10,22,0.94))]'
    />
  );
}

