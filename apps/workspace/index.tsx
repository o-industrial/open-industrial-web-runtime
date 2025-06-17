import { useMemo, useState } from 'preact/hooks';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
import { WorkspaceManager } from '@o-industrial/common/flow';
import { BreadcrumbBar } from '@o-industrial/common/atomic/molecules';
import {
  AziPanel,
  FlowPanel,
  InspectorPanel,
  SimulatorLibraryModal,
  StreamPanel,
  TimelinePanel,
  WorkspaceSettingsModal,
} from '@o-industrial/common/atomic/organisms';
import { RuntimeWorkspaceDashboardTemplate } from '@o-industrial/common/atomic/templates';

import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
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
  Data: { Workspace: initialEaC, OIAPIRoot: oiApiRoot, OIAPIToken: oiApiToken },
}: PageProps<WorkspacePageData>) {
  console.log('🌀 WorkspacePage mounted');

  const origin = location?.origin ?? 'https://server.com';
  const root = `${origin}${oiApiRoot}`;
  const oiSvc = new OpenIndustrialAPIClient(new URL(root), oiApiToken);

  const workspaceMgr = useMemo(() => {
    const mgr = new WorkspaceManager(initialEaC, oiSvc, 'workspace');
    console.log('🧩 New WorkspaceManager created');
    return mgr;
  }, []);

  const [showMarketplace, setShowMarketplace] = useState(false);
  const [showWorkspaceSettings, setShowWorkspaceSettings] = useState(false);

  // 🔁 Get reactive EaC and use it to update pathParts
  const pathParts = workspaceMgr.UseBreadcrumb();

  const modals = (
    <>
      {showMarketplace && (
        <SimulatorLibraryModal
          workspaceMgr={workspaceMgr}
          onClose={() => setShowMarketplace(false)}
        />
      )}

      {showWorkspaceSettings && (
        <WorkspaceSettingsModal
          workspaceMgr={workspaceMgr}
          onClose={() => setShowWorkspaceSettings(false)}
        />
      )}
    </>
  );

  return (
    <RuntimeWorkspaceDashboardTemplate
      azi={<AziPanel workspaceMgr={workspaceMgr} />}
      breadcrumb={
        <BreadcrumbBar
          pathParts={pathParts}
          onSettingsClick={() => setShowWorkspaceSettings(true)}
        />
      }
      inspector={<InspectorPanel workspaceMgr={workspaceMgr} />}
      stream={<StreamPanel />}
      timeline={<TimelinePanel />}
      modals={modals}
    >
      <FlowPanel
        workspaceMgr={workspaceMgr}
        onShowSimulatorLibrary={() => setShowMarketplace(true)}
      />
    </RuntimeWorkspaceDashboardTemplate>
  );
}
