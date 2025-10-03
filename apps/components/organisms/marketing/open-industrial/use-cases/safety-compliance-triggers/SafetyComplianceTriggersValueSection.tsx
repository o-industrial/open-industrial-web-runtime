import { JSX } from 'preact';

import { ValueGridSection } from '@o-industrial/atomic/organisms';

import { safetyComplianceTriggersHowHelpItems } from '../../../../../../../src/marketing/use-case/safety-compliance-triggers.ts';

export default function SafetyComplianceTriggersValueSection(): JSX.Element {
  return (
    <ValueGridSection
      header={{
        eyebrow: 'How Open Industrial Helps',
        title: 'Monitor Every Trigger with Confidence',
        description:
          'Deliver governed, explainable safety signals so operators, quality, and compliance teams can trust every alert.',
        align: 'center',
      }}
      items={safetyComplianceTriggersHowHelpItems}
      columns={2}
      variant='dark'
      class='relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#1a0f2b] via-[#22173b] to-[#10081c] py-24 shadow-[0_120px_280px_-170px_rgba(236,72,153,0.55)]'
    />
  );
}
