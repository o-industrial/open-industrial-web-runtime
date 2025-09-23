import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import { LegalDocument } from '../../components/organisms/marketing/legal/LegalDocument.tsx';
import { termsOfUse } from '../../../src/marketing/legal/terms.ts';
import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

type TermsPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  TermsPageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function TermsPage({}: PageProps<TermsPageData>) {
  return (
    <div class='flex flex-col bg-neutral-50 dark:bg-neutral-950'>
      <section class='bg-gradient-to-b from-neutral-50 via-white to-neutral-100 py-20 dark:from-neutral-950 dark:via-[#090b19] dark:to-neutral-950'>
        <div class='mx-auto w-full max-w-5xl px-6'>
          <LegalDocument document={termsOfUse} />
        </div>
      </section>
    </div>
  );
}
