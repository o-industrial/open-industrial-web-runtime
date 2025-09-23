import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { QuoteCard, SectionHeader } from '@o-industrial/common/atomic/molecules';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function AIConversationsSection(): JSX.Element {
  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass='max-w-7xl'
      class='relative overflow-hidden border-y border-white/60 bg-gradient-to-br from-white via-[#f6f3ff] to-white dark:border-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10'
    >
      <div aria-hidden='true' class='pointer-events-none absolute inset-x-0 top-16 mx-auto h-72 w-[34rem] rounded-full bg-[radial-gradient(circle,_rgba(96,165,250,0.2),_rgba(255,255,255,0)_70%)] blur-3xl dark:bg-[radial-gradient(circle,_rgba(96,165,250,0.3),_rgba(255,255,255,0)_70%)]' />
      <div class='relative space-y-12'>
        <SectionHeader
          eyebrow='Meet Azi, your AI query assistant'
          title={(
            <span class='block text-balance leading-tight'>
              <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-emerald-400 bg-clip-text text-transparent'>
                Plain-language answers
              </span>
              <span class='mt-2 block text-neutral-900 dark:text-white'>
                From governed industrial data
              </span>
            </span>
          )}
          description='Azi gives engineers direct access to live plant insights. No scripts, no SQL, no waiting on IT or vendor support.'
          align='center'
        />
        <div class='grid gap-6 md:grid-cols-3'>
          {homeContent.conversationalQuotes.map((quote, index) => (
            <QuoteCard
              key={`quote-${index}`}
              quote={quote.quote}
              attribution={quote.attribution}
              role={quote.role}
            />
          ))}
        </div>
      </div>
    </SectionSurface>
  );
}

