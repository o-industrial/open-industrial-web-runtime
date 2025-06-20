import { useEffect, useMemo, useState } from 'preact/hooks';
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
import OICore from '@o-industrial/common/packs/oi-core';

import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import { OpenIndustrialEaC } from '../../src/types/OpenIndustrialEaC.ts';
import { IoCContainer } from '@fathym/ioc';

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
  const origin = location?.origin ?? 'https://server.com';
  const root = `${origin}${oiApiRoot}`;
  const oiSvc = useMemo(
    () => new OpenIndustrialAPIClient(new URL(root), oiApiToken),
    []
  );

  const [workspaceMgr, setWorkspaceMgr] = useState<WorkspaceManager | null>(
    null
  );
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [showWorkspaceSettings, setShowWorkspaceSettings] = useState(false);

  // ⏬ Load capabilities pack from dynamic endpoint
  useEffect(() => {
    (async () => {
      try {
        // const capsResp = await oiSvc.Workspaces.LoadCapabilities();

        // const mod = await import(await capsResp.text());

        // const pack = mod.default?.Build?.() ?? mod.Build?.();
        // const capabilities = pack?.Capabilities;

        // if (!capabilities) throw new Error('No capabilities found in loaded pack');

        const ioc = new IoCContainer();

        ioc.Register(OpenIndustrialAPIClient, () => oiSvc);

        const capabilities = (await OICore.Build(ioc)).Capabilities!;

        const mgr = new WorkspaceManager(
          initialEaC,
          oiSvc,
          capabilities,
          'workspace'
        );
        setWorkspaceMgr(mgr);
        console.log('🔌 Capabilities loaded and WorkspaceManager initialized');
      } catch (err) {
        console.error('❌ Failed to load capabilities pack', err);
      }
    })();
  }, []);

  if (!workspaceMgr) return <div>Loading workspace...</div>;

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
