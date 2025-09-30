import type { JSX } from 'preact';

import HubFlowSection from '../shared/HubFlowSection.tsx';
import { qualityManagementHubFlow } from '../../../../../../src/marketing/use-case-quality-management.ts';

export default function QualityManagementFlowDiagramSection(): JSX.Element {
  return <HubFlowSection content={qualityManagementHubFlow} tone='light' />;
}
