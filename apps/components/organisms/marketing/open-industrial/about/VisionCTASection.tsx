import { JSX } from 'preact';

import { CTADeepLinkSection } from '@o-industrial/common/atomic/organisms';

import { visionCTA } from '../../../../../src/marketing/about.ts';

export default function VisionCTASection(): JSX.Element {
  return (
    <CTADeepLinkSection
      content={visionCTA}
      class='bg-gradient-to-br from-[#f5f7ff] via-white to-[#f3efff] dark:from-[#080c1f] dark:via-[#141238] dark:to-[#050818] shadow-[0_40px_120px_-50px_rgba(37,29,90,0.45)]'
    />
  );
}
