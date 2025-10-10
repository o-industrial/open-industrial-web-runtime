import { JSX } from 'preact';

import { ValueGridSection } from '@o-industrial/atomic/organisms';

import { qualityManagementHowHelpItems } from '../../../../../../../src/marketing/solutions/quality-management.ts';

export default function QualityManagementValueSection(): JSX.Element {
  return (
    <ValueGridSection
      header={{
        eyebrow: 'How We Help',
        title: 'Accelerate Quality Decisions With Confidence',
        description:
          'Explain every release decision with governed warm queries, deviation coverage, and calibration context ready for QA or regulators.',
        align: 'center',
      }}
      items={qualityManagementHowHelpItems}
      columns={2}
      variant='dark'
      class='relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#110b2a] via-[#161042] to-[#08061f] py-24 shadow-[0_120px_280px_-170px_rgba(59,130,246,0.55)]'
    />
  );
}
