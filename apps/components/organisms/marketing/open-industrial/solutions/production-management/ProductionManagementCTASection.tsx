import { JSX } from 'preact';

import { Action, ActionStyleTypes } from '@o-industrial/atomic/atoms';

import { MarketingPreHeadline } from '@o-industrial/atomic/atoms';
import { MarketingSectionShell } from '@o-industrial/atomic/molecules';
import { productionManagementOutcome } from '../../../../../../../src/marketing/solutions/production-management.ts';

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

export default function ProductionManagementCTASection(): JSX.Element {
  return (
    <MarketingSectionShell variant='midnight'>
      <div class='mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center text-white/80'>
        <MarketingPreHeadline value='Next Up' tone='inverse' />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
          {productionManagementOutcome.title}
        </h2>
        {productionManagementOutcome.description
          ? (
            <p class='text-base leading-relaxed text-white/75 sm:text-lg'>
              {productionManagementOutcome.description}
            </p>
          )
          : null}

        <div class='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center'>
          {productionManagementOutcome.primaryAction
            ? (
              <Action
                href={productionManagementOutcome.primaryAction.href}
                styleType={mapIntent(productionManagementOutcome.primaryAction.intent)}
                target={productionManagementOutcome.primaryAction.external ? '_blank' : undefined}
                rel={productionManagementOutcome.primaryAction.external
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {productionManagementOutcome.primaryAction.label}
              </Action>
            )
            : null}
          {productionManagementOutcome.secondaryAction
            ? (
              <Action
                href={productionManagementOutcome.secondaryAction.href}
                styleType={mapIntent(productionManagementOutcome.secondaryAction.intent)}
                target={productionManagementOutcome.secondaryAction.external ? '_blank' : undefined}
                rel={productionManagementOutcome.secondaryAction.external
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {productionManagementOutcome.secondaryAction.label}
              </Action>
            )
            : null}
        </div>
      </div>
    </MarketingSectionShell>
  );
}
