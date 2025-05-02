import { useState } from 'preact/hooks';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import { Node } from 'reactflow';

import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import RuntimeWorkspaceDashboardTemplate from '../components/templates/RuntimeWorkspaceDashboardTemplate.tsx';
import FlowPanel from '../components/organisms/FlowPanel.tsx';
import InspectorPanel from '../components/organisms/InspectorPanel.tsx';
import { FlowNodeData } from '../../src/managers/FlowNodeData.ts';
import AziPanel from '../components/organisms/AziPanel.tsx';
import StreamPanel from '../components/organisms/StreamPanel.tsx';
import TimelinePanel from '../components/organisms/TimelinePanel.tsx';
import { FlowManager } from '../../src/managers/FlowManager.ts';

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
    useState<Node<FlowNodeData> | null>(null);

  const handleInspectorClose = () => {
    setSelectedNode(null);
  };

  const streamSlot = <StreamPanel />;

  const timelineSlot = <TimelinePanel />;

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
      <FlowPanel
        scope="workspace"
        presets={FlowManager.GetAvailablePresets('workspace')}
        nodeTypes={FlowManager.GetAvailableTypes('workspace')}
        handleDrop={FlowManager.HandleDrop}
        onNodeSelect={setSelectedNode}
      />
    </RuntimeWorkspaceDashboardTemplate>
  );
}
