import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import type { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

import AssetManagementCTASection from '../../../components/organisms/marketing/open-industrial/solutions/asset-management/AssetManagementCTASection.tsx';
import AssetManagementFlowDiagramSection from '../../../components/organisms/marketing/open-industrial/solutions/asset-management/AssetManagementFlowDiagramSection.tsx';
import AssetManagementHeroSection from '../../../components/organisms/marketing/open-industrial/solutions/asset-management/AssetManagementHeroSection.tsx';
import AssetManagementIntegrationOverviewSection from '../../../components/organisms/marketing/open-industrial/solutions/asset-management/AssetManagementIntegrationOverviewSection.tsx';
import AssetManagementProblemSection from '../../../components/organisms/marketing/open-industrial/solutions/asset-management/AssetManagementProblemSection.tsx';
import AssetManagementToggleSection from '../../../components/organisms/marketing/open-industrial/solutions/asset-management/AssetManagementToggleSection.tsx';
import AssetManagementValueSection from '../../../components/organisms/marketing/open-industrial/solutions/asset-management/AssetManagementValueSection.tsx';
import { MarketingPageFrame } from '@o-industrial/atomic/templates';

export const IsIsland = true;

type AssetManagementPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState, AssetManagementPageData> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function AssetManagementPage({}: PageProps<AssetManagementPageData>) {
  return (
    <MarketingPageFrame>
      <AssetManagementHeroSection />

      <AssetManagementProblemSection />

      <AssetManagementIntegrationOverviewSection />

      <AssetManagementFlowDiagramSection />

      <AssetManagementValueSection />

      <AssetManagementToggleSection />

      <AssetManagementCTASection />
    </MarketingPageFrame>
  );
}

