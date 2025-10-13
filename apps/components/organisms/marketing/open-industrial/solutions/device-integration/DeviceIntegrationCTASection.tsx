import { JSX } from 'preact';

import { Action, ActionStyleTypes } from '@o-industrial/atomic/atoms';

import { MarketingPreHeadline } from '@o-industrial/atomic/atoms';
import { MarketingSectionShell } from '@o-industrial/atomic/molecules';
import { deviceIntegrationOutcome } from '../../../../../../../src/marketing/solutions/device-integration.ts';

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

export default function DeviceIntegrationCTASection(): JSX.Element {
  return (
    <MarketingSectionShell variant='midnight'>
      <div class='mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center text-white/80'>
        <MarketingPreHeadline value='Next Up' tone='inverse' />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
          {deviceIntegrationOutcome.title}
        </h2>
        {deviceIntegrationOutcome.description
          ? (
            <p class='text-base leading-relaxed text-white/75 sm:text-lg'>
              {deviceIntegrationOutcome.description}
            </p>
          )
          : null}

        <div class='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center'>
          {deviceIntegrationOutcome.primaryAction
            ? (
              <Action
                href={deviceIntegrationOutcome.primaryAction.href}
                styleType={mapIntent(deviceIntegrationOutcome.primaryAction.intent)}
                target={deviceIntegrationOutcome.primaryAction.external ? '_blank' : undefined}
                rel={deviceIntegrationOutcome.primaryAction.external
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {deviceIntegrationOutcome.primaryAction.label}
              </Action>
            )
            : null}
          {deviceIntegrationOutcome.secondaryAction
            ? (
              <Action
                href={deviceIntegrationOutcome.secondaryAction.href}
                styleType={mapIntent(deviceIntegrationOutcome.secondaryAction.intent)}
                target={deviceIntegrationOutcome.secondaryAction.external ? '_blank' : undefined}
                rel={deviceIntegrationOutcome.secondaryAction.external
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {deviceIntegrationOutcome.secondaryAction.label}
              </Action>
            )
            : null}
        </div>
      </div>
    </MarketingSectionShell>
  );
}


