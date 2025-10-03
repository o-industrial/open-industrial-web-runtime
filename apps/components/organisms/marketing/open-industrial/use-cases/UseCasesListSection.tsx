import { JSX } from 'preact';

import { Action, ActionStyleTypes } from '@o-industrial/atomic/atoms';

import { MarketingSectionShell } from '../../../../shared/MarketingSectionShell.tsx';
import { useCaseOverview } from '../../../../../../src/marketing/use-cases.ts';

const cardGradients = [
  'from-neon-blue-500 via-neon-purple-500 to-neon-pink-500',
  'from-neon-green-500 via-teal-400 to-cyan-400',
  'from-neon-purple-500 via-neon-blue-500 to-neon-pink-500',
  'from-neon-orange-500 via-neon-pink-500 to-neon-purple-500',
];

const getCtaLabel = (title: string, label?: string): string => label ?? `Explore ${title}`;

export default function UseCasesListSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='neutral'>
      <div class='space-y-10 text-neutral-700 dark:text-neutral-200'>
        <div class='space-y-3 text-center'>
          <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
            Choose a guided workflow demo
          </h2>
          <p class='text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300'>
            These use cases bundle simulated plant data, governed warm queries, and call-to-action
            moments so you can see Open Industrial in action end to end.
          </p>
        </div>

        <div class='grid gap-6 md:grid-cols-2'>
          {useCaseOverview.map((useCase, index) => (
            <article
              key={useCase.title}
              class='group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-neutral-200/70 bg-white/95 px-7 py-8 text-left shadow-[0_50px_170px_-120px_rgba(59,130,246,0.28)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_70px_220px_-140px_rgba(59,130,246,0.45)] dark:border-white/10 dark:bg-neutral-900/85 dark:shadow-[0_65px_220px_-140px_rgba(129,140,248,0.55)]'
            >
              <div
                class={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                  cardGradients[index % cardGradients.length]
                } opacity-95`}
              />
              <h3 class='text-2xl font-semibold text-neutral-900 dark:text-white'>
                {useCase.title}
              </h3>
              {useCase.description
                ? (
                  <p class='text-sm leading-relaxed text-neutral-600 dark:text-neutral-300'>
                    {useCase.description}
                  </p>
                )
                : null}

              {useCase.highlights?.length
                ? (
                  <ul class='space-y-2 text-sm text-neutral-600 dark:text-neutral-300'>
                    {useCase.highlights.map((highlight) => (
                      <li key={highlight} class='flex items-center gap-2'>
                        <span class='inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-r from-neon-purple-500 to-neon-blue-500' />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )
                : null}

              <div class='mt-auto pt-2'>
                <Action
                  href={useCase.href}
                  styleType={ActionStyleTypes.Solid | ActionStyleTypes.Rounded}
                >
                  {getCtaLabel(useCase.title, useCase.ctaLabel)}
                </Action>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MarketingSectionShell>
  );
}

