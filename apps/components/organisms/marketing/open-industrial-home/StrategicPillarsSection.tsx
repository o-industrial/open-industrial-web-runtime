import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';

const pillars = [
  {
    title: 'Governed by design',
    description:
      'Deploy in your Azure tenant with private networking, least-privilege access, and SOC-ready logging.',
    badge: 'Governance',
    accent: 'from-neon-purple-500 via-neon-indigo-500 to-neon-cyan-400',
    glow:
      'from-[rgba(129,140,248,0.36)] via-[rgba(99,102,241,0.22)] to-transparent dark:from-[rgba(129,140,248,0.46)] dark:via-[rgba(99,102,241,0.26)] dark:to-transparent',
  },
  {
    title: 'Explainable intelligence',
    description:
      'Every answer shows its KQL so engineers can validate context before action.',
    badge: 'Explainability',
    accent: 'from-neon-indigo-600 via-neon-blue-500 to-neon-cyan-400',
    glow:
      'from-[rgba(96,165,250,0.3)] via-[rgba(34,211,238,0.2)] to-transparent dark:from-[rgba(96,165,250,0.4)] dark:via-[rgba(34,211,238,0.26)] dark:to-transparent',
  },
  {
    title: 'Activation anywhere',
    description:
      'Publish queries as APIs, dashboards, and automations with zero manual lift.',
    badge: 'Activation',
    accent: 'from-neon-cyan-400 via-neon-green-400 to-neon-green-600',
    glow:
      'from-[rgba(34,211,238,0.3)] via-[rgba(52,211,153,0.22)] to-transparent dark:from-[rgba(34,211,238,0.4)] dark:via-[rgba(52,211,153,0.28)] dark:to-transparent',
  },
] as const;

export default function StrategicPillarsSection(): JSX.Element {
  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6'
      class='relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 shadow-[0_55px_160px_-90px_rgba(15,23,42,0.7)] backdrop-blur-[18px]'
    >
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-0'
      >
        <div class='absolute left-1/2 top-[-20%] h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.28),_rgba(255,255,255,0)_78%)] blur-[160px]' />
        <div class='absolute inset-x-24 bottom-[-30%] h-[20rem] rounded-full bg-[conic-gradient(from_150deg,_rgba(34,211,238,0.22),_rgba(56,189,248,0.14),_rgba(76,29,149,0.24),_rgba(255,255,255,0))] blur-[160px]' />
      </div>

      <header class='text-center text-neutral-200'>
        <span class='text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400'>
          Three non-negotiables
        </span>
        <h2 class='mt-4 text-3xl font-semibold text-white sm:text-4xl'>
          Guardrails that make Open Industrial different
        </h2>
        <p class='mt-4 text-base text-neutral-300'>
          Each pillar keeps human oversight, governance, and activation aligned—so teams can ship confident, explainable outcomes.
        </p>
      </header>

      <div class='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {pillars.map((pillar, index) => (
          <article
            key={pillar.title}
            class='group relative flex h-full flex-col gap-4 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[rgba(13,16,29,0.92)] via-[rgba(16,21,35,0.78)] to-[rgba(8,11,23,0.88)] p-6 text-left shadow-[0_30px_110px_-80px_rgba(15,23,42,0.65)] backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_60px_150px_-90px_rgba(15,23,42,0.75)]'
          >
            <div
              aria-hidden='true'
              class={`pointer-events-none absolute -top-20 right-[-35%] h-60 w-60 rounded-full bg-gradient-to-br opacity-80 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${pillar.glow}`}
            />
            <div class='relative flex items-center justify-between text-xs uppercase tracking-[0.3em] text-neutral-300/80'>
              <span class={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-[0.7rem] font-semibold text-white shadow-lg shadow-black/20 ${pillar.accent}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span class='font-medium text-neutral-200'>{pillar.badge}</span>
            </div>
            <div class='relative space-y-2 text-white'>
              <h3 class='text-lg font-semibold'>{pillar.title}</h3>
              <p class='text-sm text-neutral-300'>{pillar.description}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionSurface>
  );
}
