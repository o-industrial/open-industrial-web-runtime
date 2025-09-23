import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { QuoteCard, SectionHeader } from '@o-industrial/common/atomic/molecules';

import { homeContent } from '../../../../../src/marketing/home.ts';

const quoteIntents = ['purple', 'blue', 'green'] as const;

export default function AIConversationsSection(): JSX.Element {
  return (
    <SectionSurface
      tone='emphasis'
      width='full'
      contentClass='relative mx-auto flex w-full max-w-6xl flex-col items-center gap-14 px-0 sm:px-6'
      class='relative overflow-hidden bg-[#04050d] py-28 px-0 text-center'
    >
      <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
        <div class='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(58,46,138,0.24),_rgba(4,5,13,0.92)_68%)]' />
        <div class='absolute inset-0 bg-[linear-gradient(120deg,rgba(6,10,24,0.82)_0%,rgba(5,7,18,0.6)_45%,rgba(5,6,16,0.88)_100%)] opacity-70' />
        <div class='absolute left-[-18%] top-[18%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(147,96,247,0.32),_rgba(19,17,42,0)_78%)] blur-[200px]' />
        <div class='absolute right-[-14%] bottom-[-32%] h-[30rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(45,212,191,0.26),_rgba(10,14,34,0)_72%)] blur-[230px]' />
        <div class='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60' />
        <div class='absolute inset-x-12 bottom-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-50' />
      </div>
      <SectionHeader
        eyebrow='Meet Azi, your AI query assistant'
        title={(
          <span class='block text-balance leading-tight'>
            <span class='block text-sm font-semibold uppercase tracking-[0.42em] text-white/40'>Plain-language answers</span>
            <span class='mt-4 block text-3xl font-semibold text-white md:text-[2.4rem]'>
              Ask once. Deploy everywhere.
            </span>
            <span class='mt-3 inline-block bg-gradient-to-r from-neon-blue-400 via-neon-purple-500 to-emerald-400 bg-clip-text text-lg font-medium uppercase tracking-[0.32em] text-transparent'>
              Governed industrial data
            </span>
          </span>
        )}
        description={(
          <span class='mx-auto mt-4 block max-w-3xl text-base text-white/70'>
            Azi gives engineers direct access to live plant intelligence - no scripts, no SQL, no waiting on hand-offs. The answers stay governed and ready for dashboards, APIs, and automations.
          </span>
        )}
        align='center'
        class='relative text-center'
      />
      <div class='relative grid w-full gap-6 md:grid-cols-3'>
        {homeContent.conversationalQuotes.map((quote, index) => (
          <QuoteCard
            key={`quote-${index}`}
            quote={quote.quote}
            attribution={quote.attribution}
            role={quote.role}
            variant='dark'
            intent={quoteIntents[index % quoteIntents.length]}
            class='h-full'
          />
        ))}
      </div>
    </SectionSurface>
  );
}
