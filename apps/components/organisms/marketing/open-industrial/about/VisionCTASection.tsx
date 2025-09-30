import { JSX } from 'preact';

import { Action, ActionStyleTypes } from '@o-industrial/common/atomic/atoms';

import { MarketingPreHeadline } from '../../../../shared/MarketingPreHeadline.tsx';
import { MarketingSectionShell } from '../../../../shared/MarketingSectionShell.tsx';
import { visionCTA } from '../../../../../../src/marketing/about.ts';

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

export default function VisionCTASection(): JSX.Element {
  return (
    <MarketingSectionShell variant='midnight'>
      <div class='mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center text-white/80'>
        <MarketingPreHeadline value='Next steps' tone='inverse' />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
          {visionCTA.title}
        </h2>
        {visionCTA.description
          ? (
            <p class='text-base leading-relaxed text-white/75 sm:text-lg'>
              {visionCTA.description}
            </p>
          )
          : null}

        <div class='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center'>
          {visionCTA.primaryAction
            ? (
              <Action
                href={visionCTA.primaryAction.href}
                styleType={mapIntent(visionCTA.primaryAction.intent)}
                target={visionCTA.primaryAction.external ? '_blank' : undefined}
                rel={visionCTA.primaryAction.external ? 'noopener noreferrer' : undefined}
              >
                {visionCTA.primaryAction.label}
              </Action>
            )
            : null}
          {visionCTA.secondaryAction
            ? (
              <Action
                href={visionCTA.secondaryAction.href}
                styleType={mapIntent(visionCTA.secondaryAction.intent)}
                target={visionCTA.secondaryAction.external ? '_blank' : undefined}
                rel={visionCTA.secondaryAction.external ? 'noopener noreferrer' : undefined}
              >
                {visionCTA.secondaryAction.label}
              </Action>
            )
            : null}
        </div>
      </div>
    </MarketingSectionShell>
  );
}
