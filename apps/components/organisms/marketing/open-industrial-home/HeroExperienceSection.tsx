import { JSX } from 'preact';

import { Action, ActionStyleTypes, SectionSurface } from '@o-industrial/common/atomic/atoms';
import { SectionHeader } from '@o-industrial/common/atomic/molecules';

import { createCtaEventHandlers } from '../../../../../src/marketing/analytics.ts';
import { HeroBackdrop } from '../shared/backgrounds.tsx';
import { marketingSectionContent } from '../shared/layout.ts';
import { homeContent } from '../../../../../src/marketing/home.ts';

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

export default function HeroExperienceSection(): JSX.Element {
  const hero = homeContent.hero;
  const headline = hero.headline;
  const primaryAction = hero.primaryAction;
  const secondaryAction = hero.secondaryAction;

  const primaryHandlers = primaryAction
    ? createCtaEventHandlers({
      location: 'hero_primary',
      label: primaryAction.label,
      href: primaryAction.href,
      variant: 'hero',
      intent: primaryAction.intent ?? 'primary',
      isExternal: Boolean(primaryAction.external),
    })
    : undefined;

  const secondaryHandlers = secondaryAction
    ? createCtaEventHandlers({
      location: 'hero_secondary',
      label: secondaryAction.label,
      href: secondaryAction.href,
      variant: 'hero',
      intent: secondaryAction.intent ?? 'secondary',
      isExternal: Boolean(secondaryAction.external),
    })
    : undefined;

  return (
    <section class='relative isolate'>
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10'
      />
      <SectionSurface
        tone='default'
        width='wide'
        contentClass={marketingSectionContent({
          width: 'default',
          padding: 'md',
          center: true,
          extra: 'flex flex-col items-center gap-12',
        })}
        class='relative overflow-hidden rounded-b-[56px] border border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 pb-24 shadow-[0_65px_180px_-90px_rgba(15,23,42,0.7)] backdrop-blur-[24px]'
      >
        <HeroBackdrop />

        <div class='space-y-10'>
          <SectionHeader
            eyebrow={hero.eyebrow}
            title={
              <span class='block text-balance leading-tight'>
                <span class='text-white'>{headline.leading}</span>
                {headline.highlight
                  ? (
                    <>
                      {' '}
                      <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-neon-green-400 bg-clip-text text-transparent'>
                        {headline.highlight}
                      </span>
                    </>
                  )
                  : null}
                {headline.trailing
                  ? (
                    <>
                      {' '}
                      <span class='text-white'>{headline.trailing}</span>
                    </>
                  )
                  : null}
              </span>
            }
            description={hero.description
              ? (
                <span class='text-lg text-neutral-200/90'>
                  {hero.description}
                </span>
              )
              : undefined}
            align='center'
            class='mx-auto max-w-3xl text-center'
          />

          <div class='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center'>
            {primaryAction
              ? (
                <Action
                  href={primaryAction.href}
                  styleType={mapIntent(primaryAction.intent)}
                  target={primaryAction.external ? '_blank' : undefined}
                  rel={primaryAction.external ? 'noopener noreferrer' : undefined}
                  {...(primaryHandlers ?? {})}
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
                  target={secondaryAction.external ? '_blank' : undefined}
                  rel={secondaryAction.external ? 'noopener noreferrer' : undefined}
                  {...(secondaryHandlers ?? {})}
                >
                  {secondaryAction.label}
                </Action>
              )
              : null}
          </div>
        </div>
      </SectionSurface>
    </section>
  );
}
