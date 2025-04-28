import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';

type IndexPageData = {};

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState, IndexPageData> = {
  GET: (_req, ctx) => {
    return ctx.Render({});
  },
};

export default function DashboardIndex({ Data }: PageProps<IndexPageData>) {
  return (
    <>
      <div class='py-16 px-4 bg-neutral-500/75'>
        <div class='mx-auto block w-[350px] text-center'>
          <h1 class='text-4xl'>Dashboard</h1>

          <div class='flex flex-row py-8'>
            {/* <Counter /> */}
          </div>
        </div>
      </div>

      <div class='p-4'>
        <h2 class='text-2xl'>Welcome</h2>
      </div>
    </>
  );
}
