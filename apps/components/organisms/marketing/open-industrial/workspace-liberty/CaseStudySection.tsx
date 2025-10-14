import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';
import { workspaceLibertyContent } from '../../../../../../src/marketing/liberty/index.ts';

export default function WorkspaceLibertyCaseStudySection(): JSX.Element {
  const { heading, problem, intervention, result, bullets, testimonialPlaceholder } =
    workspaceLibertyContent.caseStudy;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 text-white lg:flex-row lg:gap-16'
      class='relative overflow-hidden border-y border-white/10 bg-[#050a1a]'
    >
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#4464ff22,transparent_70%)] blur-[180px]'
      />

      <div class='relative z-10 flex-1 space-y-4'>
        <span class='inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-neon-blue-100/80'>
          <span class='h-2 w-2 rounded-full bg-neon-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.8)]' />
          Case Study
        </span>
        <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
          {heading}
        </h2>
        <div class='space-y-5 text-base leading-relaxed text-white/75 sm:text-lg'>
          <p class='text-white/80'>
            <strong class='font-semibold text-white'>Problem:</strong> {problem}
          </p>
          <p class='text-white/80'>
            <strong class='font-semibold text-white'>Intervention:</strong> {intervention}
          </p>
          <p class='text-white/80'>
            <strong class='font-semibold text-white'>Result:</strong> {result}
          </p>
        </div>
      </div>

      <div class='relative z-10 flex-1 space-y-6'>
        <div class='rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_35px_110px_-80px_rgba(59,130,246,0.7)]'>
          <h3 class='text-sm font-semibold uppercase tracking-[0.32em] text-white/60'>
            Outcomes
          </h3>
          <ul class='mt-4 space-y-3 text-sm text-white/80'>
            {bullets.map((bullet) => (
              <li key={bullet} class='flex items-start gap-3'>
                <span class='mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_10px_rgba(129,140,248,0.6)]' />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div class='rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-sm text-white/60 shadow-[0_30px_100px_-90px_rgba(236,72,153,0.5)]'>
          {testimonialPlaceholder}
        </div>
      </div>
    </SectionSurface>
  );
}
