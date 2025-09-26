import { JSX } from 'preact';

import { MarketingPreHeadline } from '../../../../shared/MarketingPreHeadline.tsx';
import { MarketingSectionShell } from '../../../../shared/MarketingSectionShell.tsx';
import { nonNegotiables } from '../../../../../../src/marketing/about.ts';

export default function NonNegotiablesSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='neutral'>
      <div class='space-y-12 text-neutral-700 dark:text-neutral-200'>
        <div class='mx-auto max-w-3xl space-y-4 text-center'>
          <MarketingPreHeadline value='Principles' />
          <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
            The Three Non-Negotiables
          </h2>
        </div>

        <div class='grid gap-6 md:grid-cols-3'>
          {nonNegotiables.map((item) => (
            <article
              key={item.title}
              class='h-full rounded-3xl border border-neutral-200/70 bg-white/95 p-6 text-left shadow-[0_40px_160px_-110px_rgba(59,130,246,0.28)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900/85 dark:shadow-[0_55px_200px_-130px_rgba(129,140,248,0.45)]'
            >
              <h3 class='text-lg font-semibold text-neutral-900 dark:text-white'>
                {item.title}
              </h3>
              <p class='mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300'>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </MarketingSectionShell>
  );
}
