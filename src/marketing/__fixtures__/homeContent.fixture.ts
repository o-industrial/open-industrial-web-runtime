import type { HomeContent } from '../home.ts';
import { homeContent } from '../home.ts';

// Provides a stable snapshot of the marketing home page content for tests,
// stories, and local prototyping without importing the full runtime module tree.
export const homeContentFixture: HomeContent = homeContent;

export const minimalHomeContentFixture: HomeContent = {
  ...homeContent,
  hero: {
    ...homeContent.hero,
    headline: {
      ...homeContent.hero.headline,
      leading: 'Ask anything about your plant',
    },
  },
  cta: {
    ...homeContent.cta,
    primaryAction: homeContent.cta.primaryAction,
    secondaryAction: homeContent.cta.secondaryAction,
  },
};
