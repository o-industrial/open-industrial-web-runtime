import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import CrossLinePerformanceCTASection from '../../../components/organisms/marketing/open-industrial/use-cases/cross-line-performance/CrossLinePerformanceCTASection.tsx';
import CrossLinePerformanceFlowDiagramSection from '../../../components/organisms/marketing/open-industrial/use-cases/cross-line-performance/CrossLinePerformanceFlowDiagramSection.tsx';
import CrossLinePerformanceHeroSection from '../../../components/organisms/marketing/open-industrial/use-cases/cross-line-performance/CrossLinePerformanceHeroSection.tsx';
import CrossLinePerformanceIntegrationOverviewSection from '../../../components/organisms/marketing/open-industrial/use-cases/cross-line-performance/CrossLinePerformanceIntegrationOverviewSection.tsx';
import CrossLinePerformanceProblemSection from '../../../components/organisms/marketing/open-industrial/use-cases/cross-line-performance/CrossLinePerformanceProblemSection.tsx';
import CrossLinePerformanceToggleSection from '../../../components/organisms/marketing/open-industrial/use-cases/cross-line-performance/CrossLinePerformanceToggleSection.tsx';
import CrossLinePerformanceValueSection from '../../../components/organisms/marketing/open-industrial/use-cases/cross-line-performance/CrossLinePerformanceValueSection.tsx';
import { MarketingPageFrame } from '../../../components/shared/MarketingPageFrame.tsx';
import type { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export const IsIsland = true;

type CrossLinePerformancePageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  CrossLinePerformancePageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function CrossLinePerformancePage({}: PageProps<CrossLinePerformancePageData>) {
  return (
    <MarketingPageFrame>
      <CrossLinePerformanceHeroSection />

      <CrossLinePerformanceProblemSection />

      <CrossLinePerformanceIntegrationOverviewSection />

      <CrossLinePerformanceFlowDiagramSection />

      <CrossLinePerformanceValueSection />

      <CrossLinePerformanceToggleSection />

      <CrossLinePerformanceCTASection />
    </MarketingPageFrame>
  );
}

