import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import {
  CompositeSchemaIcon,
  SignalIcon,
  TimelineIcon,
  VisibilityIcon,
} from '@o-industrial/common/atomic/icons';

import { homeContent } from '../../../../../src/marketing/home.ts';

const cardIcons = [CompositeSchemaIcon, TimelineIcon, VisibilityIcon, SignalIcon];

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

export default function ValueDeliverySection(): JSX.Element {
  const { preHeadline, headline, body, cards } = homeContent.useCases;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-24'
      class='relative overflow-hidden border-y border-neutral-200/70 bg-gradient-to-br from-[#f8faff] via-white to-[#f6f2ff] shadow-[0_80px_220px_-140px_rgba(129,140,248,0.35)] dark:border-white/10 dark:bg-gradient-to-br dark:from-[#0a121f] dark:via-[#131b33] dark:to-[#0a1222] dark:shadow-[0_100px_250px_-150px_rgba(99,102,241,0.55)]'
    >
      <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(59,130,246,0.18),rgba(255,255,255,0)_72%)] opacity-75 blur-[150px] dark:bg-[radial-gradient(circle,_rgba(59,130,246,0.3),rgba(9,14,27,0)_74%)]' />

      <div class='relative z-10 mx-auto max-w-3xl space-y-4 text-center text-neutral-700 dark:text-neutral-200'>
        <PreHeadline value={preHeadline} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {headline}
        </h2>
        <p class='text-base sm:text-lg'>{body}</p>
      </div>

      <div class='relative z-10 grid gap-6 sm:grid-cols-2'>
        {cards.map((card, index) => {
          const Icon = cardIcons[index % cardIcons.length];

          return (
            <article
              key={card.title}
              class='group relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white px-6 py-8 text-left shadow-[0_25px_90px_-60px_rgba(129,140,248,0.35)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_35px_100px_-60px_rgba(59,130,246,0.6)]'
            >
              <div class='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 opacity-60' />
              <div class='mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-blue-500/15 via-neon-purple-500/15 to-neon-pink-500/15 text-neon-purple-500 shadow-[0_12px_32px_-18px_rgba(129,140,248,0.6)] dark:from-neon-blue-500/25 dark:via-neon-purple-500/25 dark:to-neon-pink-500/25 dark:text-neon-purple-200'>
                <Icon class='h-5 w-5' />
              </div>
              <h3 class='text-lg font-semibold text-neutral-900 dark:text-white'>{card.title}</h3>
              <p class='mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-neon-purple-500 dark:text-neon-purple-300'>
                {card.prompt}
              </p>
              <p class='mt-3 text-sm text-neutral-600 dark:text-neutral-300'>{card.body}</p>
            </article>
          );
        })}
      </div>
    </SectionSurface>
  );
}