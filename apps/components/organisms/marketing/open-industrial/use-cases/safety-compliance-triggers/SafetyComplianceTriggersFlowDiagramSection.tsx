import type { JSX } from 'preact';

import HubFlowSection from '../../shared/HubFlowSection.tsx';
import { safetyComplianceTriggersHubFlow } from '../../../../../../../src/marketing/use-case/safety-compliance-triggers.ts';

export default function SafetyComplianceTriggersFlowDiagramSection(): JSX.Element {
  return <HubFlowSection content={safetyComplianceTriggersHubFlow} tone='light' />;
}
