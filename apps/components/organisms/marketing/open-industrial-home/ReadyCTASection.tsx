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
      class='relative overflow-hidden rounded-t-[48px] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[0_60px_160px_-90px_rgba(15,23,42,0.65)] backdrop-blur-xl'
    />
  );
}

