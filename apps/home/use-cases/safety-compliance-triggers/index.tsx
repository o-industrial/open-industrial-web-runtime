import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import SafetyComplianceTriggersCTASection from '../../../components/organisms/marketing/open-industrial/use-cases/safety-compliance-triggers/SafetyComplianceTriggersCTASection.tsx';
import SafetyComplianceTriggersFlowDiagramSection from '../../../components/organisms/marketing/open-industrial/use-cases/safety-compliance-triggers/SafetyComplianceTriggersFlowDiagramSection.tsx';
import SafetyComplianceTriggersHeroSection from '../../../components/organisms/marketing/open-industrial/use-cases/safety-compliance-triggers/SafetyComplianceTriggersHeroSection.tsx';
import SafetyComplianceTriggersIntegrationOverviewSection from '../../../components/organisms/marketing/open-industrial/use-cases/safety-compliance-triggers/SafetyComplianceTriggersIntegrationOverviewSection.tsx';
import SafetyComplianceTriggersProblemSection from '../../../components/organisms/marketing/open-industrial/use-cases/safety-compliance-triggers/SafetyComplianceTriggersProblemSection.tsx';
import SafetyComplianceTriggersToggleSection from '../../../components/organisms/marketing/open-industrial/use-cases/safety-compliance-triggers/SafetyComplianceTriggersToggleSection.tsx';
import SafetyComplianceTriggersValueSection from '../../../components/organisms/marketing/open-industrial/use-cases/safety-compliance-triggers/SafetyComplianceTriggersValueSection.tsx';
import { MarketingPageFrame } from '@o-industrial/atomic/templates';
import type { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export const IsIsland = true;

type SafetyComplianceTriggersPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  SafetyComplianceTriggersPageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function SafetyComplianceTriggersPage(
  {}: PageProps<SafetyComplianceTriggersPageData>,
) {
  return (
    <MarketingPageFrame>
      <SafetyComplianceTriggersHeroSection />

      <SafetyComplianceTriggersProblemSection />

      <SafetyComplianceTriggersIntegrationOverviewSection />

      <SafetyComplianceTriggersFlowDiagramSection />

      <SafetyComplianceTriggersValueSection />

      <SafetyComplianceTriggersToggleSection />

      <SafetyComplianceTriggersCTASection />
    </MarketingPageFrame>
  );
}

