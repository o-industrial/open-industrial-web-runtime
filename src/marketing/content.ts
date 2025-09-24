import type { ComponentType } from 'preact';
import type { JSX } from 'preact';
import type { GradientIntent } from '@o-industrial/common/atomic/atoms';

import type { MarketingGradientToken } from './gradients.ts';

export type MarketingActionIntent = 'primary' | 'secondary' | 'ghost';

export interface MarketingAction {
  label: string;
  href: string;
  intent?: MarketingActionIntent;
  external?: boolean;
}

export interface MediaContent {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface SectionHeaderContent {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  kicker?: string;
}

export interface SectionHeaderLineContent {
  text: string;
  highlight?: boolean;
}

export interface StructuredSectionHeaderContent {
  eyebrow?: string;
  strapline?: string;
  titleLines: SectionHeaderLineContent[];
  description?: string;
  kicker?: string;
  align?: 'left' | 'center';
}

export interface FeatureItemContent {
  title: string;
  description: string;
  icon?: ComponentType<JSX.SVGAttributes<SVGSVGElement>>;
  intent?: GradientIntent;
  highlights?: string[];
  chips?: string[];
}

export interface StepItemContent {
  title: string;
  description: string;
  icon?: ComponentType<JSX.SVGAttributes<SVGSVGElement>>;
  intent?: GradientIntent;
}

export interface ChecklistItemContent {
  title: string;
  description?: string;
  icon?: ComponentType<JSX.SVGAttributes<SVGSVGElement>>;
  intent?: GradientIntent;
}

export interface QuoteItemContent {
  quote: string;
  attribution?: string;
  role?: string;
}

export interface PillarItemContent {
  title: string;
  description: string;
  badge: string;
  accentToken: MarketingGradientToken;
  glowToken: MarketingGradientToken;
}

export type MetricIntent =
  | 'none'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'info'
  | 'warning'
  | 'error';

export interface MetricHighlightContent {
  label: string;
  value: string;
  description?: string;
  intent?: MetricIntent;
  delta?: number;
  trend?: number[];
}

export interface ToggleQueryContent {
  eyebrow?: string;
  title: string;
  description?: string;
  options: { id: string; label: string }[];
  copy: Record<string, string>;
}

export interface IntegrationColumnContent {
  title: string;
  items: string[];
}

export interface FlowNodeContent {
  title: string;
  subtitle?: string;
  description?: string;
}

export interface FlowDiagramContent {
  inputs: FlowNodeContent[];
  hub: FlowNodeContent;
  outputs: FlowNodeContent[];
}

export interface CTAContent {
  title: string;
  description?: string;
  primaryAction?: MarketingAction;
  secondaryAction?: MarketingAction;
}

export interface HeroHeadlineContent {
  leading: string;
  highlight?: string;
  trailing?: string;
}

export interface HeroContent {
  eyebrow?: string;
  headline: HeroHeadlineContent;
  description?: string;
  supporting?: string;
  media?: MediaContent;
  primaryAction?: MarketingAction;
  secondaryAction?: MarketingAction;
  hubspotFormId?: string;
}
export interface LegalListItemContent {
  title?: string;
  description?: string;
}

export interface LegalSectionContent {
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  list?: {
    ordered?: boolean;
    items: LegalListItemContent[];
  };
  footnote?: string;
}

export interface LegalDocumentContent {
  title: string;
  effectiveDate?: string;
  lastUpdated?: string;
  intro?: string[];
  sections: LegalSectionContent[];
}
