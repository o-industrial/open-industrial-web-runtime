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
      class='relative overflow-hidden border border-white/10 bg-gradient-to-br from-[#050914] via-[#0b1228] to-[#060916] py-24 shadow-[0_120px_280px_-180px_rgba(59,130,246,0.55)]'
    />
  );
}
