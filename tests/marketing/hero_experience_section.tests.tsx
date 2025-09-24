import { assertStringIncludes } from '@std/assert';
import { renderToString } from 'npm:preact-render-to-string@6.3.1';

import HeroExperienceSection from '../../apps/components/organisms/marketing/open-industrial-home/HeroExperienceSection.tsx';
import { homeContent } from '../../src/marketing/home.ts';

Deno.test('HeroExperienceSection renders headline content', () => {
  const html = renderToString(<HeroExperienceSection />);

  assertStringIncludes(html, homeContent.hero.headline.leading);

  if (homeContent.hero.headline.highlight) {
    assertStringIncludes(html, homeContent.hero.headline.highlight);
  }

  if (homeContent.hero.headline.trailing) {
    assertStringIncludes(html, homeContent.hero.headline.trailing);
  }
});
