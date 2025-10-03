import { JSX } from 'preact';

import { ValueGridSection } from '@o-industrial/atomic/organisms';

import { batchQualityHowHelpItems } from '../../../../../../../src/marketing/use-case/batch-quality.ts';

export default function BatchQualityValueSection(): JSX.Element {
  return (
    <ValueGridSection
      header={{
        eyebrow: 'How Open Industrial Helps',
        title: 'Accelerate Investigations and Compliance',
        description:
          'Deliver governed, explainable answers for every batch by turning warm queries into reusable assets.',
        align: 'center',
      }}
      items={batchQualityHowHelpItems}
      columns={2}
      variant='dark'
      class='relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#110b23] via-[#160f33] to-[#0a0618] py-24 shadow-[0_120px_280px_-170px_rgba(129,140,248,0.55)]'
    />
  );
}
