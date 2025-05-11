import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';

import HeroSection from '../components/organisms/marketing/attempt2/HeroSection.tsx';
import PainSection from '../components/organisms/marketing/attempt2/PainSection.tsx';
import SystemProofSection from '../components/organisms/marketing/attempt2/SystemProofSection.tsx';
// import JourneySection from '../components/organisms/marketing/attempt2/JourneySection.tsx';
// import CallToAction from '../components/organisms/marketing/attempt2/CallToAction.tsx';

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
    <div class="flex flex-col bg-neutral-900 text-white pb-24">
      <HeroSection />
      <PainSection />
      {/* 
      <SystemProofSection />
      <JourneySection />
      <CallToAction /> 
      */}
    </div>
  );
}
