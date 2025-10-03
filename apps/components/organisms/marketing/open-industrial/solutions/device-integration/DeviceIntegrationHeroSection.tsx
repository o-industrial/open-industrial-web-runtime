import { JSX } from 'preact';

import { Action, ActionStyleTypes } from '@o-industrial/atomic/atoms';
import { IntentTypes } from '@o-industrial/common/types';

import {
  deviceIntegrationHero,
  deviceIntegrationQueryExample,
} from '../../../../../../../../src/marketing/solutions/device-integration.ts';

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

export default function DeviceIntegrationHeroSection(): JSX.Element {
  const primaryAction = deviceIntegrationHero.primaryAction;
  const secondaryAction = deviceIntegrationHero.secondaryAction;

  return (
    <section class='relative overflow-hidden bg-gradient-to-br from-[#020d1b] via-[#061728] to-[#01060f] py-24 text-white shadow-[0_70px_200px_-90px_rgba(3,13,27,0.9)]'>
      <div class='pointer-events-none absolute inset-0'>
        <div class='absolute left-1/2 top-[-28%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.25),_rgba(1,10,24,0)_78%)] blur-[200px]' />
        <div class='absolute -left-32 bottom-[-18%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.24),_rgba(7,12,22,0)_72%)] blur-[170px]' />
        <div class='absolute -right-24 top-16 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(37,99,235,0.24),_rgba(8,11,22,0)_72%)] blur-[180px]' />
      </div>

      <div class='relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 text-center'>
        <span class='inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70'>
          {deviceIntegrationHero.eyebrow}
        </span>

        <div class='space-y-6'>
          <h1 class='text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl'>
            {deviceIntegrationHero.title}
          </h1>
          <p class='mx-auto max-w-3xl text-lg text-white/70'>
            {deviceIntegrationHero.description}
          </p>
        </div>

        <div class='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center'>
          {primaryAction
            ? (
              <Action
                href={primaryAction.href}
                styleType={mapIntent(primaryAction.intent)}
                intentType={IntentTypes.Primary}
                target={primaryAction.external ? '_blank' : undefined}
                rel={primaryAction.external ? 'noopener noreferrer' : undefined}
              >
                {primaryAction.label}
              </Action>
            )
            : null}
          {secondaryAction
            ? (
              <Action
                href={secondaryAction.href}
                styleType={mapIntent(secondaryAction.intent)}
                intentType={IntentTypes.Secondary}
                target={secondaryAction.external ? '_blank' : undefined}
                rel={secondaryAction.external ? 'noopener noreferrer' : undefined}
              >
                {secondaryAction.label}
              </Action>
            )
            : null}
        </div>

        <div class='w-full max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-6 text-left shadow-[0_40px_140px_-70px_rgba(15,23,42,0.85)] backdrop-blur-lg'>
          <h3 class='text-sm font-semibold uppercase tracking-[0.3em] text-white/60'>
            Query example
          </h3>
          <p class='mt-4 font-mono text-base leading-relaxed text-white/90'>
            {deviceIntegrationQueryExample}
          </p>
        </div>
      </div>
    </section>
  );
}
