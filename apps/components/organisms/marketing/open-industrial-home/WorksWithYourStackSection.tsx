import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

import { homeContent } from '../../../../../src/marketing/home.ts';

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

const layoutPresets: Record<string, { top?: string; left?: string; right?: string }[]> = {
  Protocols: [
    { top: '6%', left: '6%' },
    { top: '30%', left: '34%' },
    { top: '58%', left: '10%' },
    { top: '72%', left: '36%' },
  ],
  Middleware: [
    { top: '12%', left: '40%' },
    { top: '42%', right: '12%' },
    { top: '68%', left: '52%' },
  ],
  Systems: [
    { top: '4%', left: '8%' },
    { top: '22%', left: '34%' },
    { top: '40%', left: '12%' },
    { top: '56%', left: '38%' },
    { top: '70%', left: '10%' },
    { top: '80%', left: '32%' },
  ],
  Apps: [
    { top: '8%', right: '30%' },
    { top: '32%', right: '8%' },
    { top: '58%', right: '36%' },
    { top: '74%', right: '10%' },
  ],
};

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
          const layout = layoutPresets[category.title] ?? [];
          return (
            <section
              key={category.title}
              class='group relative flex flex-col gap-4 overflow-visible rounded-[2.5rem] px-3 pb-4 pt-6 sm:px-6'
            >
              <div
                aria-hidden='true'
                class={`pointer-events-none absolute -inset-10 rounded-[3rem] opacity-70 blur-[120px] transition-opacity duration-300 group-hover:opacity-95 ${accent.glow}`}
              />

              <header class='relative z-10 space-y-2 text-center'>
                <h3 class='text-xl font-semibold text-neutral-900 dark:text-white'>{category.title}</h3>
              </header>

              <div class='relative z-10 hidden h-[240px] w-full sm:block'>
                {category.items.map((item, itemIndex) => {
                  const coordinates = layout[itemIndex] ?? {};
                  const top = coordinates.top ?? `${8 + itemIndex * 18}%`;
                  const left = coordinates.left;
                  const right = coordinates.right;
                  const fallbackHorizontal = categoryIndex % 2 === 0 ? 'left:12%' : 'right:12%';

                  const style = [
                    `top:${top}`,
                    left ? `left:${left}` : undefined,
                    right ? `right:${right}` : undefined,
                    !left && !right ? fallbackHorizontal : undefined,
                  ]
                    .filter(Boolean)
                    .join(';');

                  return (
                    <span
                      key={item}
                      style={style}
                      class={`absolute inline-flex translate-y-0 items-center gap-3 rounded-full border border-white/10 bg-neutral-900/70 px-4 py-2 text-sm font-medium text-neutral-100 backdrop-blur transition-all duration-300 hover:scale-[1.02] ${accent.shadow}`}
                    >
                      <span class={`h-2.5 w-2.5 rounded-full ${accent.dot}`} />
                      {item}
                    </span>
                  );
                })}
              </div>

              <div class='relative z-10 flex flex-col gap-3 text-sm text-neutral-600 sm:hidden dark:text-neutral-200'>
                {category.items.map((item) => (
                  <span
                    key={item}
                    class={`inline-flex items-center gap-3 self-start rounded-full border border-white/10 bg-neutral-900/70 px-4 py-2 font-medium text-neutral-100 ${accent.shadow}`}
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
