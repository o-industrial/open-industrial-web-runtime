import { assertStringIncludes } from '@std/assert';
import { renderToString } from 'npm:preact-render-to-string@6.3.1';

import ProductSpotlightSection from '../../apps/components/organisms/marketing/open-industrial-home/ProductSpotlightSection.tsx';
import { homeContent } from '../../src/marketing/home.ts';

Deno.test('ProductSpotlightSection renders header and highlights', () => {
  const html = renderToString(<ProductSpotlightSection />);

  const header = homeContent.sections.productSpotlight;
  header.titleLines.forEach((line) => {
    assertStringIncludes(html, line.text);
  });

  homeContent.productSpotlightHighlights.forEach((item) => {
    assertStringIncludes(html, item.title);
  });
});
