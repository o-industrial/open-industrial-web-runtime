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

function normalizeHref(href: string): string {
  if (!href) {
    return '';
  }

  if (href === '/') {
    return '/';
  }

  return href.replace(/\/+$/, '') || '/';
}

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
    const hrefs = new Set(links.map((link) => normalizeHref(link.href)));
    const groups = new Map<string, MarketingNavMegaMenuGroup>();

    for (const group of incomingGroups ?? []) {
      const triggerHref = normalizeHref(group.triggerHref);
      if (hrefs.has(triggerHref) && group.items.length) {
        groups.set(triggerHref, group);
      }
    }

    const normalizedSolutionsHref = normalizeHref(solutionsGroup.triggerHref);
    if (hrefs.has(normalizedSolutionsHref) && solutionsGroup.items.length) {
      groups.set(normalizedSolutionsHref, solutionsGroup);
    }

    if (useCasesGroup && useCasesGroup.items.length) {
      const normalizedUseCasesHref = normalizeHref(useCasesGroup.triggerHref);
      if (hrefs.has(normalizedUseCasesHref)) {
        groups.set(normalizedUseCasesHref, useCasesGroup);
      }
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
