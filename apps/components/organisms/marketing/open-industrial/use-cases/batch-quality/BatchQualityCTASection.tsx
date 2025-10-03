import { JSX } from 'preact';

import { Action, ActionStyleTypes } from '@o-industrial/atomic/atoms';

import { MarketingPreHeadline } from '../../../../../shared/MarketingPreHeadline.tsx';
import { MarketingSectionShell } from '../../../../../shared/MarketingSectionShell.tsx';
import { batchQualityOutcome } from '../../../../../../../src/marketing/use-case/batch-quality.ts';

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

export default function BatchQualityCTASection(): JSX.Element {
  return (
    <MarketingSectionShell variant='midnight'>
      <div class='mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center text-white/80'>
        <MarketingPreHeadline value='Next Up' tone='inverse' />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
          {batchQualityOutcome.title}
        </h2>
        {batchQualityOutcome.description
          ? (
            <p class='text-base leading-relaxed text-white/75 sm:text-lg'>
              {batchQualityOutcome.description}
            </p>
          )
          : null}

        <div class='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center'>
          {batchQualityOutcome.primaryAction
            ? (
              <Action
                href={batchQualityOutcome.primaryAction.href}
                styleType={mapIntent(batchQualityOutcome.primaryAction.intent)}
                target={batchQualityOutcome.primaryAction.external ? '_blank' : undefined}
                rel={batchQualityOutcome.primaryAction.external ? 'noopener noreferrer' : undefined}
              >
                {batchQualityOutcome.primaryAction.label}
              </Action>
            )
            : null}
          {batchQualityOutcome.secondaryAction
            ? (
              <Action
                href={batchQualityOutcome.secondaryAction.href}
                styleType={mapIntent(batchQualityOutcome.secondaryAction.intent)}
                target={batchQualityOutcome.secondaryAction.external ? '_blank' : undefined}
                rel={batchQualityOutcome.secondaryAction.external
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {batchQualityOutcome.secondaryAction.label}
              </Action>
            )
            : null}
        </div>
      </div>
    </MarketingSectionShell>
  );
}

