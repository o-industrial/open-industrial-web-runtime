import { JSX } from 'preact';
import { useCallback } from 'preact/hooks';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { QuoteCard, SectionHeader } from '@o-industrial/common/atomic/molecules';

import { AIConversationsBackdrop } from '../shared/backgrounds.tsx';
import { marketingSectionContent } from '../shared/layout.ts';
import { trackQuoteInteraction } from '../../../../../src/marketing/analytics.ts';
import { homeContent } from '../../../../../src/marketing/home.ts';

const quoteIntents = ['purple', 'blue', 'green'] as const;
const loggedQuoteInteractions = new Set<string>();

export default function AIConversationsSection(): JSX.Element {
  const header = homeContent.sections.aiConversations;

  const handleQuoteInteraction = useCallback(
    (quote: string, index: number, intent: string, action: 'hover' | 'focus') => {
      const key = `${index}-${action}`;
      if (loggedQuoteInteractions.has(key)) {
        return;
      }

      loggedQuoteInteractions.add(key);
      trackQuoteInteraction(quote, index, intent, action);
    },
    [],
  );

  return (
    <SectionSurface
      tone='default'
      width='wide'
      contentClass={marketingSectionContent({
        width: 'wide',
        padding: 'md',
        center: true,
        extra: 'flex flex-col items-center gap-12',
      })}
      class='relative overflow-hidden border-y border-white/10 py-24 text-center text-white'
    >
      <AIConversationsBackdrop />
      <SectionHeader
        eyebrow={header.eyebrow}
        title={
          <span class='block text-balance leading-tight'>
            {header.strapline
              ? (
                <span class='text-sm font-semibold uppercase tracking-[0.36em] text-white/55'>
                  {header.strapline}
                </span>
              )
              : null}
            {header.titleLines.map((line, index) => (
              <span
                key={'ai-title-' + index + '-' + line.text}
                class={'mt-4 block text-3xl font-semibold sm:text-4xl ' +
                  (line.highlight
                    ? 'bg-gradient-to-r from-neon-blue-400 via-neon-purple-500 to-neon-green-400 bg-clip-text text-transparent'
                    : 'text-white')}
              >
                {line.text}
              </span>
            ))}
            {header.kicker
              ? (
                <span class='mt-3 inline-block bg-gradient-to-r from-neon-blue-400 via-neon-purple-500 to-neon-green-400 bg-clip-text text-base font-medium text-transparent'>
                  {header.kicker}
                </span>
              )
              : null}
          </span>
        }
        description={header.description
          ? (
            <span class='mx-auto mt-4 block max-w-2xl text-base text-white/70'>
              {header.description}
            </span>
          )
          : undefined}
        align={header.align ?? 'center'}
        class='relative text-center'
      />
      <div class='grid w-full gap-6 md:grid-cols-3'>
        {homeContent.conversationalQuotes.map((quote, index) => {
          const intent = quoteIntents[index % quoteIntents.length];

          return (
            <div
              key={`quote-${index}`}
              tabIndex={0}
              onMouseEnter={() => handleQuoteInteraction(quote.quote, index, intent, 'hover')}
              onFocus={() => handleQuoteInteraction(quote.quote, index, intent, 'focus')}
            >
              <QuoteCard
                quote={quote.quote}
                attribution={quote.attribution}
                role={quote.role}
                variant='dark'
                intent={intent}
                class='h-full'
              />
            </div>
          );
        })}
      </div>
    </SectionSurface>
  );
}
