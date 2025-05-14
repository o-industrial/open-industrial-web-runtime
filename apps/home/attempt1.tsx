import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';

// ✅ Homepage Sections
import HeroExecutionDeclaration from '../components/organisms/marketing/home-page/HeroExecutionDeclaration.tsx';
import ExecutionLogPreview from '../components/organisms/marketing/home-page/ExecutionLogPreview.tsx';
import NotADashboardSection from '../components/organisms/marketing/home-page/NotADashboardSection.tsx';
import YourSystemNotOursSection from '../components/organisms/marketing/home-page/YourSystemNotOursSection.tsx';
import StructureFirstThinking from '../components/organisms/marketing/home-page/StructureFirstThinking.tsx';
import MemoryPackShowcase from '../components/organisms/marketing/home-page/MemoryPackShowcase.tsx';
import ExecutionJourneyCards from '../components/organisms/marketing/home-page/ExecutionJourneyCards.tsx';
import GitRuntimeLayout from '../components/organisms/marketing/home-page/GitRuntimeLayout.tsx';
import FinalCTASection from '../components/organisms/marketing/home-page/FinalCTASection.tsx';

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

export default function Homepage({}: PageProps<HomepageData>) {
  return (
    <div class='flex flex-col space-y-16 bg-neutral-900 text-white'>
      <HeroExecutionDeclaration />

      <ExecutionLogPreview />

      <NotADashboardSection />

      <YourSystemNotOursSection />

      <StructureFirstThinking />

      <MemoryPackShowcase />

      <ExecutionJourneyCards />

      <GitRuntimeLayout />

      <FinalCTASection />
    </div>
  );
}
