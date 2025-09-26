import {
  CheckIcon,
  StackIcon,
  TriggerMatchIcon,
  WarmQueryIcon,
} from '@o-industrial/common/atomic/icons';
import type {
  CTAContent,
  FeatureItemContent,
  HeroContent,
  HubFlowContent,
  SectionHeaderContent,
  ToggleQueryContent,
} from './content.ts';

export const batchQualityHero: HeroContent = {
  eyebrow: 'Use Case',
  title: 'Batch Quality & Compliance',
  description:
    'Unify MES, LIMS, QMS, ERP, and DMS into an explainable, audit-ready query layer for every batch.',
  primaryAction: {
    label: 'Schedule a Demo',
    href: '/contact#form',
    intent: 'primary',
  },
  secondaryAction: {
    label: 'Learn More',
    href: 'https://www.openindustrial.co/docs/',
    intent: 'secondary',
    external: true,
  },
};

export const batchQualityQueryExample =
  'Which Reactor 2 batches exceeded 140 degrees C this week, what deviations were logged, and which CAPAs are linked?';

export const batchQualityProblem: SectionHeaderContent = {
  eyebrow: 'The Problem',
  title: 'Batch Context Hides Across Disconnected Systems',
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

export const batchQualityHubFlow: HubFlowContent = {
  preHeadline: 'System Blueprint',
  headline: 'Batch Data In -> Explainable Insight Out',
  subhead:
    'One Governed Hub \u2013 Many Endpoints. Connect MES, LIMS, QMS, ERP, and historians into one governed hub, then deliver explainable intelligence back to operations, quality, and compliance.',
  inputsLabel: 'Data In',
  inputs: [
    { title: 'Execution & Control', items: ['MES', 'EBR', 'Historian'] },
    { title: 'Quality Systems', items: ['LIMS', 'QMS', 'CAPA Logs'] },
    { title: 'Docs & Training', items: ['DMS', 'SOPs', 'Training Records'] },
    { title: 'Supply Context', items: ['ERP', 'Material Lots', 'Vendors'] },
  ],
  hub: {
    title: 'Open Industrial Batch Hub',
    subtitle: 'Governed Telemetry Intelligence',
    bullets: [
      'Ingests and normalizes batch, lab, and quality data',
      'Maintains lineage with explainable warm queries',
      'Publishes governed APIs, dashboards, and alerts',
    ],
  },
  outputsLabel: 'Insight Out',
  outputs: [
    { title: 'Investigations', items: ['Deviation Packs', 'Root-Cause Trails', 'CAPA Context'] },
    { title: 'Audit Evidence', items: ['Explainable Queries', 'Regulator-Ready Reports'] },
    { title: 'Operations', items: ['Real-Time Alerts', 'Workflow APIs', 'Dashboards'] },
    { title: 'Analytics & AI', items: ['Versioned Datasets', 'Governed Agents'] },
  ],
};

export const batchQualityHowHelpItems: FeatureItemContent[] = [
  {
    title: 'Unify Batch Telemetry',
    description:
      'Bring MES/EBR, LIMS, QMS, ERP, and DMS into one governed query layer so investigators see the full story instantly.',
    icon: StackIcon,
    intent: 'blue',
  },
  {
    title: 'Reusable Query Endpoints',
    description:
      'Save warm queries like "Batches on hold and why" or "Open CAPAs" as explainable, versioned endpoints for repeatable answers.',
    icon: WarmQueryIcon,
    intent: 'purple',
  },
  {
    title: 'Automated CAPA Hooks',
    description:
      'Flag threshold breaches across temperature, pressure, or results and surface them as governed signals tied to CAPAs.',
    icon: TriggerMatchIcon,
    intent: 'orange',
  },
  {
    title: 'Audit-Ready Reports',
    description:
      'Generate validated outputs aligned to your retention practices - ready for internal QA teams or regulators.',
    icon: CheckIcon,
    intent: 'green',
  },
];

export const batchQualityToggleQueries: ToggleQueryContent[] = [
  {
    eyebrow: 'Batches On Hold',
    title: 'Which Batches Are On Hold and Why?',
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
    eyebrow: 'OOS / OOT Trends',
    title: 'List OOS or OOT Results With Linked Deviations',
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
    eyebrow: 'Calibration Impact',
    title: 'Is Equipment Overdue and Who Is Affected?',
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
    eyebrow: 'Quarantined Lots',
    title: 'Do Quarantined Lots Appear in Released Batches?',
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
  title: 'Ready to Transform Batch Quality Investigations?',
  description: 'Connect your systems, query your data, and act with confidence.',
  primaryAction: {
    label: 'Schedule a Demo',
    href: '/contact',
    intent: 'primary',
  },
  secondaryAction: {
    label: 'View Documentation',
    href: 'https://www.openindustrial.co/docs/',
    intent: 'secondary',
    external: true,
  },
};
