import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import HeroExperienceSection from '../components/organisms/marketing/open-industrial-home/HeroExperienceSection.tsx';
import ProductSpotlightSection from '../components/organisms/marketing/open-industrial-home/ProductSpotlightSection.tsx';
import UnifiedMetricsSection from '../components/organisms/marketing/open-industrial-home/UnifiedMetricsSection.tsx';
import GovernedFlowSection from '../components/organisms/marketing/open-industrial-home/GovernedFlowSection.tsx';
import AIConversationsSection from '../components/organisms/marketing/open-industrial-home/AIConversationsSection.tsx';
import StrategicPillarsSection from '../components/organisms/marketing/open-industrial-home/StrategicPillarsSection.tsx';
import ValueDeliverySection from '../components/organisms/marketing/open-industrial-home/ValueDeliverySection.tsx';
import IntegrationEcosystemSection from '../components/organisms/marketing/open-industrial-home/IntegrationEcosystemSection.tsx';
import UnifiedFlowSection from '../components/organisms/marketing/open-industrial-home/UnifiedFlowSection.tsx';
import SharedTruthSection from '../components/organisms/marketing/open-industrial-home/SharedTruthSection.tsx';
import GovernedDeploymentSection from '../components/organisms/marketing/open-industrial-home/GovernedDeploymentSection.tsx';
import FutureVisionSection from '../components/organisms/marketing/open-industrial-home/FutureVisionSection.tsx';
import ReadyCTASection from '../components/organisms/marketing/open-industrial-home/ReadyCTASection.tsx';

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
    <div class='relative flex flex-col overflow-hidden bg-gradient-to-b from-[#f9fbff] via-white to-[#f4f0ff] dark:from-[#020312] dark:via-[#05091d] dark:to-[#02010e]'>
      <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
        <div class='absolute left-1/2 top-[-18%] h-[620px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(141,121,255,0.35),_rgba(255,255,255,0)_72%)] opacity-70 blur-3xl dark:opacity-90' />
        <div class='absolute left-[-12%] top-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(82,206,255,0.18),_rgba(255,255,255,0)_68%)] blur-[120px] dark:bg-[radial-gradient(circle,_rgba(82,206,255,0.32),_rgba(255,255,255,0)_70%)]' />
        <div class='absolute right-[-14%] bottom-[-8%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,_rgba(255,168,236,0.2),_rgba(255,255,255,0)_72%)] blur-[140px] dark:bg-[radial-gradient(circle,_rgba(218,147,255,0.28),_rgba(255,255,255,0)_75%)]' />
      </div>

      <HeroExperienceSection />

      <ProductSpotlightSection />

      <StrategicPillarsSection />

      <UnifiedMetricsSection />

      <GovernedFlowSection />

      <AIConversationsSection />

      <ValueDeliverySection />

      <IntegrationEcosystemSection />

      <UnifiedFlowSection />

      <SharedTruthSection />

      <GovernedDeploymentSection />

      <FutureVisionSection />

      <ReadyCTASection />
    </div>
  );
}
