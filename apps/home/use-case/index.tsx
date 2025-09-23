import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { Action, ActionStyleTypes, SectionSurface } from '@o-industrial/common/atomic/atoms';
import { SectionHeader } from '@o-industrial/common/atomic/molecules';

import { useCaseOverview } from '../../../src/marketing/use-cases.ts';
import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

type UseCasesPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  UseCasesPageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function UseCasesPage({}: PageProps<UseCasesPageData>) {
  return (
    <div class='flex flex-col bg-neutral-50 dark:bg-neutral-950'>
      <SectionSurface
        tone='default'
        class='bg-gradient-to-br from-[#070a1e] via-[#111536] to-[#050716] py-24 text-white shadow-[0_70px_200px_-90px_rgba(10,16,42,0.85)]'
      >
        <div class='mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 text-center'>
          <span class='inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70'>
            Use Cases
          </span>
          <SectionHeader
            title='Explore industrial intelligence in action'
            description='Dive into curated stories that show how Open Industrial unlocks governed insights across batch quality, maintenance, and production performance.'
            align='center'
          />
        </div>
      </SectionSurface>

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
    </div>
  );
}
