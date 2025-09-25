import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../src/marketing/home.ts';

const PRE_HEADLINE_CLASS = 'text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400';

export default function ValueDeliverySection(): JSX.Element {
  const { preHeadline, headline, body, cards } = homeContent.useCases;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-24'
      class='border-y border-neutral-200/60 bg-white dark:border-white/10 dark:bg-neutral-950'
    >
      <div class='mx-auto max-w-3xl text-center space-y-4'>
        <span class={PRE_HEADLINE_CLASS}>{preHeadline}</span>
        <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
          {headline}
        </h2>
        <p class='text-base sm:text-lg'>{body}</p>
      </div>

      <div class='grid gap-6 sm:grid-cols-2'>
        {cards.map((card) => (
          <article
            key={card.title}
            class='h-full rounded-3xl border border-neutral-200/70 bg-white px-6 py-8 text-left shadow-sm dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_35px_90px_-60px_rgba(15,23,42,0.95)]'
          >
            <h3 class='text-lg font-semibold'>{card.title}</h3>
            <p class='mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400'>
              {card.prompt}
            </p>
            <p class='mt-3 text-sm'>{card.body}</p>
          </article>
        ))}
      </div>
    </SectionSurface>
  );
}