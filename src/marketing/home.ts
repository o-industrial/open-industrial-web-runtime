import {
  AgentIcon,
  AppIcon,
  CompositeSchemaIcon,
  ConnectionIcon,
  MapIcon,
  SignalIcon,
  StackIcon,
  TimelineIcon,
  VisibilityIcon,
  WarmQueryIcon,
} from '@o-industrial/common/atomic/icons';
import type {
  ChecklistItemContent,
  CTAContent,
  FeatureItemContent,
  FlowDiagramContent,
  HeroContent,
  IntegrationColumnContent,
  MediaContent,
  QuoteItemContent,
  SectionHeaderContent,
  StepItemContent,
} from './content.ts';

type HomeContent = {
  hero: HeroContent;
  valuePropositionHeading: SectionHeaderContent;
  howItWorksSteps: StepItemContent[];
  conversationalQuotes: QuoteItemContent[];
  featureGridItems: FeatureItemContent[];
  integrationColumns: IntegrationColumnContent[];
  flowDiagram: FlowDiagramContent;
  benefitsItems: ChecklistItemContent[];
  cloudControlItems: ChecklistItemContent[];
  futureVisionItems: ChecklistItemContent[];
  cta: CTAContent;
  productSpotlightMedia: MediaContent;
};

const hero: HeroContent = {
  eyebrow: 'AI-Powered Industrial Intelligence',
  title: 'Ask anything about your plant - get answers instantly',
  description:
    'Connect industrial systems. Stream telemetry. Ask questions in plain English. Share insights anywhere - no pipelines, no delay.',
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
    alt: 'Azi Industrial Monitoring Interface with real-time plant data and AI insights',
  },
};

const valuePropositionHeading: SectionHeaderContent = {
  eyebrow: 'Unified Operational Data',
  title: 'Connect your data. Ask anything. Share anywhere.',
  description:
    'Open Industrial ingests live telemetry from DCS, SCADA, MES, historians, and lab systems - making it instantly queryable through natural language, APIs, and dashboards.',
  align: 'center',
};

const howItWorksSteps: StepItemContent[] = [
  {
    title: 'Connect Your Data',
    description:
      'Ingest from control, execution, lab, and sensor systems using secure connectors. Merge live operational data into a governed hub.',
    icon: ConnectionIcon,
    intent: 'purple',
  },
  {
    title: 'Ask Azi Anything',
    description:
      'Pose questions in plain English. Azi generates explainable KQL queries, executes them instantly, and packages actionable results.',
    icon: WarmQueryIcon,
    intent: 'orange',
  },
  {
    title: 'Share & Integrate',
    description:
      'Publish queries as APIs for dashboards, reports, workflows, and applications. Deliver governed insights wherever you need them.',
    icon: StackIcon,
    intent: 'blue',
  },
];

const conversationalQuotes: QuoteItemContent[] = [
  { quote: 'Show flow anomalies for Line 4 over the past 24 hours.' },
  { quote: 'Compare batch temperatures for Reactor 2.' },
  { quote: 'List top causes of downtime last week.' },
];

const featureGridItems: FeatureItemContent[] = [
  {
    title: 'Downtime Diagnosis & Root Cause',
    description:
      'Unify SCADA, historian, and PLC data to diagnose downtime faster. Get clear answers with context from codes, timing, and trends without waiting on vendor support or manual analysis.',
    highlights: ['What caused Line 4 downtime for the past 24 hours?'],
    icon: TimelineIcon,
    intent: 'orange',
  },
  {
    title: 'Batch Quality & Compliance',
    description:
      'Track batches across MES, LIMS, and historian data with repeatable, audit-ready queries. Compare results with expected parameters to document investigations and accelerate resolutions.',
    highlights: ['Which Reactor 2 batches had temp above 140 degrees C this week?'],
    icon: CompositeSchemaIcon,
    intent: 'purple',
  },
  {
    title: 'Cross-Line Performance Reporting',
    description:
      'Generate consistent OEE, yield, and downtime reports across shifts and lines - governed by your context, free from spreadsheets and manual effort.',
    highlights: ['Show throughput and top 3 downtime causes for Line 4 today.'],
    icon: VisibilityIcon,
    intent: 'blue',
  },
  {
    title: 'Safety & Compliance Triggers',
    description:
      'Set rules on safety telemetry and capture incidents with complete historian and SCADA context. Maintain governed, auditable trails for every event.',
    highlights: ['Log all pressure events above 80 psi with full context.'],
    icon: SignalIcon,
    intent: 'green',
  },
];

const integrationColumns: IntegrationColumnContent[] = [
  {
    title: 'Protocols',
    items: ['HTTP', 'MQTT', 'AMQP', 'OPC UA'],
  },
  {
    title: 'Middleware',
    items: ['HighByte', 'HiveMQ', 'FBxEdge'],
  },
  {
    title: 'Systems',
    items: ['DCS', 'MES', 'SCADA', 'LIMS', 'DeltaV', 'Syncade'],
  },
  {
    title: 'Apps',
    items: ['Mobius Suite', 'ProofCheck', 'AlertTrack+', 'QuickView+'],
  },
];

const flowDiagram: FlowDiagramContent = {
  inputs: [
    { title: 'Control Systems', subtitle: 'DCS, SCADA, PLC' },
    { title: 'Manufacturing Systems', subtitle: 'MES, ERP, WMS' },
    { title: 'Quality & Lab Systems', subtitle: 'LIMS, QMS, Historians' },
    { title: 'IoT & Sensors', subtitle: 'Edge devices, Protocols' },
  ],
  hub: {
    title: 'Open Industrial',
    description:
      'AI-powered hub for real-time ingestion, natural language queries, and instant APIs.',
  },
  outputs: [
    { title: 'Custom Applications', subtitle: 'Web apps, Mobile apps' },
    { title: 'Intelligent Agents', subtitle: 'Monitoring, Alerts, Actions' },
    { title: 'BI & Analytics Tools', subtitle: 'Power BI, Tableau, Grafana' },
    { title: 'APIs & Integrations', subtitle: 'REST APIs, Webhooks' },
  ],
};

const benefitsItems: ChecklistItemContent[] = [
  {
    title: 'Universal Connectivity',
    description: 'Connect any industrial system through standard protocols and APIs.',
    icon: MapIcon,
    intent: 'green',
  },
  {
    title: 'Instant Intelligence',
    description: 'Ask questions in plain English and get immediate, explainable insights.',
    icon: AgentIcon,
    intent: 'purple',
  },
  {
    title: 'Flexible Output',
    description:
      'Publish insights as governed APIs that feed dashboards, workflows, and applications.',
    icon: AppIcon,
    intent: 'blue',
  },
];

const cloudControlItems: ChecklistItemContent[] = [
  {
    title: 'Your data, your access policies',
    description: 'Control tenant, region, and network boundaries with your security posture.',
    icon: ConnectionIcon,
    intent: 'purple',
  },
  {
    title: 'Full auditability and governance',
    description: 'Trace every query, workflow, and change with immutable logs.',
    icon: TimelineIcon,
    intent: 'orange',
  },
  {
    title: 'Secure APIs with token-scoped permissions',
    description: 'Deliver principle-of-least-privilege access for every consuming system.',
    icon: SignalIcon,
    intent: 'green',
  },
  {
    title: 'Automated, seamless setup',
    description: 'Provision Azure resources, connectors, and policies with one click.',
    icon: StackIcon,
    intent: 'blue',
  },
];

const futureVisionItems: ChecklistItemContent[] = [
  {
    title: 'Define schema-aware workflows',
    description: 'Teach agents how production context maps to automation guardrails.',
    icon: CompositeSchemaIcon,
    intent: 'purple',
  },
  {
    title: 'Deploy adaptive agents that monitor, respond, and evolve',
    description: 'Blend human-in-the-loop approvals with AI co-pilots for safer automation.',
    icon: AgentIcon,
    intent: 'orange',
  },
  {
    title: 'Coordinate action across MES, SCADA, LIMS, and cloud systems',
    description: 'Orchestrate automations that bridge plant-floor reliability with cloud scale.',
    icon: StackIcon,
    intent: 'blue',
  },
];

const cta: CTAContent = {
  title: 'Ready to unlock instant telemetry insights?',
  description: 'Connect, query, and act on insights from the plant floor.',
  primaryAction: {
    label: 'Get Started Today',
    href: 'https://www.openindustrial.co/workspace',
    intent: 'primary',
    external: true,
  },
  secondaryAction: {
    label: 'Schedule Demo',
    href: '/contact',
    intent: 'secondary',
  },
};

const productSpotlightMedia: MediaContent = hero.media!;

export const homeContent: HomeContent = {
  hero,
  valuePropositionHeading,
  howItWorksSteps,
  conversationalQuotes,
  featureGridItems,
  integrationColumns,
  flowDiagram,
  benefitsItems,
  cloudControlItems,
  futureVisionItems,
  cta,
  productSpotlightMedia,
};
