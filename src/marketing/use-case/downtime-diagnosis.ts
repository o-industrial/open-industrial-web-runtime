import { CheckIcon, ConnectionIcon, ImpulseIcon, WarmQueryIcon } from '@o-industrial/atomic/icons';
import type {
  CTAContent,
  FeatureItemContent,
  HeroContent,
  HubFlowContent,
  SectionHeaderContent,
  ToggleQueryContent,
} from './content.ts';

export const downtimeDiagnosisHero: HeroContent = {
  eyebrow: 'Use Case',
  title: 'Downtime Diagnosis',
  description:
    'Correlate SCADA, historian, and PLC data to cut troubleshooting time from days to minutes. Operations and engineering teams pinpoint root causes with governed, explainable queries.',
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

export const downtimeDiagnosisQueryExample = 'What caused Line 4 downtime for the past 24 hours?';

export const downtimeDiagnosisProblem: SectionHeaderContent = {
  eyebrow: 'The Challenge',
  title: 'Downtime Signals Live in Separate Silos',
  description:
    'Control, historian, MES, and maintenance systems each hold a piece of the story. Without a governed hub, teams rely on exports and hunches while lines sit idle.',
  align: 'center',
};

export const downtimeDiagnosisIntegrationSteps = [
  'SCADA, PLC, and DCS events',
  'Historian trends and telemetry',
  'MES and ERP production context',
  'Maintenance and fault logs',
  'Shift, crew, and schedule data',
];

export const downtimeDiagnosisHubFlow: HubFlowContent = {
  preHeadline: 'System Blueprint',
  headline: 'One Governed Hub -- Many Endpoints',
  subhead:
    'Trace downtime across control, historian, and MES feeds, unify it in a governed hub, and deliver explainable outputs every team can action.',
  inputsLabel: 'Input Systems',
  inputs: [
    { title: 'Control Systems', items: ['SCADA', 'PLC', 'DCS'] },
    { title: 'Manufacturing Systems', items: ['MES', 'ERP', 'WMS'] },
    { title: 'Quality & Lab', items: ['LIMS', 'QMS', 'Historians'] },
    { title: 'IoT & Sensors', items: ['Edge Devices', 'Industrial Protocols'] },
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

export const downtimeDiagnosisHowHelpItems: FeatureItemContent[] = [
  {
    title: 'Correlate Across Sources',
    description:
      'Combine SCADA, PLC, historian, and MES data without stitching spreadsheets or waiting on IT.',
    icon: ConnectionIcon,
    intent: 'blue',
  },
  {
    title: 'Accelerate Root Cause Analysis',
    description:
      'Move from symptom to source in minutes with governed warm queries and saved investigations.',
    icon: ImpulseIcon,
    intent: 'purple',
  },
  {
    title: 'Empower Every Engineer',
    description:
      'Ask questions in plain English while Open Industrial validates each answer with explainable KQL.',
    icon: WarmQueryIcon,
    intent: 'orange',
  },
  {
    title: 'Audit-Ready Outputs',
    description: 'Every query and result is logged, versioned, and ready for compliance review.',
    icon: CheckIcon,
    intent: 'green',
  },
];

export const downtimeDiagnosisToggleQueries: ToggleQueryContent[] = [
  {
    eyebrow: 'Top Events',
    title: 'Show the Top Downtime Events for Line 4 in the Past 24 Hours',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Show the top 5 downtime events for Line 4 in the past 24 hours.',
      kql:
        `DowntimeEvents\n| where Line == "4"\n| where Timestamp > ago(24h)\n| summarize Count = count() by EventType\n| top 5 by Count desc`,
    },
  },
  {
    eyebrow: 'Fault History',
    title: 'List Equipment Faults That Caused Downtime Yesterday',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'List all equipment faults that caused downtime on Line 4 yesterday.',
      kql:
        `FaultLogs\n| where Line == "4"\n| where EventType == "Downtime"\n| where Timestamp between (startofday(ago(1d)) .. endofday(ago(1d)))\n| project Timestamp, EquipmentID, FaultCode, Description`,
    },
  },
  {
    eyebrow: 'Historian Correlation',
    title: 'Link Downtime with Pressure Anomalies',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english:
        'Correlate downtime events with historian data to show pressure anomalies during outages.',
      kql:
        `DowntimeEvents\n| where Line == "4"\n| join kind=inner (\n    HistorianData\n    | where SensorType == "Pressure"\n    | summarize AvgPressure = avg(Value) by bin(Timestamp, 5m)\n  ) on Timestamp\n| project Timestamp, EventType, AvgPressure`,
    },
  },
  {
    eyebrow: 'Workstation Impact',
    title: 'Calculate Downtime Minutes by Workstation',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Calculate total downtime minutes for each workstation on Line 4 this week.',
      kql:
        `DowntimeEvents\n| where Line == "4"\n| where Timestamp > startofweek(now())\n| summarize TotalDowntimeMinutes = sum(DurationMinutes) by Workstation\n| order by TotalDowntimeMinutes desc`,
    },
  },
];

export const downtimeDiagnosisOutcome: CTAContent = {
  title: 'Ready to Cut Troubleshooting Time?',
  description:
    'See how quickly your teams can isolate downtime causes with governed, explainable insight.',
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

