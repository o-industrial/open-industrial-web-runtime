import { JSX } from 'preact';

import { Action, ActionStyleTypes, SectionSurface } from '@o-industrial/common/atomic/atoms';
import { SectionHeader } from '@o-industrial/common/atomic/molecules';

import { homeContent } from '../../../../../src/marketing/home.ts';

type Highlight = {
  title: string;
  description: string;
  badge: string;
  accent: string;
  glow: string;
};

const heroHighlights: Highlight[] = [
  {
    title: 'Governed by design',
    description:
      'Deploy in your Azure tenant with private networking, least-privilege access, and SOC-ready logging.',
    badge: 'Governance',
    accent: 'from-[#a855f7] via-[#6366f1] to-[#22d3ee]',
    glow:
      'from-[rgba(168,85,247,0.35)] via-[rgba(99,102,241,0.22)] to-transparent dark:from-[rgba(168,85,247,0.45)] dark:via-[rgba(99,102,241,0.25)] dark:to-transparent',
  },
  {
    title: 'Explainable intelligence',
    description:
      'Every answer shows its KQL so engineers can validate context before action.',
    badge: 'Explainability',
    accent: 'from-[#4f46e5] via-[#3b82f6] to-[#22d3ee]',
    glow:
      'from-[rgba(79,70,229,0.32)] via-[rgba(59,130,246,0.22)] to-transparent dark:from-[rgba(99,102,241,0.42)] dark:via-[rgba(59,130,246,0.28)] dark:to-transparent',
  },
  {
    title: 'Activation anywhere',
    description:
      'Publish queries as APIs, dashboards, and automations with zero manual lift.',
    badge: 'Activation',
    accent: 'from-[#22d3ee] via-[#34d399] to-[#16a34a]',
    glow:
      'from-[rgba(34,211,238,0.32)] via-[rgba(52,211,153,0.22)] to-transparent dark:from-[rgba(34,211,238,0.42)] dark:via-[rgba(52,211,153,0.28)] dark:to-transparent',
  },
];

function mapIntent(intent?: 'primary' | 'secondary' | 'ghost'): ActionStyleTypes {
  switch (intent) {
    case 'secondary':
      return ActionStyleTypes.Outline | ActionStyleTypes.Rounded;
    case 'ghost':
      return ActionStyleTypes.Thin | ActionStyleTypes.Link;
    case 'primary':
    default:
      return ActionStyleTypes.Solid | ActionStyleTypes.Rounded;
  }
}

export default function HeroExperienceSection(): JSX.Element {
  const primaryAction = homeContent.hero.primaryAction;
  const secondaryAction = homeContent.hero.secondaryAction;

  return (
    <section class='relative isolate'>
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10'
      />
      <SectionSurface
        tone='default'
        width='wide'
        contentClass='relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 text-center'
        class='relative overflow-hidden rounded-b-[56px] border border-white/10 bg-gradient-to-r from-[#0f1331] via-[#14183c] to-[#090c22] pb-28 shadow-[0_65px_180px_-90px_rgba(35,26,82,0.75)] backdrop-blur-[24px]'
      >
        <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
          <div class='absolute left-1/2 top-[-10%] h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.34),_rgba(255,255,255,0)_78%)] blur-[170px]' />
          <div class='absolute inset-x-24 bottom-[-30%] h-[26rem] rounded-full bg-[conic-gradient(from_130deg,_rgba(34,211,238,0.26),_rgba(56,189,248,0.18),_rgba(88,28,135,0.24),_rgba(255,255,255,0))] blur-[180px]' />
        </div>

        <div class='space-y-8'>
          <SectionHeader
            eyebrow={homeContent.hero.eyebrow}
            title={(
              <span class='block text-balance leading-tight'>
                Ask anything about your plant{' '}
                <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-emerald-400 bg-clip-text text-transparent'>
                  and get answers instantly
                </span>
              </span>
            )}
            description={(
              <span class='text-lg text-neutral-200/90'>
                {homeContent.hero.description}
              </span>
            )}
            align='center'
            class='mx-auto max-w-3xl text-center'
          />

          <div class='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center'>
            {primaryAction
              ? (
                <Action
                  href={primaryAction.href}
                  styleType={mapIntent(primaryAction.intent)}
                  target={primaryAction.external ? '_blank' : undefined}
                  rel={primaryAction.external ? 'noopener noreferrer' : undefined}
                >
                  {primaryAction.label}
                </Action>
              )
              : null}
            {secondaryAction
              ? (
                <Action
                  href={secondaryAction.href}
                  styleType={mapIntent(secondaryAction.intent)}
                  target={secondaryAction.external ? '_blank' : undefined}
                  rel={secondaryAction.external ? 'noopener noreferrer' : undefined}
                >
                  {secondaryAction.label}
                </Action>
              )
              : null}
          </div>
        </div>

        <div class='relative mt-6 grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {heroHighlights.map((item, index) => (
            <article
              key={item.title}
              class='group relative flex h-full flex-col gap-4 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[rgba(18,23,58,0.92)] via-[rgba(22,27,72,0.78)] to-[rgba(8,11,28,0.82)] p-6 text-left shadow-[0_28px_100px_-70px_rgba(39,32,86,0.65)] backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_55px_150px_-90px_rgba(66,56,135,0.75)]'
            >
              <div
                aria-hidden='true'
                class={`pointer-events-none absolute -top-20 right-[-35%] h-60 w-60 rounded-full bg-gradient-to-br opacity-80 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${item.glow}`}
              />
              <div class='relative flex items-center justify-between text-xs uppercase tracking-[0.3em] text-neutral-300/80'>
                <span class={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-[0.7rem] font-semibold text-white shadow-lg shadow-black/20 ${item.accent}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span class='font-medium text-neutral-200'>{item.badge}</span>
              </div>
              <div class='relative space-y-2 text-white'>
                <h3 class='text-lg font-semibold'>{item.title}</h3>
                <p class='text-sm text-neutral-300'>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionSurface>
    </section>
  );
}
