import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { QuoteCard, SectionHeader } from '@o-industrial/common/atomic/molecules';

import { homeContent } from '../../../../../src/marketing/home.ts';

const quoteIntents = ['purple', 'blue', 'green'] as const;

export default function AIConversationsSection(): JSX.Element {
  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6'
      class='relative overflow-hidden border-y border-white/10 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.2),_rgba(7,9,18,0)),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.15),_rgba(6,9,18,0)),linear-gradient(140deg,_rgba(9,11,22,0.95),_rgba(4,6,14,0.9))] py-24 text-center text-white'
    >
      <SectionHeader
        eyebrow='Meet Azi, your AI query assistant'
        title={(
          <span class='block text-balance leading-tight'>
            <span class='text-sm font-semibold uppercase tracking-[0.36em] text-white/55'>Plain-language answers</span>
            <span class='mt-4 block text-3xl font-semibold sm:text-4xl'>Ask once. Deploy everywhere.</span>
            <span class='mt-3 inline-block bg-gradient-to-r from-neon-blue-400 via-neon-purple-500 to-neon-green-400 bg-clip-text text-base font-medium text-transparent'>
              Governed industrial data, explained
            </span>
          </span>
        )}
        description={(
          <span class='mx-auto mt-4 block max-w-2xl text-base text-white/70'>
            Azi gives engineers direct access to live plant intelligence - no scripts, no SQL, no waiting on hand-offs. Every response stays governed and ready for dashboards, APIs, or automations.
          </span>
        )}
        align='center'
        class='relative text-center'
      />
      <div class='grid w-full gap-6 md:grid-cols-3'>
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
