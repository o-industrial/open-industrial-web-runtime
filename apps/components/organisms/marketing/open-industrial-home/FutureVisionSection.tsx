import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { ChecklistGroup, SectionHeader } from '@o-industrial/common/atomic/molecules';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function FutureVisionSection(): JSX.Element {
  return (
    <SectionSurface
      tone='muted'
      width='wide'
      contentClass='max-w-6xl'
      class='relative overflow-hidden border-y border-white/60 bg-gradient-to-br from-[#eef5ff] via-white to-[#f2f0ff] dark:border-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10'
    >
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-0 -z-10'
      >
        <div class='absolute inset-0 bg-[radial-gradient(circle,_rgba(167,139,250,0.14),_rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle,_rgba(129,140,248,0.22),_rgba(8,13,35,0)_74%)]' />
        <div class='absolute left-1/2 top-1/2 h-72 w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_160deg,_rgba(96,165,250,0.18),_rgba(52,211,153,0.12),_rgba(255,255,255,0))] blur-[140px] dark:bg-[conic-gradient(from_160deg,_rgba(56,189,248,0.26),_rgba(16,185,129,0.2),_rgba(8,13,35,0))]' />
      </div>
      <SectionHeader
        title='From insight to action'
        description='Open Industrial is evolving into a modular automation platform with adaptive agents that observe data, trigger workflows, and coordinate logic across systems.'
        align='center'
      />
      <div class='mx-auto mt-12 max-w-3xl'>
        <ChecklistGroup
          items={homeContent.futureVisionItems}
          columns={1}
          class='[&>div]:border-white/70 [&>div]:bg-white/85 [&>div]:shadow-[0_20px_70px_-60px_rgba(62,45,171,0.55)] dark:[&>div]:border-white/10 dark:[&>div]:bg-white/10'
        />
      </div>
    </SectionSurface>
  );
}

