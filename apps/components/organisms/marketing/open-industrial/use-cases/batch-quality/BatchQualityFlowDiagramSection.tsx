import type { JSX } from 'preact';

import HubFlowSection from '../../shared/HubFlowSection.tsx';
import { batchQualityHubFlow } from '../../../../../../../src/marketing/use-case/batch-quality.ts';

export default function BatchQualityFlowDiagramSection(): JSX.Element {
  return <HubFlowSection content={batchQualityHubFlow} tone='light' />;
}
