import type { JSX } from 'preact';

import HubFlowSection from '../shared/HubFlowSection.tsx';
import { homeContent } from '../../../../../../src/marketing/home.ts';

export default function UnifiedFlowSection(): JSX.Element {
  return <HubFlowSection content={homeContent.unifiedHub} />;
}
