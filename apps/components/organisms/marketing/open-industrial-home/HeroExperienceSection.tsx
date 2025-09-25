import type { JSX } from 'preact';

import { Action, ActionStyleTypes, SectionSurface } from '@o-industrial/common/atomic/atoms';
import type { MarketingAction } from '../../../../../src/marketing/content.ts';

import { homeContent } from '../../../../../src/marketing/home.ts';

const ACCENT_PHRASE = 'Instant Insight';

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

  const accentIndex = headline.indexOf(ACCENT_PHRASE);
  const accentParts = accentIndex >= 0
    ? {
      before: headline.slice(0, accentIndex),
      after: headline.slice(accentIndex + ACCENT_PHRASE.length),
    }
    : null;

  return (
    <section class='relative isolate'>
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-purple-200 to-transparent dark:via-neon-purple-500/60'
      />
      <SectionSurface
        tone='default'
        width='wide'
        contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-20 text-neutral-900 lg:flex-row lg:items-center lg:gap-16 dark:text-white'
        class='relative overflow-hidden rounded-b-[56px] border border-neutral-200/70 bg-white shadow-[0_65px_180px_-90px_rgba(15,23,42,0.25)] backdrop-blur-[24px] dark:border-white/10 dark:bg-neutral-950 dark:shadow-[0_65px_180px_-90px_rgba(15,23,42,0.7)]'
      >
        <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
          <div class='absolute left-1/2 top-[-12%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.28),_rgba(255,255,255,0)_78%)] blur-[170px]' />
          <div class='absolute inset-x-16 bottom-[-42%] h-[32rem] rounded-full bg-[conic-gradient(from_120deg,_rgba(34,211,238,0.18),_rgba(129,140,248,0.15),_rgba(236,72,153,0.22),_rgba(255,255,255,0))] blur-[190px]' />
        </div>

        <div class='relative z-10 flex-1 space-y-8 text-center lg:text-left'>
          <div class='space-y-5'>
            <span class='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-blue-100 via-neon-purple-100 to-neon-pink-100 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-neon-purple-500 dark:from-neon-blue-500/15 dark:via-neon-purple-500/15 dark:to-neon-pink-500/15 dark:text-neon-purple-200'>
              <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_10px_rgba(129,140,248,0.5)]' />
              Live telemetry AI
            </span>
            <h1 class='text-balance text-4xl font-semibold tracking-tight sm:text-5xl'>
              {accentParts
                ? (
                  <>
                    {accentParts.before}
                    <span class='bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 bg-clip-text text-transparent drop-shadow-[0_12px_35px_rgba(99,102,241,0.35)]'>
                      {ACCENT_PHRASE}
                    </span>
                    {accentParts.after}
                  </>
                )
                : headline}
            </h1>
            <p class='text-lg leading-relaxed text-neutral-600 sm:text-xl dark:text-neutral-200'>
              {subhead}
            </p>
          </div>

          <div class='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start'>
            {renderAction(primaryCta)}
            {renderAction(secondaryCta)}
          </div>

          <div class='hidden gap-6 text-left text-sm text-neutral-500 sm:flex dark:text-neutral-300'>
            <div class='inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-neon-blue-500/10 to-neon-purple-500/10 px-4 py-2 shadow-[0_8px_24px_-18px_rgba(99,102,241,0.8)] dark:from-neon-blue-500/20 dark:to-neon-purple-500/20'>
              <span class='h-2 w-2 rounded-full bg-neon-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' />
              Governed KQL translation
            </div>
            <div class='inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-neon-pink-500/10 to-neon-purple-500/10 px-4 py-2 shadow-[0_8px_24px_-18px_rgba(244,114,182,0.8)] dark:from-neon-pink-500/20 dark:to-neon-purple-500/20'>
              <span class='h-2 w-2 rounded-full bg-neon-pink-500 shadow-[0_0_8px_rgba(244,114,182,0.8)]' />
              Azure-native security
            </div>
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
