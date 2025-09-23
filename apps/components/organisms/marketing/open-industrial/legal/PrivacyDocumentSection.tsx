import { JSX } from 'preact';

import { privacyPolicy } from '../../../../../../src/marketing/legal/privacy.ts';
import { LegalDocumentPageSection } from './LegalDocumentPageSection.tsx';

export default function PrivacyDocumentSection(): JSX.Element {
  return <LegalDocumentPageSection document={privacyPolicy} />;
}
