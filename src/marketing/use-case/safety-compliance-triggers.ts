import { CheckIcon, ShieldIcon, SignalIcon, TriggerMatchIcon } from '@o-industrial/atomic/icons';
import type {
  CTAContent,
  FeatureItemContent,
  HeroContent,
  HubFlowContent,
  SectionHeaderContent,
  ToggleQueryContent,
} from './content.ts';

export const safetyComplianceTriggersHero: HeroContent = {
  eyebrow: 'Use Case',
  title: 'Safety & Compliance Triggers',
  description:
    'Automated monitoring helps ensure compliance and operator safety. Track critical thresholds, log events with full telemetry context, and generate audit-ready reports.',
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

export const safetyComplianceTriggersQueryExample =
  'Log all pressure events greater than 80 psi with full context.';

export const safetyComplianceTriggersProblem: SectionHeaderContent = {
  eyebrow: 'The Challenge',
  title: 'Manual Monitoring Leaves Gaps in Safety and Compliance',
  description:
    'Teams rely on spreadsheets and manual reviews to detect excursions. Without automated, context-rich logging, risk detection and compliance reporting lag behind real-world events.',
  align: 'center',
};

export const safetyComplianceTriggersIntegrationSteps = [
  'Pressure, temperature, and vibration telemetry',
  'SCADA, PLC, and DCS control signals',
  'MES, ERP, and maintenance records',
  'Safety, training, and operator logs',
  'Historian and compliance archives',
];

export const safetyComplianceTriggersHubFlow: HubFlowContent = {
  preHeadline: 'System Blueprint',
  headline: 'One Governed Hub -- Many Endpoints',
  subhead:
    'Trace safety and compliance data across controls, historians, and enterprise systems. Normalize it in a governed hub and deliver explainable outputs ready for action.',
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

export const safetyComplianceTriggersHowHelpItems: FeatureItemContent[] = [
  {
    title: 'Automated Threshold Monitoring',
    description: 'Continuously watch telemetry for excursions beyond safe operating limits.',
    icon: SignalIcon,
    intent: 'blue',
  },
  {
    title: 'Context-Rich Event Logging',
    description: 'Capture surrounding process data when triggers fire so every event is traceable.',
    icon: TriggerMatchIcon,
    intent: 'purple',
  },
  {
    title: 'Ensure Operator Safety',
    description: 'Detect risks in real time to protect personnel and critical equipment.',
    icon: ShieldIcon,
    intent: 'orange',
  },
  {
    title: 'Simplify Compliance',
    description: 'Generate auditable records and reports for regulators and internal QA teams.',
    icon: CheckIcon,
    intent: 'green',
  },
];

export const safetyComplianceTriggersToggleQueries: ToggleQueryContent[] = [
  {
    eyebrow: 'Pressure Events',
    title: 'Log High-Pressure Events (Past 24 Hours)',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Log all pressure events greater than 80 psi in the past 24 hours.',
      kql:
        `SensorData\n| where SensorType == "Pressure"\n| where Value > 80\n| where Timestamp > ago(24h)\n| project Timestamp, DeviceID, Value`,
    },
  },
  {
    eyebrow: 'Alert Volume',
    title: 'Count Safety Alerts by Line (Last Week)',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Count how many safety alerts were triggered by Line 3 last week.',
      kql:
        `SafetyAlerts\n| where Line == "3"\n| where Timestamp > startofweek(ago(7d))\n| summarize AlertCount = count()`,
    },
  },
  {
    eyebrow: 'Compliance Summary',
    title: 'Compliance Events with Operator Context',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Show all compliance-triggered events with operator ID for the past month.',
      kql:
        `ComplianceEvents\n| where Timestamp > startofmonth(now())\n| project Timestamp, EventType, OperatorID, DeviceID, Value`,
    },
  },
  {
    eyebrow: 'Response Tracking',
    title: 'Average Response Time by Alert Type (This Quarter)',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Summarize average response time after each compliance alert this quarter.',
      kql:
        `ComplianceEvents\n| where Timestamp > startofquarter(now())\n| summarize AvgResponseTime = avg(ResponseDurationMinutes) by AlertType\n| order by AvgResponseTime desc`,
    },
  },
];

export const safetyComplianceTriggersOutcome: CTAContent = {
  title: 'Ready to Strengthen Safety & Compliance?',
  description:
    'Connect telemetry, automate triggers, and deliver auditable insights that keep teams safe and compliant.',
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

