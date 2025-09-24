import { assertStringIncludes } from '@std/assert';
import { renderToString } from 'npm:preact-render-to-string@6.3.1';

import SharedTruthSection from '../../apps/components/organisms/marketing/open-industrial-home/SharedTruthSection.tsx';
import { homeContent } from '../../src/marketing/home.ts';

Deno.test('SharedTruthSection renders benefit checklist', () => {
  const html = renderToString(<SharedTruthSection />);

  const header = homeContent.sections.sharedTruth;
  header.titleLines.forEach((line) => {
    assertStringIncludes(html, line.text);
  });

  homeContent.benefitsItems.slice(0, 3).forEach((item) => {
    assertStringIncludes(html, item.title);
  });
});
