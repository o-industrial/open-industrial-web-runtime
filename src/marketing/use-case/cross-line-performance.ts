import { CheckIcon, ImpulseIcon, SignalIcon, WarmQueryIcon } from '@o-industrial/atomic/icons';
import type {
  CTAContent,
  FeatureItemContent,
  HeroContent,
  HubFlowContent,
  SectionHeaderContent,
  ToggleQueryContent,
} from './content.ts';

export const crossLinePerformanceHero: HeroContent = {
  eyebrow: 'Use Case',
  title: 'Cross-Line Performance',
  description:
    'Generate OEE, throughput, and shift summaries without stitching spreadsheets. Compare performance across lines with governed, explainable queries.',
  primaryAction: {
    label: 'Schedule a Demo',
    href: '/contact#form',
    intent: 'primary',
  },
  secondaryAction: {
    label: 'Get Started',
    href: '/workspace',
    intent: 'secondary',
  },
};

export const crossLinePerformanceQueryExample =
  'Show throughput and top downtime causes for Line 4 today.';

export const crossLinePerformanceProblem: SectionHeaderContent = {
  eyebrow: 'The Challenge',
  title: 'Comparing Line Performance Should Not Require Manual Spreadsheets',
  description:
    'Ops and engineering teams spend hours exporting data from MES, SCADA, and historians just to understand how lines are performing. Without a governed hub, OEE and downtime comparisons stall continuous improvement.',
  align: 'center',
};

export const crossLinePerformanceIntegrationSteps = [
  'SCADA, PLC, and DCS telemetry',
  'MES, ERP, and WMS production context',
  'Historian and quality signals',
  'Downtime, shift, and crew logs',
  'Cycle time and throughput counters',
];

export const crossLinePerformanceHubFlow: HubFlowContent = {
  preHeadline: 'System Blueprint',
  headline: 'One Governed Hub -- Many Endpoints',
  subhead:
    'Trace line performance across control, historian, and production systems. Normalize it in a governed hub and deliver explainable insights every team can trust.',
  inputsLabel: 'Input Systems',
  inputs: [
    { title: 'Control Systems', items: ['SCADA', 'PLC', 'DCS'] },
    { title: 'Manufacturing Systems', items: ['MES', 'ERP', 'WMS'] },
    { title: 'Quality & Lab', items: ['LIMS', 'QMS', 'Historians'] },
    { title: 'IoT & Sensors', items: ['Edge Devices', 'Protocol Feeds'] },
  ],
  hub: {
    title: 'Open Industrial Hub',
    subtitle: 'AI-Powered Telemetry Hub',
    bullets: ['Real-time ingestion', 'Natural language queries', 'Instant API generation'],
  },
  outputsLabel: 'Output Destinations',
  outputs: [
    { title: 'Custom Applications', items: ['Web Experiences', 'Mobile Apps'] },
    { title: 'Intelligent Agents', items: ['Monitoring', 'Alerts', 'Actions'] },
    { title: 'BI & Analytics Tools', items: ['Power BI', 'Tableau', 'Grafana'] },
    { title: 'APIs & Integrations', items: ['REST APIs', 'Webhooks'] },
  ],
};

export const crossLinePerformanceHowHelpItems: FeatureItemContent[] = [
  {
    title: 'Compare Across Lines',
    description:
      'Benchmark throughput, downtime, and OEE across multiple production lines without manual work.',
    icon: SignalIcon,
    intent: 'blue',
  },
  {
    title: 'Identify Bottlenecks',
    description:
      'Highlight where performance is lagging so process teams can prioritize improvements.',
    icon: ImpulseIcon,
    intent: 'purple',
  },
  {
    title: 'Empower Teams',
    description:
      'Ask questions in plain English while Open Industrial returns explainable KQL-backed answers.',
    icon: WarmQueryIcon,
    intent: 'orange',
  },
  {
    title: 'Drive Continuous Improvement',
    description:
      'Track key KPIs over time to support lean and Six Sigma initiatives across the plant.',
    icon: CheckIcon,
    intent: 'green',
  },
];

export const crossLinePerformanceToggleQueries: ToggleQueryContent[] = [
  {
    eyebrow: 'Throughput Comparison',
    title: "Compare Today's Throughput Across Lines",
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: "Compare today's throughput across all production lines.",
      kql:
        `ProductionData\n| where Timestamp > startofday(now())\n| summarize TotalUnits = sum(UnitsProduced) by Line\n| order by TotalUnits desc`,
    },
  },
  {
    eyebrow: 'OEE Snapshot',
    title: 'Show OEE for Each Line in the Last Shift',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Show OEE for each line in the last shift.',
      kql:
        `ShiftData\n| where Shift == "Last"\n| summarize\n    Availability = avg(Availability),\n    Performance = avg(Performance),\n    Quality = avg(Quality)\n  by Line\n| extend OEE = Availability * Performance * Quality\n| order by OEE desc`,
    },
  },
  {
    eyebrow: 'Downtime Drivers',
    title: 'Top Downtime Causes by Line This Week',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Summarize top 3 downtime causes for each line this week.',
      kql:
        `DowntimeEvents\n| where Timestamp > startofweek(now())\n| summarize Count = count() by Line, Cause\n| top 3 by Count desc`,
    },
  },
  {
    eyebrow: 'Cycle Time Insight',
    title: 'Average Cycle Time by Line (Past 7 Days)',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Show average cycle time by line for the past 7 days.',
      kql:
        `CycleData\n| where Timestamp > ago(7d)\n| summarize AvgCycleTime = avg(DurationSeconds) by Line\n| order by AvgCycleTime asc`,
    },
  },
];

export const crossLinePerformanceOutcome: CTAContent = {
  title: 'Ready to Compare Performance Across Lines?',
  description:
    'See how quickly you can stack-rank lines, pinpoint bottlenecks, and deliver governed, explainable KPIs to every team.',
  primaryAction: {
    label: 'Schedule a Demo',
    href: '/contact',
    intent: 'primary',
  },
  secondaryAction: {
    label: 'Get Started',
    href: '/workspace',
    intent: 'secondary',
  },
};
