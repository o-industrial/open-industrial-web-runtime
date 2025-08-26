import { useEffect, useMemo, useState } from 'preact/hooks';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
import { WorkspaceManager } from '@o-industrial/common/flow';
import { AppFrameBar, BreadcrumbBar } from '@o-industrial/common/atomic/molecules';
import {
  AziPanel,
  CommitStatusPanel,
  FlowPanel,
  InspectorPanel,
  StreamPanel,
  TimelinePanel,
} from '@o-industrial/common/atomic/organisms';
import { RuntimeWorkspaceDashboardTemplate } from '@o-industrial/common/atomic/templates';
import OICore from '@o-industrial/common/packs/oi-core';
import { marked } from 'npm:marked@15.0.1';
import { EverythingAsCodeOIWorkspace } from '@o-industrial/common/eac';
import { IoCContainer } from '@fathym/ioc';
import { EverythingAsCode } from '@fathym/eac';
import { EaCUserLicense, EverythingAsCodeLicensing } from '@fathym/eac-licensing';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

type WorkspacePageData = {
  ParentEaC: EverythingAsCode & EverythingAsCodeLicensing;
  OIAPIRoot: string;
  OIAPIToken: string;
  OILicense?: EaCUserLicense;
  Username: string;
  Workspace: EverythingAsCodeOIWorkspace;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  WorkspacePageData
> = {
  GET: (_req, ctx) => {
    return ctx.Render({
      ParentEaC: ctx.Runtime.EaC,
      OIAPIRoot: '/api/',
      OIAPIToken: ctx.State.OIJWT,
      OILicense: ctx.State.UserLicenses?.['o-industrial'],
      Username: ctx.State.Username,
      Workspace: ctx.State.Workspace!,
    });
  },
};

export default function WorkspacePage({
  Data: {
    Workspace: initialEaC,
    OIAPIRoot: oiApiRoot,
    OIAPIToken: oiApiToken,
    OILicense: oiLicense,
    ParentEaC,
    Username,
  },
}: PageProps<WorkspacePageData>) {
  const origin = location?.origin ?? 'https://server.com';
  const root = `${origin}${oiApiRoot}`;
  const oiSvc = useMemo(
    () => new OpenIndustrialAPIClient(new URL(root), oiApiToken),
    [],
  );

  const [workspaceMgr, setWorkspaceMgr] = useState<WorkspaceManager | null>(
    null,
  );

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

        const aziCircuit = '/api/synaptic/circuits/azi';
        const aziWarmQueryCircuit = '/api/synaptic/circuits/event-logs';

        const mgr = new WorkspaceManager(
          initialEaC,
          Username,
          oiLicense,
          oiSvc,
          capabilities,
          'workspace',
          aziCircuit,
          aziWarmQueryCircuit,
          oiApiToken,
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

  const {
    commits,
    badgeState,
    showCommitPanel,
    toggleCommitPanel,
    selectedCommitId,
    selectCommit,
  } = workspaceMgr.UseCommits();

  const {
    handleMenu,
    modals,
    showSimLib,
    showAccProf,
    showLicense,
    runtimeMenus,
  } = workspaceMgr.UseAppMenu(ParentEaC);

  const history = workspaceMgr.UseHistory();

  const onActivateClick = oiLicense ? undefined : () => showLicense();

  const onDeployClick = oiLicense
    ? async () => {
      await history.deploy();
    }
    : undefined;

  return (
    <RuntimeWorkspaceDashboardTemplate
      // commitFlyover
      appBar={
        <AppFrameBar
          hasWorkspaceChanges={history.hasChanges}
          menus={runtimeMenus}
          commitBadgeState={badgeState}
          onMenuOption={handleMenu}
          onActivateClick={onActivateClick}
          onCommitClick={toggleCommitPanel}
          onDeployClick={onDeployClick}
          onProfileClick={() => showAccProf()}
          // onSettingsClick={() => showWkspSets()}
        />
      }
      azi={
        <AziPanel
          workspaceMgr={workspaceMgr}
          renderMessage={(msg) => marked.parse(msg) as string}
          aziMgr={workspaceMgr.Azi}
        />
      }
      breadcrumb={
        <BreadcrumbBar
          pathParts={pathParts}
          // onSettingsClick={() => setShowWorkspaceSettings(true)}
        />
      }
      commitStatus={showCommitPanel
        ? (
          <CommitStatusPanel
            commits={commits}
            selectedCommitId={selectedCommitId ?? undefined}
            onSelectCommit={selectCommit}
            onClose={toggleCommitPanel}
          />
        )
        : undefined}
      inspector={<InspectorPanel workspaceMgr={workspaceMgr} />}
      stream={<StreamPanel workspaceMgr={workspaceMgr} />}
      timeline={<TimelinePanel />}
      modals={modals}
    >
      <FlowPanel
        workspaceMgr={workspaceMgr}
        onShowSimulatorLibrary={() => showSimLib()}
      />
    </RuntimeWorkspaceDashboardTemplate>
  );
}
