import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { ChecklistGroup, SectionHeader } from '@o-industrial/common/atomic/molecules';

import { marketingSectionContent } from '../shared/layout.ts';
import { homeContent } from '../../../../../src/marketing/home.ts';

export default function FutureVisionSection(): JSX.Element {
  const header = homeContent.sections.futureVision;

  return (
    <SectionSurface
      tone='muted'
      width='wide'
      contentClass={marketingSectionContent({ width: 'wide', padding: 'md' })}
      class='relative overflow-hidden border-y border-white/10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.14),rgba(9,11,24,0.9)),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.12),rgba(8,12,24,0.9)),linear-gradient(155deg,rgba(9,11,24,0.97),rgba(12,16,32,0.94))]'
    >
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-0 -z-10'
      >
        <div class='absolute inset-0 bg-[radial-gradient(circle,_rgba(129,140,248,0.12),_rgba(7,9,20,0.85)_70%)] dark:bg-[radial-gradient(circle,_rgba(129,140,248,0.2),_rgba(8,13,35,0)_74%)]' />
        <div class='absolute left-1/2 top-1/2 h-72 w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_160deg,_rgba(34,211,238,0.16),_rgba(236,72,153,0.12),_rgba(255,255,255,0))] blur-[140px] dark:bg-[conic-gradient(from_160deg,_rgba(96,165,250,0.24),_rgba(34,211,238,0.18),_rgba(8,13,35,0))]' />
      </div>
      <SectionHeader
        title={header.titleLines[0]?.text ?? ''}
        description={header.description}
        align={header.align ?? 'center'}
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
