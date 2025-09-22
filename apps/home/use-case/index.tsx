import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
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
    <section class='min-h-[60vh] flex items-center justify-center px-6 py-24 text-center'>
      <div class='space-y-4 max-w-2xl'>
        <p class='text-xs uppercase tracking-[0.35em] text-neutral-400 dark:text-neutral-500'>
          Marketing Migration
        </p>
        <h1 class='text-3xl font-semibold text-neutral-900 dark:text-neutral-50'>
          Open Industrial Use Cases
        </h1>
        <p class='text-base text-neutral-600 dark:text-neutral-400'>
          Marketing use-case stories will live here after migration. Batch Quality is the first
          target.
        </p>
        <p class='text-sm text-neutral-500 dark:text-neutral-500'>
          Final content will be introduced during Phase 3.
        </p>
      </div>
    </section>
  );
}
