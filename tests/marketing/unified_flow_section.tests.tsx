import { assertStringIncludes } from '@std/assert';
import { renderToString } from 'npm:preact-render-to-string@6.3.1';

import UnifiedFlowSection from '../../apps/components/organisms/marketing/open-industrial-home/UnifiedFlowSection.tsx';
import { homeContent } from '../../src/marketing/home.ts';

Deno.test('UnifiedFlowSection renders flow diagram content', () => {
  const html = renderToString(<UnifiedFlowSection />);

  const header = homeContent.sections.unifiedFlow;
  header.titleLines.forEach((line) => {
    assertStringIncludes(html, line.text);
  });

  homeContent.flowDiagram.inputs.slice(0, 2).forEach((input) => {
    assertStringIncludes(html, input.title);
  });
  assertStringIncludes(html, homeContent.flowDiagram.hub.title);
  homeContent.flowDiagram.outputs.slice(0, 2).forEach((output) => {
    assertStringIncludes(html, output.title);
  });
});
