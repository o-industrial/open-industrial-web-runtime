import type { ComponentType } from 'preact';
import type { JSX } from 'preact';
import type { GradientIntent } from '@o-industrial/atomic/atoms';

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

export interface HubFlowContent {
  preHeadline?: string;
  headline: string;
  subhead?: string;
  inputsLabel: string;
  inputs: { title: string; items: string[] }[];
  hub: {
    title: string;
    subtitle?: string;
    bullets: string[];
  };
  outputsLabel: string;
  outputs: { title: string; items: string[] }[];
}

export interface CTAContent {
  title: string;
  description?: string;
  primaryAction?: MarketingAction;
  secondaryAction?: MarketingAction;
}

export interface HeroContent {
  eyebrow?: string;
  title: string;
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


