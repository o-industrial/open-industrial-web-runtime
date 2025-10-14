import { JSX } from 'preact';

import { Action, ActionStyleTypes } from '@o-industrial/atomic/atoms';

import { MarketingPreHeadline } from '@o-industrial/atomic/atoms';
import { MarketingSectionShell } from '@o-industrial/atomic/molecules';
import { contactCTA } from '../../../../../../src/marketing/contact.ts';

function mapIntent(intent?: 'primary' | 'secondary' | 'ghost'): ActionStyleTypes {
  switch (intent) {
    case 'secondary':
      return ActionStyleTypes.Outline | ActionStyleTypes.Rounded;
    case 'ghost':
      return ActionStyleTypes.Thin | ActionStyleTypes.Link;
    case 'primary':
    default:
      return ActionStyleTypes.Solid | ActionStyleTypes.Rounded;
  }
}

export default function ContactCTASection(): JSX.Element {
  return (
    <MarketingSectionShell variant='midnight'>
      <div class='mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center text-white/80'>
        <MarketingPreHeadline value='Take action' tone='inverse' />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
          {contactCTA.title}
        </h2>
        {contactCTA.description
          ? (
            <p class='text-base leading-relaxed text-white/75 sm:text-lg'>
              {contactCTA.description}
            </p>
          )
          : null}

        <div class='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center'>
          {contactCTA.primaryAction
            ? (
              <Action
                href={contactCTA.primaryAction.href}
                styleType={mapIntent(contactCTA.primaryAction.intent)}
                target={contactCTA.primaryAction.external ? '_blank' : undefined}
                rel={contactCTA.primaryAction.external ? 'noopener noreferrer' : undefined}
              >
                {contactCTA.primaryAction.label}
              </Action>
            )
            : null}
          {contactCTA.secondaryAction
            ? (
              <Action
                href={contactCTA.secondaryAction.href}
                styleType={mapIntent(contactCTA.secondaryAction.intent)}
                target={contactCTA.secondaryAction.external ? '_blank' : undefined}
                rel={contactCTA.secondaryAction.external ? 'noopener noreferrer' : undefined}
              >
                {contactCTA.secondaryAction.label}
              </Action>
            )
            : null}
        </div>
      </div>
    </MarketingSectionShell>
  );
}
