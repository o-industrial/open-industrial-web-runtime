import type {
  ChecklistItemContent,
  CTAContent,
  FeatureItemContent,
  HeroContent,
} from './content.ts';

export const aboutHero: HeroContent = {
  eyebrow: 'About Open Industrial',
  title: 'Telemetry Intelligence You Can Trust',
  description:
    'Open Industrial was built to make operational data instantly explainable, governed, and ready for action \u2014 so every team, from control room to boardroom, can make decisions with confidence.',
  primaryAction: {
    label: 'Schedule a Demo',
    href: '/contact#form',
    intent: 'primary',
  },
  secondaryAction: {
    label: 'Get Started',
    href: 'https://www.openindustrial.co/workspace',
    intent: 'secondary',
    external: true,
  },
  media: {
    src: '/assets/marketing/azi-industrial-dashboard.png',
    alt: 'Operators analyzing plant data inside the Open Industrial workspace interface.',
  },
};

export const missionCopy = {
  title: 'Our Mission',
  description:
    'To bridge OT and IT with a single telemetry intelligence platform. Open Industrial makes data from DCS, MES, SCADA, historians, and lab systems queryable in plain English, explainable by default, and governed from the start.',
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
  title: 'Our Vision',
  description:
    'We believe regulated and precision-driven industries deserve the same agility as digital-first enterprises \u2014 without giving up the compliance, validation, and safety they rely on. Our vision is a world where operational data flows freely, securely, and transparently across systems, empowering both people and AI to collaborate on better outcomes.',
  align: 'center' as const,
};

export const nonNegotiables: FeatureItemContent[] = [
  {
    title: 'Governance by Design',
    description:
      'Deployable in your Azure tenant with least-privilege access, private networking, and SOC-ready logging.',
  },
  {
    title: 'Explainability by Default',
    description:
      'Every answer shows its query and context, so engineers and auditors can validate results.',
  },
  {
    title: 'Activation Anywhere',
    description:
      'Turn insights into governed APIs that feed dashboards, workflows, and automations.',
  },
];

export const visionCTA: CTAContent = {
  title: 'Want to Learn More?',
  primaryAction: {
    label: 'Schedule a Demo',
    href: '/contact#form',
    intent: 'primary',
  },
  secondaryAction: {
    label: 'Get Started',
    href: 'https://www.openindustrial.co/workspace',
    intent: 'secondary',
    external: true,
  },
};

