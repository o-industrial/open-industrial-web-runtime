import type {
  ChecklistItemContent,
  CTAContent,
  FeatureItemContent,
  HeroContent,
} from './content.ts';

export const aboutHero: HeroContent = {
  eyebrow: 'About Open Industrial',
  headline: {
    leading: 'Your industrial data - unified, queryable, actionable',
  },
  description:
    'Open Industrial is an Azure-powered telemetry hub for operational technology. We ingest data from control systems, MES, lab tools, historians, and IoT devices - making it instantly queryable in natural language or APIs, ready for analytics, agents, and automation.',
  primaryAction: {
    label: 'Get Started',
    href: 'https://www.openindustrial.co/workspace',
    intent: 'primary',
    external: true,
  },
  secondaryAction: {
    label: 'Learn More',
    href: 'https://www.openindustrial.co/docs/',
    intent: 'secondary',
    external: true,
  },
  media: {
    src: '/assets/marketing/azi-industrial-dashboard.png',
    alt: 'Operators analyzing plant data inside the Open Industrial workspace interface.',
  },
};

export const missionCopy = {
  title: 'Our mission',
  description:
    'Help industrial teams unify data across systems, access insights without delay, and coordinate actions across the operations that keep plants running.',
  align: 'center' as const,
};

export const capabilityCards: FeatureItemContent[] = [
  {
    title: 'Connect Industrial Systems',
    description:
      'Unify data from control, execution, lab, and sensor systems into one governed hub.',
  },
  {
    title: 'Query Naturally',
    description: 'Ask questions in plain English and get explainable answers instantly.',
  },
  {
    title: 'Share Governed Insights',
    description: 'Publish reusable APIs and dashboards that keep teams aligned and audit-ready.',
  },
  {
    title: 'Orchestrate Workflows',
    description: 'Automate patterns across telemetry, logic, and human-in-the-loop approvals.',
  },
];

export const industriesServed: ChecklistItemContent[] = [
  {
    title: 'Manufacturing',
    description: 'Reduce downtime and improve yield across discrete and process lines.',
  },
  {
    title: 'Life Sciences',
    description: 'Govern lab and research telemetry for faster validation and compliance.',
  },
  {
    title: 'Energy',
    description: 'Balance supply, demand, and sustainability goals with real-time visibility.',
  },
  {
    title: 'Utilities',
    description: 'Monitor water, infrastructure, and environmental systems with live telemetry.',
  },
  {
    title: 'Process Industries',
    description: 'Optimize chemical, refining, and continuous manufacturing with connected data.',
  },
  {
    title: 'Industrial IT',
    description: 'Bridge OT/IT convergence with secure integration, governance, and oversight.',
  },
];

export const visionCopy = {
  title: 'Our vision',
  description:
    'Industrial data should work as hard as the operations it supports. We unify legacy OT systems with modern tools so teams can access insights, coordinate workflows, and act with confidence.',
  align: 'center' as const,
};

export const visionCTA: CTAContent = {
  title: 'The future of industrial intelligence',
  description:
    'Connect your systems. Ask questions in plain English. Act on insights with confidence.',
  primaryAction: {
    label: 'Get Started',
    href: 'https://www.openindustrial.co/workspace',
    intent: 'primary',
    external: true,
  },
  secondaryAction: {
    label: 'Learn More',
    href: 'https://www.openindustrial.co/docs/',
    intent: 'secondary',
    external: true,
  },
};
