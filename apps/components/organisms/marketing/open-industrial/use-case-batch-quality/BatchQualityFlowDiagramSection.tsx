import { JSX } from 'preact';

import { FlowDiagramSection } from '@o-industrial/common/atomic/organisms';

import { batchQualityIntegrationDiagram } from '../../../../../../src/marketing/use-case-batch-quality.ts';

export default function BatchQualityFlowDiagramSection(): JSX.Element {
  return (
    <FlowDiagramSection
      header={{
        eyebrow: 'System blueprint',
        title: 'One governed hub, many industrial endpoints',
        description:
          'Ingest batch telemetry, quality results, and deviations into Open Industrial, then publish explainable outputs across teams and tools.',
        align: 'center',
      }}
      content={batchQualityIntegrationDiagram}
      class='bg-gradient-to-b from-[#060918] via-[#0c1028] to-[#060918] py-24'
    />
  );
}
