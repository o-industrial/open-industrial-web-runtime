import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';

import { governedCollaborationContent } from '../../../../../../src/marketing/liberty/governed-collaboration.ts';

const INTENT_GRADIENTS: Record<string, string> = {
  emerald:
    'bg-gradient-to-br from-emerald-500/25 via-emerald-400/20 to-emerald-600/35 shadow-[0_28px_120px_-85px_rgba(16,185,129,0.55)]',
  gold:
    'bg-gradient-to-br from-amber-400/30 via-amber-300/20 to-amber-500/35 shadow-[0_28px_120px_-85px_rgba(251,191,36,0.6)]',
  blue:
    'bg-gradient-to-br from-sky-500/25 via-blue-500/20 to-indigo-600/35 shadow-[0_28px_120px_-85px_rgba(59,130,246,0.6)]',
  rose:
    'bg-gradient-to-br from-rose-500/25 via-pink-500/20 to-fuchsia-600/35 shadow-[0_28px_120px_-85px_rgba(236,72,153,0.6)]',
};

export default function GovernedCollaborationGuardrailsSection(): JSX.Element {
  const { headline, intro, stories, checklist } = governedCollaborationContent.guardrails;

  return (
    <SectionSurface
      tone='muted'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 text-white'
      class='relative overflow-hidden border-y border-white/10 bg-[#040814]'
    >
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(59,130,246,0.24),transparent_68%)] blur-[200px]'
      />

      <div class='relative z-10 space-y-4'>
        <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
          {headline}
        </h2>
        <p class='max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg'>
          {intro}
        </p>
      </div>

      <div class='relative z-10 grid gap-6 lg:grid-cols-3'>
        {stories.map((story) => (
          <article
            key={story.id}
            class='flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left text-white/80 shadow-[0_28px_120px_-95px_rgba(59,130,246,0.65)] backdrop-blur'
          >
            <header class='space-y-3 text-white'>
              <span class='inline-flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white/60'>
                <span class='h-2 w-2 rounded-full bg-neon-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.9)]' />
                {story.title}
              </span>
              <p class='text-sm leading-relaxed text-white/75'>
                {story.summary}
              </p>
            </header>
            <div class='rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white'>
              <p class='text-xs uppercase tracking-[0.32em] text-white/60'>
                Field Story
              </p>
              <p class='mt-2 text-white/85'>
                {story.scenario}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div class='relative z-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 shadow-[0_28px_120px_-95px_rgba(236,72,153,0.55)]'>
        <div class='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h3 class='text-lg font-semibold text-white sm:text-xl'>
              Guardrail Activation Checklist
            </h3>
            <p class='text-sm text-white/70'>
              Track the operational guardrails that make governed collaboration repeatable.
            </p>
          </div>
        </div>
        <ul class='mt-6 grid gap-3 lg:grid-cols-2'>
          {checklist.map((item) => {
            const gradient = item.intent ? INTENT_GRADIENTS[item.intent] : undefined;

            return (
              <li
                key={item.title}
                class={`rounded-2xl border border-white/10 p-5 text-sm leading-relaxed ${
                  gradient ? `${gradient} text-white` : 'bg-white/5 text-white/80'
                }`}
              >
                <p class='font-semibold'>{item.title}</p>
                {item.description && (
                  <p class='mt-1 text-sm opacity-80'>
                    {item.description}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </SectionSurface>
  );
}
