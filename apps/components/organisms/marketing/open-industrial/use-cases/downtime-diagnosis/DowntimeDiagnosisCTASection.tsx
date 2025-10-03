import { JSX } from 'preact';

import { Action, ActionStyleTypes } from '@o-industrial/atomic/atoms';

import { MarketingPreHeadline } from '../../../../../shared/MarketingPreHeadline.tsx';
import { MarketingSectionShell } from '../../../../../shared/MarketingSectionShell.tsx';
import { downtimeDiagnosisOutcome } from '../../../../../../../src/marketing/use-case/downtime-diagnosis.ts';

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

export default function DowntimeDiagnosisCTASection(): JSX.Element {
  return (
    <MarketingSectionShell variant='midnight'>
      <div class='mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center text-white/80'>
        <MarketingPreHeadline value='Next Up' tone='inverse' />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
          {downtimeDiagnosisOutcome.title}
        </h2>
        {downtimeDiagnosisOutcome.description
          ? (
            <p class='text-base leading-relaxed text-white/75 sm:text-lg'>
              {downtimeDiagnosisOutcome.description}
            </p>
          )
          : null}

        <div class='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center'>
          {downtimeDiagnosisOutcome.primaryAction
            ? (
              <Action
                href={downtimeDiagnosisOutcome.primaryAction.href}
                styleType={mapIntent(downtimeDiagnosisOutcome.primaryAction.intent)}
                target={downtimeDiagnosisOutcome.primaryAction.external ? '_blank' : undefined}
                rel={downtimeDiagnosisOutcome.primaryAction.external
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {downtimeDiagnosisOutcome.primaryAction.label}
              </Action>
            )
            : null}
          {downtimeDiagnosisOutcome.secondaryAction
            ? (
              <Action
                href={downtimeDiagnosisOutcome.secondaryAction.href}
                styleType={mapIntent(downtimeDiagnosisOutcome.secondaryAction.intent)}
                target={downtimeDiagnosisOutcome.secondaryAction.external ? '_blank' : undefined}
                rel={downtimeDiagnosisOutcome.secondaryAction.external
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {downtimeDiagnosisOutcome.secondaryAction.label}
              </Action>
            )
            : null}
        </div>
      </div>
    </MarketingSectionShell>
  );
}

