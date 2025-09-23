import { JSX } from 'preact';

import { IntegrationMatrixSection } from '@o-industrial/common/atomic/organisms';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function IntegrationEcosystemSection(): JSX.Element {
  const integrationCount = homeContent.integrationColumns.reduce(
    (total, column) => total + column.items.length,
    0,
  );

  return (
    <IntegrationMatrixSection
      header={{
        eyebrow: 'Works with your stack',
        title: (
          <span class='block text-balance leading-tight'>
            <span class='bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-green-400 bg-clip-text text-transparent'>
              Connect seamlessly
            </span>
            <span class='mt-2 block text-neutral-100 dark:text-white'>
              To your current industrial systems
            </span>
          </span>
        ),
        description: (
          <span class='text-base text-neutral-300 dark:text-neutral-300'>
            Pre-built connectors map protocols, middleware, and execution systems into a single hub.
          </span>
        ),
        align: 'center',
        kicker: (
          <span class='text-xs uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-400'>
            {integrationCount}+ integration endpoints ready out of the box
          </span>
        ),
      }}
      columns={homeContent.integrationColumns}
      width='wide'
      contentClass='max-w-7xl'
      class='relative overflow-hidden border-y border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),rgba(9,12,24,0.92)),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.12),rgba(8,12,24,0.9)),linear-gradient(150deg,rgba(8,11,24,0.98),rgba(12,16,32,0.94))]'
    />
  );
}

