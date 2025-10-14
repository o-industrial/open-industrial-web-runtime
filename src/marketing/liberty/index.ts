import type {
  ChecklistItemContent,
  MarketingAction,
  MediaContent,
  QuoteItemContent,
} from './content.ts';
import { homeContent } from '../home.ts';

type StatBadgeContent = {
  headline: string;
  supporting: string;
};

type HeroModuleContent = {
  headline: string;
  subhead: string;
  quote: QuoteItemContent;
  stat: StatBadgeContent;
  primaryCta: MarketingAction;
  secondaryCta: MarketingAction;
};

type CaseStudyModuleContent = {
  heading: string;
  problem: string;
  intervention: string;
  result: string;
  bullets: string[];
  testimonialPlaceholder: string;
};

type WorkspaceBenefitContent = {
  title: string;
  description: string;
};

type WorkspacesModuleContent = {
  heading: string;
  intro: string;
  benefits: WorkspaceBenefitContent[];
  inlineTip: string;
  checklist: ChecklistItemContent[];
  media: MediaContent;
};

type QuickWinCardContent = {
  title: string;
  prompt: string;
  description: string;
};

type QuickWinsModuleContent = {
  eyebrow: string;
  headline: string;
  intro: string;
  cards: QuickWinCardContent[];
  cta: MarketingAction;
};

type FlowModuleContent = {
  headline: string;
  microcopy: string;
  headlinePrefix?: string;
  headlineSuffix?: string;
  sequence?: string[];
};

type PersonaModuleContent = {
  eyebrow: string;
  headline: string;
  intro: string;
  personas: {
    id: string;
    label: string;
    headline: string;
    description: string;
    bullets: string[];
  }[];
  defaultPersonaId?: string;
  note?: string;
};

type TrustMarker = {
  title: string;
  description: string;
};

type CtaBandContent = {
  preheadline?: string;
  headline: string;
  headlinePrefix?: string;
  headlineSuffix?: string;
  headlineSequence?: string[];
  subhead: string;
  primaryCta: MarketingAction;
  secondaryCta: MarketingAction;
  trustMarkers: TrustMarker[];
};

type SeoMetadata = {
  title: string;
  description: string;
  keywords: string[];
};

type AnalyticsConfig = {
  events: { id: string; description: string }[];
  experiments: { id: string; hypothesis: string }[];
  scrollDepth: number[];
};

type AssetLog = {
  visuals: { id: string; description: string; owner: string }[];
  stats: { id: string; description: string; owner: string }[];
  approvals: { id: string; description: string; owner: string }[];
};

type ProductionChecklistItem = {
  id: string;
  label: string;
  status: 'complete' | 'pending';
  owner: string;
};

type WorkspaceLibertyContent = {
  hero: HeroModuleContent;
  caseStudy: CaseStudyModuleContent;
  workspaces: WorkspacesModuleContent;
  quickWins: QuickWinsModuleContent;
  governedFlow: FlowModuleContent;
  personaProof: PersonaModuleContent;
  ctaBand: CtaBandContent;
  seo: SeoMetadata;
  analytics: AnalyticsConfig;
  assets: AssetLog;
  productionChecklist: ProductionChecklistItem[];
};

const quickWinCards: QuickWinCardContent[] = homeContent.useCases.cards.map((card) => ({
  title: card.title,
  prompt: card.prompt,
  description: card.body,
}));

const primaryCta: MarketingAction = {
  label: 'Get Started in the Evaluation Workspace',
  href:
    '/workspace?utm_source=workspace-liberty-landing&utm_medium=hero-primary&utm_campaign=workspace-liberty',
  intent: 'primary',
};

const secondaryCta: MarketingAction = {
  label: 'Schedule a Guided Demo',
  href:
    '/contact#form?utm_source=workspace-liberty-landing&utm_medium=hero-secondary&utm_campaign=workspace-liberty',
  intent: 'secondary',
};

export const workspaceLibertyContent: WorkspaceLibertyContent = {
  hero: {
    headline: 'Turn Industrial Data Into Instant Insight. Author Your Own Workspace.',
    subhead:
      "A Midwest manufacturer surfaced hidden anomalies in minutes and stood up an Azi-guided alert dashboard in under 30 minutes--proof that data isn't useful until it's alive.",
    quote: {
      quote: 'By setting your data free, you regain authorship--and claim your liberty.',
    },
    stat: {
      headline: 'Anomalies surfaced in minutes',
      supporting: 'Validation cycle shrank to an afternoon',
    },
    primaryCta,
    secondaryCta,
  },
  caseStudy: {
    heading: 'Case Study: From Locked Data to Living Systems',
    problem:
      'Six months of SCADA telemetry sat trapped in nightly reports. Engineers searched for patterns inside stale exports while a two-week validation cycle kept insight at arm length.',
    intervention:
      'The team pointed OpenIndustrial at their historians, activated a Workspace Liberty evaluation, and let Azi guide each save, commit, and deploy. No custom pipelines and no ticket queue.',
    result:
      'Within minutes hidden anomalies surfaced. In 30 minutes the first governed alert dashboard shipped, backed by explainable queries they could diff and roll back on demand.',
    bullets: [
      'Minutes to first anomaly insight',
      'Validation cycle dropped from two weeks to an afternoon',
      'Live alert dashboard deployed in 30 minutes',
    ],
    testimonialPlaceholder: '[Customer testimonial pending approval]',
  },
  workspaces: {
    heading: 'Workspaces: Your Domain of Control',
    intro:
      'Every workspace is a governed domain where logic, data, and deployment stay in your hands. Liberty means zero dependence on legacy gatekeepers.',
    benefits: [
      {
        title: 'Targeted Workspaces',
        description: 'Partition by plant, product, or process with lineage you can trace.',
      },
      {
        title: 'Multi-Source Inputs',
        description: 'Blend historians, lakes, brokers, and files without losing governance.',
      },
      {
        title: 'Commit History and Rollback',
        description: 'Diff every change, revert instantly, and stay audit ready.',
      },
      {
        title: 'Save / Commit / Deploy',
        description: 'Turn exploration into production on your own cadence.',
      },
    ],
    inlineTip: 'Each workspace is your sovereign territory--your system, your rules.',
    checklist: [
      {
        title: 'Can we partition by plant without new infrastructure?',
        description: 'Yes. Spin up targeted workspaces with built-in lineage and access control.',
      },
      {
        title: 'Can we mix OT historians with cloud data lakes safely?',
        description: 'Yes. Multi-source inputs stay governed and explainable end to end.',
      },
      {
        title: 'Can we undo a risky change fast?',
        description: 'Yes. Review diffs, roll back, and redeploy without waiting on ops tickets.',
      },
      {
        title: 'Can we keep compliance in step with iteration?',
        description: 'Yes. Save, commit, and deploy while every action stays audit ready.',
      },
    ],
    media: {
      src: '/assets/docs/oi-workspaces.png',
      alt: 'Workspace overview showing Save, Commit, and Deploy controls.',
      caption: 'Liberty turns a two-week validation cycle into an afternoon.',
    },
  },
  quickWins: {
    eyebrow: 'Quick Wins',
    headline: 'Prove Liberty in Days, Not Quarters.',
    intro:
      'Reuse guided evaluation workflows that bundle warmed queries and telemetry prompts so your team ships visible proof fast.',
    cards: quickWinCards,
    cta: {
      ...primaryCta,
      label: 'Launch a Quick Win Workspace',
      href:
        '/workspace?utm_source=workspace-liberty-landing&utm_medium=quick-wins&utm_campaign=workspace-liberty',
    },
  },
  governedFlow: {
    headline: 'Governed Flow Tiles',
    headlinePrefix: 'How the',
    headlineSuffix: 'Loop Stays in Your Hands',
    sequence: ['Save', 'Commit', 'Deploy'],
    microcopy:
      'Diff every commit, preview rollback impact, and keep authorship even while you move fast.',
  },
  personaProof: {
    eyebrow: 'For Data Architects & Operations',
    headline: 'Partition Domains. Iterate Rapidly. Stay Sovereign.',
    intro:
      'Workspace Liberty keeps authorship close to the people driving modernization. Toggle between data architects and operations leaders to see how the same governed foundation adapts to their mandates.',
    personas: [
      {
        id: 'architect',
        label: 'Data Architects',
        headline: 'Design governed domains without surrendering velocity.',
        description:
          'Shape domain boundaries, manage schemas, and ship changes with rollback confidence. Azi keeps every commit explainable so architecture remains yours.',
        bullets: [
          'Partition workspaces per plant, product, or regulatory boundary.',
          'Review commit diffs with explainable query context before you deploy.',
          'Iterate from sandboxes to production in hours with rollback safety.',
          'Align OT and IT without surrendering control to external gatekeepers.',
        ],
      },
      {
        id: 'operations',
        label: 'Operations Leaders',
        headline: 'Stabilize shifts while every action stays auditable.',
        description:
          'Keep production flowing with shared dashboards, governed alerts, and recovery paths that never depend on a ticket queue.',
        bullets: [
          'Surface anomalies with context in minutes and push guided responses to the floor.',
          'Replay commit history and dashboard diffs to explain every change across shifts.',
          'Rollback to last known good states after experiments without waiting on IT.',
          'Prove compliance readiness with built-in approvals, logs, and deployment history.',
        ],
      },
    ],
    defaultPersonaId: 'architect',
    note:
      'Use the toggle to surface operations proof points without losing the architect storyline.',
  },
  ctaBand: {
    preheadline: 'Author Your Own Workspace',
    headline: 'Liberty Means Save, Commit, Deploy On Your Schedule.',
    headlinePrefix: 'Liberty Means',
    headlineSuffix: 'On Your Schedule.',
    headlineSequence: ['Save', 'Commit', 'Deploy'],
    subhead:
      'Evaluation workspaces open the door. Guided demos show the path. Choose the liberty you need today.',
    primaryCta: {
      ...primaryCta,
      href:
        '/workspace?utm_source=workspace-liberty-landing&utm_medium=cta-band-primary&utm_campaign=workspace-liberty',
    },
    secondaryCta: {
      ...secondaryCta,
      href:
        '/contact#form?utm_source=workspace-liberty-landing&utm_medium=cta-band-secondary&utm_campaign=workspace-liberty',
    },
    trustMarkers: [
      {
        title: 'Governance by Design',
        description: 'Least-privilege access, private networking, and SOC-ready logging.',
      },
      {
        title: 'Explainability by Default',
        description: 'Every answer shows its query and context before you ship it.',
      },
      {
        title: 'Activation Anywhere',
        description: 'Turn insights into APIs, dashboards, and alerts without manual lift.',
      },
    ],
  },
  seo: {
    title: 'Workspace Liberty | OpenIndustrial Evaluation Landing',
    description:
      'Own the Save / Commit / Deploy loop with governed industrial workspaces. Start an evaluation workspace or schedule a guided demo today.',
    keywords: [
      'industrial workspace platform',
      'governed industrial data hub',
      'save commit deploy',
    ],
  },
  analytics: {
    events: [
      { id: 'hero-primary-cta', description: 'Hero evaluation workspace CTA clicked' },
      { id: 'hero-secondary-cta', description: 'Hero guided demo CTA clicked' },
      { id: 'evaluation-signup', description: 'Evaluation workspace signup completed' },
      { id: 'demo-request', description: 'Guided demo form submitted' },
    ],
    experiments: [
      {
        id: 'headline-liberty-vs-ownership',
        hypothesis: 'Liberty framing drives higher evaluation clicks than ownership framing.',
      },
    ],
    scrollDepth: [25, 50, 75],
  },
  assets: {
    visuals: [
      {
        id: 'workspace-screenshot',
        description: 'Updated workspace screenshot with Save / Commit / Deploy focus.',
        owner: 'Design Systems',
      },
      {
        id: 'commit-diff-animation',
        description: 'Animation showing commit diff and rollback replay.',
        owner: 'Design Systems',
      },
    ],
    stats: [
      {
        id: 'minutes-to-insight',
        description: 'Hidden anomalies surfaced in minutes.',
        owner: 'Product Analytics',
      },
      {
        id: 'validation-cycle',
        description: 'Validation cycle reduced from two weeks to an afternoon.',
        owner: 'Product Analytics',
      },
      {
        id: 'dashboard-speed',
        description: 'First alert dashboard deployed in 30 minutes.',
        owner: 'Product Analytics',
      },
    ],
    approvals: [
      {
        id: 'testimonial',
        description: 'Midwest manufacturer testimonial approval.',
        owner: 'Customer Marketing',
      },
      {
        id: 'governance-language',
        description: 'Legal approval on governance by design claims.',
        owner: 'Compliance',
      },
    ],
  },
  productionChecklist: [
    { id: 'copy-draft', label: 'Copy draft complete', status: 'complete', owner: 'Content' },
    {
      id: 'visual-assets',
      label: 'Visual assets approved',
      status: 'pending',
      owner: 'Design Systems',
    },
    { id: 'legal-review', label: 'Legal review complete', status: 'pending', owner: 'Compliance' },
    { id: 'page-build', label: 'New page implemented', status: 'pending', owner: 'Web Platform' },
    { id: 'qa', label: 'QA across breakpoints', status: 'pending', owner: 'Web Platform QA' },
    {
      id: 'launch',
      label: 'Launch and analytics annotations',
      status: 'pending',
      owner: 'Marketing Ops',
    },
  ],
};
