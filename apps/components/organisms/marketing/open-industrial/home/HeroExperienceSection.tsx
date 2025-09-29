import type { JSX } from 'preact';

import { Action, ActionStyleTypes, SectionSurface } from '@o-industrial/common/atomic/atoms';
import type { MarketingAction } from '../../../../../../src/marketing/content.ts';

import { homeContent } from '../../../../../../src/marketing/home.ts';

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
        class='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-pink-400/60 to-transparent'
      />
      <SectionSurface
        tone='default'
        width='wide'
        contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-20 text-white lg:flex-row lg:items-center lg:gap-16'
        class='relative overflow-hidden rounded-b-[56px] border border-white/10 bg-gradient-to-br from-[#050713] via-[#0c1030] to-[#04060f] shadow-[0_140px_320px_-180px_rgba(236,72,153,0.55)]'
      >
        <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
          <div class='absolute left-[-10%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.35),rgba(7,8,20,0)_78%)] blur-[190px]' />
          <div class='absolute right-[-18%] bottom-[-30%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.32),rgba(7,8,20,0)_78%)] blur-[210px]' />
        </div>

        <div class='relative z-10 flex-1 space-y-8 text-center lg:text-left'>
          <div class='space-y-5'>
            <span class='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-blue-500/20 via-neon-purple-500/20 to-neon-pink-500/20 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/80 shadow-[0_18px_45px_-20px_rgba(129,140,248,0.6)]'>
              <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_12px_rgba(129,140,248,0.7)]' />
              Live telemetry AI
            </span>
            <h1 class='text-balance text-4xl font-semibold tracking-tight sm:text-5xl'>
              {accentParts
                ? (
                  <>
                    {accentParts.before}
                    <span class='bg-gradient-to-r from-neon-blue-400 via-neon-purple-400 to-neon-pink-400 bg-clip-text text-transparent drop-shadow-[0_18px_40px_rgba(129,140,248,0.6)]'>
                      {ACCENT_PHRASE}
                    </span>
                    {accentParts.after}
                  </>
                )
                : headline}
            </h1>
            <p class='text-lg leading-relaxed text-white/75 sm:text-xl'>
              {subhead}
            </p>
          </div>

          <div class='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start'>
            {renderAction(primaryCta)}
            {renderAction(secondaryCta)}
          </div>

          <div class='hidden gap-6 text-left text-sm text-white/70 sm:flex'>
            <div class='inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-neon-blue-500/25 to-neon-purple-500/25 px-4 py-2 shadow-[0_18px_45px_-25px_rgba(59,130,246,0.8)]'>
              <span class='h-2 w-2 rounded-full bg-neon-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.9)]' />
              Governed KQL translation
            </div>
            <div class='inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-neon-pink-500/25 to-neon-purple-500/25 px-4 py-2 shadow-[0_18px_45px_-25px_rgba(236,72,153,0.8)]'>
              <span class='h-2 w-2 rounded-full bg-neon-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.9)]' />
              Azure-native security
            </div>
          </div>
        </div>

        <div class='relative z-10 flex-1'>
          <div class='overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_35px_120px_-70px_rgba(236,72,153,0.45)] backdrop-blur-md dark:bg-white/5'>
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
