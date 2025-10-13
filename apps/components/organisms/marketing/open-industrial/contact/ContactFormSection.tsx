import { JSX } from 'preact';

import { MarketingPreHeadline } from '@o-industrial/atomic/atoms';
import { MarketingSectionShell } from '@o-industrial/atomic/molecules';
import { HubspotForm } from '@o-industrial/atomic/organisms';
import { contactFormHeader } from '../../../../../../src/marketing/contact.ts';
import { buildHubspotTrackingHandlers } from '../../../../../../src/marketing/forms/hubspotTracking.ts';

export default function ContactFormSection(): JSX.Element {
  const hubspotTracking = buildHubspotTrackingHandlers({
    location: 'open-industrial:contact',
    formId: 'c469e188-69b9-4165-b524-62c5a33b834c',
  });

  return (
    <MarketingSectionShell id='form' variant='lavender'>
      <div class='mx-auto flex w-full max-w-3xl flex-col items-center gap-8 text-center text-neutral-700 dark:text-neutral-200'>
        <MarketingPreHeadline value={contactFormHeader.eyebrow} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {contactFormHeader.title}
        </h2>
        {contactFormHeader.description
          ? (
            <p class='text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300'>
              {contactFormHeader.description}
            </p>
          )
          : null}

        <div class='w-full rounded-3xl border border-white/40 bg-white/95 p-8 shadow-[0_45px_120px_-80px_rgba(37,41,76,0.65)] backdrop-blur dark:border-white/10 dark:bg-neutral-950/85'>
          <HubspotForm
            id='contact-hubspot-form'
            formId='c469e188-69b9-4165-b524-62c5a33b834c'
            {...hubspotTracking}
          />
        </div>
      </div>
    </MarketingSectionShell>
  );
}


