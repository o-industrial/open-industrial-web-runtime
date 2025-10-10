import type { JSX } from 'preact';

import HubFlowSection from '../../shared/HubFlowSection.tsx';
import { assetManagementHubFlow } from '../../../../../../../src/marketing/solutions/asset-management.ts';

export default function AssetManagementFlowDiagramSection(): JSX.Element {
  return <HubFlowSection content={assetManagementHubFlow} tone='light' />;
}
