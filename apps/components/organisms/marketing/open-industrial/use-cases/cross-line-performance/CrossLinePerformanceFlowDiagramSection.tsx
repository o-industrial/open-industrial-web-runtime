import type { JSX } from 'preact';

import HubFlowSection from '../../shared/HubFlowSection.tsx';
import { crossLinePerformanceHubFlow } from '../../../../../../../src/marketing/use-case/cross-line-performance.ts';

export default function CrossLinePerformanceFlowDiagramSection(): JSX.Element {
  return <HubFlowSection content={crossLinePerformanceHubFlow} tone='light' />;
}
