import { JSX } from 'preact';

import { Action, ActionStyleTypes, SectionSurface } from '@o-industrial/common/atomic/atoms';
import { SectionHeader } from '@o-industrial/common/atomic/molecules';

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
  const primaryAction = homeContent.hero.primaryAction;
  const secondaryAction = homeContent.hero.secondaryAction;

  return (
    <section class='relative isolate'>
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10'
      />
      <SectionSurface
        tone='default'
        width='wide'
        contentClass='relative mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-6 text-center'
        class='relative overflow-hidden rounded-b-[56px] border border-white/10 bg-gradient-to-r from-[#0f1331] via-[#14183c] to-[#090c22] pb-24 shadow-[0_65px_180px_-90px_rgba(35,26,82,0.75)] backdrop-blur-[24px]'
      >
        <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
          <div class='absolute left-1/2 top-[-10%] h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.34),_rgba(255,255,255,0)_78%)] blur-[170px]' />
          <div class='absolute inset-x-24 bottom-[-30%] h-[26rem] rounded-full bg-[conic-gradient(from_130deg,_rgba(34,211,238,0.26),_rgba(56,189,248,0.18),_rgba(88,28,135,0.24),_rgba(255,255,255,0))] blur-[180px]' />
        </div>

        <div class='space-y-10'>
          <SectionHeader
            eyebrow={homeContent.hero.eyebrow}
            title={(
              <span class='block text-balance leading-tight'>
                Ask anything about your plant{' '}
                <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-emerald-400 bg-clip-text text-transparent'>
                  and get answers instantly
                </span>
              </span>
            )}
            description={(
              <span class='text-lg text-neutral-200/90'>
                {homeContent.hero.description}
              </span>
            )}
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
