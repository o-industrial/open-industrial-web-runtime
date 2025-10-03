import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';

import type { HubFlowContent } from '../../../../../../src/marketing/content.ts';

type HubFlowTone = 'light' | 'dark';

function PreHeadline({ value, tone }: { value?: string; tone: HubFlowTone }): JSX.Element | null {
  if (!value) {
    return null;
  }

  const baseClass = tone === 'dark'
    ? 'inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/70'
    : 'inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-neutral-600 dark:text-neutral-300';

  return (
    <span class={baseClass}>
      <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]' />
      {value}
    </span>
  );
}

function ColumnLabel({ value, tone }: { value: string; tone: HubFlowTone }): JSX.Element {
  const textClass = tone === 'dark'
    ? 'text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/70'
    : 'text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-300';

  return <span class={textClass}>{value}</span>;
}

function FlowDivider({ tone }: { tone: HubFlowTone }): JSX.Element {
  const gradientClass = tone === 'dark'
    ? 'bg-gradient-to-b from-white/45 via-neon-purple-300/40 to-transparent'
    : 'bg-gradient-to-b from-neon-blue-400/45 via-neon-purple-400/40 to-transparent';

  return (
    <div aria-hidden='true' class='lg:hidden flex justify-center'>
      <div class={`h-14 w-px ${gradientClass}`} />
    </div>
  );
}

function FlowHeadline({ value, tone }: { value: string; tone: HubFlowTone }): JSX.Element {
  const parts = value.split('->').map((part) => part.trim());

  if (parts.length !== 2) {
    return <>{value}</>;
  }

  const [start, end] = parts;
  const arrowCircleClass = tone === 'dark'
    ? 'mx-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-300 text-slate-900 shadow-[0_0_28px_rgba(10,216,232,0.45)]'
    : 'mx-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 via-cyan-300 to-sky-400 text-slate-900 shadow-[0_0_28px_rgba(10,216,232,0.45)] dark:text-slate-950';

  return (
    <>
      <span>{start}</span>
      <span class={arrowCircleClass}>
        <svg
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          class={`h-4 w-4 ${tone === 'dark' ? 'text-slate-900' : 'text-slate-900 dark:text-white'}`}
        >
          <path
            d='M5 12h14m0 0-5-5m5 5-5 5'
            stroke='currentColor'
            stroke-width='1.8'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
        <span class='sr-only'>to</span>
      </span>
      <span>{end}</span>
    </>
  );
}

const inputTopBarGradients = [
  'from-neon-blue-500 via-cyan-400 to-teal-400',
  'from-neon-purple-500 via-neon-blue-500 to-cyan-400',
  'from-neon-pink-500 via-neon-purple-500 to-neon-blue-500',
  'from-cyan-400 via-neon-blue-500 to-neon-purple-500',
];

const outputTopBarGradients = [
  'from-neon-pink-500 via-neon-purple-500 to-neon-blue-500',
  'from-neon-blue-500 via-cyan-400 to-neon-purple-500',
  'from-neon-purple-500 via-neon-blue-500 to-teal-400',
  'from-neon-blue-500 via-neon-pink-500 to-neon-purple-500',
];

interface HubFlowSectionProps {
  content: HubFlowContent;
  tone?: HubFlowTone;
  className?: string;
  contentClassName?: string;
}

export default function HubFlowSection({
  content,
  tone = 'light',
  className,
  contentClassName,
}: HubFlowSectionProps): JSX.Element {
  const {
    preHeadline,
    headline,
    subhead,
    inputsLabel,
    inputs,
    hub,
    outputsLabel,
    outputs,
  } = content;

  const wrapperClass = tone === 'dark'
    ? 'relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#110b23] via-[#160f33] to-[#0a0618] shadow-[0_120px_280px_-170px_rgba(129,140,248,0.55)]'
    : 'relative overflow-hidden border-y border-neutral-200/70 bg-white shadow-[0_40px_130px_-110px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-slate-950 dark:shadow-[0_55px_180px_-130px_rgba(15,23,42,0.55)]';

  const surfaceClass = className ? `${wrapperClass} ${className}` : wrapperClass;

  const baseContentClass = tone === 'dark'
    ? 'relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 text-white'
    : 'relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 text-neutral-900 dark:text-white';

  const sectionContentClass = contentClassName
    ? `${baseContentClass} ${contentClassName}`
    : baseContentClass;

  const overlayClass = tone === 'dark'
    ? 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(129,140,248,0.32),rgba(8,10,24,0)_74%)] opacity-85 blur-[160px]'
    : 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(59,130,246,0.07),rgba(255,255,255,0)_72%)] opacity-75 blur-[150px] dark:bg-[radial-gradient(circle,_rgba(59,130,246,0.18),rgba(6,12,30,0)_78%)]';

  const headerTextClass = tone === 'dark'
    ? 'relative z-10 mx-auto max-w-3xl space-y-4 text-center text-white/80'
    : 'relative z-10 mx-auto max-w-3xl space-y-4 text-center text-neutral-700 dark:text-neutral-200';

  const headlineClass = tone === 'dark'
    ? 'text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl'
    : 'text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white';

  const bodyClass = tone === 'dark' ? 'text-base sm:text-lg text-white/75' : 'text-base sm:text-lg';

  const inputCardClass = tone === 'dark'
    ? 'relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 px-6 py-6 text-left shadow-[0_40px_130px_-80px_rgba(129,140,248,0.55)] backdrop-blur-md transition-transform duration-200 hover:-translate-y-1'
    : 'relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white px-6 py-6 text-left shadow-[0_30px_110px_-70px_rgba(59,130,246,0.25)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900/80 dark:shadow-[0_40px_130px_-80px_rgba(59,130,246,0.5)]';

  const outputCardClass = tone === 'dark'
    ? 'relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 px-6 py-6 text-left shadow-[0_40px_130px_-80px_rgba(236,72,153,0.55)] backdrop-blur-md transition-transform duration-200 hover:-translate-y-1'
    : 'relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white px-6 py-6 text-left shadow-[0_30px_110px_-70px_rgba(236,72,153,0.25)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900/80 dark:shadow-[0_40px_130px_-80px_rgba(236,72,153,0.5)]';

  const chipClass = tone === 'dark'
    ? 'rounded-full bg-white/10 px-3 py-1 text-white/80'
    : 'rounded-full bg-neutral-100 px-3 py-1 text-neutral-600 dark:bg-white/10 dark:text-white';

  const cardTitleClass = tone === 'dark'
    ? 'text-lg font-semibold text-white'
    : 'text-lg font-semibold text-neutral-900 dark:text-white';

  const chipWrapClass = tone === 'dark'
    ? 'mt-3 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.14em] text-white/70'
    : 'mt-3 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-300';

  const hubListClass = tone === 'dark'
    ? 'mx-auto flex w-full max-w-sm flex-col gap-3 text-sm text-white/90'
    : 'mx-auto flex w-full max-w-sm flex-col gap-3 text-sm text-slate-800 dark:text-neutral-100';

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass={sectionContentClass}
      class={surfaceClass}
    >
      <div class={overlayClass} />

      <div class={headerTextClass}>
        <PreHeadline value={preHeadline} tone={tone} />
        <h2 class={headlineClass}>
          <FlowHeadline value={headline} tone={tone} />
        </h2>
        {subhead ? <p class={bodyClass}>{subhead}</p> : null}
      </div>

      <div class='relative z-10 flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)_minmax(0,1fr)] lg:items-center lg:gap-12'>
        <div class='flex flex-col gap-5 text-left'>
          <ColumnLabel value={inputsLabel} tone={tone} />
          <div class='grid gap-4 sm:grid-cols-2 lg:grid-cols-1'>
            {inputs.map((group, index) => (
              <article
                key={group.title}
                class={inputCardClass}
              >
                <div
                  class={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                    inputTopBarGradients[index % inputTopBarGradients.length]
                  } opacity-90`}
                />
                <h3 class={cardTitleClass}>
                  {group.title}
                </h3>
                <div class={chipWrapClass}>
                  {group.items.map((item) => (
                    <span key={item} class={chipClass}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div class='flex flex-col items-center gap-8'>
          <FlowDivider tone={tone} />

          <div class='relative flex items-center justify-center'>
            <div
              aria-hidden='true'
              class='hidden lg:block absolute left-[-7rem] top-1/2 h-px w-[5.5rem] -translate-y-1/2 bg-gradient-to-r from-transparent via-neon-blue-400/40 to-neon-purple-400/70'
            />
            <div
              aria-hidden='true'
              class='hidden lg:block absolute right-[-7rem] top-1/2 h-px w-[5.5rem] -translate-y-1/2 bg-gradient-to-r from-neon-purple-400/70 via-neon-pink-400/40 to-transparent'
            />

            <article class='relative overflow-hidden rounded-[32px] border border-neutral-200/70 bg-gradient-to-br from-[#12ffe9] via-[#0ad8ff] to-[#28f2ff] px-10 py-12 text-center shadow-[0_55px_160px_-85px_rgba(10,216,232,0.62)] backdrop-blur-sm dark:border-white/10 dark:bg-gradient-to-br dark:from-[#00a6be] dark:via-[#007a90] dark:to-[#025068] dark:shadow-[0_65px_195px_-110px_rgba(10,216,232,0.78)]'>
              <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(18,255,233,0.48),rgba(255,255,255,0)_72%)] opacity-85 blur-[150px] dark:bg-[radial-gradient(circle,_rgba(10,216,232,0.5),rgba(0,19,28,0)_76%)]' />

              <div class='relative z-10 space-y-5'>
                {hub.subtitle
                  ? (
                    <span class='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-300/35 via-cyan-300/35 to-sky-300/35 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-900 dark:text-white'>
                      {hub.subtitle}
                    </span>
                  )
                  : null}
                <h3 class='text-2xl font-semibold tracking-tight text-slate-950 dark:text-white'>
                  {hub.title}
                </h3>
                <ul class={hubListClass}>
                  {hub.bullets.map((bullet) => (
                    <li key={bullet} class='flex items-center justify-center gap-3 text-left'>
                      <span class='h-2 w-2 rounded-full bg-gradient-to-br from-teal-300 via-cyan-300 to-sky-300 shadow-[0_0_10px_rgba(10,216,232,0.7)]' />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>

          <FlowDivider tone={tone} />
        </div>

        <div class='flex flex-col gap-5 text-left'>
          <ColumnLabel value={outputsLabel} tone={tone} />
          <div class='grid gap-4 sm:grid-cols-2 lg:grid-cols-1'>
            {outputs.map((group, index) => (
              <article
                key={group.title}
                class={outputCardClass}
              >
                <div
                  class={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                    outputTopBarGradients[index % outputTopBarGradients.length]
                  } opacity-90`}
                />
                <h3 class={cardTitleClass}>
                  {group.title}
                </h3>
                <div class={chipWrapClass}>
                  {group.items.map((item) => (
                    <span key={item} class={chipClass}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionSurface>
  );
}


