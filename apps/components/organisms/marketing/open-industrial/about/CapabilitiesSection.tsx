import { JSX } from 'preact';

import { ValueGridSection } from '@o-industrial/common/atomic/organisms';

import { capabilityCards } from '../../../../../src/marketing/about.ts';

export default function CapabilitiesSection(): JSX.Element {
  return (
    <ValueGridSection
      header={{
        title: 'What we do',
        description:
          'Open Industrial transforms how organizations interact with their industrial data through four core capabilities.',
        align: 'center',
      }}
      items={capabilityCards}
      columns={2}
      class='bg-gradient-to-br from-white via-[#eef4ff] to-white dark:from-[#070a1d] dark:via-[#0d132f] dark:to-[#060a19]'
    />
  );
}
