import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import ProductionManagementCTASection from '../../../components/organisms/marketing/open-industrial/solutions/production-management/ProductionManagementCTASection.tsx';
import ProductionManagementFlowDiagramSection from '../../../components/organisms/marketing/open-industrial/solutions/production-management/ProductionManagementFlowDiagramSection.tsx';
import ProductionManagementHeroSection from '../../../components/organisms/marketing/open-industrial/solutions/production-management/ProductionManagementHeroSection.tsx';
import ProductionManagementIntegrationOverviewSection from '../../../components/organisms/marketing/open-industrial/solutions/production-management/ProductionManagementIntegrationOverviewSection.tsx';
import ProductionManagementProblemSection from '../../../components/organisms/marketing/open-industrial/solutions/production-management/ProductionManagementProblemSection.tsx';
import ProductionManagementToggleSection from '../../../components/organisms/marketing/open-industrial/solutions/production-management/ProductionManagementToggleSection.tsx';
import ProductionManagementValueSection from '../../../components/organisms/marketing/open-industrial/solutions/production-management/ProductionManagementValueSection.tsx';
import { MarketingPageFrame } from '@o-industrial/atomic/templates';
import type { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export const IsIsland = true;

type ProductionManagementPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState, ProductionManagementPageData> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function ProductionManagementPage({}: PageProps<ProductionManagementPageData>) {
  return (
    <MarketingPageFrame>
      <ProductionManagementHeroSection />

      <ProductionManagementProblemSection />

      <ProductionManagementIntegrationOverviewSection />

      <ProductionManagementFlowDiagramSection />

      <ProductionManagementValueSection />

      <ProductionManagementToggleSection />

      <ProductionManagementCTASection />
    </MarketingPageFrame>
  );
}

