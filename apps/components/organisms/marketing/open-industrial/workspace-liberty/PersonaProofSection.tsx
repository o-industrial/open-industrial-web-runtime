import type { JSX } from 'preact';
import { useState } from 'preact/hooks';

import { SectionSurface } from '@o-industrial/atomic/atoms';
import { workspaceLibertyContent } from '../../../../../../src/marketing/liberty/index.ts';

export default function WorkspaceLibertyPersonaProofSection(): JSX.Element {
  const {
    eyebrow,
    headline,
    intro,
    personas,
    defaultPersonaId,
    note,
  } = workspaceLibertyContent.personaProof;

  const fallbackPersona = personas[0];
  const defaultId = personas.some((persona) => persona.id === defaultPersonaId)
    ? defaultPersonaId
    : fallbackPersona?.id;
  const [activePersonaId, setActivePersonaId] = useState<string>(defaultId ?? '');
  const activePersona = personas.find((persona) => persona.id === activePersonaId) ??
    fallbackPersona;
  const showToggle = personas.length > 1 && !!activePersona;

  if (!activePersona) {
    return <></>;
  }

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-20 text-white'
      class='relative overflow-hidden border-y border-white/10 bg-[#040712]'
    >
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#38bdf833,transparent_70%)] blur-[220px]'
      />

      <div class='relative z-10 space-y-4'>
        <span class='inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-neon-blue-100/80'>
          <span class='h-2 w-2 rounded-full bg-neon-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.85)]' />
          {eyebrow}
        </span>
        <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
          {headline}
        </h2>
        <p class='max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg'>
          {intro}
        </p>
      </div>

      {showToggle && (
        <div class='relative z-10 flex justify-start'>
          <div class='inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-xs text-white/70 shadow-[0_18px_55px_-30px_rgba(59,130,246,0.5)] backdrop-blur-xl'>
            {personas.map((persona) => {
              const isActive = persona.id === activePersona.id;

              return (
                <button
                  key={persona.id}
                  type='button'
                  onClick={() => setActivePersonaId(persona.id)}
                  class={`relative flex-1 rounded-full px-4 py-2 font-semibold tracking-wide transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 text-white shadow-[0_20px_60px_-30px_rgba(129,140,248,0.7)]'
                      : 'text-white/70 hover:text-white'
                  }`}
                  aria-pressed={isActive}
                >
                  {persona.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div class='relative z-10 space-y-5'>
        <div class='space-y-3 text-left'>
          <span class='inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/60'>
            <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_12px_rgba(129,140,248,0.7)]' />
            {activePersona.label}
          </span>
          <h3 class='text-xl font-semibold text-white sm:text-2xl'>
            {activePersona.headline}
          </h3>
          <p class='max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base'>
            {activePersona.description}
          </p>
        </div>
      </div>

      <ul class='relative z-10 grid gap-4 sm:grid-cols-2'>
        {activePersona.bullets.map((bullet) => (
          <li
            key={bullet}
            class='rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/80 shadow-[0_25px_90px_-80px_rgba(59,130,246,0.6)]'
          >
            {bullet}
          </li>
        ))}
      </ul>

      {note && (
        <div class='relative z-10 rounded-3xl border border-dashed border-white/20 bg-white/5 px-5 py-4 text-sm text-white/60 shadow-[0_25px_90px_-80px_rgba(236,72,153,0.4)]'>
          {note}
        </div>
      )}
    </SectionSurface>
  );
}
