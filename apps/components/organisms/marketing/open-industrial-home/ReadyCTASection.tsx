import { JSX } from 'preact';

import { CTADeepLinkSection } from '@o-industrial/common/atomic/organisms';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function ReadyCTASection(): JSX.Element {
  return (
    <CTADeepLinkSection
      content={{
        ...homeContent.cta,
        title: 'Ready to unlock instant telemetry insights?',
      }}
      width='wide'
      contentClass='max-w-5xl'
      class='relative overflow-hidden rounded-t-[48px] border border-white/60 bg-gradient-to-br from-[#f5f7ff] via-white to-[#f3efff] shadow-[0_60px_160px_-90px_rgba(41,29,94,0.55)] backdrop-blur-xl dark:border-white/10 dark:from-white/10 dark:via-white/5 dark:to-white/10'
    />
  );
}

