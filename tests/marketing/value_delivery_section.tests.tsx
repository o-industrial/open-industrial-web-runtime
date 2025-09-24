import { assertStringIncludes } from '@std/assert';
import { renderToString } from 'npm:preact-render-to-string@6.3.1';

import ValueDeliverySection from '../../apps/components/organisms/marketing/open-industrial-home/ValueDeliverySection.tsx';
import { homeContent } from '../../src/marketing/home.ts';

Deno.test('ValueDeliverySection renders feature grid', () => {
  const html = renderToString(<ValueDeliverySection />);

  const header = homeContent.sections.valueDelivery;
  header.titleLines.forEach((line) => {
    assertStringIncludes(html, line.text);
  });

  homeContent.featureGridItems.slice(0, 3).forEach((item) => {
    assertStringIncludes(html, item.title);
  });
});
