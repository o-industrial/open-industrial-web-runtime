import { ChatSet } from '@fathym/atomic-design-kit';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import Counter from '../islands/Counter.tsx';
import CompanyThinky from '../islands/organisms/CompanyThinky.tsx';
import { CompanyWebState } from '../../src/state/CompanyWebState.ts';

export const IsIsland = true;

type IndexPageData = {};

export const handler: EaCRuntimeHandlerSet<CompanyWebState, IndexPageData> = {
  GET: (_req, ctx) => {
    return ctx.Render({});
  },
};

export default function DashboardIndex({ Data }: PageProps<IndexPageData>) {
  return (
    <>
      <div class='py-16 px-4 bg-slate-500/75'>
        <div class='mx-auto block w-[350px] text-center'>
          <h1 class='text-4xl'>Dashboard</h1>

          <div class='flex flex-row py-8'>
            <Counter />
          </div>
        </div>
      </div>

      <div class='p-4'>
        <h2 class='text-2xl'>Welcome</h2>
      </div>
    </>
  );
}
