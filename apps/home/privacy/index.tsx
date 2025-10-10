import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import PrivacyDocumentSection from '../../components/organisms/marketing/open-industrial/legal/PrivacyDocumentSection.tsx';
import { MarketingPageFrame } from '../../components/shared/MarketingPageFrame.tsx';
import type { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export const IsIsland = true;

type PrivacyPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  PrivacyPageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function PrivacyPage({}: PageProps<PrivacyPageData>) {
  return (
    <MarketingPageFrame disableOverlays>
      <PrivacyDocumentSection />
    </MarketingPageFrame>
  );
}
