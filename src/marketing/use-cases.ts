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
    href: '/use-cases/batch-quality',
    ctaLabel: 'Explore batch quality anchor',
  },
  {
    title: 'Downtime Diagnosis',
    description:
      'Correlate SCADA, historian, and PLC data to pinpoint root causes in minutes with governed, explainable insight.',
    highlights: [
      'Cross-system root cause analysis',
      'Plain-English questions to governed KQL',
      'Audit-ready downtime evidence',
    ],
    slug: 'downtime-diagnosis',
    href: '/use-cases/downtime-diagnosis',
    ctaLabel: 'Explore downtime diagnosis anchor',
  },
  {
    title: 'Cross-Line Performance',
    description:
      'Stack-rank throughput, downtime, and OEE across lines with governed KPIs your teams can trust.',
    highlights: [
      'Compare throughput and downtime across lines',
      'Explainable OEE and shift summaries',
      'Cycle time and bottleneck insights',
    ],
    slug: 'cross-line-performance',
    href: '/use-cases/cross-line-performance',
    ctaLabel: 'Explore cross-line performance anchor',
  },
  {
    title: 'Safety & Compliance Triggers',
    description:
      'Automate threshold monitoring, capture context-rich logs, and deliver audit-ready safety and compliance insights.',
    highlights: [
      'Real-time safety trigger detection',
      'Context-rich compliance logging',
      'Explainable alerts for operators and QA',
    ],
    slug: 'safety-compliance-triggers',
    href: '/use-cases/safety-compliance-triggers',
    ctaLabel: 'Explore safety & compliance triggers anchor',
  },
];
