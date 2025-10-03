import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';

import { homeContent } from '../../../../../../src/marketing/home.ts';

function PreHeadline({ value }: { value?: string }): JSX.Element | null {
  if (!value) {
    return null;
  }

  return (
    <span class='inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-neutral-600 dark:text-neutral-300'>
      <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_12px_rgba(129,140,248,0.55)]' />
      {value}
    </span>
  );
}

const quadrantAccents = [
  {
    glow:
      'bg-[radial-gradient(circle,_rgba(59,130,246,0.24),rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle,_rgba(59,130,246,0.42),rgba(6,12,30,0)_80%)]',
    dot: 'bg-neon-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.75)]',
    shadow: 'shadow-[0_24px_90px_-55px_rgba(59,130,246,0.55)]',
  },
  {
    glow:
      'bg-[radial-gradient(circle,_rgba(124,58,237,0.24),rgba(255,255,255,0)_68%)] dark:bg-[radial-gradient(circle,_rgba(124,58,237,0.4),rgba(6,12,30,0)_78%)]',
    dot: 'bg-neon-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.75)]',
    shadow: 'shadow-[0_24px_90px_-55px_rgba(124,58,237,0.55)]',
  },
  {
    glow:
      'bg-[radial-gradient(circle,_rgba(236,72,153,0.22),rgba(255,255,255,0)_68%)] dark:bg-[radial-gradient(circle,_rgba(236,72,153,0.38),rgba(6,12,30,0)_78%)]',
    dot: 'bg-neon-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.75)]',
    shadow: 'shadow-[0_24px_90px_-55px_rgba(236,72,153,0.55)]',
  },
  {
    glow:
      'bg-[radial-gradient(circle,_rgba(16,185,129,0.22),rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle,_rgba(16,185,129,0.38),rgba(6,12,30,0)_80%)]',
    dot: 'bg-neon-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.75)]',
    shadow: 'shadow-[0_24px_90px_-55px_rgba(16,185,129,0.55)]',
  },
];

type PolarPosition = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  centerX?: boolean;
  centerY?: boolean;
};

type QuadrantLayoutConfig = {
  radius?: number;
  innerRadius?: number;
  angleOffset?: number;
  arcSpan?: number;
  customPositions?: PolarPosition[];
};

const layoutPresets: Record<string, QuadrantLayoutConfig> = {
  Protocols: {
    radius: 32,
    angleOffset: Math.PI * 1.05,
    arcSpan: Math.PI * 0.9,
    customPositions: [
      { top: 8, left: 50, centerX: true },
      { top: 50, right: 2, centerY: true },
      { top: 50, left: 2, centerY: true },
      { bottom: 8, left: 50, centerX: true },
    ],
  },
  Middleware: {
    radius: 34,
    angleOffset: Math.PI * 0.3,
    arcSpan: Math.PI * 0.85,
    customPositions: [
      { top: 12, left: 50, centerX: true },
      { bottom: 8, left: 25, centerY: true },
      { bottom: 8, right: 25, centerY: true },
    ],
  },
  Systems: {
    radius: 40,
    innerRadius: 30,
    angleOffset: Math.PI * 1.2,
    arcSpan: Math.PI,
    customPositions: [
      { top: 50, left: 2, centerY: true },
      { top: 12, left: 25 },
      { top: 12, right: 25 },
      { top: 50, right: 2, centerY: true },
      { bottom: 8, left: 25 },
      { bottom: 8, right: 25 },
    ],
  },
  Apps: {
    radius: 34,
    angleOffset: Math.PI * 0.4,
    arcSpan: Math.PI * 0.9,
    customPositions: [
      { top: 8, left: 8 },
      { top: 8, right: 8 },
      { bottom: 8, left: 8 },
      { bottom: 8, right: 8 },
    ],
  },
};

const quadrantAngleOffsets = [Math.PI * 0.85, Math.PI * 0.15, Math.PI * 1.15, Math.PI * 0.35];

function computePositions(
  totalItems: number,
  categoryIndex: number,
  layout: QuadrantLayoutConfig,
): PolarPosition[] {
  if (totalItems === 0) {
    return [];
  }

  if (layout.customPositions && layout.customPositions.length) {
    return layout.customPositions.slice(0, totalItems).map((position) => {
      const normalized: PolarPosition = {};

      if (typeof position.top === 'number') {
        normalized.top = Math.max(8, Math.min(92, position.top));
      }

      if (typeof position.bottom === 'number') {
        normalized.bottom = Math.max(8, Math.min(92, position.bottom));
      }

      if (typeof position.left === 'number') {
        normalized.left = Math.max(8, Math.min(92, position.left));
      }

      if (typeof position.right === 'number') {
        normalized.right = Math.max(8, Math.min(92, position.right));
      }

      if (position.centerX) {
        normalized.centerX = true;
      }

      if (position.centerY) {
        normalized.centerY = true;
      }

      return normalized;
    });
  }

  const defaultRadius = (() => {
    if (totalItems <= 2) {
      return 24;
    }

    if (totalItems === 3) {
      return 28;
    }

    if (totalItems === 4) {
      return 32;
    }

    if (totalItems <= 6) {
      return 36;
    }

    return 40;
  })();

  const outerRadius = layout.radius ?? defaultRadius;
  const innerRadius = layout.innerRadius ?? Math.max(outerRadius - 8, 24);
  const angleOffset = layout.angleOffset ??
    quadrantAngleOffsets[categoryIndex % quadrantAngleOffsets.length];
  const arcSpan = layout.arcSpan ?? (totalItems > 4 ? Math.PI * 1.05 : Math.PI * 0.8);

  const useDualRing = totalItems > 4;
  const outerCount = useDualRing ? Math.ceil(totalItems / 2) : totalItems;
  const innerCount = useDualRing ? totalItems - outerCount : 0;

  const positions: PolarPosition[] = [];

  const addRingPositions = (count: number, radius: number, offsetAdjustment = 0) => {
    if (count <= 0) {
      return;
    }

    const startAngle = angleOffset - arcSpan / 2;
    const step = count > 1 ? arcSpan / (count - 1) : 0;

    for (let index = 0; index < count; index++) {
      const angle = startAngle + step * index + offsetAdjustment;
      let top = 50 + Math.sin(angle) * radius;
      let left = 50 + Math.cos(angle) * radius;

      // Keep within safe bounds to avoid clipping while feeling free-form.
      top = Math.max(12, Math.min(88, top));
      left = Math.max(12, Math.min(88, left));

      positions.push({ top, left });
    }
  };

  addRingPositions(outerCount, outerRadius);

  if (useDualRing) {
    // Offset the inner ring slightly so chips interleave rather than stack.
    addRingPositions(innerCount, innerRadius, arcSpan / (outerCount + innerCount));
  }

  return positions;
}

export default function WorksWithYourStackSection(): JSX.Element {
  const { preHeadline, headline, body, categories } = homeContent.ecosystem;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 text-center text-neutral-900 dark:text-white'
      class='relative overflow-hidden border-y border-neutral-200/70 bg-white shadow-[0_45px_150px_-120px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-slate-950 dark:shadow-[0_60px_200px_-140px_rgba(15,23,42,0.55)]'
    >
      <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(129,140,248,0.08),rgba(255,255,255,0)_72%)] opacity-75 blur-[150px] dark:bg-[radial-gradient(circle,_rgba(139,92,246,0.24),rgba(6,10,25,0)_78%)]' />

      <div class='relative z-10 mx-auto max-w-3xl space-y-4 text-neutral-700 dark:text-neutral-200'>
        <PreHeadline value={preHeadline} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {headline}
        </h2>
        <p class='text-base sm:text-lg'>{body}</p>
      </div>
      <div class='relative z-10 grid gap-10 text-left sm:grid-cols-2'>
        {categories.map((category, categoryIndex) => {
          const accent = quadrantAccents[categoryIndex % quadrantAccents.length];
          const layout = layoutPresets[category.title] ?? {};
          const positions = computePositions(
            category.items.length,
            categoryIndex,
            layout,
          );
          return (
            <section
              key={category.title}
              class='group relative flex flex-col gap-4 overflow-visible rounded-[2.5rem] px-3 pb-4 pt-6 sm:px-6'
            >
              <div
                aria-hidden='true'
                class={`pointer-events-none absolute -inset-10 rounded-[3rem] opacity-70 blur-[120px] transition-opacity duration-300 group-hover:opacity-95 ${accent.glow}`}
              />

              <header class='relative z-10 flex justify-center sm:hidden'>
                <span class='inline-flex items-center gap-3 rounded-full border border-white/40 bg-gradient-to-r from-white/95 via-white/80 to-white/70 px-5 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-neutral-900 shadow-[0_0_22px_rgba(129,140,248,0.4)] backdrop-blur dark:border-white/15 dark:bg-gradient-to-r dark:from-slate-950/90 dark:via-slate-950/85 dark:to-slate-900/75 dark:text-white'>
                  <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_10px_rgba(129,140,248,0.6)]' />
                  {category.title}
                </span>
              </header>

              <div class='relative z-10 hidden h-[260px] w-full sm:block'>
                <div class='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center'>
                  <div class='absolute -inset-12 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.18),rgba(255,255,255,0)_78%)] opacity-75 blur-[90px] dark:bg-[radial-gradient(circle,_rgba(88,28,135,0.32),rgba(6,10,25,0)_80%)]' />
                  <h3 class='relative inline-flex items-center gap-3 rounded-full border border-white/45 bg-gradient-to-r from-white/96 via-white/90 to-white/70 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.34em] text-neutral-900 shadow-[0_0_35px_rgba(129,140,248,0.48)] backdrop-blur dark:border-white/20 dark:bg-gradient-to-r dark:from-slate-950/95 dark:via-slate-950/90 dark:to-slate-900/80 dark:text-white dark:shadow-[0_0_42px_rgba(129,140,248,0.55)]'>
                    <span class='h-2.5 w-2.5 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_12px_rgba(129,140,248,0.65)]' />
                    {category.title}
                  </h3>
                </div>
                {category.items.map((item, itemIndex) => {
                  const coordinates = positions[itemIndex];
                  const styleParts: string[] = [];
                  const transforms: string[] = [];

                  if (typeof coordinates.top === 'number') {
                    styleParts.push(`top:${coordinates.top}%`);
                  }

                  if (typeof coordinates.bottom === 'number') {
                    styleParts.push(`bottom:${coordinates.bottom}%`);
                  }

                  if (typeof coordinates.left === 'number') {
                    styleParts.push(`left:${coordinates.left}%`);
                  }

                  if (typeof coordinates.right === 'number') {
                    styleParts.push(`right:${coordinates.right}%`);
                  }

                  if (coordinates.centerX) {
                    transforms.push('translateX(-50%)');
                  }

                  if (coordinates.centerY) {
                    transforms.push('translateY(-50%)');
                  }

                  if (transforms.length) {
                    styleParts.push(`transform:${transforms.join(' ')}`);
                  }

                  const style = styleParts.join(';');

                  return (
                    <span
                      key={item}
                      style={style}
                      class={`absolute inline-flex translate-y-0 items-center gap-3 rounded-full border border-white/35 bg-gradient-to-r from-white/95 via-white/85 to-white/75 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-[0_0_25px_rgba(59,130,246,0.25)] backdrop-blur transition-all duration-300 hover:scale-[1.03] whitespace-nowrap dark:border-white/15 dark:bg-gradient-to-r dark:from-slate-950/90 dark:via-slate-950/80 dark:to-slate-900/75 dark:text-white ${accent.shadow}`}
                    >
                      <span class={`h-2.5 w-2.5 rounded-full ${accent.dot}`} />
                      {item}
                    </span>
                  );
                })}
              </div>

              <div class='relative z-10 flex flex-col gap-3 text-sm text-neutral-700 sm:hidden dark:text-neutral-200'>
                {category.items.map((item) => (
                  <span
                    key={item}
                    class={`inline-flex items-center gap-3 self-center rounded-full border border-white/35 bg-gradient-to-r from-white/95 via-white/80 to-white/70 px-4 py-2 font-semibold text-neutral-900 shadow-[0_0_18px_rgba(59,130,246,0.22)] backdrop-blur whitespace-nowrap dark:border-white/15 dark:bg-gradient-to-r dark:from-slate-950/90 dark:via-slate-950/80 dark:to-slate-900/70 dark:text-white ${accent.shadow}`}
                  >
                    <span class={`h-2.5 w-2.5 rounded-full ${accent.dot}`} />
                    {item}
                  </span>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </SectionSurface>
  );
}

