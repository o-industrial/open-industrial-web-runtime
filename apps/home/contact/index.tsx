import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import ContactCTASection from '../../components/organisms/marketing/open-industrial/contact/ContactCTASection.tsx';
import ContactChannelsSection from '../../components/organisms/marketing/open-industrial/contact/ContactChannelsSection.tsx';
import ContactFormSection from '../../components/organisms/marketing/open-industrial/contact/ContactFormSection.tsx';
import ContactHeroSection from '../../components/organisms/marketing/open-industrial/contact/ContactHeroSection.tsx';
import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';

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
    <div class='flex flex-col'>
      <ContactHeroSection />

      <ContactChannelsSection />

      <ContactFormSection />

      <ContactCTASection />
    </div>
  );
}
