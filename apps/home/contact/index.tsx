import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { SectionHeader } from '@o-industrial/common/atomic/molecules';
import {
  CTADeepLinkSection,
  HeroShowcase,
  ValueGridSection,
} from '@o-industrial/common/atomic/organisms';

import { HubspotForm } from '../../components/organisms/marketing/HubspotForm.tsx';
import {
  contactCTA,
  contactFormHeader,
  contactHero,
  contactIntro,
  contactMethods,
} from '../../../src/marketing/contact.ts';
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
      <HeroShowcase
        header={{
          eyebrow: contactHero.eyebrow,
          title: contactHero.title,
          description: contactHero.description,
          align: 'left',
        }}
        media={contactHero.media}
        primaryAction={contactHero.primaryAction}
        secondaryAction={contactHero.secondaryAction}
        class='relative overflow-hidden bg-gradient-to-br from-[#070a1e] via-[#101435] to-[#060816] text-white'
      >
        <p class='max-w-xl text-sm text-white/70'>
          Our specialists respond within one business day with the next steps tailored to your OT
          environment.
        </p>
      </HeroShowcase>

      <ValueGridSection
        header={contactIntro}
        items={contactMethods}
        columns={3}
        variant='light'
        class='bg-gradient-to-b from-white via-[#f5f7ff] to-white dark:from-[#080c1f] dark:via-[#0f1533] dark:to-[#060916]'
      />

      <SectionSurface
        id='form'
        tone='default'
        class='bg-gradient-to-br from-[#f7f9ff] via-white to-[#f4efff] py-20 dark:from-[#070b1f] dark:via-[#0d1330] dark:to-[#080b1d]'
      >
        <div class='mx-auto flex w-full max-w-3xl flex-col items-center gap-10 px-6 text-center'>
          <SectionHeader {...contactFormHeader} />
          <div class='w-full rounded-3xl border border-white/40 bg-white/90 p-8 shadow-[0_45px_120px_-80px_rgba(37,41,76,0.65)] backdrop-blur dark:border-white/10 dark:bg-neutral-950/80'>
            <HubspotForm id='contact-hubspot-form' />
          </div>
        </div>
      </SectionSurface>

      <CTADeepLinkSection
        content={contactCTA}
        class='bg-gradient-to-br from-[#f5f7ff] via-white to-[#f4efff] py-20 dark:from-[#080c1f] dark:via-[#13143b] dark:to-[#050818]'
      />
    </div>
  );
}
