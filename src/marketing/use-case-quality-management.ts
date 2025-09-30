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

export const qualityManagementHero: HeroContent = {
  eyebrow: 'Cross-Domain Anchor',
  title: 'Quality Management',
  description:
    'Blend batch records, lab results, and deviations into governed answers that keep lots moving and audits calm.',
  primaryAction: {
    label: 'See Audit Bundle Demo',
    href: '/contact#form',
    intent: 'primary',
  },
  secondaryAction: {
    label: 'Download Release Package Sample',
    href: 'https://www.openindustrial.co/docs/',
    intent: 'secondary',
    external: true,
  },
};

export const qualityManagementQueryExample = 'Which batches are On Hold or Pending QA and why?';

export const qualityManagementProblem: SectionHeaderContent = {
  eyebrow: 'The Gap',
  title: 'Release Decisions Stall When Records Live in Silos',
  description:
    'Batch data lives in MES, QA in LIMS, deviations in QMS, and specs in DMS. Teams ship exports around while CAPAs, changes, and calibrations drift out of context.',
  align: 'center',
};

export const qualityManagementIntegrationSteps = [
  'Batches, genealogy, and recipes (MES/EBR)',
  'Specifications and release decisions (QA and ERP)',
  'Samples, tests, and OOS/OOT results (LIMS)',
  'Deviations, CAPAs, and changes (QMS)',
  'Equipment status and calibrations (EAM)',
];

export const qualityManagementHubFlow: HubFlowContent = {
  preHeadline: 'System Blueprint',
  headline: 'Unify Batch Quality Signals Into Explainable Answers',
  subhead:
    'Normalize every batch, test, and deviation into governed warm queries that investigators trust and auditors can replay.',
  inputsLabel: 'Data In',
  inputs: [
    { title: 'Production Context', items: ['MES Batches', 'Recipes', 'Genealogy'] },
    { title: 'Lab & QA', items: ['Samples', 'Specifications', 'Test Results (OOS/OOT)'] },
    { title: 'Quality Events', items: ['Deviations', 'CAPAs', 'Change Controls'] },
    {
      title: 'Equipment & Training',
      items: ['Calibrations', 'Maintenance Logs', 'Training Records'],
    },
  ],
  hub: {
    title: 'Quality Management Hub',
    subtitle: 'Governed Batch Intelligence',
    bullets: [
      'Maintains lineage across batches, tests, and deviations',
      'Publishes explained warm queries for release and audit teams',
      'Bundles evidence into deterministic release packages',
    ],
  },
  outputsLabel: 'Insight Out',
  outputs: [
    {
      title: 'Release Control',
      items: ['QA Decision Boards', 'Release Packages', 'Hold Dashboards'],
    },
    { title: 'Investigations', items: ['Deviation Trails', 'CAPA Coverage', 'Spec Drift Alerts'] },
    { title: 'Audit Evidence', items: ['Deterministic Queries', 'Traceable Reports'] },
    { title: 'Automation', items: ['API Triggers', 'Workflow Hooks', 'AI Readouts'] },
  ],
};

export const qualityManagementHowHelpItems: FeatureItemContent[] = [
  {
    title: 'Batch Context Without Spreadsheets',
    description:
      'Bring batches, recipes, and QA state into one governed view so holds resolve in minutes, not days.',
    icon: StackIcon,
    intent: 'blue',
  },
  {
    title: 'Warm Queries You Can Trust',
    description:
      'Ship deterministic queries for holds, OOS/OOT events, and calibration drift as reusable endpoints.',
    icon: WarmQueryIcon,
    intent: 'purple',
  },
  {
    title: 'Closed-Loop Deviations',
    description:
      'Link deviations, CAPAs, and changes automatically so investigations stay audit-ready.',
    icon: TriggerMatchIcon,
    intent: 'orange',
  },
  {
    title: 'Evidence on Demand',
    description:
      'Bundle every answer into exportable audit packets with immutable query provenance.',
    icon: CheckIcon,
    intent: 'green',
  },
];

export const qualityManagementToggleQueries: ToggleQueryContent[] = [
  {
    eyebrow: 'QA Queue',
    title: 'Which Batches Are On Hold or Pending QA and Why?',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Which batches are on hold or pending QA and why?',
      kql:
        "SELECT b.batch_id, b.status, h.hold_reason, qa.pending_task FROM batches b LEFT JOIN batch_holds h ON b.batch_id = h.batch_id LEFT JOIN qa_tasks qa ON b.batch_id = qa.batch_id WHERE b.status IN ('On Hold','Pending QA')",
    },
  },
  {
    eyebrow: 'OOS & Deviations',
    title: 'List OOS/OOT Results With Linked Deviations',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'List OOS or OOT test results in the last 60 days with their linked deviations.',
      kql:
        "SELECT tr.sample_id, tr.test_name, tr.result_value, tr.result_status, d.deviation_id, d.severity FROM test_results tr INNER JOIN deviations d ON tr.deviation_id = d.deviation_id WHERE tr.result_status IN ('OOS','OOT') AND tr.result_date >= NOW() - INTERVAL '60 DAY'",
    },
  },
  {
    eyebrow: 'Calibration Impact',
    title: 'Is EQ-UV-001 Calibration Overdue and What Is Impacted?',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Is EQ-UV-001 calibration overdue and which tests or batches are impacted?',
      kql:
        "SELECT e.equipment_id, e.calibration_due, t.test_name, t.batch_id FROM equipment e LEFT JOIN tests t ON e.equipment_id = t.equipment_id WHERE e.equipment_id = 'EQ-UV-001' AND e.calibration_due < NOW()",
    },
  },
];

export const qualityManagementOutcome: CTAContent = {
  title: 'Generate Your Audit-Ready Release Bundle',
  description:
    'Run the governed warm queries, capture the evidence, and share a one-click release package with QA.',
  primaryAction: {
    label: 'Request Release Package Walkthrough',
    href: '/contact',
    intent: 'primary',
  },
  secondaryAction: {
    label: 'View Warm Query Library',
    href: 'https://www.openindustrial.co/docs/',
    intent: 'secondary',
    external: true,
  },
};
