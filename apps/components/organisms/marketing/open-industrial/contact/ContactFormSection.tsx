import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { SectionHeader } from '@o-industrial/common/atomic/molecules';

import { HubspotForm } from '../../HubspotForm.tsx';
import { contactFormHeader } from '../../../../../src/marketing/contact.ts';

export default function ContactFormSection(): JSX.Element {
  return (
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
  );
}
