import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import DeviceIntegrationCTASection from '../../../components/organisms/marketing/open-industrial/solutions/device-integration/DeviceIntegrationCTASection.tsx';
import DeviceIntegrationFlowDiagramSection from '../../../components/organisms/marketing/open-industrial/solutions/device-integration/DeviceIntegrationFlowDiagramSection.tsx';
import DeviceIntegrationHeroSection from '../../../components/organisms/marketing/open-industrial/solutions/device-integration/DeviceIntegrationHeroSection.tsx';
import DeviceIntegrationOverviewSection from '../../../components/organisms/marketing/open-industrial/solutions/device-integration/DeviceIntegrationOverviewSection.tsx';
import DeviceIntegrationProblemSection from '../../../components/organisms/marketing/open-industrial/solutions/device-integration/DeviceIntegrationProblemSection.tsx';
import DeviceIntegrationToggleSection from '../../../components/organisms/marketing/open-industrial/solutions/device-integration/DeviceIntegrationToggleSection.tsx';
import DeviceIntegrationValueSection from '../../../components/organisms/marketing/open-industrial/solutions/device-integration/DeviceIntegrationValueSection.tsx';
import { MarketingPageFrame } from '@o-industrial/atomic/templates';
import type { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export const IsIsland = true;

type DeviceIntegrationPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState, DeviceIntegrationPageData> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function DeviceIntegrationPage({}: PageProps<DeviceIntegrationPageData>) {
  return (
    <MarketingPageFrame>
      <DeviceIntegrationHeroSection />

      <DeviceIntegrationProblemSection />

      <DeviceIntegrationOverviewSection />

      <DeviceIntegrationFlowDiagramSection />

      <DeviceIntegrationValueSection />

      <DeviceIntegrationToggleSection />

      <DeviceIntegrationCTASection />
    </MarketingPageFrame>
  );
}
