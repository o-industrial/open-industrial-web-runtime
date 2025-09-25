import type { MarketingNavCTA, MarketingNavLink } from '@o-industrial/common/atomic/organisms';

export const primaryNavLinks: MarketingNavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Use Cases', href: '/use-case' },
  { label: 'Batch Quality', href: '/use-case/batch-quality' },
  {
    label: 'Docs',
    href: '/docs',
    external: true,
  },
  { label: 'Contact', href: '/contact' },
];

export const ctaLinks: MarketingNavCTA[] = [
  {
    label: 'Get Started',
    href: '/workspace',
    intent: 'primary',
  },
];

export const footerPrimaryLinks: MarketingNavLink[] = [
  { label: 'Use Cases', href: '/use-case' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Contact', href: '/contact' },
];

export const footerSecondaryLinks: MarketingNavLink[] = [
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
];

export const marketingTagline =
  'Industrial intelligence for teams who need to connect OT systems, stream telemetry, and act fast.';