import { JSX } from 'preact';

import { Action, ActionStyleTypes } from '@o-industrial/atomic/atoms';

import { MarketingPreHeadline } from '../../../../../shared/MarketingPreHeadline.tsx';
import { MarketingSectionShell } from '../../../../../shared/MarketingSectionShell.tsx';
import { qualityManagementOutcome } from '../../../../../../../src/marketing/solutions/quality-management.ts';

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

export default function QualityManagementCTASection(): JSX.Element {
  return (
    <MarketingSectionShell variant='midnight'>
      <div class='mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center text-white/80'>
        <MarketingPreHeadline value='Next Up' tone='inverse' />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
          {qualityManagementOutcome.title}
        </h2>
        {qualityManagementOutcome.description
          ? (
            <p class='text-base leading-relaxed text-white/75 sm:text-lg'>
              {qualityManagementOutcome.description}
            </p>
          )
          : null}

        <div class='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center'>
          {qualityManagementOutcome.primaryAction
            ? (
              <Action
                href={qualityManagementOutcome.primaryAction.href}
                styleType={mapIntent(qualityManagementOutcome.primaryAction.intent)}
                target={qualityManagementOutcome.primaryAction.external ? '_blank' : undefined}
                rel={qualityManagementOutcome.primaryAction.external
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {qualityManagementOutcome.primaryAction.label}
              </Action>
            )
            : null}
          {qualityManagementOutcome.secondaryAction
            ? (
              <Action
                href={qualityManagementOutcome.secondaryAction.href}
                styleType={mapIntent(qualityManagementOutcome.secondaryAction.intent)}
                target={qualityManagementOutcome.secondaryAction.external ? '_blank' : undefined}
                rel={qualityManagementOutcome.secondaryAction.external
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {qualityManagementOutcome.secondaryAction.label}
              </Action>
            )
            : null}
        </div>
      </div>
    </MarketingSectionShell>
  );
}
