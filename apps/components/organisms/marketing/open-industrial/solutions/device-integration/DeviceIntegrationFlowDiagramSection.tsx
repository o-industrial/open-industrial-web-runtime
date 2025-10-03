import type { JSX } from 'preact';

import HubFlowSection from '../../shared/HubFlowSection.tsx';
import { deviceIntegrationHubFlow } from '../../../../../../../src/marketing/solutions/device-integration.ts';

export default function DeviceIntegrationFlowDiagramSection(): JSX.Element {
  return <HubFlowSection content={deviceIntegrationHubFlow} tone='light' />;
}
