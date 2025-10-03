import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import SolutionsHeroSection from '../../components/organisms/marketing/open-industrial/solutions/SolutionsHeroSection.tsx';
import SolutionsListSection from '../../components/organisms/marketing/open-industrial/solutions/SolutionsListSection.tsx';
import { MarketingPageFrame } from '../../components/shared/MarketingPageFrame.tsx';
import { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export const IsIsland = true;

type SolutionsPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  SolutionsPageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function SolutionsPage({}: PageProps<SolutionsPageData>) {
  return (
    <MarketingPageFrame>
      <SolutionsHeroSection />

      <SolutionsListSection />
    </MarketingPageFrame>
  );
}
