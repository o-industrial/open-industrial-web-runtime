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
  MetricHighlightContent,
  PillarItemContent,
  QuoteItemContent,
  SectionHeaderContent,
  StepItemContent,
  StructuredSectionHeaderContent,
} from './content.ts';

export type HomeContent = {
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
  strategicPillars: PillarItemContent[];
  metrics: MetricHighlightContent[];
  productSpotlightHighlights: ChecklistItemContent[];
  cta: CTAContent;
  productSpotlightMedia: MediaContent;
  sections: {
    productSpotlight: StructuredSectionHeaderContent;
    aiConversations: StructuredSectionHeaderContent;
    governedFlow: StructuredSectionHeaderContent;
    integrationEcosystem: StructuredSectionHeaderContent;
    unifiedMetrics: StructuredSectionHeaderContent;
    sharedTruth: StructuredSectionHeaderContent;
    valueDelivery: StructuredSectionHeaderContent;
    unifiedFlow: StructuredSectionHeaderContent;
    governedDeployment: StructuredSectionHeaderContent;
    futureVision: StructuredSectionHeaderContent;
    strategicPillars: StructuredSectionHeaderContent;
  };
};

const hero: HeroContent = {
  eyebrow: 'AI-Powered Industrial Intelligence',
  headline: {
    leading: 'Ask anything about your plant',
    highlight: 'and get answers instantly',
  },
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
    width: 1440,
    height: 900,
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

const strategicPillars: PillarItemContent[] = [
  {
    title: 'Governed by design',
    description:
      'Deploy in your Azure tenant with private networking, least-privilege access, and SOC-ready logging.',
    badge: 'Governance',
    accentToken: 'pillar-governance-accent',
    glowToken: 'pillar-governance-glow',
  },
  {
    title: 'Explainable intelligence',
    description: 'Every answer shows its KQL so engineers can validate context before action.',
    badge: 'Explainability',
    accentToken: 'pillar-explainability-accent',
    glowToken: 'pillar-explainability-glow',
  },
  {
    title: 'Activation anywhere',
    description: 'Publish queries as APIs, dashboards, and automations with zero manual lift.',
    badge: 'Activation',
    accentToken: 'pillar-activation-accent',
    glowToken: 'pillar-activation-glow',
  },
];

const integrationCount = integrationColumns.reduce(
  (total, column) => total + column.items.length,
  0,
);

const metrics: MetricHighlightContent[] = [
  {
    label: 'Pre-built integrations',
    value: `${integrationCount}+`,
    description: 'Protocols, middleware, and line-of-business systems ready to connect.',
    intent: 'info',
    trend: [48, 52, 56, 60, integrationCount],
  },
  {
    label: 'Steps to governed insight',
    value: `${howItWorksSteps.length}`,
    description: 'From ingestion to activation in a guided, explainable flow.',
    intent: 'primary',
    trend: [3, howItWorksSteps.length, howItWorksSteps.length],
  },
  {
    label: 'Cloud control options',
    value: `${cloudControlItems.length}`,
    description: 'Run in your tenant, shared cloud, or fully managed environments.',
    intent: 'secondary',
    trend: [2, 3, cloudControlItems.length],
  },
];

const productSpotlightHighlights: ChecklistItemContent[] = futureVisionItems.slice(0, 3);

const productSpotlightSection: StructuredSectionHeaderContent = {
  eyebrow: valuePropositionHeading.eyebrow,
  titleLines: [
    { text: 'Connect your data.' },
    { text: 'Ask anything. Share anywhere.', highlight: true },
  ],
  description: valuePropositionHeading.description,
  align: 'left',
};

const sections: HomeContent['sections'] = {
  productSpotlight: productSpotlightSection,
  aiConversations: {
    eyebrow: 'Meet Azi, your AI query assistant',
    strapline: 'Plain-language answers',
    titleLines: [{ text: 'Ask once. Deploy everywhere.' }],
    kicker: 'Governed industrial data, explained',
    description:
      'Azi gives engineers direct access to live plant intelligence - no scripts, no SQL, no waiting on hand-offs. Every response stays governed and ready for dashboards, APIs, or automations.',
    align: 'center',
  },
  governedFlow: {
    eyebrow: 'From ingestion to activation',
    titleLines: [
      { text: 'How governed insight' },
      { text: 'flows to action', highlight: true },
    ],
    description:
      'Three steps to move explainable answers into production workflows without leaving your governed boundary.',
    align: 'center',
  },
  integrationEcosystem: {
    eyebrow: 'Works with your stack',
    titleLines: [
      { text: 'Connect seamlessly', highlight: true },
      { text: 'To your current industrial systems' },
    ],
    description:
      'Pre-built connectors map protocols, middleware, and execution systems into a single hub.',
    kicker: `\${integrationCount}+ integration endpoints ready out of the box`,
    align: 'center',
  },
  unifiedMetrics: {
    eyebrow: 'Unified Operational Data',
    strapline: 'Unified operational intelligence',
    titleLines: [
      { text: 'Governing data from control room to boardroom' },
      { text: 'Metrics ready for every workflow', highlight: true },
    ],
    description:
      'Open Industrial ingests live telemetry and orchestrates governed activation across your operational stack.',
    align: 'center',
  },
  sharedTruth: {
    eyebrow: 'Why teams choose Open Industrial',
    titleLines: [
      { text: 'Operational clarity for every team', highlight: true },
      { text: 'Shared truth across operations, quality, and IT' },
    ],
    description:
      'Give operations, quality, and IT the same live source of truth to coordinate faster decisions.',
    align: 'center',
  },
  valueDelivery: {
    eyebrow: 'Operational intelligence, delivered',
    titleLines: [
      { text: 'Turn industrial data', highlight: true },
      { text: 'Into trusted, governed insight' },
    ],
    description:
      'Break down data silos across OT and IT systems by turning live plant data into actionable, audit-ready insight your teams can act on.',
    align: 'center',
  },
  unifiedFlow: {
    eyebrow: 'Unified intelligence hub',
    titleLines: [
      { text: 'Data in, insight out', highlight: true },
      { text: 'Trace governed telemetry from edge to action' },
    ],
    description:
      'Visualize how telemetry lands in Open Industrial and flows back out into apps, agents, and APIs.',
    align: 'center',
  },
  governedDeployment: {
    eyebrow: 'Your cloud, your rules',
    titleLines: [
      { text: 'Deploy with governed flexibility', highlight: true },
      { text: 'Choose the control plane that matches your policy' },
    ],
    description:
      'Run Open Industrial in your Azure tenant for full access and control, or choose from shared cloud or fully managed options.',
    align: 'center',
  },
  futureVision: {
    titleLines: [{ text: 'From insight to action' }],
    description:
      'Open Industrial is evolving into a modular automation platform with adaptive agents that observe data, trigger workflows, and coordinate logic across systems.',
    align: 'center',
  },
  strategicPillars: {
    strapline: 'Three non-negotiables',
    titleLines: [{ text: 'Guardrails that make Open Industrial different' }],
    description:
      'Each pillar keeps human oversight, governance, and activation aligned - so teams can ship confident, explainable outcomes.',
    align: 'center',
  },
};

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
  strategicPillars,
  metrics,
  productSpotlightHighlights,
  cta,
  productSpotlightMedia,
  sections,
};
