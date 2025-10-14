import type { ChecklistItemContent, MarketingAction, QuoteItemContent } from './content.ts';
import { homeContent } from '../home.ts';

type StatContent = {
  headline: string;
  supporting: string;
};

type HeroModuleContent = {
  eyebrow: string;
  badge: string;
  headline: string;
  subhead: string;
  quote: QuoteItemContent;
  stat: StatContent;
  primaryCta: MarketingAction;
  secondaryCta: MarketingAction;
};

type PersonaCardContent = {
  id: string;
  label: string;
  role: string;
  headline: string;
  pain: string;
  liberty: string;
  outcome: string;
};

type PersonaModuleContent = {
  eyebrow: string;
  headline: string;
  intro: string;
  cards: PersonaCardContent[];
};

type GovernanceSectionContent = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
};

type DiagramRequest = {
  id: string;
  caption: string;
  owner: string;
  status: 'pending' | 'in-progress' | 'complete';
};

type GovernanceDeepDiveContent = {
  headline: string;
  intro: string;
  diagram: DiagramRequest;
  sections: GovernanceSectionContent[];
};

type GuardrailStoryContent = {
  id: string;
  title: string;
  summary: string;
  scenario: string;
};

type GuardrailModuleContent = {
  headline: string;
  intro: string;
  stories: GuardrailStoryContent[];
  checklist: ChecklistItemContent[];
};

type AziConversationLine = {
  speaker: 'leader' | 'azi';
  text: string;
};

type AziModuleContent = {
  headline: string;
  intro: string;
  capabilities: string[];
  conversation: AziConversationLine[];
  assurances: string[];
};

type CtaStackContent = {
  preheadline: string;
  headline: string;
  subhead: string;
  primaryCta: MarketingAction;
  secondaryCta: MarketingAction;
  proofPoints: string[];
};

type AssetRequirement = {
  id: string;
  description: string;
  owner: string;
  status: 'pending' | 'in-progress' | 'complete';
};

type ProofReference = {
  id: string;
  description: string;
  source: string;
  owner: string;
};

type ApprovalRequirement = {
  id: string;
  description: string;
  owner: string;
};

type DependencyItem = {
  id: string;
  description: string;
  owner: string;
};

type UtmItem = {
  id: string;
  target: string;
  utm: string;
};

type AssetProofContent = {
  visuals: AssetRequirement[];
  stats: ProofReference[];
  citations: ProofReference[];
  approvals: ApprovalRequirement[];
  dependencies: DependencyItem[];
  utmPlan: UtmItem[];
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

type ProductionChecklistItem = {
  id: string;
  label: string;
  status: 'complete' | 'pending';
  owner: string;
};

export type GovernedCollaborationContent = {
  hero: HeroModuleContent;
  personas: PersonaModuleContent;
  governanceDeepDive: GovernanceDeepDiveContent;
  guardrails: GuardrailModuleContent;
  azi: AziModuleContent;
  ctaStack: CtaStackContent;
  assetProof: AssetProofContent;
  seo: SeoMetadata;
  analytics: AnalyticsConfig;
  productionChecklist: ProductionChecklistItem[];
};

const guardrailItems = homeContent.whyOi.guardrails.items;

const heroPrimaryCta: MarketingAction = {
  label: 'Schedule a Governance Review',
  href:
    '/contact#form?utm_source=governed-collaboration-landing&utm_medium=hero-primary&utm_campaign=governed-collaboration',
  intent: 'primary',
};

const heroSecondaryCta: MarketingAction = {
  label: 'Download the Governance Checklist',
  href:
    '/resources/governance-checklist?utm_source=governed-collaboration-landing&utm_medium=hero-secondary&utm_campaign=governed-collaboration',
  intent: 'secondary',
};

export const governedCollaborationContent: GovernedCollaborationContent = {
  hero: {
    eyebrow: 'Workspace Liberty',
    badge: 'Governed Collaboration',
    headline: 'Governed Collaboration. Invite Only. Audit Ready.',
    subhead:
      'Stop treating engineers like intruders. Invite-only workspaces with token-scoped roles let leaders ship fast while audit trails build themselves.',
    quote: {
      quote: 'Invite, assign, and empower - no gatekeepers required.',
      attribution: 'Liberty Edition Seed',
      role: 'Users & Teams',
    },
    stat: {
      headline: 'Audit packets ship with every action.',
      supporting:
        'Token scopes and immutable provenance assemble evidence the moment teams deploy.',
    },
    primaryCta: heroPrimaryCta,
    secondaryCta: heroSecondaryCta,
  },
  personas: {
    eyebrow: 'Personas',
    headline: 'Collaboration Without Compromise',
    intro:
      'Team membership defines who can act and how far they can go. This landing proves governance can stay opinionated without slowing the floor.',
    cards: [
      {
        id: 'operations',
        label: 'Operations Leader',
        role: 'VP Operations',
        headline: 'Keep changeovers moving without blanket access.',
        pain:
          'Brownfield plants rely on shared credentials and IAM queues that stall every change window.',
        liberty:
          'Spin up invite-only squads with pre-approved automation guardrails for each line or contractor.',
        outcome:
          'Change orders clear the same day while every action is logged against a named role.',
      },
      {
        id: 'quality',
        label: 'Quality & Compliance',
        role: 'Director of Quality',
        headline: 'Own every release decision with audit-ready context.',
        pain:
          'Batch records, CAPAs, and deviation notes scatter across systems when teams escalate access.',
        liberty:
          'Bundle deterministic warm queries, approvals, and membership history into a single governance packet.',
        outcome:
          'Auditors receive replayable evidence minutes after they request it, not weeks after the fact.',
      },
      {
        id: 'security',
        label: 'OT Security',
        role: 'OT Security Lead',
        headline: 'Flip roles in seconds without losing oversight.',
        pain: 'Token administration depends on ticket queues and risky admin credentials.',
        liberty:
          'Use token-scoped templates and Azi guidance to preview impact before granting any permission.',
        outcome:
          'Security sees a live diff of access, exportable logs, and automated expirations for every contractor.',
      },
    ],
  },
  governanceDeepDive: {
    headline: 'Invite-Only Governance in Three Layers',
    intro:
      'OpenIndustrial makes liberty practical: profiles stay unified, roles stay explainable, and every action stays accountable.',
    diagram: {
      id: 'invite-only-governance-diagram',
      caption: 'Visualize how invites, roles, and approvals flow before a single change ships.',
      owner: 'Design Systems',
      status: 'pending',
    },
    sections: [
      {
        id: 'profiles-access',
        title: 'Profiles and Access Management',
        summary: 'Unified roster, simple invites, and scoped approvals make trust explicit.',
        bullets: [
          'Sync core identity to Azure AD B2C while keeping workspace membership invite-only.',
          'Capture purpose, expiration, and approver on every invite so governance stays reviewable.',
          'Expose roster snapshots and last-login data for compliance teams without extra exports.',
        ],
      },
      {
        id: 'roles-controls',
        title: 'Role-Based Controls',
        summary: 'Viewer, Editor, Maintainer, and Admin roles map directly to governed actions.',
        bullets: [
          'Viewer: consume warm queries and dashboards with zero write paths.',
          'Editor: build logic, pipelines, and dashboards inside workspace guardrails.',
          'Maintainer: manage deployments, secrets, and device tokens with approval checkpoints.',
          'Admin: issue invites, assign roles, and configure guardrails with full audit capture.',
        ],
      },
      {
        id: 'audit-trails',
        title: 'Audit Trails and Evidence',
        summary: 'Evidence is explainable by default and exportable on demand.',
        bullets: [
          'Token-scoped endpoint logs mirror the Device Integration hub (see device integration solution).',
          'Warm queries replay every release decision with deterministic context (quality management story).',
          'Streaming policy events land in your observability stack for automated attestations.',
        ],
      },
    ],
  },
  guardrails: {
    headline: 'Guardrails Built for Industrial Confidence',
    intro:
      'Governed from the start. Explainable by default. Instant activation. Each guardrail shows how governed collaboration protects production while keeping liberty intact.',
    stories: [
      {
        id: 'governed-from-start',
        title: guardrailItems[0]?.title ?? 'Governed from the Start',
        summary: guardrailItems[0]?.body ??
          'Runs in your Azure tenant with private networking, least-privilege access, and SOC-ready logging.',
        scenario:
          'During an FDA pre-approval inspection, Quality exported a full invite history, token scope map, and warm query evidence in under ten minutes.',
      },
      {
        id: 'explainable-default',
        title: guardrailItems[1]?.title ?? 'Explainable by Default',
        summary: guardrailItems[1]?.body ??
          'Every answer shows its query and context - so engineers can validate before action.',
        scenario:
          'When OSHA questioned a process deviation, investigators replayed the exact warm query, seeing who edited it, when, and why before responding.',
      },
      {
        id: 'instant-activation',
        title: guardrailItems[2]?.title ?? 'Instant Activation',
        summary: guardrailItems[2]?.body ??
          'Publish insights as APIs, dashboards, or alerts with zero manual lift.',
        scenario:
          'An energy customer flipped a contractor token from read to read-write, pushed an alert API live, and captured the whole change as part of the automatic audit log.',
      },
    ],
    checklist: [
      {
        title: 'Invite-only membership templates published',
        description: 'Workspace owners use opinionated invite flows with expirations.',
        intent: 'emerald',
      },
      {
        title: 'Role matrix approved by compliance',
        description: 'Viewer, Editor, Maintainer, Admin responsibilities documented.',
        intent: 'gold',
      },
      {
        title: 'Audit log export schedule automated',
        description: 'Nightly export feeds compliance data lake with token scope diffs.',
        intent: 'blue',
      },
      {
        title: 'Emergency contractor process tested',
        description: 'Two-step Azi-assisted review before temporary elevation.',
        intent: 'rose',
      },
    ],
  },
  azi: {
    headline: 'Azi Keeps Governance Explainable',
    intro:
      'Azi is the opinionated partner in liberty. She surfaces the safest path, explains every trade-off, and keeps humans in the approval loop.',
    capabilities: [
      'Azi + Teams: flag overlapping roles before invites ship and suggest lowest required scope.',
      'Azi + Tokens: compare contractor and engineer permissions using live device integration data.',
      'Azi + Audits: assemble replayable warm query evidence packs for regulators and customers.',
    ],
    conversation: [
      {
        speaker: 'leader',
        text: 'We need to onboard a biotech contractor for Line 7 calibration before Friday.',
      },
      {
        speaker: 'azi',
        text:
          'Here are three governance paths. Fast keeps read-only diagnostics. Safe adds time-boxed write on calibration endpoints. Prudent routes every change through Maintainer review. Which liberty matters most today?',
      },
      {
        speaker: 'leader',
        text: 'Select Safe, limit writes to calibration endpoints, expire Friday 18:00.',
      },
      {
        speaker: 'azi',
        text:
          'Done. Contractor role updated, access diffs logged, and an exportable audit packet is ready for Quality.',
      },
    ],
    assurances: [
      'Human-in-the-loop approvals stay mandatory for role changes and token elevation.',
      'All Azi recommendations cite the queries, roles, and policies they reference.',
      'Every suggestion is reversible with instant rollback and provenance.',
    ],
  },
  ctaStack: {
    preheadline: 'Choose Your Guardrail',
    headline: 'Governance Without Gatekeepers.',
    subhead:
      'Schedule a governance review or grab the checklist to operationalize invite-only collaboration across your sites.',
    primaryCta: {
      ...heroPrimaryCta,
      href:
        '/contact#form?utm_source=governed-collaboration-landing&utm_medium=cta-stack-primary&utm_campaign=governed-collaboration',
    },
    secondaryCta: {
      ...heroSecondaryCta,
      href:
        '/resources/governance-checklist?utm_source=governed-collaboration-landing&utm_medium=cta-stack-secondary&utm_campaign=governed-collaboration',
    },
    proofPoints: [
      'Trusted by regulated manufacturers in life sciences and energy.',
      'Runs in your tenant with private networking and SOC-ready logging.',
      'Invite, assign, and empower every team without inherited risk.',
    ],
  },
  assetProof: {
    visuals: [
      {
        id: 'role-matrix-graphic',
        description: 'Role matrix visualization covering Viewer, Editor, Maintainer, Admin scopes.',
        owner: 'Design Systems',
        status: 'pending',
      },
      {
        id: 'invite-flow-diagram',
        description: 'Diagram showing invite request, approval, Azi review, and activation.',
        owner: 'Design Systems',
        status: 'pending',
      },
      {
        id: 'guardrail-story-cards',
        description: 'Case story cards for FDA, OSHA, and energy contractor scenarios.',
        owner: 'Brand Studio',
        status: 'pending',
      },
    ],
    stats: [
      {
        id: 'access-review-time',
        description: 'Target metric: reduce access review loops from weeks to hours.',
        source: 'Product Analytics to supply pilot data.',
        owner: 'Product Analytics',
      },
      {
        id: 'audit-export-sla',
        description: 'SLA for audit packet export (goal: under 10 minutes).',
        source: 'Compliance operations.',
        owner: 'Compliance',
      },
    ],
    citations: [
      {
        id: 'token-scope-proof',
        description: 'Token-scoped control and policy audit logs.',
        source: 'src/marketing/solutions/device-integration.ts:78-137',
        owner: 'Product Marketing',
      },
      {
        id: 'warm-query-evidence',
        description: 'Deterministic warm queries and audit bundles.',
        source: 'src/marketing/solutions/quality-management.ts:78-157',
        owner: 'Product Marketing',
      },
      {
        id: 'guardrail-language',
        description: 'Guardrail trio copy for consistency.',
        source: 'src/marketing/home.ts:257-283',
        owner: 'Messaging Ops',
      },
    ],
    approvals: [
      {
        id: 'compliance-claims',
        description: 'Legal review for audit-ready and SOC logging claims.',
        owner: 'Compliance',
      },
      {
        id: 'utm-alignment',
        description: 'Marketing Ops approval on UTM parameters.',
        owner: 'Marketing Ops',
      },
      {
        id: 'collateral-copy',
        description: 'Executive brief, ads, and ABM sequence copy sign-off.',
        owner: 'Content Leadership',
      },
    ],
    dependencies: [
      {
        id: 'governance-checklist-pdf',
        description: 'Finalized Governance Checklist PDF hosted in assets catalog.',
        owner: 'Content Design',
      },
      {
        id: 'hubspot-form-id',
        description: 'Confirm HubSpot form ID for governance review CTA.',
        owner: 'Marketing Ops',
      },
      {
        id: 'analytics-spec',
        description: 'Instrumentation spec for hero and checklist CTAs.',
        owner: 'Web Platform',
      },
    ],
    utmPlan: [
      {
        id: 'hero-primary',
        target: 'Hero governance review CTA',
        utm:
          'utm_source=governed-collaboration-landing&utm_medium=hero-primary&utm_campaign=governed-collaboration',
      },
      {
        id: 'hero-secondary',
        target: 'Hero checklist CTA',
        utm:
          'utm_source=governed-collaboration-landing&utm_medium=hero-secondary&utm_campaign=governed-collaboration',
      },
      {
        id: 'cta-stack-primary',
        target: 'CTA stack governance review button',
        utm:
          'utm_source=governed-collaboration-landing&utm_medium=cta-stack-primary&utm_campaign=governed-collaboration',
      },
      {
        id: 'cta-stack-secondary',
        target: 'CTA stack checklist button',
        utm:
          'utm_source=governed-collaboration-landing&utm_medium=cta-stack-secondary&utm_campaign=governed-collaboration',
      },
      {
        id: 'linkedin-exec-brief',
        target: 'LinkedIn executive brief CTA',
        utm: 'utm_source=linkedin&utm_medium=executive-brief&utm_campaign=governed-collaboration',
      },
      {
        id: 'video-sponsorship',
        target: 'Sponsored video end-card',
        utm: 'utm_source=linkedin&utm_medium=video&utm_campaign=governed-collaboration',
      },
      {
        id: 'google-display',
        target: 'Google display ads',
        utm: 'utm_source=google&utm_medium=display&utm_campaign=governed-collaboration',
      },
      {
        id: 'abm-sequence',
        target: 'ABM email CTA links',
        utm: 'utm_source=abm&utm_medium=email&utm_campaign=governed-collaboration',
      },
      {
        id: 'webinar-registration',
        target: 'Webinar registration form',
        utm: 'utm_source=webinar&utm_medium=registration&utm_campaign=governed-collaboration',
      },
    ],
  },
  seo: {
    title: 'Governed Collaboration | Secure Industrial Workspaces',
    description:
      'Invite-only workspaces with token-scoped roles keep collaboration fast and audit-ready. See how OpenIndustrial delivers governance without gatekeepers.',
    keywords: [
      'governed collaboration',
      'industrial RBAC',
      'audit ready workspace',
      'token scoped access',
      'openindustrial governance',
    ],
  },
  analytics: {
    events: [
      { id: 'hero-governance-review', description: 'Hero governance review CTA clicked.' },
      { id: 'hero-checklist-download', description: 'Hero checklist CTA clicked.' },
      { id: 'guardrail-story-expand', description: 'Guardrail scenario expanded.' },
      { id: 'azi-conversation-copy', description: 'Azi conversation copied or shared.' },
      { id: 'cta-stack-review', description: 'CTA stack governance review CTA clicked.' },
      { id: 'cta-stack-checklist', description: 'CTA stack checklist CTA clicked.' },
    ],
    experiments: [
      {
        id: 'hero-headline-test',
        hypothesis: 'Explicit "Invite Only" framing increases governance review conversions.',
      },
      {
        id: 'checklist-modal-offer',
        hypothesis: 'Exit-intent checklist modal lifts checklist downloads by 15%.',
      },
    ],
    scrollDepth: [25, 50, 75, 90],
  },
  productionChecklist: [
    { id: 'copy-draft', label: 'Copy draft complete', status: 'complete', owner: 'Content' },
    {
      id: 'visual-assets',
      label: 'Visual assets approved',
      status: 'pending',
      owner: 'Design Systems',
    },
    {
      id: 'legal-review',
      label: 'Legal and compliance review complete',
      status: 'pending',
      owner: 'Compliance',
    },
    {
      id: 'page-build',
      label: 'Page implemented in runtime',
      status: 'pending',
      owner: 'Web Platform',
    },
    { id: 'qa', label: 'Cross-device QA complete', status: 'pending', owner: 'Web Platform QA' },
    {
      id: 'analytics-ready',
      label: 'Analytics instrumentation verified',
      status: 'pending',
      owner: 'Marketing Ops',
    },
    {
      id: 'launch',
      label: 'Launch and post-launch monitoring',
      status: 'pending',
      owner: 'Marketing Ops',
    },
  ],
};
