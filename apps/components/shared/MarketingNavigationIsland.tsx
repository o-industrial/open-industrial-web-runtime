import type { JSX } from 'preact';

import type { MarketingNavigationProps } from '@o-industrial/common/atomic/organisms';
import { MarketingNavigation as BaseMarketingNavigation } from '@o-industrial/common/atomic/organisms';

export const IsIsland = true;

export default function MarketingNavigationIsland(
  props: MarketingNavigationProps,
): JSX.Element {
  return <BaseMarketingNavigation {...props} />;
}