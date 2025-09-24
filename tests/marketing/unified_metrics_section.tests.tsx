import { assertStringIncludes } from '@std/assert';
import { renderToString } from 'npm:preact-render-to-string@6.3.1';

import UnifiedMetricsSection from '../../apps/components/organisms/marketing/open-industrial-home/UnifiedMetricsSection.tsx';
import { homeContent } from '../../src/marketing/home.ts';

Deno.test('UnifiedMetricsSection renders metrics', () => {
  const html = renderToString(<UnifiedMetricsSection />);

  const header = homeContent.sections.unifiedMetrics;
  header.titleLines.forEach((line) => {
    assertStringIncludes(html, line.text);
  });

  homeContent.metrics.forEach((metric) => {
    assertStringIncludes(html, metric.label);
    assertStringIncludes(html, metric.value);
  });
});
