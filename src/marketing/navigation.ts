import type { MarketingNavCTA, MarketingNavLink } from '@o-industrial/common/atomic/organisms';

export interface MarketingNavigationConfig {
  primary: MarketingNavLink[];
  footerPrimary: MarketingNavLink[];
  footerSecondary: MarketingNavLink[];
  ctas: MarketingNavCTA[];
  tagline: string;
}

export const marketingNavigation: MarketingNavigationConfig = {
  primary: [
    { label: 'About', href: '/about' },
    { label: 'Use Cases', href: '/use-case' },
    { label: 'Batch Quality', href: '/use-case/batch-quality' },
    {
      label: 'Docs',
      href: '/docs',
      external: true,
    },
    { label: 'Contact', href: '/contact' },
  ],
  footerPrimary: [
    { label: 'Use Cases', href: '/use-case' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Contact', href: '/contact' },
  ],
  footerSecondary: [
    {
      label: 'Docs',
      href: 'https://www.openindustrial.co/docs/',
      external: true,
    },
    {
      label: 'Workspace',
      href: 'https://www.openindustrial.co/workspace',
      external: true,
    },
  ],
  ctas: [
    {
      label: 'Get Started',
      href: '/workspace',
      external: true,
      intent: 'primary',
    },
  ],
  tagline:
    'Industrial intelligence for teams who need to connect OT systems, stream telemetry, and act fast.',
} as const;

export const primaryNavLinks = marketingNavigation.primary;
export const footerPrimaryLinks = marketingNavigation.footerPrimary;
export const footerSecondaryLinks = marketingNavigation.footerSecondary;
export const ctaLinks = marketingNavigation.ctas;
export const marketingTagline = marketingNavigation.tagline;

export type { MarketingNavLink } from '@o-industrial/common/atomic/organisms';
