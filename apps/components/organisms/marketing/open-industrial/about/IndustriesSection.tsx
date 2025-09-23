import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { ChecklistGroup, SectionHeader } from '@o-industrial/common/atomic/molecules';

import { industriesServed } from '../../../../../src/marketing/about.ts';

export default function IndustriesSection(): JSX.Element {
  return (
    <SectionSurface
      tone='default'
      class='bg-gradient-to-br from-[#f6f8ff] via-white to-[#f4efff] dark:from-[#06091b] dark:via-[#0c1129] dark:to-[#06091b]'
    >
      <div class='space-y-10'>
        <SectionHeader
          title='Who we serve'
          description='We partner with OT engineers, process automation leads, lab managers, and industrial IT teams across manufacturing, life sciences, energy, utilities, and more.'
          align='center'
        />
        <ChecklistGroup items={industriesServed} columns={3} />
      </div>
    </SectionSurface>
  );
}
