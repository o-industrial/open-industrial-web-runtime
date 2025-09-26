import type { MarketingAction, MediaContent } from './content.ts';

type HomeHeroContent = {
  headline: string;
  subhead: string;
  primaryCta: MarketingAction;
  secondaryCta: MarketingAction;
  visual: MediaContent;
};

type IntroContent = {
  headline: string;
  body: string;
};

type HowItWorksContent = {
  preHeadline: string;
  headline: string;
  steps: { title: string; body: string }[];
};

type AziContent = {
  preHeadline: string;
  headline: string;
  body: string;
  examples: string[];
};

type UseCaseCardContent = {
  title: string;
  prompt: string;
  body: string;
};

type UseCasesContent = {
  preHeadline: string;
  headline: string;
  body: string;
  cards: UseCaseCardContent[];
};

type UnifiedHubContent = {
  preHeadline: string;
  headline: string;
  subhead: string;
  inputsLabel: string;
  inputs: { title: string; items: string[] }[];
  hub: {
    title: string;
    subtitle: string;
    bullets: string[];
  };
  outputsLabel: string;
  outputs: { title: string; items: string[] }[];
};

type IntegrationEcosystemContent = {
  preHeadline: string;
  headline: string;
  body: string;
  categories: { title: string; items: string[] }[];
};

type WhyOiContent = {
  preHeadline: string;
  headline: string;
  subhead: string;
  coreBenefits: { title: string; body: string }[];
  guardrails: {
    title: string;
    body: string;
    items: { title: string; body: string }[];
  };
};

type CloudContent = {
  preHeadline: string;
  headline: string;
  subhead: string;
  options: { title: string; body: string }[];
  sovereignty: {
    title: string;
    body: string;
    bullets: string[];
  };
};

type FutureVisionContent = {
  preHeadline: string;
  headline: string;
  body: string;
  pillars: { title: string; body: string }[];
};

type FinalCtaContent = {
  preHeadline: string;
  headline: string;
  subhead: string;
  primaryCta: MarketingAction;
  secondaryCta: MarketingAction;
};

type HomeContent = {
  hero: HomeHeroContent;
  intro: IntroContent;
  howItWorks: HowItWorksContent;
  azi: AziContent;
  useCases: UseCasesContent;
  unifiedHub: UnifiedHubContent;
  ecosystem: IntegrationEcosystemContent;
  whyOi: WhyOiContent;
  cloud: CloudContent;
  future: FutureVisionContent;
  cta: FinalCtaContent;
};

export const homeContent: HomeContent = {
  hero: {
    headline: 'Turn Industrial Data Into Instant Insight',
    subhead:
      'Connect MES, SCADA, historians, and lab systems. Ask in plain English. Get governed answers in seconds - no pipelines, no scripts, no delay.',
    primaryCta: { label: 'Schedule a Demo', href: '/contact#form', intent: 'primary' },
    secondaryCta: {
      label: 'Get Started',
      href: '/workspace',
      intent: 'secondary',
    },
    visual: {
      src: '/assets/marketing/azi-industrial-dashboard.png',
      alt: 'Open Industrial product experience showing live plant telemetry and AI insights',
    },
  },
  intro: {
    headline: 'Connect your data. Ask anything. Share anywhere.',
    body:
      'Open Industrial ingests live telemetry from DCS, SCADA, MES, historians, and lab systems - making it instantly queryable through natural language, APIs, and dashboards.',
  },
  howItWorks: {
    preHeadline: 'How it works',
    headline: 'How Governed Insight Flows to Action',
    steps: [
      {
        title: 'Connect',
        body:
          'Stream telemetry from OT systems and brokers (OPC UA, MQTT, SQL, CSV) - no custom pipelines.',
      },
      {
        title: 'Ask Azi',
        body: 'Type a natural-language question. Azi translates it into governed, explainable KQL.',
      },
      {
        title: 'Share',
        body: 'Save queries as APIs to power dashboards, reports, and workflows - instantly.',
      },
    ],
  },
  azi: {
    preHeadline: 'AI assistant',
    headline: 'Meet Azi - Your AI Query Assistant',
    body:
      'Ask anything about your plant. Azi turns plain-English questions into safe, explainable queries - and returns live results you can trust.',
    examples: [
      'Which Reactor 2 batches exceeded 140 degrees C this week?',
      'What caused Line 3 downtime in the past 12 hours?',
      'Show throughput and top downtime causes for Line A today.',
    ],
  },
  useCases: {
    preHeadline: 'Use cases',
    headline: 'Turn Plant Data Into Trusted Insight',
    body:
      'Break down data silos across OT and IT systems by turning live plant data into actionable, audit-ready insight your teams can act on.',
    cards: [
      {
        title: 'Batch Quality & Compliance',
        prompt: 'Which Reactor 2 batches had temp >140 degrees C this week?',
        body:
          'Trace batches across MES/LIMS/ERP. Answer auditor questions instantly with audit-ready outputs.',
      },
      {
        title: 'Downtime Diagnosis',
        prompt: 'What caused Line 4 downtime for the past 24 hours?',
        body:
          'Correlate SCADA, historian, and PLC data. Cut troubleshooting time from days to minutes.',
      },
      {
        title: 'Cross-Line Performance',
        prompt: 'Show throughput and top 3 downtime causes for Line 4 today.',
        body: 'Generate OEE and shift summaries without stitching spreadsheets.',
      },
      {
        title: 'Safety & Compliance Triggers',
        prompt: 'Log all pressure events >80psi with full context.',
        body:
          'Log threshold events with full telemetry context. Trigger governed alerts and reports automatically.',
      },
    ],
  },
  unifiedHub: {
    preHeadline: 'Governed APIs',
    headline: 'Data In -> Insight Out',
    subhead: 'Trace governed telemetry from edge to action.',
    inputsLabel: 'Input systems',
    inputs: [
      { title: 'Control Systems', items: ['DCS', 'SCADA', 'PLC'] },
      { title: 'Manufacturing Systems', items: ['MES', 'ERP', 'WMS'] },
      { title: 'Quality & Lab Systems', items: ['LIMS', 'QMS', 'Historians'] },
      { title: 'IoT & Sensors', items: ['Edge devices', 'Protocols'] },
    ],
    hub: {
      title: 'Open Industrial',
      subtitle: 'AI-powered hub',
      bullets: ['Real-time ingestion', 'Natural language queries', 'Instant API generation'],
    },
    outputsLabel: 'Output destinations',
    outputs: [
      { title: 'Custom Applications', items: ['Web experiences', 'Mobile apps'] },
      { title: 'Intelligent Agents', items: ['Monitoring', 'Alerts', 'Actions'] },
      { title: 'BI & Analytics Tools', items: ['Power BI', 'Tableau', 'Grafana'] },
      { title: 'APIs & Integrations', items: ['REST APIs', 'Webhooks'] },
    ],
  },
  ecosystem: {
    preHeadline: 'Integration ecosystem',
    headline: 'Connect Seamlessly To Your Current Industrial Systems',
    body:
      'Pre-built connectors map protocols, middleware, and execution systems into a single hub.',
    categories: [
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
        items: [
          'Historian Dashboards',
          'Maintenance Planning',
          'Alarm Management',
          'Batch Reporting',
        ],
      },
    ],
  },
  whyOi: {
    preHeadline: 'Why Open Industrial',
    headline: 'Operational Clarity Across Operations, Quality, and IT',
    subhead:
      'Open Industrial ensures every team can access governed, audit-ready insight they can trust.',
    coreBenefits: [
      {
        title: 'Universal Connectivity',
        body: 'Connect any industrial system through standard protocols and APIs.',
      },
      {
        title: 'Instant Intelligence',
        body: 'Ask questions in plain English and get immediate, explainable insights.',
      },
      {
        title: 'Flexible Output',
        body:
          'Publish insights as governed APIs that feed dashboards, workflows, and applications.',
      },
    ],
    guardrails: {
      title: 'Guardrails Built for Industrial Confidence',
      body:
        'Every insight is governed, explainable, and ready for action - so teams can trust what they see and activate it anywhere.',
      items: [
        {
          title: 'Governed from the Start',
          body:
            'Runs in your Azure tenant with private networking, least-privilege access, and SOC-ready logging.',
        },
        {
          title: 'Explainable by Default',
          body:
            'Every answer shows its query and context - so engineers can validate before action.',
        },
        {
          title: 'Instant Activation',
          body: 'Publish insights as APIs, dashboards, or alerts with zero manual lift.',
        },
      ],
    },
  },
  cloud: {
    preHeadline: 'Deployment choices',
    headline: 'Choose How You Deploy',
    subhead:
      'Start in the cloud for fast evaluation, then scale into managed or self-hosted Azure - always with governance and control.',
    options: [
      { title: 'Evaluation Cloud', body: 'Quick start with sample data.' },
      { title: 'Managed Azure', body: 'Dedicated runtime managed for you.' },
      { title: 'Bring Your Own Azure', body: 'Deploy in your tenant for full sovereignty.' },
    ],
    sovereignty: {
      title: 'Your Cloud, Your Rules',
      body:
        'Run Open Industrial in your Azure tenant for full access and control - with enterprise-grade security and governance built in.',
      bullets: [
        'Your data, your access policies',
        'Secure APIs with token-scoped permissions',
        'Full auditability and governance',
        'Automated, seamless setup',
      ],
    },
  },
  future: {
    preHeadline: 'Looking ahead',
    headline: 'From Instant Insight -> To Adaptive Action',
    body:
      'Open Industrial is evolving into a modular automation platform with adaptive agents - extending governed insight into safe, coordinated action across your operations.',
    pillars: [
      {
        title: 'Schema-Aware Workflows',
        body:
          'Define workflows that understand production context and enforce automation guardrails.',
      },
      {
        title: 'Adaptive Agents',
        body:
          'Deploy agents that monitor signals, trigger responses, and evolve safely - with human-in-the-loop approvals where needed.',
      },
      {
        title: 'Cross-System Orchestration',
        body:
          'Coordinate logic across MES, SCADA, LIMS, and cloud services - blending plant-floor reliability with cloud-scale agility.',
      },
    ],
  },
  cta: {
    preHeadline: 'Get started',
    headline: 'Ready to Unlock Instant Telemetry Insight?',
    subhead: 'See how fast you can go from Data In -> Insight Out.',
    primaryCta: { label: 'Schedule a Demo', href: '/contact#form', intent: 'primary' },
    secondaryCta: {
      label: 'Get Started',
      href: '/workspace',
      intent: 'secondary',
    },
  },
};
