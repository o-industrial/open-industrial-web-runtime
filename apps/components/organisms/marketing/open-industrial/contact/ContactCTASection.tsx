import { JSX } from 'preact';

import { CTADeepLinkSection } from '@o-industrial/common/atomic/organisms';

import { contactCTA } from '../../../../../../src/marketing/contact.ts';

export default function ContactCTASection(): JSX.Element {
  return (
    <CTADeepLinkSection
      content={contactCTA}
      class='bg-gradient-to-br from-[#f5f7ff] via-white to-[#f4efff] py-20 dark:from-[#080c1f] dark:via-[#13143b] dark:to-[#050818]'
    />
  );
}
