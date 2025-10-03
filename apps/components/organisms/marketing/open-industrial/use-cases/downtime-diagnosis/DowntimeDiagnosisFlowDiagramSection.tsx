import type { JSX } from 'preact';

import HubFlowSection from '../../shared/HubFlowSection.tsx';
import { downtimeDiagnosisHubFlow } from '../../../../../../../../src/marketing/use-case/downtime-diagnosis.ts';

export default function DowntimeDiagnosisFlowDiagramSection(): JSX.Element {
  return <HubFlowSection content={downtimeDiagnosisHubFlow} tone='light' />;
}
