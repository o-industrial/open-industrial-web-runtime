import { assertStringIncludes } from '@std/assert';
import { renderToString } from 'npm:preact-render-to-string@6.3.1';

import AIConversationsSection from '../../apps/components/organisms/marketing/open-industrial-home/AIConversationsSection.tsx';
import { homeContent } from '../../src/marketing/home.ts';

Deno.test('AIConversationsSection renders quotes', () => {
  const html = renderToString(<AIConversationsSection />);

  const header = homeContent.sections.aiConversations;
  header.titleLines.forEach((line) => {
    assertStringIncludes(html, line.text);
  });

  homeContent.conversationalQuotes.forEach((quote) => {
    assertStringIncludes(html, quote.quote);
  });
});
