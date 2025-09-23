import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { SectionHeader } from '@o-industrial/common/atomic/molecules';

import { missionCopy } from '../../../../../../src/marketing/about.ts';

export default function MissionStatementSection(): JSX.Element {
  return (
    <SectionSurface
      tone='muted'
      class='bg-gradient-to-r from-white via-[#f0f5ff] to-white dark:from-[#060a1f] dark:via-[#0a1028] dark:to-[#050814]'
    >
      <SectionHeader {...missionCopy} />
    </SectionSurface>
  );
}
