import { assertStringIncludes } from '@std/assert';
import { renderToString } from 'npm:preact-render-to-string@6.3.1';

import StrategicPillarsSection from '../../apps/components/organisms/marketing/open-industrial-home/StrategicPillarsSection.tsx';
import { homeContent } from '../../src/marketing/home.ts';

Deno.test('StrategicPillarsSection renders strategic pillars', () => {
  const html = renderToString(<StrategicPillarsSection />);

  const header = homeContent.sections.strategicPillars;
  header.titleLines.forEach((line) => {
    assertStringIncludes(html, line.text);
  });

  homeContent.strategicPillars.forEach((pillar) => {
    assertStringIncludes(html, pillar.title);
    assertStringIncludes(html, pillar.badge);
  });
});
