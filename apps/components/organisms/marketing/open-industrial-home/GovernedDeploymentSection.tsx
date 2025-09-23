import { JSX } from 'preact';

import { CloudControlSection } from '@o-industrial/common/atomic/organisms';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function GovernedDeploymentSection(): JSX.Element {
  return (
    <CloudControlSection
      header={{
        eyebrow: 'Your cloud, your rules',
        title: (
          <span class='block text-balance leading-tight'>
            <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-neon-green-400 bg-clip-text text-transparent'>
              Deploy with governed flexibility
            </span>
            <span class='mt-2 block text-neutral-100 dark:text-white'>
              Choose the control plane that matches your policy
            </span>
          </span>
        ),
        description: (
          <span class='text-base text-neutral-300 dark:text-neutral-300'>
            Run Open Industrial in your Azure tenant for full access and control, or choose from shared cloud or fully managed options.
          </span>
        ),
        align: 'center',
      }}
      items={homeContent.cloudControlItems}
      width='wide'
      contentClass='max-w-7xl'
      class='relative overflow-hidden border-y border-white/10 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.14),rgba(9,12,24,0.9)),linear-gradient(150deg,rgba(8,11,24,0.97),rgba(15,23,42,0.94))]'
    />
  );
}

