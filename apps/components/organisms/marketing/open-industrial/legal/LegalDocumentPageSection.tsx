import { JSX } from 'preact';

import { LegalDocument } from '../../legal/LegalDocument.tsx';
import { LegalDocumentContent } from '../../../../../../src/marketing/content.ts';

export function LegalDocumentPageSection(
  { document }: { document: LegalDocumentContent },
): JSX.Element {
  return (
    <section class='py-20'>
      <div class='mx-auto w-full max-w-5xl px-6'>
        <LegalDocument document={document} />
      </div>
    </section>
  );
}
