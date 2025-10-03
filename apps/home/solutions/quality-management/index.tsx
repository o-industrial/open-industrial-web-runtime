import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import QualityManagementCTASection from '../../../components/organisms/marketing/open-industrial/solutions/quality-management/QualityManagementCTASection.tsx';
import QualityManagementFlowDiagramSection from '../../../components/organisms/marketing/open-industrial/solutions/quality-management/QualityManagementFlowDiagramSection.tsx';
import QualityManagementHeroSection from '../../../components/organisms/marketing/open-industrial/solutions/quality-management/QualityManagementHeroSection.tsx';
import QualityManagementIntegrationOverviewSection from '../../../components/organisms/marketing/open-industrial/solutions/quality-management/QualityManagementIntegrationOverviewSection.tsx';
import QualityManagementProblemSection from '../../../components/organisms/marketing/open-industrial/solutions/quality-management/QualityManagementProblemSection.tsx';
import QualityManagementToggleSection from '../../../components/organisms/marketing/open-industrial/solutions/quality-management/QualityManagementToggleSection.tsx';
import QualityManagementValueSection from '../../../components/organisms/marketing/open-industrial/solutions/quality-management/QualityManagementValueSection.tsx';
import { MarketingPageFrame } from '../../../components/shared/MarketingPageFrame.tsx';
import type { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export const IsIsland = true;

type QualityManagementPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState, QualityManagementPageData> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function QualityManagementPage({}: PageProps<QualityManagementPageData>) {
  return (
    <MarketingPageFrame>
      <QualityManagementHeroSection />

      <QualityManagementProblemSection />

      <QualityManagementIntegrationOverviewSection />

      <QualityManagementFlowDiagramSection />

      <QualityManagementValueSection />

      <QualityManagementToggleSection />

      <QualityManagementCTASection />
    </MarketingPageFrame>
  );
}
