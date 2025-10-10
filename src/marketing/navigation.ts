import type { MarketingNavCTA, MarketingNavLink } from '@o-industrial/atomic/organisms';

export const primaryNavLinks: MarketingNavLink[] = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'About', href: '/about' },
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
  { label: 'Solutions', href: '/solutions' },
  { label: 'Quality Mgmt', href: '/solutions/quality-management' },
  { label: 'Asset Mgmt', href: '/solutions/asset-management' },
  { label: 'Production', href: '/solutions/production-management' },
  { label: 'Device Data', href: '/solutions/device-integration' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Batch Quality', href: '/use-cases/batch-quality' },
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
