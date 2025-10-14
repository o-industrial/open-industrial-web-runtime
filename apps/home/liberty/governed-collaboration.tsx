import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import GovernedCollaborationHeroSection from '../../components/organisms/marketing/open-industrial/governed-collaboration/HeroSection.tsx';
import GovernedCollaborationPersonaSection from '../../components/organisms/marketing/open-industrial/governed-collaboration/PersonaSection.tsx';
import GovernedCollaborationDeepDiveSection from '../../components/organisms/marketing/open-industrial/governed-collaboration/GovernanceDeepDiveSection.tsx';
import GovernedCollaborationGuardrailsSection from '../../components/organisms/marketing/open-industrial/governed-collaboration/GuardrailsSection.tsx';
import GovernedCollaborationAziSection from '../../components/organisms/marketing/open-industrial/governed-collaboration/AziSection.tsx';
import GovernedCollaborationCtaStack from '../../components/organisms/marketing/open-industrial/governed-collaboration/CtaStack.tsx';
import GovernedCollaborationOperationalBackstageSection from '../../components/organisms/marketing/open-industrial/governed-collaboration/OperationalBackstageSection.tsx';
import { MarketingPageFrame } from '@o-industrial/atomic/templates';
import type { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export const IsIsland = true;

type GovernedCollaborationPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  GovernedCollaborationPageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function GovernedCollaborationPage({}: PageProps<GovernedCollaborationPageData>) {
  return (
    <MarketingPageFrame variant='aurora'>
      <GovernedCollaborationHeroSection />

      <GovernedCollaborationPersonaSection />

      <GovernedCollaborationDeepDiveSection />

      <GovernedCollaborationGuardrailsSection />

      <GovernedCollaborationAziSection />

      <GovernedCollaborationCtaStack />

      <GovernedCollaborationOperationalBackstageSection />
    </MarketingPageFrame>
  );
}
