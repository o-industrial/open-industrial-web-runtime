import { JSX } from 'preact';

import { Action, ActionStyleTypes } from '@o-industrial/atomic/atoms';

import { MarketingPreHeadline } from '@o-industrial/atomic/atoms';
import { MarketingSectionShell } from '@o-industrial/atomic/molecules';
import { assetManagementOutcome } from '../../../../../../../src/marketing/solutions/asset-management.ts';

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

export default function AssetManagementCTASection(): JSX.Element {
  return (
    <MarketingSectionShell variant='midnight'>
      <div class='mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center text-white/80'>
        <MarketingPreHeadline value='Next Up' tone='inverse' />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
          {assetManagementOutcome.title}
        </h2>
        {assetManagementOutcome.description
          ? (
            <p class='text-base leading-relaxed text-white/75 sm:text-lg'>
              {assetManagementOutcome.description}
            </p>
          )
          : null}

        <div class='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center'>
          {assetManagementOutcome.primaryAction
            ? (
              <Action
                href={assetManagementOutcome.primaryAction.href}
                styleType={mapIntent(assetManagementOutcome.primaryAction.intent)}
                target={assetManagementOutcome.primaryAction.external ? '_blank' : undefined}
                rel={assetManagementOutcome.primaryAction.external
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {assetManagementOutcome.primaryAction.label}
              </Action>
            )
            : null}
          {assetManagementOutcome.secondaryAction
            ? (
              <Action
                href={assetManagementOutcome.secondaryAction.href}
                styleType={mapIntent(assetManagementOutcome.secondaryAction.intent)}
                target={assetManagementOutcome.secondaryAction.external ? '_blank' : undefined}
                rel={assetManagementOutcome.secondaryAction.external
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {assetManagementOutcome.secondaryAction.label}
              </Action>
            )
            : null}
        </div>
      </div>
    </MarketingSectionShell>
  );
}


