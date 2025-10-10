import { JSX } from 'preact';

import { Action, ActionStyleTypes } from '@o-industrial/atomic/atoms';

import { MarketingPreHeadline } from '../../../../../shared/MarketingPreHeadline.tsx';
import { MarketingSectionShell } from '../../../../../shared/MarketingSectionShell.tsx';
import { crossLinePerformanceOutcome } from '../../../../../../../src/marketing/use-case/cross-line-performance.ts';

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

export default function CrossLinePerformanceCTASection(): JSX.Element {
  return (
    <MarketingSectionShell variant='midnight'>
      <div class='mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center text-white/80'>
        <MarketingPreHeadline value='Next Up' tone='inverse' />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
          {crossLinePerformanceOutcome.title}
        </h2>
        {crossLinePerformanceOutcome.description
          ? (
            <p class='text-base leading-relaxed text-white/75 sm:text-lg'>
              {crossLinePerformanceOutcome.description}
            </p>
          )
          : null}

        <div class='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center'>
          {crossLinePerformanceOutcome.primaryAction
            ? (
              <Action
                href={crossLinePerformanceOutcome.primaryAction.href}
                styleType={mapIntent(crossLinePerformanceOutcome.primaryAction.intent)}
                target={crossLinePerformanceOutcome.primaryAction.external ? '_blank' : undefined}
                rel={crossLinePerformanceOutcome.primaryAction.external
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {crossLinePerformanceOutcome.primaryAction.label}
              </Action>
            )
            : null}
          {crossLinePerformanceOutcome.secondaryAction
            ? (
              <Action
                href={crossLinePerformanceOutcome.secondaryAction.href}
                styleType={mapIntent(crossLinePerformanceOutcome.secondaryAction.intent)}
                target={crossLinePerformanceOutcome.secondaryAction.external ? '_blank' : undefined}
                rel={crossLinePerformanceOutcome.secondaryAction.external
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {crossLinePerformanceOutcome.secondaryAction.label}
              </Action>
            )
            : null}
        </div>
      </div>
    </MarketingSectionShell>
  );
}
