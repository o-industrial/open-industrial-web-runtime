import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { SectionHeader } from '@o-industrial/common/atomic/molecules';

export default function UseCaseHeroSection(): JSX.Element {
  return (
    <SectionSurface
      tone='default'
      class='bg-gradient-to-br from-[#070a1e] via-[#111536] to-[#050716] py-24 text-white shadow-[0_70px_200px_-90px_rgba(10,16,42,0.85)]'
    >
      <div class='mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 text-center'>
        <span class='inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70'>
          Use Cases
        </span>
        <SectionHeader
          title='Explore industrial intelligence in action'
          description='Dive into curated stories that show how Open Industrial unlocks governed insights across batch quality, maintenance, and production performance.'
          align='center'
        />
      </div>
    </SectionSurface>
  );
}
