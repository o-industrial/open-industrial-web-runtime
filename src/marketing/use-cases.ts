import type { FeatureItemContent } from './content.ts';

export interface UseCaseOverviewContent extends FeatureItemContent {
  slug: string;
  href: string;
  ctaLabel?: string;
}

export const useCaseOverview: UseCaseOverviewContent[] = [
  {
    title: 'Batch Quality & Compliance',
    description:
      'Unify MES, LIMS, QMS, and ERP data into a governed query layer to accelerate investigations and deliver audit-ready evidence.',
    highlights: ['Natural language to KQL', 'Reusable warm queries'],
    slug: 'batch-quality',
    href: '/use-case/batch-quality',
    ctaLabel: 'Explore batch quality anchor',
  },
  {
    title: 'Quality Management',
    description:
      'Show governed batch, recipe, and QA context in one place so quality teams release faster with confidence.',
    highlights: [
      'Sim data: batches, batch components, specifications, samples, test results, deviations, CAPAs, changes, release decisions, equipment calibrations',
      'Warm queries: on-hold batches, OOS/OOT linked to deviations, calibration impact on tests and batches',
      'Outcome: audit-ready bundle and one-click release package demo',
    ],
    slug: 'quality-management',
    href: '/use-case/quality-management',
    ctaLabel: 'Explore quality management anchor',
  },
  {
    title: 'Asset Management',
    description:
      'Blend live telemetry with maintenance history to keep equipment healthy, compliant, and tied to product risk.',
    highlights: [
      'Sim data: vibration, temperature, pressure telemetry, equipment records, maintenance, calibrations, synthetic fault labels, MQTT and OPC UA feeds',
      'Warm queries: rising vibration trend, overdue calibration usage, Pump-07 predictive maintenance window',
      'Outcome: predictive alert endpoint with asset-to-product risk context',
    ],
    slug: 'asset-management',
    href: '/use-case/asset-management',
    ctaLabel: 'Explore asset management anchor',
  },
  {
    title: 'Production Management',
    description:
      'Link MES, SCADA, and genealogy so teams see OEE, downtime, and traceability in a single governed view.',
    highlights: [
      'Sim data: lines, work orders, shifts, downtime events with coded reasons, good/scrap counters, unit genealogy',
      'Warm queries: top downtime causes, throughput vs scrap by line and product, WO-48219 genealogy trail',
      'Outcome: deterministic OEE, downtime drill tree, and shared KPI endpoint',
    ],
    slug: 'production-management',
    href: '/use-case/production-management',
    ctaLabel: 'Explore production management anchor',
  },
  {
    title: 'Device Integration & Data Management',
    description:
      'Demonstrate how Open Industrial onboards devices, normalizes schemas, and governs access before analytics.',
    highlights: [
      'Sim data: device registry with types and locations, schema and version catalog, token-scoped access roles, live device messages',
      'Warm queries: newly registered sensors, streams missing calibration tags, contractor role permissions',
      'Outcome: governed catalog with token-scoped demo and schema evolution example',
    ],
    slug: 'device-integration',
    href: '/use-case/device-integration',
    ctaLabel: 'Explore device integration anchor',
  },
];
