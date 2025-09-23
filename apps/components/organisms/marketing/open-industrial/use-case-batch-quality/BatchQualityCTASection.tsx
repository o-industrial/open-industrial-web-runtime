import { JSX } from 'preact';

import { CTADeepLinkSection } from '@o-industrial/common/atomic/organisms';

import { batchQualityOutcome } from '../../../../../../src/marketing/use-case-batch-quality.ts';

export default function BatchQualityCTASection(): JSX.Element {
  return (
    <CTADeepLinkSection
      content={batchQualityOutcome}
      class='bg-gradient-to-br from-[#060918] via-[#0d1332] to-[#050816] py-24'
    />
  );
}
