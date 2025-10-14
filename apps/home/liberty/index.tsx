import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import WorkspaceLibertyCaseStudySection from '../../components/organisms/marketing/open-industrial/workspace-liberty/CaseStudySection.tsx';
import WorkspaceLibertyCtaBand from '../../components/organisms/marketing/open-industrial/workspace-liberty/CtaBand.tsx';
import WorkspaceLibertyGovernedFlowSection from '../../components/organisms/marketing/open-industrial/workspace-liberty/GovernedFlowSection.tsx';
import WorkspaceLibertyHeroSection from '../../components/organisms/marketing/open-industrial/workspace-liberty/HeroSection.tsx';
import WorkspaceLibertyPersonaProofSection from '../../components/organisms/marketing/open-industrial/workspace-liberty/PersonaProofSection.tsx';
import WorkspaceLibertyQuickWinsSection from '../../components/organisms/marketing/open-industrial/workspace-liberty/QuickWinsSection.tsx';
import WorkspaceLibertyWorkspacesSection from '../../components/organisms/marketing/open-industrial/workspace-liberty/WorkspacesSection.tsx';
import { MarketingPageFrame } from '@o-industrial/atomic/templates';
import type { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export const IsIsland = true;

type WorkspaceLibertyPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState, WorkspaceLibertyPageData> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function WorkspaceLibertyPage({}: PageProps<WorkspaceLibertyPageData>) {
  return (
    <MarketingPageFrame variant='aurora'>
      <WorkspaceLibertyHeroSection />

      <WorkspaceLibertyCaseStudySection />

      <WorkspaceLibertyWorkspacesSection />

      <WorkspaceLibertyQuickWinsSection />

      <WorkspaceLibertyGovernedFlowSection />

      <WorkspaceLibertyPersonaProofSection />

      <WorkspaceLibertyCtaBand />
    </MarketingPageFrame>
  );
}
