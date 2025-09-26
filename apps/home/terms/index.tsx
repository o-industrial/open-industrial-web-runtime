import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import TermsDocumentSection from '../../components/organisms/marketing/open-industrial/legal/TermsDocumentSection.tsx';
import { MarketingPageFrame } from '../../components/shared/MarketingPageFrame.tsx';
import { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export const IsIsland = true;

type TermsPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  TermsPageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function TermsPage({}: PageProps<TermsPageData>) {
  return (
    <MarketingPageFrame disableOverlays>
      <TermsDocumentSection />
    </MarketingPageFrame>
  );
}
