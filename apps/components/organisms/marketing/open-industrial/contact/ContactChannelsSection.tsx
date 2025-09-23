import { JSX } from 'preact';

import { ValueGridSection } from '@o-industrial/common/atomic/organisms';

import { contactIntro, contactMethods } from '../../../../../src/marketing/contact.ts';

export default function ContactChannelsSection(): JSX.Element {
  return (
    <ValueGridSection
      header={contactIntro}
      items={contactMethods}
      columns={3}
      variant='light'
      class='bg-gradient-to-b from-white via-[#f5f7ff] to-white dark:from-[#080c1f] dark:via-[#0f1533] dark:to-[#060916]'
    />
  );
}
