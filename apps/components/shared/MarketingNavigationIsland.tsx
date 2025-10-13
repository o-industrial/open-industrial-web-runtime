import type { JSX } from 'preact';
import { useMemo } from 'preact/hooks';

import {
  MarketingNavigation,
  type MarketingNavigationProps,
  type MarketingNavMegaMenuGroup,
} from '@o-industrial/atomic/organisms';

import { solutionOverview } from '../../../src/marketing/solutions.ts';
import { useCaseOverview } from '../../../src/marketing/use-cases.ts';

export const IsIsland = true;

const solutionsMenuItems = [
  { label: 'Overview', href: '/solutions' },
  ...solutionOverview.map((solution) => ({
    label: solution.title,
    href: solution.href,
    external: solution.external,
  })),
];

const useCaseMenuItems = [
  { label: 'Overview', href: '/use-cases' },
  ...useCaseOverview.map((useCase) => ({
    label: useCase.title,
    href: useCase.href,
    external: useCase.external,
  })),
];

const solutionsGroup: MarketingNavMegaMenuGroup = {
  triggerHref: '/solutions',
  title: 'Solutions',
  items: solutionsMenuItems,
};

const useCasesGroup: MarketingNavMegaMenuGroup | null = useCaseMenuItems.length > 1
  ? {
    triggerHref: '/use-cases',
    title: 'Use Cases',
    items: useCaseMenuItems,
  }
  : null;

export default function MarketingNavigationIsland(
  props: MarketingNavigationProps,
): JSX.Element {
  const { links, megaMenuGroups: incomingGroups, ...rest } = props;

  const mergedGroups = useMemo(() => {
    const hrefs = new Set(links.map((link) => link.href));
    const groups = new Map<string, MarketingNavMegaMenuGroup>();

    for (const group of incomingGroups ?? []) {
      if (hrefs.has(group.triggerHref) && group.items.length) {
        groups.set(group.triggerHref, group);
      }
    }

    if (hrefs.has(solutionsGroup.triggerHref) && solutionsGroup.items.length) {
      groups.set(solutionsGroup.triggerHref, solutionsGroup);
    }

    if (
      useCasesGroup &&
      hrefs.has(useCasesGroup.triggerHref) &&
      useCasesGroup.items.length
    ) {
      groups.set(useCasesGroup.triggerHref, useCasesGroup);
    }

    return Array.from(groups.values());
  }, [incomingGroups, links]);

  return (
    <MarketingNavigation
      {...rest}
      links={links}
      megaMenuGroups={mergedGroups}
    />
  );
}
