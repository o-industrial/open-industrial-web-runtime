import { useState } from 'preact/hooks';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';

import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import RuntimeWorkspaceDashboardTemplate from '../components/templates/RuntimeWorkspaceDashboardTemplate.tsx';
import WorkspacePanel from '../components/organisms/WorkspacePanel.tsx';

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
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

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

  const proposalSlot = selectedNodeId ? (
    <div class="space-y-4">
      <h3 class="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
        Node Inspector
      </h3>

      <div class="text-sm text-neutral-200">
        Selected Node ID:{' '}
        <span class="font-mono text-neon-blue-300">{selectedNodeId}</span>
      </div>

      <div class="text-xs text-neutral-500 italic">
        (Node data panel coming soon…)
      </div>
    </div>
  ) : (
    <>
      <h3 class="text-sm font-semibold text-neutral-400 mb-2 uppercase tracking-wide">
        Azi’s Understanding
      </h3>
      <div class="text-neutral-500 text-xs">
        [Schema preview and prompts will appear here]
      </div>
    </>
  );

  const centerPanel = <WorkspacePanel onNodeSelect={setSelectedNodeId} />;
  
  return (
    <RuntimeWorkspaceDashboardTemplate
      stream={streamSlot}
      proposal={proposalSlot}
      timeline={timelineSlot}
    >
      {centerPanel}
    </RuntimeWorkspaceDashboardTemplate>
  );
}
