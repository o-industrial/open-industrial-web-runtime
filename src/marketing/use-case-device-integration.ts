import {
  ConnectionIcon,
  NoAccessIcon,
  SchemaIcon,
  SignalIcon,
} from '@o-industrial/common/atomic/icons';
import type {
  CTAContent,
  FeatureItemContent,
  HeroContent,
  HubFlowContent,
  SectionHeaderContent,
  ToggleQueryContent,
} from './content.ts';

export const deviceIntegrationHero: HeroContent = {
  eyebrow: 'Cross-Domain Anchor',
  title: 'Device Integration & Data Management',
  description:
    'Show how Open Industrial onboards every device, governs schema changes, and enforces token-scoped access before analytics begin.',
  primaryAction: {
    label: 'Launch Onboarding Demo',
    href: '/contact#form',
    intent: 'primary',
  },
  secondaryAction: {
    label: 'View Schema Catalog Sample',
    href: 'https://www.openindustrial.co/docs/',
    intent: 'secondary',
    external: true,
  },
};

export const deviceIntegrationQueryExample =
  'List newly registered sensors this week and their governance tags.';

export const deviceIntegrationProblem: SectionHeaderContent = {
  eyebrow: 'The Gap',
  title: 'Device Data Arrives Faster Than Governance',
  description:
    'Operations plug in sensors, integrators push schemas, and contractors need scoped access. Without governed onboarding, context and trust erode before use cases launch.',
  align: 'center',
};

export const deviceIntegrationIntegrationSteps = [
  'Device registry with types, locations, and owners',
  'Schema and version catalog with change approvals',
  'Token-scoped access policies by persona',
  'Streaming payload capture with lineage metadata',
  'Context graph linking devices to assets and processes',
];

export const deviceIntegrationHubFlow: HubFlowContent = {
  preHeadline: 'System Blueprint',
  headline: 'Onboarding to Governed Context in One Flow',
  subhead:
    'From first handshake to schema evolution, keep devices, payloads, and permissions aligned in the runtime.',
  inputsLabel: 'Data In',
  inputs: [
    { title: 'Device Sources', items: ['MQTT Brokers', 'OPC UA Servers', 'Edge Apps'] },
    { title: 'Registration', items: ['Device Records', 'Location Tags', 'Owners'] },
    { title: 'Schemas', items: ['Payload Definitions', 'Version History', 'Retention Rules'] },
    { title: 'Access', items: ['Tokens', 'Roles', 'Policy Decisions'] },
  ],
  hub: {
    title: 'Device Integration Hub',
    subtitle: 'Governed Data Foundation',
    bullets: [
      'Automates onboarding with schema and context validation',
      'Maintains lineage across payload versions and device state',
      'Enforces token-scoped permissions on every endpoint',
    ],
  },
  outputsLabel: 'Insight Out',
  outputs: [
    { title: 'Catalog', items: ['Governed Device Registry', 'Schema Explorer', 'Context Graph'] },
    { title: 'Security', items: ['Token Scopes', 'Policy Audit Logs', 'Contractor Views'] },
    { title: 'Operations', items: ['Health Dashboards', 'Integration Status', 'Alerting Hooks'] },
    { title: 'Analytics', items: ['Versioned Datasets', 'Stream APIs', 'Governed Agents'] },
  ],
};

export const deviceIntegrationHowHelpItems: FeatureItemContent[] = [
  {
    title: 'One Registry for Every Device',
    description:
      'Track device type, owner, and location alongside schema version and context graph ties.',
    icon: SchemaIcon,
    intent: 'blue',
  },
  {
    title: 'Schema Evolution Without Fear',
    description: 'Approve, diff, and roll schemas with lineage so downstream apps never break.',
    icon: SignalIcon,
    intent: 'purple',
  },
  {
    title: 'Token-Scoped Control',
    description:
      'Flip roles between contractor and engineer to prove access rules apply instantly.',
    icon: NoAccessIcon,
    intent: 'orange',
  },
  {
    title: 'Context-Rich Streams',
    description:
      'Publish device payloads enriched with asset and process context for immediate analytics lift.',
    icon: ConnectionIcon,
    intent: 'green',
  },
];

export const deviceIntegrationToggleQueries: ToggleQueryContent[] = [
  {
    eyebrow: 'New Devices',
    title: 'List Newly Registered Sensors',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'List newly registered sensors this week and their governance tags.',
      kql:
        "SELECT device_id, type, location, governance_tags FROM devices WHERE registered_at >= NOW() - INTERVAL '7 DAY'",
    },
  },
  {
    eyebrow: 'Governance Gaps',
    title: 'Streams Missing Calibration Tags',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Which streams lack a calibration tag or asset linkage?',
      kql:
        'SELECT stream_id, schema_version, asset_id FROM device_streams WHERE calibration_tag IS NULL OR asset_id IS NULL',
    },
  },
  {
    eyebrow: 'Access Proof',
    title: 'Show Contractor Role Permissions',
    options: [
      { id: 'english', label: 'English' },
      { id: 'kql', label: 'KQL' },
    ],
    copy: {
      english: 'Show all endpoints a contractor role can read versus write.',
      kql:
        "SELECT role, endpoint, permission FROM role_permissions WHERE role = 'contractor' ORDER BY endpoint",
    },
  },
];

export const deviceIntegrationOutcome: CTAContent = {
  title: 'Flip Roles, Prove Governance, Ship Fast',
  description:
    'Demonstrate governed onboarding, schema evolution, and token enforcement in a single runtime walkthrough.',
  primaryAction: {
    label: 'Schedule Device Integration Demo',
    href: '/contact',
    intent: 'primary',
  },
  secondaryAction: {
    label: 'View Governance Catalog',
    href: 'https://www.openindustrial.co/docs/',
    intent: 'secondary',
    external: true,
  },
};
