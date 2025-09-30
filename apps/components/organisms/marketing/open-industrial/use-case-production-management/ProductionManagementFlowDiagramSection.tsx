import type { JSX } from 'preact';

import HubFlowSection from '../shared/HubFlowSection.tsx';
import { productionManagementHubFlow } from '../../../../../../src/marketing/use-case-production-management.ts';

export default function ProductionManagementFlowDiagramSection(): JSX.Element {
  return <HubFlowSection content={productionManagementHubFlow} tone='light' />;
}
