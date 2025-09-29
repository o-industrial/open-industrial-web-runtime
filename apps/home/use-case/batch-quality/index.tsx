import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import BatchQualityCTASection from '../../../components/organisms/marketing/open-industrial/use-case-batch-quality/BatchQualityCTASection.tsx';
import BatchQualityFlowDiagramSection from '../../../components/organisms/marketing/open-industrial/use-case-batch-quality/BatchQualityFlowDiagramSection.tsx';
import BatchQualityHeroSection from '../../../components/organisms/marketing/open-industrial/use-case-batch-quality/BatchQualityHeroSection.tsx';
import BatchQualityIntegrationOverviewSection from '../../../components/organisms/marketing/open-industrial/use-case-batch-quality/BatchQualityIntegrationOverviewSection.tsx';
import BatchQualityProblemSection from '../../../components/organisms/marketing/open-industrial/use-case-batch-quality/BatchQualityProblemSection.tsx';
import BatchQualityToggleSection from '../../../components/organisms/marketing/open-industrial/use-case-batch-quality/BatchQualityToggleSection.tsx';
import BatchQualityValueSection from '../../../components/organisms/marketing/open-industrial/use-case-batch-quality/BatchQualityValueSection.tsx';
import { MarketingPageFrame } from '../../../components/shared/MarketingPageFrame.tsx';
import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

type BatchQualityPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  BatchQualityPageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function BatchQualityPage({}: PageProps<BatchQualityPageData>) {
  return (
    <MarketingPageFrame>
      <BatchQualityHeroSection />

      <BatchQualityProblemSection />

      <BatchQualityIntegrationOverviewSection />

      <BatchQualityFlowDiagramSection />

      <BatchQualityValueSection />

      <BatchQualityToggleSection />

      <BatchQualityCTASection />
    </MarketingPageFrame>
  );
}