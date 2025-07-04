import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';

import HeroSection from '../components/organisms/marketing/automate/HeroSection.tsx';
import PainSection from '../components/organisms/marketing/automate/PainSection.tsx';
import SystemProofSection from '../components/organisms/marketing/automate/SystemProofSection.tsx';
import JourneySection from '../components/organisms/marketing/automate/JourneySection.tsx';
import CallToAction from '../components/organisms/marketing/automate/CallToAction.tsx';
import UseCaseShowcaseSection from '../components/organisms/marketing/automate/UseCaseShowcaseSection.tsx';

export const IsIsland = true;

// deno-lint-ignore ban-types
export type HomepageData = {};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  HomepageData
> = {
  GET: (_req, ctx) => {
    const data: HomepageData = {};
    return ctx.Render(data);
  },
};

export default function HomepageAttempt2({}: PageProps<HomepageData>) {
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
