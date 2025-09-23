import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { SectionHeader } from '@o-industrial/common/atomic/molecules';

import { visionCopy } from '../../../../../src/marketing/about.ts';

export default function VisionStatementSection(): JSX.Element {
  return (
    <SectionSurface
      tone='muted'
      class='bg-gradient-to-r from-white via-[#f2f6ff] to-white dark:from-[#060a1d] dark:via-[#0a1029] dark:to-[#060a1d]'
    >
      <SectionHeader {...visionCopy} />
    </SectionSurface>
  );
}
