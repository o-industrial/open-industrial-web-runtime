import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';
import { ConnectionIcon, StackIcon, WarmQueryIcon } from '@o-industrial/atomic/icons';

import { homeContent } from '../../../../../../src/marketing/home.ts';
import { workspaceLibertyContent } from '../../../../../../src/marketing/liberty/index.ts';
import SequenceHeadline from '../../../../shared/marketing/SequenceHeadline.tsx';

const stepIcons = [ConnectionIcon, WarmQueryIcon, StackIcon];

export default function WorkspaceLibertyGovernedFlowSection(): JSX.Element {
  const { steps } = homeContent.howItWorks;
  const {
    headline,
    microcopy,
    sequence,
    headlinePrefix,
    headlineSuffix,
  } = workspaceLibertyContent.governedFlow;
  const sequenceValues = sequence?.filter(Boolean) ?? [];
  const hasSequence = sequenceValues.length > 0;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 text-white'
      class='relative overflow-hidden border-y border-white/10 bg-gradient-to-br from-[#040713] via-[#090f26] to-[#02040a]'
    >
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#7c3aed33,transparent_70%)] blur-[200px]'
      />

      <div class='relative z-10 space-y-4 text-center md:text-left'>
        <span class='inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/70'>
          <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_12px_rgba(129,140,248,0.7)]' />
          {headline}
        </span>
        <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
          {hasSequence
            ? (
              <>
                {headlinePrefix
                  ? (
                    <>
                      <span>{headlinePrefix}</span>
                      {' '}
                    </>
                  )
                  : null}
                <SequenceHeadline
                  value={sequenceValues}
                  class='mx-2 text-white'
                />
                {headlineSuffix
                  ? (
                    <>
                      {' '}
                      <span>{headlineSuffix}</span>
                    </>
                  )
                  : null}
              </>
            )
            : headline}
        </h2>
        <p class='max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg'>
          {microcopy}
        </p>
      </div>

      <div class='relative z-10 grid gap-6 sm:grid-cols-3'>
        {steps.map((step, index) => {
          const Icon = stepIcons[index % stepIcons.length];

          return (
            <div
              key={step.title}
              class='group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-left shadow-[0_35px_120px_-90px_rgba(129,140,248,0.65)] backdrop-blur-md transition-transform duration-200 hover:-translate-y-1'
            >
              <div class='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 opacity-80' />
              <div class='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-blue-500/20 via-neon-purple-500/20 to-neon-pink-500/20 text-white shadow-[0_18px_40px_-20px_rgba(129,140,248,0.6)]'>
                <Icon class='h-6 w-6' />
              </div>
              <h3 class='text-lg font-semibold text-white'>{step.title}</h3>
              <p class='mt-3 text-sm leading-relaxed text-white/70'>
                {step.body}
              </p>
            </div>
          );
        })}
      </div>
    </SectionSurface>
  );
}
