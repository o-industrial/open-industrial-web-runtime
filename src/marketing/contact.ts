import { AgentIcon, ConnectionIcon, SignalIcon } from '@o-industrial/common/atomic/icons';
import type {
  CTAContent,
  FeatureItemContent,
  HeroContent,
  SectionHeaderContent,
} from './content.ts';

export const contactHero: HeroContent = {
  eyebrow: 'Contact Open Industrial',
  title: "Let's connect",
  description:
    'Discuss how Open Industrial unifies your OT systems, streams telemetry, and delivers insights you can trust.',
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

export const contactIntro: SectionHeaderContent = {
  eyebrow: 'Talk with the team',
  title: 'Choose the path that matches your industrial goals',
  description:
    'Partner with specialists who understand historians, MES, lab systems, and the automation guardrails your operations require.',
  align: 'center',
};

export const contactMethods: FeatureItemContent[] = [
  {
    title: 'Sales & solution design',
    description:
      'Plan your deployment, model integrations, and define success metrics with our OT specialists.',
    highlights: ['hello@openindustrial.co', 'Schedule a guided demo'],
    icon: ConnectionIcon,
    intent: 'purple',
  },
  {
    title: 'Customer success & support',
    description:
      'Coordinate onboarding, workspace configuration, and governed access for every plant stakeholder.',
    highlights: ['support@openindustrial.co', 'Workspace enablement kits'],
    icon: AgentIcon,
    intent: 'blue',
  },
  {
    title: 'Platform partnerships',
    description:
      'Explore integrations, co-sell motions, and OEM licensing for joint industrial offerings.',
    highlights: ['partners@openindustrial.co', 'Azure marketplace alignment'],
    icon: SignalIcon,
    intent: 'green',
  },
];

export const contactFormHeader: SectionHeaderContent = {
  eyebrow: 'Get in touch',
  title: 'Tell us about your operations',
  description:
    'Share your systems, data priorities, and desired outcomes. Our team will tailor a plan within one business day.',
  align: 'center',
};

export const contactCTA: CTAContent = {
  title: 'Ready to unify your operational data?',
  description:
    'Industrial teams choose Open Industrial to connect OT systems and deliver governed, explainable insights.',
  primaryAction: {
    label: 'Get Started',
    href: 'https://www.openindustrial.co/workspace',
    intent: 'primary',
    external: true,
  },
  secondaryAction: {
    label: 'Schedule a demo',
    href: '/contact#form',
    intent: 'secondary',
  },
};
