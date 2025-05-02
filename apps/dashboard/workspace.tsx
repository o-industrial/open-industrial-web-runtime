import { useMemo, useEffect, useState } from 'preact/hooks';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';

import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import RuntimeWorkspaceDashboardTemplate from '../components/templates/RuntimeWorkspaceDashboardTemplate.tsx';
import FlowPanel from '../components/organisms/FlowPanel.tsx';
import InspectorPanel from '../components/organisms/InspectorPanel.tsx';
import AziPanel from '../components/organisms/AziPanel.tsx';
import StreamPanel from '../components/organisms/StreamPanel.tsx';
import TimelinePanel from '../components/organisms/TimelinePanel.tsx';
import { FlowManager } from '../../src/flow/FlowManager.ts';
import { FlowNodeData } from '../../src/flow/FlowNodeData.ts';
import { Node } from 'reactflow';

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

export default function WorkspacePage({}: PageProps<WorkspacePageData>) {
  const flowMgr = useMemo(() => new FlowManager('workspace'), []);

  const [selectedNode, setSelectedNode] = useState<Node<FlowNodeData> | null>(
    flowMgr.Selection.GetSelectedNodes(flowMgr.Graph.GetNodes())[0] ?? null
  );

  useEffect(() => {
    const update = () => {
      const node = flowMgr.Selection.GetSelectedNodes(flowMgr.Graph.GetNodes())[0] ?? null;
      setSelectedNode(node);
    };

    flowMgr.Selection.OnSelectionChanged(update);
    return () => flowMgr.Selection.OffSelectionChanged(update);
  }, [flowMgr]);

  return (
    <RuntimeWorkspaceDashboardTemplate
      azi={<AziPanel />}
      breadcrumb={
        <div class="-:w-full -:text-xs -:text-neutral-400 -:bg-neutral-900 -:tracking-wide -:font-light -:px-4 -:pt-1.5 -:pb-1">
          hello-azi (Workspace) / <span class="-:text-white">Management</span>
        </div>
      }
      inspector={
        <InspectorPanel
          selectedNode={selectedNode}
          onClose={() => flowMgr.Selection.ClearSelection()}
        />
      }
      stream={<StreamPanel />}
      timeline={<TimelinePanel />}
    >
      <FlowPanel flowMgr={flowMgr} />
    </RuntimeWorkspaceDashboardTemplate>
  );
}
