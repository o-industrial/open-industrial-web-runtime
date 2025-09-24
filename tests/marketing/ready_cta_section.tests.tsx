import { assertStringIncludes } from '@std/assert';
import { renderToString } from 'npm:preact-render-to-string@6.3.1';

import ReadyCTASection from '../../apps/components/organisms/marketing/open-industrial-home/ReadyCTASection.tsx';
import { homeContent } from '../../src/marketing/home.ts';

Deno.test('ReadyCTASection renders CTA content', () => {
  const html = renderToString(<ReadyCTASection />);

  assertStringIncludes(html, homeContent.cta.title);
  if (homeContent.cta.description) {
    assertStringIncludes(html, homeContent.cta.description);
  }

  const primary = homeContent.cta.primaryAction;
  const secondary = homeContent.cta.secondaryAction;
  if (primary) {
    assertStringIncludes(html, primary.label);
  }
  if (secondary) {
    assertStringIncludes(html, secondary.label);
  }
});
