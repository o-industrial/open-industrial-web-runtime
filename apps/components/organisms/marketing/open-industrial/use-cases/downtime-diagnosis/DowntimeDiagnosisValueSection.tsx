import { JSX } from 'preact';

import { ValueGridSection } from '@o-industrial/atomic/organisms';

import { downtimeDiagnosisHowHelpItems } from '../../../../../../../src/marketing/use-case/downtime-diagnosis.ts';

export default function DowntimeDiagnosisValueSection(): JSX.Element {
  return (
    <ValueGridSection
      header={{
        eyebrow: 'How Open Industrial Helps',
        title: 'Diagnose Downtime Without the Guesswork',
        description:
          'Deliver governed, explainable answers faster by correlating every signal your teams need for root cause analysis.',
        align: 'center',
      }}
      items={downtimeDiagnosisHowHelpItems}
      columns={2}
      variant='dark'
      class='relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#0b1024] via-[#121a36] to-[#080b1a] py-24 shadow-[0_120px_280px_-170px_rgba(59,130,246,0.55)]'
    />
  );
}
