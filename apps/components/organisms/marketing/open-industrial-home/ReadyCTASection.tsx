import { JSX } from 'preact';

import { type CTAContent, CTADeepLinkSection } from '@o-industrial/common/atomic/organisms';

import { createCtaEventHandlers } from '../../../../../src/marketing/analytics.ts';
import { ReadyCtaBackdrop } from '../shared/backgrounds.tsx';
import { marketingSectionContent } from '../shared/layout.ts';
import { homeContent } from '../../../../../src/marketing/home.ts';

export default function ReadyCTASection(): JSX.Element {
  const primaryAction = homeContent.cta.primaryAction;
  const secondaryAction = homeContent.cta.secondaryAction;

  const ctaContent: CTAContent = {
    ...homeContent.cta,
    primaryAction: primaryAction
      ? {
        ...primaryAction,
        ...createCtaEventHandlers({
          location: 'ready_primary',
          label: primaryAction.label,
          href: primaryAction.href,
          variant: 'cta',
          intent: primaryAction.intent ?? 'primary',
          isExternal: Boolean(primaryAction.external),
        }),
      }
      : undefined,
    secondaryAction: secondaryAction
      ? {
        ...secondaryAction,
        ...createCtaEventHandlers({
          location: 'ready_secondary',
          label: secondaryAction.label,
          href: secondaryAction.href,
          variant: 'cta',
          intent: secondaryAction.intent ?? 'secondary',
          isExternal: Boolean(secondaryAction.external),
        }),
      }
      : undefined,
  };

  return (
    <section class='relative overflow-hidden rounded-t-[48px] border border-white/10 shadow-[0_60px_160px_-90px_rgba(15,23,42,0.65)] backdrop-blur-xl'>
      <ReadyCtaBackdrop />
      <CTADeepLinkSection
        content={ctaContent}
        width='wide'
        contentClass={marketingSectionContent({ width: 'default', padding: 'md' })}
        class='relative py-20 text-white'
      />
    </section>
  );
}
