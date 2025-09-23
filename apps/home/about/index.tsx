import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import AboutHeroSection from '../../components/organisms/marketing/open-industrial/about/AboutHeroSection.tsx';
import CapabilitiesSection from '../../components/organisms/marketing/open-industrial/about/CapabilitiesSection.tsx';
import IndustriesSection from '../../components/organisms/marketing/open-industrial/about/IndustriesSection.tsx';
import MissionStatementSection from '../../components/organisms/marketing/open-industrial/about/MissionStatementSection.tsx';
import VisionCTASection from '../../components/organisms/marketing/open-industrial/about/VisionCTASection.tsx';
import VisionStatementSection from '../../components/organisms/marketing/open-industrial/about/VisionStatementSection.tsx';
import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

// deno-lint-ignore ban-types
export type AboutPageData = {};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  AboutPageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function AboutPage({}: PageProps<AboutPageData>) {
  return (
    <div class='flex flex-col'>
      <AboutHeroSection />

      <MissionStatementSection />

      <CapabilitiesSection />

      <IndustriesSection />

      <VisionStatementSection />

      <VisionCTASection />
    </div>
  );
}
