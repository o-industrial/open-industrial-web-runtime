import { useEffect, useMemo, useState } from 'preact/hooks';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';

import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import RuntimeWorkspaceDashboardTemplate from '../components/templates/RuntimeWorkspaceDashboardTemplate.tsx';
import FlowPanel from '../components/organisms/FlowPanel.tsx';
import InspectorPanel from '../components/organisms/InspectorPanel.tsx';
import AziPanel from '../components/organisms/AziPanel.tsx';
import StreamPanel from '../components/organisms/StreamPanel.tsx';
import TimelinePanel from '../components/organisms/TimelinePanel.tsx';
import { WorkspaceManager } from '../../src/flow/managers/WorkspaceManager.ts';
import { SimulatorLibraryModal } from '../components/organisms/SimulatorLibraryModal.tsx';
import { OpenIndustrialEaC } from '../../src/types/OpenIndustrialEaC.ts';

export const IsIsland = true;

type WorkspacePageData = {
  OIAPIRoot: string;

  OIAPIToken: string;

  Workspace: OpenIndustrialEaC;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  WorkspacePageData
> = {
  GET: (_req, ctx) => {
    return ctx.Render({
      OIAPIRoot: '/api/',
      OIAPIToken: ctx.State.OIJWT,
      Workspace: ctx.State.Workspace!,
    });
  },
};

export default function WorkspacePage({
  Data: { Workspace: EaC, OIAPIRoot: oiApiRoot, OIAPIToken: oiApiToken },
}: PageProps<WorkspacePageData>) {
  console.log('🌀 WorkspacePage mounted');

  const workspaceMgr = useMemo(() => {
    const mgr = new WorkspaceManager({}, 'workspace');
    console.log('🧩 New FlowManager created');
    return mgr;
  }, []);

  const [showMarketplace, setShowMarketplace] = useState(false);

  useEffect(() => {
    if (EaC) {
      console.log('📥 Merging partial EaC:', EaC);
      workspaceMgr.EaC.MergePartial(EaC);
    }
  }, [EaC]);

  const modals = (
    <>
      {showMarketplace && (
        <SimulatorLibraryModal
          workspaceMgr={workspaceMgr}
          onClose={() => setShowMarketplace(false)}
        />
      )}
    </>
  );

  return (
    <RuntimeWorkspaceDashboardTemplate
      azi={<AziPanel workspaceMgr={workspaceMgr} />}
      breadcrumb={
        <div class='-:w-full -:text-xs -:text-neutral-400 -:bg-neutral-900 -:tracking-wide -:font-light -:px-4 -:pt-1.5 -:pb-1'>
          {EaC.Details?.Name} (Workspace) / <span class='-:text-white'>Management</span>
        </div>
      }
      inspector={<InspectorPanel workspaceMgr={workspaceMgr} />}
      stream={<StreamPanel />}
      timeline={<TimelinePanel />}
      modals={modals}
    >
      <FlowPanel
        oiApiRoot={oiApiRoot}
        oiApiToken={oiApiToken}
        workspaceMgr={workspaceMgr}
        onShowSimulatorLibrary={() => setShowMarketplace(true)}
      />
    </RuntimeWorkspaceDashboardTemplate>
  );
}
