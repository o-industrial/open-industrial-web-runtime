import type { JSX } from 'preact';

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

function PreHeadline({ value }: { value?: string }): JSX.Element | null {
  if (!value) {
    return null;
  }

  return (
    <span class='inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-neutral-600 dark:text-neutral-300'>
      <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_10px_rgba(129,140,248,0.45)]' />
      {value}
    </span>
  );
}

export default function ReadyCTASection(): JSX.Element {
  const { preHeadline, headline, subhead, primaryCta, secondaryCta } = homeContent.cta;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-20 text-center'
      class='relative overflow-hidden rounded-t-[48px] border border-neutral-200/60 bg-gradient-to-b from-white via-neutral-100 to-neutral-200 shadow-[0_60px_160px_-90px_rgba(15,23,42,0.2)] backdrop-blur-xl dark:border-white/10 dark:bg-gradient-to-b dark:from-[#0b1126] dark:via-[#080d1d] dark:to-[#050814] dark:shadow-[0_80px_220px_-120px_rgba(15,23,42,0.9)]'
    >
      <div class='pointer-events-none absolute inset-0 opacity-60'>
        <div class='absolute left-1/2 top-[-10%] h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.28),_rgba(255,255,255,0)_72%)] blur-[140px] dark:bg-[radial-gradient(circle,_rgba(129,140,248,0.35),_rgba(11,17,38,0)_72%)]' />
        <div class='absolute inset-x-20 bottom-[-45%] h-[18rem] rounded-full bg-[conic-gradient(from_150deg,_rgba(34,211,238,0.18),_rgba(99,102,241,0.16),_rgba(255,255,255,0))] blur-[160px] dark:bg-[conic-gradient(from_150deg,_rgba(34,211,238,0.28),_rgba(129,140,248,0.24),_rgba(6,10,24,0))]' />
      </div>

      <div class='space-y-4'>
        <PreHeadline value={preHeadline} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {headline}
        </h2>
        <p class='text-base text-neutral-600 sm:text-lg dark:text-neutral-200'>{subhead}</p>
      </div>

      <div class='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center'>
        {renderAction(primaryCta)}
        {renderAction(secondaryCta)}
      </div>
    </SectionSurface>
  );
}
