import { JSX } from 'preact';

import { ValueGridSection } from '@o-industrial/common/atomic/organisms';

import { batchQualityHowHelpItems } from '../../../../../src/marketing/use-case-batch-quality.ts';

export default function BatchQualityValueSection(): JSX.Element {
  return (
    <ValueGridSection
      header={{
        eyebrow: 'How Open Industrial helps',
        title: 'Accelerate investigations and compliance',
        description:
          'Deliver governed, explainable answers for every batch by turning warm queries into reusable assets.',
        align: 'center',
      }}
      items={batchQualityHowHelpItems}
      columns={2}
      variant='dark'
      class='bg-gradient-to-br from-[#050914] via-[#0b1228] to-[#060916] py-24'
    />
  );
}
