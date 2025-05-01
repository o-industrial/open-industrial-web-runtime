import { useState } from 'preact/hooks';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import { Node } from 'reactflow';

import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import RuntimeWorkspaceDashboardTemplate from '../components/templates/RuntimeWorkspaceDashboardTemplate.tsx';
import WorkspacePanel from '../components/organisms/WorkspacePanel.tsx';
import InspectorPanel from '../components/organisms/InspectorPanel.tsx';
import { WorkspaceNodeData } from '../../src/managers/WorkspaceNodeData.ts';
import AziPanel from '../components/organisms/AziPanel.tsx';

export const IsIsland = true;

type WorkspacePageData = {
  workspaceName?: string;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  WorkspacePageData
> = {
  GET: (_req, ctx) => {
    return ctx.Render({
      workspaceName: 'hello-azi',
    });
  },
};

export default function WorkspacePage({ Data }: PageProps<WorkspacePageData>) {
  const [selectedNode, setSelectedNode] =
    useState<Node<WorkspaceNodeData> | null>(null);

  const handleInspectorClose = () => {
    setSelectedNode(null);
  };

  const streamSlot = (
    <>
      <h3 class="text-sm font-semibold text-neutral-400 mb-2 uppercase tracking-wide">
        Live Stream
      </h3>
      <div class="text-neutral-500 text-xs">
        [Streamed impulses will appear here]
      </div>
    </>
  );

  const timelineSlot = (
    <div class="text-neutral-500 text-xs text-center">
      [Execution Loop Timeline coming soon]
    </div>
  );

  const inspectorSlot = (
    <InspectorPanel
      selectedNode={selectedNode}
      onClose={handleInspectorClose}
    />
  );

  const aziSlot = <AziPanel />;

  return (
    <RuntimeWorkspaceDashboardTemplate
      azi={aziSlot}
      breadcrumb={
        <div class="-:w-full -:text-xs -:text-neutral-400 -:bg-neutral-900 -:tracking-wide -:font-light -:px-4 -:pt-1.5 -:pb-1">
          hello-azi (Workspace) / <span class="-:text-white">Management</span>
        </div>
      }
      inspector={inspectorSlot}
      stream={streamSlot}
      timeline={timelineSlot}
    >
      <WorkspacePanel onNodeSelect={setSelectedNode} />
    </RuntimeWorkspaceDashboardTemplate>
  );
}
