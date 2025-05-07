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
import { SimulatorLibraryModal } from '../components/organisms/modals/SimulatorLibraryModal.tsx';
import { OpenIndustrialEaC } from '../../src/types/OpenIndustrialEaC.ts';
import BreadcrumbBar from '../components/molecules/BreadcrumbBar.tsx';
import { WorkspaceSettingsModal } from '../components/organisms/modals/WorkspaceSettingsModal.tsx';
import { OpenIndustrialAPIClient } from '@o-industrial/common/api';

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

  const origin = location?.origin ?? 'https://server.com';

  const root = `${origin}${oiApiRoot}`;
  const oiSvc = new OpenIndustrialAPIClient(new URL(root), oiApiToken);

  const workspaceMgr = useMemo(() => {
    const mgr = new WorkspaceManager({}, oiSvc, 'workspace');
    console.log('🧩 New FlowManager created');
    return mgr;
  }, []);

  const [showMarketplace, setShowMarketplace] = useState(false);
  const [showWorkspaceSettings, setShowWorkspaceSettings] = useState(false);

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
          pathParts={[EaC.Details!.Name!, 'Workspace']}
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
