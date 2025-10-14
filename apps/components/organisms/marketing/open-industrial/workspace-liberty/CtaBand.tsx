import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';

import { workspaceLibertyContent } from '../../../../../../src/marketing/liberty/index.ts';
import { MarketingActionGroup } from '../../../../shared/marketing/MarketingActions.tsx';
import SequenceHeadline from '../../../../shared/marketing/SequenceHeadline.tsx';

export default function WorkspaceLibertyCtaBand(): JSX.Element {
  const ctaContent = workspaceLibertyContent.ctaBand;
  const {
    preheadline,
    headline,
    headlinePrefix,
    headlineSuffix,
    headlineSequence,
    subhead,
    primaryCta,
    secondaryCta,
    trustMarkers,
  } = ctaContent;
  const sequenceValues = headlineSequence?.filter(Boolean) ?? [];
  const hasSequence = sequenceValues.length > 0;

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 text-white'
      class='relative overflow-hidden border border-white/15 bg-gradient-to-br from-[#050713] via-[#0a1430] to-[#02050d] shadow-[0_180px_380px_-220px_rgba(59,130,246,0.65)]'
    >
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#3b82f633,transparent_70%)] blur-[210px]'
      />

      <div class='relative z-10 space-y-4 text-center'>
        {preheadline && (
          <span class='inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/70'>
            <span class='h-2 w-2 rounded-full bg-gradient-to-br from-neon-blue-500 via-neon-purple-500 to-neon-pink-500 shadow-[0_0_12px_rgba(129,140,248,0.7)]' />
            {preheadline}
          </span>
        )}
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
        <p class='mx-auto max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg'>
          {subhead}
        </p>
      </div>

      <MarketingActionGroup
        primary={primaryCta}
        secondary={secondaryCta}
      />

      <div class='relative z-10 grid gap-4 text-left text-sm text-white/75 sm:grid-cols-3'>
        {trustMarkers.map((marker) => (
          <div
            key={marker.title}
            class='rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_30px_100px_-90px_rgba(129,140,248,0.6)]'
          >
            <h3 class='text-base font-semibold text-white'>{marker.title}</h3>
            <p class='mt-2 text-white/70'>{marker.description}</p>
          </div>
        ))}
      </div>
    </SectionSurface>
  );
}
