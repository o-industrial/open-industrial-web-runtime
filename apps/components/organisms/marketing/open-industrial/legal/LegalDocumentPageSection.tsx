import { JSX } from 'preact';

import { LegalDocument } from '../../legal/LegalDocument.tsx';
import type { LegalDocumentContent } from '../../../../../src/marketing/content.ts';

export function LegalDocumentPageSection(
  { document }: { document: LegalDocumentContent },
): JSX.Element {
  return (
    <div class='flex flex-col bg-neutral-50 dark:bg-neutral-950'>
      <section class='bg-gradient-to-b from-neutral-50 via-white to-neutral-100 py-20 dark:from-neutral-950 dark:via-[#090b19] dark:to-neutral-950'>
        <div class='mx-auto w-full max-w-5xl px-6'>
          <LegalDocument document={document} />
        </div>
      </section>
    </div>
  );
}
