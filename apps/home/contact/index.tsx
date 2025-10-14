import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import ContactCTASection from '../../components/organisms/marketing/open-industrial/contact/ContactCTASection.tsx';
import ContactFormSection from '../../components/organisms/marketing/open-industrial/contact/ContactFormSection.tsx';
import ContactHeroSection from '../../components/organisms/marketing/open-industrial/contact/ContactHeroSection.tsx';
import { MarketingPageFrame } from '@o-industrial/atomic/templates';
import type { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export const IsIsland = true;

type ContactPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  ContactPageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function ContactPage({}: PageProps<ContactPageData>) {
  return (
    <MarketingPageFrame>
      <ContactHeroSection />
      <ContactFormSection />

      <ContactCTASection />
    </MarketingPageFrame>
  );
}

