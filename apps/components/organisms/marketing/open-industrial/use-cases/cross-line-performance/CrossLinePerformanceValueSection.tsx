import { JSX } from 'preact';

import { ValueGridSection } from '@o-industrial/atomic/organisms';

import { crossLinePerformanceHowHelpItems } from '../../../../../../../src/marketing/use-case/cross-line-performance.ts';

export default function CrossLinePerformanceValueSection(): JSX.Element {
  return (
    <ValueGridSection
      header={{
        eyebrow: 'How Open Industrial Helps',
        title: 'Compare Lines and Drive Improvements Fast',
        description:
          'Deliver governed, explainable KPIs so operations and engineering teams can align on where to take action first.',
        align: 'center',
      }}
      items={crossLinePerformanceHowHelpItems}
      columns={2}
      variant='dark'
      class='relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#0a1227] via-[#131d38] to-[#080b1c] py-24 shadow-[0_120px_280px_-170px_rgba(14,165,233,0.55)]'
    />
  );
}

