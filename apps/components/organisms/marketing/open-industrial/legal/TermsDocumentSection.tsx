import { JSX } from 'preact';

import { termsOfUse } from '../../../../../../src/marketing/legal/terms.ts';
import { LegalDocumentPageSection } from './LegalDocumentPageSection.tsx';

export default function TermsDocumentSection(): JSX.Element {
  return <LegalDocumentPageSection document={termsOfUse} />;
}
