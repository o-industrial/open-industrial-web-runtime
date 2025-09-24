import { assertStringIncludes } from '@std/assert';
import { renderToString } from 'npm:preact-render-to-string@6.3.1';

import GovernedFlowSection from '../../apps/components/organisms/marketing/open-industrial-home/GovernedFlowSection.tsx';
import { homeContent } from '../../src/marketing/home.ts';

Deno.test('GovernedFlowSection renders steps', () => {
  const html = renderToString(<GovernedFlowSection />);

  const header = homeContent.sections.governedFlow;
  header.titleLines.forEach((line) => {
    assertStringIncludes(html, line.text);
  });

  homeContent.howItWorksSteps.forEach((step) => {
    assertStringIncludes(html, step.title);
  });
});
