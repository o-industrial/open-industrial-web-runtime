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
      class='relative overflow-hidden rounded-t-[48px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.16),rgba(11,16,32,0.92)),linear-gradient(140deg,rgba(8,11,24,0.98),rgba(14,18,36,0.95))] shadow-[0_60px_160px_-90px_rgba(15,23,42,0.65)] backdrop-blur-xl'
    />
  );
}

