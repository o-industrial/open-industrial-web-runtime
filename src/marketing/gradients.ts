import type { GradientIntent } from '@o-industrial/common/atomic/atoms';

// Centralized gradient token registry for marketing surfaces so components and
// content can rely on a shared set of utility class strings.
export const marketingGradientTokens = {
  'badge-purple': 'from-neon-purple-500 via-neon-violet-500 to-neon-indigo-500',
  'badge-orange': 'from-neon-orange-500 via-neon-yellow-500 to-neon-orange-600',
  'badge-blue': 'from-neon-blue-500 via-neon-cyan-500 to-neon-indigo-500',
  'badge-green': 'from-neon-green-500 via-neon-teal-500 to-neon-cyan-500',
  'spotlight-halo-purple':
    'from-[rgba(139,92,246,0.32)] via-[rgba(99,102,241,0.22)] to-transparent',
  'spotlight-halo-blue': 'from-[rgba(59,130,246,0.28)] via-[rgba(34,211,238,0.18)] to-transparent',
  'spotlight-halo-orange':
    'from-[rgba(249,115,22,0.28)] via-[rgba(250,204,21,0.18)] to-transparent',
  'spotlight-halo-green': 'from-[rgba(34,211,238,0.24)] via-[rgba(45,212,191,0.18)] to-transparent',
  'pillar-governance-accent': 'from-neon-purple-500 via-neon-indigo-500 to-neon-cyan-400',
  'pillar-explainability-accent': 'from-neon-indigo-600 via-neon-blue-500 to-neon-cyan-400',
  'pillar-activation-accent': 'from-neon-cyan-400 via-neon-green-400 to-neon-green-600',
  'pillar-governance-glow':
    'from-[rgba(129,140,248,0.36)] via-[rgba(99,102,241,0.22)] to-transparent dark:from-[rgba(129,140,248,0.46)] dark:via-[rgba(99,102,241,0.26)] dark:to-transparent',
  'pillar-explainability-glow':
    'from-[rgba(96,165,250,0.3)] via-[rgba(34,211,238,0.2)] to-transparent dark:from-[rgba(96,165,250,0.4)] dark:via-[rgba(34,211,238,0.26)] dark:to-transparent',
  'pillar-activation-glow':
    'from-[rgba(34,211,238,0.3)] via-[rgba(52,211,153,0.22)] to-transparent dark:from-[rgba(34,211,238,0.4)] dark:via-[rgba(52,211,153,0.28)] dark:to-transparent',
} as const;

export type MarketingGradientToken = keyof typeof marketingGradientTokens;

export function resolveGradientToken(token: MarketingGradientToken): string {
  return marketingGradientTokens[token];
}

const defaultBadgeToken: MarketingGradientToken = 'badge-purple';
const defaultHaloToken: MarketingGradientToken = 'spotlight-halo-purple';

export const productSpotlightBadgeTokenByIntent: Record<GradientIntent, MarketingGradientToken> = {
  blue: 'badge-blue',
  green: 'badge-green',
  purple: 'badge-purple',
  orange: 'badge-orange',
};

export const productSpotlightHaloTokenByIntent: Record<GradientIntent, MarketingGradientToken> = {
  blue: 'spotlight-halo-blue',
  green: 'spotlight-halo-green',
  purple: 'spotlight-halo-purple',
  orange: 'spotlight-halo-orange',
};

export function resolveBadgeGradient(intent: GradientIntent): string {
  const token = productSpotlightBadgeTokenByIntent[intent] ?? defaultBadgeToken;
  return resolveGradientToken(token);
}

export function resolveHaloGradient(intent: GradientIntent): string {
  const token = productSpotlightHaloTokenByIntent[intent] ?? defaultHaloToken;
  return resolveGradientToken(token);
}
