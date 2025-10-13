import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';
import { MarketingHighlightCard } from '@o-industrial/atomic/molecules';
import {
  CompositeSchemaIcon,
  SignalIcon,
  TimelineIcon,
  VisibilityIcon,
} from '@o-industrial/atomic/icons';

import { homeContent } from '../../../../../../src/marketing/home.ts';

const cardIcons = [CompositeSchemaIcon, TimelineIcon, VisibilityIcon, SignalIcon];

function PreHeadline({ value }: { value?: string }): JSX.Element | null {
  if (!value) {
    return null;
  }

  return (
    <span class='inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/70'>
      <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_12px_rgba(129,140,248,0.6)]' />
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
      contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-24 text-white'
      class='relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#110b23] via-[#160f33] to-[#0a0618] shadow-[0_120px_280px_-170px_rgba(129,140,248,0.55)]'
    >
      <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(129,140,248,0.3),rgba(11,10,26,0)_75%)] opacity-85 blur-[170px]' />

      <div class='relative z-10 mx-auto max-w-3xl space-y-4 text-center text-white/80'>
        <PreHeadline value={preHeadline} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
          {headline}
        </h2>
        <p class='text-base sm:text-lg'>{body}</p>
      </div>

      <div class='relative z-10 grid gap-6 sm:grid-cols-2'>
        {cards.map((card, index) => {
          const Icon = cardIcons[index % cardIcons.length];

          return (
            <MarketingHighlightCard
              key={card.title}
              variant='midnight'
              accentGradient='from-neon-blue-500 via-neon-purple-500 to-neon-pink-500'
              title={card.title}
              prompt={card.prompt}
              description={card.body}
              icon={<Icon class='h-5 w-5' />}
            />
          );
        })}
      </div>
    </SectionSurface>
  );
}
