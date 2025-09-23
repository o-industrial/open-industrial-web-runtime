import { JSX } from 'preact';

import { Action, ActionStyleTypes, SectionSurface } from '@o-industrial/common/atomic/atoms';

import { useCaseOverview } from '../../../../../src/marketing/use-cases.ts';

export default function UseCaseListSection(): JSX.Element {
  return (
    <SectionSurface
      tone='default'
      class='bg-gradient-to-br from-white via-[#f5f7ff] to-white py-20 dark:from-[#080c1f] dark:via-[#0f1533] dark:to-[#060916]'
    >
      <div class='mx-auto grid w-full max-w-5xl gap-8 px-6 md:grid-cols-2'>
        {useCaseOverview.map((useCase) => (
          <article
            key={useCase.title}
            class='flex h-full flex-col gap-5 rounded-3xl border border-neutral-200/70 bg-white/90 p-8 shadow-[0_40px_160px_-110px_rgba(92,103,140,0.4)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_60px_220px_-140px_rgba(92,103,140,0.5)] dark:border-white/10 dark:bg-neutral-900/80'
          >
            <div class='space-y-3'>
              <h2 class='text-2xl font-semibold text-neutral-900 dark:text-white'>
                {useCase.title}
              </h2>
              <p class='text-sm leading-relaxed text-neutral-600 dark:text-neutral-300'>
                {useCase.description}
              </p>
            </div>

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
                href='/use-case/batch-quality'
                styleType={ActionStyleTypes.Solid | ActionStyleTypes.Rounded}
              >
                Explore batch quality use case
              </Action>
            </div>
          </article>
        ))}
      </div>
    </SectionSurface>
  );
}
