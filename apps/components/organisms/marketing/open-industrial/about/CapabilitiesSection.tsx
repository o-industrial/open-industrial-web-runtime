import { JSX } from 'preact';

import { MarketingPreHeadline } from '../../../../shared/MarketingPreHeadline.tsx';
import { MarketingSectionShell } from '../../../../shared/MarketingSectionShell.tsx';
import { capabilityCards } from '../../../../../../src/marketing/about.ts';

const cardAccentGradients = [
  'from-neon-blue-500 via-cyan-400 to-teal-400',
  'from-neon-purple-500 via-neon-blue-500 to-cyan-400',
  'from-neon-pink-500 via-neon-purple-500 to-neon-blue-500',
  'from-cyan-400 via-neon-blue-500 to-neon-purple-500',
];

export default function CapabilitiesSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='neutral'>
      <div class='space-y-12 text-neutral-700 dark:text-neutral-200'>
        <div class='mx-auto max-w-3xl space-y-4 text-center'>
          <MarketingPreHeadline value='Capabilities' />
          <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
            What we do
          </h2>
          <p class='text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300'>
            Open Industrial transforms how organizations interact with their industrial data through
            four core capabilities.
          </p>
        </div>

        <div class='grid gap-6 sm:grid-cols-2'>
          {capabilityCards.map((card, index) => (
            <article
              key={card.title}
              class='relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white/90 px-6 py-8 text-left shadow-[0_40px_160px_-110px_rgba(59,130,246,0.28)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900/85 dark:shadow-[0_55px_200px_-130px_rgba(129,140,248,0.45)]'
            >
              <div
                class={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                  cardAccentGradients[index % cardAccentGradients.length]
                } opacity-90`}
              />
              <span class='inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-blue-500/15 via-neon-purple-500/15 to-neon-pink-500/15 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-600 dark:text-neutral-200'>
                0{index + 1}
              </span>
              <h3 class='mt-4 text-lg font-semibold text-neutral-900 dark:text-white'>
                {card.title}
              </h3>
              <p class='mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300'>
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </MarketingSectionShell>
  );
}
