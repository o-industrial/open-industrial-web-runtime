import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

type AboutPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  AboutPageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function AboutPage({}: PageProps<AboutPageData>) {
  return (
    <section class='min-h-[60vh] flex items-center justify-center px-6 py-24 text-center'>
      <div class='space-y-4 max-w-2xl'>
        <p class='text-xs uppercase tracking-[0.35em] text-neutral-400 dark:text-neutral-500'>
          Marketing Migration
        </p>
        <h1 class='text-3xl font-semibold text-neutral-900 dark:text-neutral-50'>
          About Open Industrial
        </h1>
        <p class='text-base text-neutral-600 dark:text-neutral-400'>
          Detailed company story will land here once marketing content is migrated in Phase 3.
        </p>
        <p class='text-sm text-neutral-500 dark:text-neutral-500'>
          Final content will be introduced during Phase 3.
        </p>
      </div>
    </section>
  );
}
