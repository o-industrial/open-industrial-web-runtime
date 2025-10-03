import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import DowntimeDiagnosisCTASection from '../../../components/organisms/marketing/open-industrial/use-cases/downtime-diagnosis/DowntimeDiagnosisCTASection.tsx';
import DowntimeDiagnosisFlowDiagramSection from '../../../components/organisms/marketing/open-industrial/use-cases/downtime-diagnosis/DowntimeDiagnosisFlowDiagramSection.tsx';
import DowntimeDiagnosisHeroSection from '../../../components/organisms/marketing/open-industrial/use-cases/downtime-diagnosis/DowntimeDiagnosisHeroSection.tsx';
import DowntimeDiagnosisIntegrationOverviewSection from '../../../components/organisms/marketing/open-industrial/use-cases/downtime-diagnosis/DowntimeDiagnosisIntegrationOverviewSection.tsx';
import DowntimeDiagnosisProblemSection from '../../../components/organisms/marketing/open-industrial/use-cases/downtime-diagnosis/DowntimeDiagnosisProblemSection.tsx';
import DowntimeDiagnosisToggleSection from '../../../components/organisms/marketing/open-industrial/use-cases/downtime-diagnosis/DowntimeDiagnosisToggleSection.tsx';
import DowntimeDiagnosisValueSection from '../../../components/organisms/marketing/open-industrial/use-cases/downtime-diagnosis/DowntimeDiagnosisValueSection.tsx';
import { MarketingPageFrame } from '../../../components/shared/MarketingPageFrame.tsx';
import { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export const IsIsland = true;

type DowntimeDiagnosisPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  DowntimeDiagnosisPageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function DowntimeDiagnosisPage({}: PageProps<DowntimeDiagnosisPageData>) {
  return (
    <MarketingPageFrame>
      <DowntimeDiagnosisHeroSection />

      <DowntimeDiagnosisProblemSection />

      <DowntimeDiagnosisIntegrationOverviewSection />

      <DowntimeDiagnosisFlowDiagramSection />

      <DowntimeDiagnosisValueSection />

      <DowntimeDiagnosisToggleSection />

      <DowntimeDiagnosisCTASection />
    </MarketingPageFrame>
  );
}
