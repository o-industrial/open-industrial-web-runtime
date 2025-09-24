import { assertStringIncludes } from '@std/assert';
import { renderToString } from 'npm:preact-render-to-string@6.3.1';

import IntegrationEcosystemSection from '../../apps/components/organisms/marketing/open-industrial-home/IntegrationEcosystemSection.tsx';
import { homeContent } from '../../src/marketing/home.ts';

Deno.test('IntegrationEcosystemSection renders integration columns', () => {
  const html = renderToString(<IntegrationEcosystemSection />);

  const header = homeContent.sections.integrationEcosystem;
  header.titleLines.forEach((line) => {
    assertStringIncludes(html, line.text);
  });
  if (header.kicker) {
    assertStringIncludes(html, header.kicker);
  }

  homeContent.integrationColumns.forEach((column) => {
    assertStringIncludes(html, column.title);
  });
});
