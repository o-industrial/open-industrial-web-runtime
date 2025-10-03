import {
  ConnectionIcon,
  SchemaIcon,
  SignalIcon,
  TriggerMatchIcon,
} from '@o-industrial/atomic/icons';
import type {
  CTAContent,
  FeatureItemContent,
  HeroContent,
  HubFlowContent,
  SectionHeaderContent,
  ToggleQueryContent,
} from './content.ts';
export const assetManagementHero: HeroContent = {
  eyebrow: 'Cross-Domain Anchor',
  title: 'Asset Management',
  description:
    'Blend live telemetry with maintenance and calibration state so reliability, safety, and product risk stay in sync.',
  primaryAction: { label: 'See Predictive Alert Demo', href: '/contact#form', intent: 'primary' },
  secondaryAction: {
    label: 'Download Asset Data Schema',
    href: 'https://www.openindustrial.co/docs/',
    intent: 'secondary',
    external: true,
  },
};
export const assetManagementQueryExample =
  'Show assets with rising vibration trend beyond baseline in the last 24 hours.';
export const assetManagementProblem: SectionHeaderContent = {
  eyebrow: 'The Gap',
  title: 'Silos Hide Equipment Risk Until It Hits the Line',
  description:
    'Telemetry sits in historians, maintenance in CMMS, and calibrations in spreadsheets. Teams overreact to alarms or miss the silent failure that puts batches at risk.',
  align: 'center',
};
export const assetManagementIntegrationSteps = [
  'Real-time telemetry feeds (MQTT/OPC UA)',
  'Equipment master data and criticality (EAM)',
  'Maintenance and inspection history (CMMS)',
  'Calibration events and due dates (QA)',
  'Fault signatures and synthetic labels (ML Ops)',
];
export const assetManagementHubFlow: HubFlowContent = {
  preHeadline: 'System Blueprint',
  headline: 'Operational Telemetry Into Governed Reliability Intelligence',
  subhead:
    'Fuse streaming signals, maintenance records, and calibration context into actionable alerts and product impact views.',
  inputsLabel: 'Data In',
  inputs: [
    { title: 'Telemetry Streams', items: ['Temperature', 'Pressure', 'Vibration', 'Duty Hours'] },
    { title: 'Asset Context', items: ['Equipment Registry', 'Criticality', 'Location'] },
    { title: 'Lifecycle', items: ['Maintenance Orders', 'Calibrations', 'Inspections'] },
    { title: 'ML Features', items: ['Fault Labels', 'Forecast Models', 'Baseline Profiles'] },
  ],
  hub: {
    title: 'Asset Health Hub',
    subtitle: 'Governed Telemetry Intelligence',
    bullets: [
      'Normalizes telemetry with maintenance and calibration history',
      'Detects trend breaches and routes governed alerts',
      'Maps asset state to product, batch, and safety impact',
    ],
  },
  outputsLabel: 'Insight Out',
  outputs: [
    {
      title: 'Reliability',
      items: ['Predictive Alerts', 'Maintenance Recommendations', 'Dispatch Notes'],
    },
    {
      title: 'Operations',
      items: ['Asset Risk Dashboards', 'Calibration Compliance', 'Duty Utilization'],
    },
    { title: 'Quality', items: ['Product Impact Reports', 'Batch Hold Signals'] },
    { title: 'Automation', items: ['Webhook Alerts', 'Message Bus Events', 'Streaming APIs'] },
  ],
};
export const assetManagementHowHelpItems: FeatureItemContent[] = [{
  title: 'Trend Detection That Matters',
  description:
    'Track vibration, pressure, and duty hour baselines to surface the assets that actually need attention.',
  icon: SignalIcon,
  intent: 'blue',
}, {
  title: 'Governed Asset Catalog',
  description:
    'Unify equipment identity, criticality, and calibration history for instant root cause alignment.',
  icon: SchemaIcon,
  intent: 'purple',
}, {
  title: 'Product Impact Tie-In',
  description:
    'Trace which batches and tests rely on overdue or faulting equipment before quality suffers.',
  icon: ConnectionIcon,
  intent: 'orange',
}, {
  title: 'Predictive Alerts on Your Bus',
  description:
    'Publish explainable alerts that show the trend, recommendation, and associated work instructions.',
  icon: TriggerMatchIcon,
  intent: 'green',
}];
export const assetManagementToggleQueries: ToggleQueryContent[] = [{
  eyebrow: 'Telemetry Trend',
  title: 'Show Assets With Rising Vibration Beyond Baseline',
  options: [{ id: 'english', label: 'English' }, { id: 'kql', label: 'KQL' }],
  copy: {
    english: 'Show assets with rising vibration trend beyond baseline in the last 24 hours.',
    kql:
      "SELECT asset_id, avg_vibration, baseline_vibration FROM vibration_trends WHERE window_start >= NOW() - INTERVAL '24 HOUR' AND avg_vibration > baseline_vibration * 1.2",
  },
}, {
  eyebrow: 'Calibration Usage',
  title: 'Which Batches Used Overdue Equipment?',
  options: [{ id: 'english', label: 'English' }, { id: 'kql', label: 'KQL' }],
  copy: {
    english: 'Which batches or tests used equipment with overdue calibration?',
    kql:
      'SELECT b.batch_id, e.equipment_id, e.calibration_due FROM equipment e INNER JOIN tests t ON e.equipment_id = t.equipment_id INNER JOIN batches b ON t.batch_id = b.batch_id WHERE e.calibration_due < NOW()',
  },
}, {
  eyebrow: 'Predictive Maintenance',
  title: 'Predict Next Maintenance for Pump-07',
  options: [{ id: 'english', label: 'English' }, { id: 'kql', label: 'KQL' }],
  copy: {
    english: 'Predict next maintenance for Pump-07 based on duty hours and starts.',
    kql:
      "SELECT asset_id, forecast_maintenance_date FROM maintenance_forecast WHERE asset_id = 'Pump-07'",
  },
}];
export const assetManagementOutcome: CTAContent = {
  title: 'Route Predictive Alerts With Product Context',
  description:
    'See how governed telemetry intelligence ties asset health to quality and safety in a single endpoint.',
  primaryAction: { label: 'Request Asset Health Walkthrough', href: '/contact', intent: 'primary' },
  secondaryAction: {
    label: 'Preview Telemetry API',
    href: 'https://www.openindustrial.co/docs/',
    intent: 'secondary',
    external: true,
  },
};

