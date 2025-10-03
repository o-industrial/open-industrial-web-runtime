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
];
