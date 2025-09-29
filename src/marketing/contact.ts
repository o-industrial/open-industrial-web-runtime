import type { CTAContent, HeroContent, SectionHeaderContent } from './content.ts';

export const contactHero: HeroContent = {
  eyebrow: 'Contact Open Industrial',
  title: 'Connect With Us',
  description:
    'We\'d love to hear from you - whether you\'re exploring Open Industrial, want to organize a demo, or just curious to learn more.',
  primaryAction: {
    label: 'Get Started',
    href: 'https://www.openindustrial.co/workspace',
    intent: 'primary',
    external: true,
  },
  secondaryAction: {
    label: 'View Documentation',
    href: 'https://www.openindustrial.co/docs/',
    intent: 'secondary',
    external: true,
  },
  media: {
    src: '/assets/marketing/azi-industrial-dashboard.png',
    alt: 'Operators analyzing plant data inside the Open Industrial workspace.',
  },
};

export const contactFormHeader: SectionHeaderContent = {
  eyebrow: 'Form',
  title: 'Get in touch',
  description:
    'Fill out the form and our team will get back to you shortly.',
  align: 'center',
};

export const contactCTA: CTAContent = {
  title: 'See Open Industrial in Action',
  description:
    'Start your journey with Open Industrial today.',
  primaryAction: {
    label: 'Get Started',
    href: 'https://www.openindustrial.co/workspace',
    intent: 'primary',
    external: true,
  },
  secondaryAction: {
    label: 'View Documentation',
    href: 'https://www.openindustrial.co/docs/',
    intent: 'secondary',
    external: true,
  },
};

