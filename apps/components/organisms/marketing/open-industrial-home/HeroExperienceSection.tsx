import { JSX } from 'preact';

import { Action, ActionStyleTypes, SectionSurface } from '@o-industrial/common/atomic/atoms';
import type { MarketingAction } from '../../../../../src/marketing/content.ts';

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

function renderAction(action: MarketingAction): JSX.Element | null {
  if (!action) {
    return null;
  }

  return (
    <Action
      href={action.href}
      styleType={mapIntent(action.intent)}
      target={action.external ? '_blank' : undefined}
      rel={action.external ? 'noopener noreferrer' : undefined}
    >
      {action.label}
    </Action>
  );
}

export default function HeroExperienceSection(): JSX.Element {
  const { headline, subhead, primaryCta, secondaryCta, visual } = homeContent.hero;

  return (
    <section class='relative isolate'>
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10'
      />
      <SectionSurface
        tone='default'
        width='wide'
        contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-20 lg:flex-row lg:items-center lg:gap-16'
        class='relative overflow-hidden rounded-b-[56px] border border-neutral-200/70 bg-white shadow-[0_65px_180px_-90px_rgba(15,23,42,0.25)] backdrop-blur-[24px] dark:border-white/10 dark:bg-neutral-950 dark:shadow-[0_65px_180px_-90px_rgba(15,23,42,0.7)]'
      >
        <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
          <div class='absolute left-1/2 top-[-10%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.24),_rgba(255,255,255,0)_78%)] blur-[160px]' />
          <div class='absolute inset-x-24 bottom-[-40%] h-[32rem] rounded-full bg-[conic-gradient(from_130deg,_rgba(34,211,238,0.18),_rgba(129,140,248,0.14),_rgba(236,72,153,0.18),_rgba(255,255,255,0))] blur-[190px]' />
        </div>

        <div class='relative z-10 flex-1 space-y-8 text-center lg:text-left'>
          <div class='space-y-4'>
            <h1 class='text-balance text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl dark:text-white'>
              {headline}
            </h1>
            <p class='text-lg leading-relaxed text-neutral-600 sm:text-xl dark:text-neutral-200'>{subhead}</p>
          </div>

          <div class='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start'>
            {renderAction(primaryCta)}
            {renderAction(secondaryCta)}
          </div>
        </div>

        <div class='relative z-10 flex-1'>
          <div class='overflow-hidden rounded-3xl border border-neutral-200/70 bg-white shadow-[0_40px_120px_-48px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_40px_120px_-48px_rgba(15,23,42,0.9)]'>
            <img
              src={visual.src}
              alt={visual.alt}
              class='h-full w-full object-cover'
              loading='lazy'
            />
          </div>
        </div>
      </SectionSurface>
    </section>
  );
}