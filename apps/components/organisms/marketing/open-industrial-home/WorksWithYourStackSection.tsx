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
      'bg-[radial-gradient(circle,_rgba(59,130,246,0.26),rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle,_rgba(59,130,246,0.42),rgba(6,12,30,0)_80%)]',
    dot: 'bg-neon-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.75)]',
    shadow: 'shadow-[0_28px_110px_-70px_rgba(59,130,246,0.55)]',
  },
  {
    glow:
      'bg-[radial-gradient(circle,_rgba(124,58,237,0.24),rgba(255,255,255,0)_68%)] dark:bg-[radial-gradient(circle,_rgba(124,58,237,0.4),rgba(6,12,30,0)_78%)]',
    dot: 'bg-neon-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.75)]',
    shadow: 'shadow-[0_28px_110px_-70px_rgba(124,58,237,0.55)]',
  },
  {
    glow:
      'bg-[radial-gradient(circle,_rgba(236,72,153,0.22),rgba(255,255,255,0)_68%)] dark:bg-[radial-gradient(circle,_rgba(236,72,153,0.38),rgba(6,12,30,0)_78%)]',
    dot: 'bg-neon-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.75)]',
    shadow: 'shadow-[0_28px_110px_-70px_rgba(236,72,153,0.55)]',
  },
  {
    glow:
      'bg-[radial-gradient(circle,_rgba(16,185,129,0.22),rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle,_rgba(16,185,129,0.38),rgba(6,12,30,0)_80%)]',
    dot: 'bg-neon-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.75)]',
    shadow: 'shadow-[0_28px_110px_-70px_rgba(16,185,129,0.55)]',
  },
];

const itemOffsets = ['sm:-translate-y-1', 'sm:translate-y-1', 'sm:-translate-y-2', 'sm:translate-y-2'];

export default function WorksWithYourStackSection(): JSX.Element {
  const { preHeadline, headline, body, categories } = homeContent.ecosystem;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-24 text-center text-neutral-900 dark:text-white'
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
          return (
            <section
              key={category.title}
              class='group relative flex min-h-[220px] flex-col gap-5 overflow-visible px-4 py-8 sm:px-8'
            >
              <div
                aria-hidden='true'
                class={`pointer-events-none absolute -inset-12 rounded-[3rem] opacity-70 blur-[120px] transition-opacity duration-300 group-hover:opacity-90 ${accent.glow}`}
              />

              <header class='relative z-10 space-y-2'>
                <h3 class='text-xl font-semibold text-neutral-900 dark:text-white'>{category.title}</h3>
              </header>

              <div class='relative z-10 flex flex-col gap-4 text-sm text-neutral-600 dark:text-neutral-200'>
                {category.items.map((item, itemIndex) => {
                  const offset = itemOffsets[itemIndex % itemOffsets.length];
                  const align = itemIndex % 2 === 0 ? 'self-start' : 'self-end';

                  return (
                    <span
                      key={item}
                      class={`relative inline-flex items-center gap-3 self-start rounded-full bg-white/80 px-5 py-2 font-medium text-neutral-700 backdrop-blur transition-transform duration-300 ${accent.shadow} dark:bg-neutral-900/80 dark:text-neutral-100 ${align} ${offset} group-hover:translate-y-0`}
                    >
                      <span class={`h-2.5 w-2.5 rounded-full ${accent.dot}`} />
                      {item}
                    </span>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </SectionSurface>
  );
}
