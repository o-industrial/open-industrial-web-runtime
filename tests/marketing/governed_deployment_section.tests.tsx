import { assertStringIncludes } from '@std/assert';
import { renderToString } from 'npm:preact-render-to-string@6.3.1';

import GovernedDeploymentSection from '../../apps/components/organisms/marketing/open-industrial-home/GovernedDeploymentSection.tsx';
import { homeContent } from '../../src/marketing/home.ts';

Deno.test('GovernedDeploymentSection renders deployment options', () => {
  const html = renderToString(<GovernedDeploymentSection />);

  const header = homeContent.sections.governedDeployment;
  header.titleLines.forEach((line) => {
    assertStringIncludes(html, line.text);
  });

  homeContent.cloudControlItems.slice(0, 3).forEach((item) => {
    assertStringIncludes(html, item.title);
  });
});
