import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import HeroExperienceSection from '../components/organisms/marketing/open-industrial/home/HeroExperienceSection.tsx';
import IntroBand from '../components/organisms/marketing/open-industrial/home/IntroBand.tsx';
import GovernedFlowSection from '../components/organisms/marketing/open-industrial/home/GovernedFlowSection.tsx';
import AIConversationsSection from '../components/organisms/marketing/open-industrial/home/AIConversationsSection.tsx';
import ValueDeliverySection from '../components/organisms/marketing/open-industrial/home/ValueDeliverySection.tsx';
import UnifiedFlowSection from '../components/organisms/marketing/open-industrial/home/UnifiedFlowSection.tsx';
import WhyOiGuardrailsSection from '../components/organisms/marketing/open-industrial/home/WhyOiGuardrailsSection.tsx';
import CloudOptionsSection from '../components/organisms/marketing/open-industrial/home/CloudOptionsSection.tsx';
import FutureVisionSection from '../components/organisms/marketing/open-industrial/home/FutureVisionSection.tsx';
import ReadyCTASection from '../components/organisms/marketing/open-industrial/home/ReadyCTASection.tsx';
import WorksWithYourStackSection from '../components/organisms/marketing/open-industrial/home/WorksWithYourStackSection.tsx';
import { MarketingPageFrame } from '../components/shared/MarketingPageFrame.tsx';

import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';

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

export default function HomePage({}: PageProps<HomepageData>) {
  return (
    <MarketingPageFrame variant='aurora'>
      <HeroExperienceSection />
      <IntroBand />
      <GovernedFlowSection />
      <AIConversationsSection />
      <ValueDeliverySection />
      <UnifiedFlowSection />
      <WorksWithYourStackSection />
      <WhyOiGuardrailsSection />
      <CloudOptionsSection />
      <FutureVisionSection />
      <ReadyCTASection />
    </MarketingPageFrame>
  );
}
