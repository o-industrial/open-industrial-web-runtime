import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import UseCaseHeroSection from '../../components/organisms/marketing/open-industrial/use-case/UseCaseHeroSection.tsx';
import UseCaseListSection from '../../components/organisms/marketing/open-industrial/use-case/UseCaseListSection.tsx';
import { MarketingPageFrame } from '../../components/shared/MarketingPageFrame.tsx';
import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

type UseCasesPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  UseCasesPageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function UseCasesPage({}: PageProps<UseCasesPageData>) {
  return (
    <MarketingPageFrame>
      <UseCaseHeroSection />

      <UseCaseListSection />
    </MarketingPageFrame>
  );
}