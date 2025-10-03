import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import UseCasesHeroSection from '../../components/organisms/marketing/open-industrial/use-cases/UseCasesHeroSection.tsx';
import UseCasesListSection from '../../components/organisms/marketing/open-industrial/use-cases/UseCasesListSection.tsx';
import { MarketingPageFrame } from '../../components/shared/MarketingPageFrame.tsx';
import type { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export const IsIsland = true;

type UseCasesIndexPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  UseCasesIndexPageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function UseCasesIndexPage({}: PageProps<UseCasesIndexPageData>) {
  return (
    <MarketingPageFrame>
      <UseCasesHeroSection />

      <UseCasesListSection />
    </MarketingPageFrame>
  );
}

