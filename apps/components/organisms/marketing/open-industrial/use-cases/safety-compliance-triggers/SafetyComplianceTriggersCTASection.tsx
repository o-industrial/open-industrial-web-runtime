import { JSX } from 'preact';

import { Action, ActionStyleTypes } from '@o-industrial/atomic/atoms';

import { MarketingPreHeadline } from '../../../../../shared/MarketingPreHeadline.tsx';
import { MarketingSectionShell } from '../../../../../shared/MarketingSectionShell.tsx';
import { safetyComplianceTriggersOutcome } from '../../../../../../../src/marketing/use-case/safety-compliance-triggers.ts';

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

export default function SafetyComplianceTriggersCTASection(): JSX.Element {
  return (
    <MarketingSectionShell variant='midnight'>
      <div class='mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center text-white/80'>
        <MarketingPreHeadline value='Next Up' tone='inverse' />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
          {safetyComplianceTriggersOutcome.title}
        </h2>
        {safetyComplianceTriggersOutcome.description
          ? (
            <p class='text-base leading-relaxed text-white/75 sm:text-lg'>
              {safetyComplianceTriggersOutcome.description}
            </p>
          )
          : null}

        <div class='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center'>
          {safetyComplianceTriggersOutcome.primaryAction
            ? (
              <Action
                href={safetyComplianceTriggersOutcome.primaryAction.href}
                styleType={mapIntent(safetyComplianceTriggersOutcome.primaryAction.intent)}
                target={safetyComplianceTriggersOutcome.primaryAction.external
                  ? '_blank'
                  : undefined}
                rel={safetyComplianceTriggersOutcome.primaryAction.external
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {safetyComplianceTriggersOutcome.primaryAction.label}
              </Action>
            )
            : null}
          {safetyComplianceTriggersOutcome.secondaryAction
            ? (
              <Action
                href={safetyComplianceTriggersOutcome.secondaryAction.href}
                styleType={mapIntent(safetyComplianceTriggersOutcome.secondaryAction.intent)}
                target={safetyComplianceTriggersOutcome.secondaryAction.external
                  ? '_blank'
                  : undefined}
                rel={safetyComplianceTriggersOutcome.secondaryAction.external
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {safetyComplianceTriggersOutcome.secondaryAction.label}
              </Action>
            )
            : null}
        </div>
      </div>
    </MarketingSectionShell>
  );
}

