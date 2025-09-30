import {
  ConnectionIcon,
  ImpulseIcon,
  StackIcon,
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

export const productionManagementHero: HeroContent = {
  eyebrow: 'Cross-Domain Anchor',
  title: 'Production Management',
  description:
    'Bring MES, SCADA, and genealogy signals together for governed OEE, downtime analysis, and traceability.',
  primaryAction: {
    label: 'View OEE Blueprint',
    href: '/contact#form',
    intent: 'primary',
  },
  secondaryAction: {
    label: 'Download Downtime Playbook',
    href: 'https://www.openindustrial.co/docs/',
    intent: 'secondary',
    external: true,
  },
};

export const productionManagementQueryExample =
  'Top 3 downtime causes for Line 2 this week during Night Shift.';

export const productionManagementProblem: SectionHeaderContent = {
  eyebrow: 'The Gap',
  title: 'Line Performance Data Lives in Different Worlds',
  description:
    'Operators watch SCADA, planners pull MES exports, and engineering keeps genealogy in another stack. Nobody shares a single answer for downtime, scrap, or traceability.',
  align: 'center',
};

export const productionManagementIntegrationSteps = [
  'Line, cell, and equipment hierarchy (MES)',
  'Shift schedules and crew assignments (ERP/HCM)',
  'Counters, good vs scrap totals, and rate (SCADA)',
  'Downtime events with coded reasons (MES/CMMS)',
  'Genealogy links from raw input to finished unit (MES/LIMS)',
];

export const productionManagementHubFlow: HubFlowContent = {
  preHeadline: 'System Blueprint',
  headline: 'Production Signals Into Explainable KPIs',
  subhead:
    'Normalize run logs, downtime codes, and genealogy so every KPI, report, and alert is traceable.',
  inputsLabel: 'Data In',
  inputs: [
    { title: 'Operations', items: ['Lines', 'Work Orders', 'Shifts'] },
    { title: 'Throughput', items: ['Good Counts', 'Scrap Counts', 'Rate Logs'] },
    { title: 'Downtime', items: ['Events', 'Reason Codes', 'Maintenance Notes'] },
    { title: 'Genealogy', items: ['Unit Trace', 'Batch Links', 'Supplier Lots'] },
  ],
  hub: {
    title: 'Production Performance Hub',
    subtitle: 'Governed Operations Intelligence',
    bullets: [
      'Computes deterministic OEE and throughput metrics',
      'Builds reason trees for downtime investigation',
      'Maintains genealogy for every order and unit',
    ],
  },
  outputsLabel: 'Insight Out',
  outputs: [
    { title: 'Performance', items: ['OEE Dashboards', 'Throughput KPIs', 'Scrap Trends'] },
    {
      title: 'Problem Solving',
      items: ['Downtime Drilldowns', 'Reason Tree Explorer', 'Shift Comparisons'],
    },
    { title: 'Traceability', items: ['Genealogy Explorer', 'Supplier Impact', 'Hold Signals'] },
    { title: 'Automation', items: ['KPI API', 'Alert Streams', 'Workflow Hooks'] },
  ],
};

export const productionManagementHowHelpItems: FeatureItemContent[] = [
  {
    title: 'Deterministic OEE Every Run',
    description:
      'Baseline availability, performance, and quality with governed calculations your teams agree on.',
    icon: StackIcon,
    intent: 'blue',
  },
  {
    title: 'Explainable Downtime',
    description:
      'Traverse downtime trees by line, shift, reason, and work order to get from symptom to cause fast.',
    icon: ImpulseIcon,
    intent: 'purple',
  },
  {
    title: 'Traceability Without Tabs',
    description:
      'See full genealogy for any work order or batch plus the upstream issues linked to it.',
    icon: ConnectionIcon,
    intent: 'orange',
  },
  {
    title: 'Reusable KPI Endpoints',
    description:
      'Publish governed APIs for throughput, scrap, and downtime so teams consume the same truth everywhere.',
    icon: WarmQueryIcon,
    intent: 'green',
  },
];

export const productionManagementToggleQueries: ToggleQueryContent[] = [
  {
    eyebrow: 'Downtime Focus',
    title: 'Top Downtime Causes for Line 2 - Night Shift',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Top 3 downtime causes for Line 2 this week during Night Shift.',
      kql:
        "SELECT reason_code, COUNT(*) AS events, SUM(duration_minutes) AS minutes FROM downtime_events WHERE line_id = 'Line-2' AND shift = 'Night' AND event_start >= DATE_TRUNC('week', NOW()) GROUP BY reason_code ORDER BY minutes DESC LIMIT 3",
    },
  },
  {
    eyebrow: 'Throughput Insight',
    title: 'Throughput vs Scrap Trend by Line and Product',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Throughput vs scrap trend by line and product in the last 7 days.',
      kql:
        "SELECT line_id, product_code, DATE(event_time) AS day, SUM(good_count) AS good, SUM(scrap_count) AS scrap FROM production_counters WHERE event_time >= NOW() - INTERVAL '7 DAY' GROUP BY line_id, product_code, day ORDER BY day",
    },
  },
  {
    eyebrow: 'Genealogy',
    title: 'Trace Genealogy for WO-48219',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Trace genealogy for WO-48219 and list any upstream defects.',
      kql:
        "SELECT child.work_order_id, parent.sku, parent.serial_number, defects.defect_code FROM genealogy child LEFT JOIN genealogy parent ON child.parent_id = parent.unit_id LEFT JOIN defects ON parent.unit_id = defects.unit_id WHERE child.work_order_id = 'WO-48219'",
    },
  },
];

export const productionManagementOutcome: CTAContent = {
  title: 'Deliver a Shared Production KPI Endpoint',
  description:
    'Give operations, quality, and leadership the same governed read on downtime, throughput, and traceability.',
  primaryAction: {
    label: 'Request Production Intelligence Demo',
    href: '/contact',
    intent: 'primary',
  },
  secondaryAction: {
    label: 'Preview KPI API',
    href: 'https://www.openindustrial.co/docs/',
    intent: 'secondary',
    external: true,
  },
};
