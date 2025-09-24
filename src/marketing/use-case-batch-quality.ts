import {
  CheckIcon,
  StackIcon,
  TriggerMatchIcon,
  WarmQueryIcon,
} from '@o-industrial/common/atomic/icons';
import type {
  CTAContent,
  FeatureItemContent,
  FlowDiagramContent,
  HeroContent,
  SectionHeaderContent,
  ToggleQueryContent,
} from './content.ts';

export const batchQualityHero: HeroContent = {
  eyebrow: 'Batch Quality & Compliance',
  headline: {
    leading: 'Batch quality and compliance',
  },
  description:
    'Monitor and manage batch execution data in real-time. Identify anomalies, catch deviations, and satisfy compliance requirements without waiting on manual reports.',
  primaryAction: {
    label: 'Talk to Us',
    href: 'https://www.openindustrial.co/workspace',
    intent: 'primary',
    external: true,
  },
  secondaryAction: {
    label: 'See Capabilities',
    href: '/docs',
    intent: 'secondary',
  },
};

export const batchQualityQueryExample =
  'Which Reactor 2 batches exceeded 140 degrees C this week, what deviations were logged, and which CAPAs are linked?';

export const batchQualityProblem: SectionHeaderContent = {
  eyebrow: 'The problem',
  title: 'Batch context hides across disconnected systems',
  description:
    'Quality investigations rely on exports and spreadsheets because records span MES/EBR, LIMS, QMS, DMS, and ERP. Deviations surface late, CAPAs lack context, and answering "why is this batch on hold" turns into another ticket.',
  align: 'center',
};

export const batchQualityIntegrationSteps = [
  'Batches and genealogy (MES/EBR)',
  'Lab samples and test results (LIMS)',
  'Deviations, CAPAs, and changes (QMS)',
  'Specs, docs, and training (DMS)',
  'Suppliers and material lots (ERP)',
];

export const batchQualityIntegrationDiagram: FlowDiagramContent = {
  inputs: [
    { title: 'MES / EBR', subtitle: 'Batches and genealogy' },
    { title: 'LIMS', subtitle: 'Lab results and QC data' },
    { title: 'QMS', subtitle: 'Deviations and CAPAs' },
    { title: 'ERP / MDM', subtitle: 'Suppliers and material lots' },
  ],
  hub: {
    title: 'Open Industrial Batch Hub',
    description: 'Governed ingestion, lineage, warm queries, and explainable answers.',
  },
  outputs: [
    { title: 'Investigations', subtitle: 'Root cause & deviation packs' },
    { title: 'Audit evidence', subtitle: 'Explainable queries & reports' },
    { title: 'Operational alerts', subtitle: 'Threshold breaches & CAPA hooks' },
    { title: 'APIs & dashboards', subtitle: 'Reusable, versioned endpoints' },
  ],
};

export const batchQualityHowHelpItems: FeatureItemContent[] = [
  {
    title: 'Unify batch telemetry',
    description:
      'Bring MES/EBR, LIMS, QMS, ERP, and DMS into one governed query layer so investigators see the full story instantly.',
    icon: StackIcon,
    intent: 'blue',
  },
  {
    title: 'Reusable query endpoints',
    description:
      'Save warm queries like "Batches on hold and why" or "Open CAPAs" as explainable, versioned endpoints for repeatable answers.',
    icon: WarmQueryIcon,
    intent: 'purple',
  },
  {
    title: 'Automated CAPA hooks',
    description:
      'Flag threshold breaches across temperature, pressure, or results and surface them as governed signals tied to CAPAs.',
    icon: TriggerMatchIcon,
    intent: 'orange',
  },
  {
    title: 'Audit-ready reports',
    description:
      'Generate validated outputs aligned to your retention practices - ready for internal QA teams or regulators.',
    icon: CheckIcon,
    intent: 'green',
  },
];

export const batchQualityToggleQueries: ToggleQueryContent[] = [
  {
    eyebrow: 'Batches on hold',
    title: 'Which batches are on hold and why?',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Which batches are on hold or pending QA and why?',
      kql:
        "SELECT batch_id, status, hold_reason FROM batches WHERE status IN ('On Hold', 'Pending QA')",
    },
  },
  {
    eyebrow: 'OOS / OOT trends',
    title: 'List OOS or OOT results with linked deviations',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'List OOS or OOT results with their linked deviations.',
      kql:
        "SELECT test_results.*, deviations.* FROM test_results JOIN deviations ON test_results.deviation_id = deviations.id WHERE result_status IN ('OOS', 'OOT')",
    },
  },
  {
    eyebrow: 'Calibration impact',
    title: 'Is equipment overdue and who is affected?',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Is EQ-UV-001 overdue and which tests or batches are impacted?',
      kql:
        "SELECT equipment.id, calibration_due, tests.*, batches.* FROM equipment LEFT JOIN tests ON equipment.id = tests.equipment_id LEFT JOIN batches ON tests.batch_id = batches.id WHERE equipment.id = 'EQ-UV-001' AND calibration_due < NOW()",
    },
  },
  {
    eyebrow: 'Quarantined lots',
    title: 'Do quarantined lots appear in released batches?',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Do any quarantined inventory lots appear in released batches?',
      kql:
        "SELECT inventory.lot_number, batches.batch_id FROM inventory JOIN batch_materials ON inventory.lot_number = batch_materials.lot_number JOIN batches ON batch_materials.batch_id = batches.id WHERE inventory.status = 'Quarantined' AND batches.status = 'Released'",
    },
  },
];

export const batchQualityOutcome: CTAContent = {
  title: 'Ready to transform batch quality investigations?',
  description: 'Connect your systems, query your data, and act with confidence.',
  primaryAction: {
    label: 'Schedule a demo',
    href: '/contact',
    intent: 'primary',
  },
  secondaryAction: {
    label: 'View documentation',
    href: 'https://www.openindustrial.co/docs/',
    intent: 'secondary',
    external: true,
  },
};
