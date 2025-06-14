import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';

import HeroSection from '../components/organisms/marketing/pdm/HeroSection.tsx';
import PainSection from '../components/organisms/marketing/pdm/PainSection.tsx';
import SystemProofSection from '../components/organisms/marketing/pdm/SystemProofSection.tsx';
import JourneySection from '../components/organisms/marketing/pdm/JourneySection.tsx';
import CallToAction from '../components/organisms/marketing/pdm/CallToAction.tsx';
import UseCaseShowcaseSection from '../components/organisms/marketing/pdm/UseCaseShowcaseSection.tsx';

export const IsIsland = true;

// deno-lint-ignore ban-types
export type PDMForProcessLogicData = {};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  PDMForProcessLogicData
> = {
  GET: (_req, ctx) => {
    const data: PDMForProcessLogicData = {};
    return ctx.Render(data);
  },
};

export default function PDMForProcessLogic({}: PageProps<PDMForProcessLogicData>) {
  return (
    <div class='flex flex-col'>
      <HeroSection />

      <PainSection />

      <SystemProofSection />

      <JourneySection />

      <UseCaseShowcaseSection />

      <CallToAction />
    </div>
  );
}
