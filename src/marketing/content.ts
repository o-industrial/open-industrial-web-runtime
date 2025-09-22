import type { ComponentType } from 'preact';
import type { JSX } from 'preact';
import type { GradientIntent } from '@o-industrial/common/atomic/atoms/marketing/GradientIconBadge.tsx';

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
