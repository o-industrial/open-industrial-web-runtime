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
import { EaCApplicationsRuntimeContext } from '@fathym/eac-applications/runtime';

export const IsIsland = true;

type WorkspacePageData = {
  ParentEaC: EverythingAsCode & EverythingAsCodeLicensing;
  OIAPIRoot: string;
  OIAPIToken: string;
  OILicense?: EaCUserLicense;
  AccessRights?: string[];
  DeployAccessRight?: string;
  Username: string;
  Workspace: EverythingAsCodeOIWorkspace;
  AziCircuitUrl: string;
  AziWarmQueryCircuitUrl: string;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  WorkspacePageData
> = {
  GET: (_req, ctx) => {
    const appCtx = ctx as EaCApplicationsRuntimeContext<
      OpenIndustrialWebState,
      WorkspacePageData
    >;

    return ctx.Render({
      ParentEaC: ctx.Runtime.EaC,
      OIAPIRoot: '/api/',
      OIAPIToken: ctx.State.OIJWT,
      OILicense: ctx.State.UserLicenses?.['o-industrial'],
      AccessRights: appCtx.Runtime.AccessRights ?? [],
      DeployAccessRight: Deno.env.get('DEPLOY_ACCESS_RIGHT_LOOKUP') || 'Workspace.Deploy',
      Username: ctx.State.Username,
      Workspace: ctx.State.Workspace!,
      AziCircuitUrl: Deno.env.get('AZI_MAIN_CIRCUIT_URL')!,
      AziWarmQueryCircuitUrl: Deno.env.get('AZI_WARM_QUERY_CIRCUIT_URL')!,
    });
  },
};

export default function WorkspacePage({
  Data: {
    Workspace: initialEaC,
    OIAPIRoot: oiApiRoot,
    OIAPIToken: oiApiToken,
    OILicense: oiLicense,
    AccessRights: accessRights,
    DeployAccessRight: deployRightLookup,
    ParentEaC,
    Username,
    AziCircuitUrl: aziUrl,
    AziWarmQueryCircuitUrl: aziWarmQueryUrl,
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

        const mgr = new WorkspaceManager(
          initialEaC,
          Username,
          oiLicense,
          oiSvc,
          capabilities,
          'workspace',
          aziUrl,
          aziWarmQueryUrl,
          undefined,
          accessRights,
          oiApiToken,
        );

        setWorkspaceMgr(mgr);
        console.log('🔌 Capabilities loaded and WorkspaceManager initialized');
      } catch (err) {
        console.error('❌ Failed to load capabilities pack', err);
      }
    })();
  }, []);

  useEffect(() => {
    if (!workspaceMgr) return;

    const registry = (globalThis as unknown as {
      OIInterface?: {
        onAction?: (
          handler: (
            detail: {
              action?: { type: string; payload?: unknown; lookup?: string; workspace?: string };
              element?: Element;
            },
          ) => void,
        ) => (() => void) | void;
      };
    }).OIInterface;
    if (!registry?.onAction) return;

    const unsubscribe = registry.onAction((detail) => {
      if (!detail || typeof detail !== 'object') return;
      const action = (detail as {
        action?: { type: string; payload?: unknown; lookup?: string; workspace?: string };
      }).action;
      if (!action || typeof action.type !== 'string') return;

      const lookup = action.lookup || '';
      if (lookup) {
        workspaceMgr.CreateInterfaceAziIfNotExist?.(lookup);
      }

      const payload = {
        lookup,
        type: action.type,
        payload: action.payload,
        workspace: action.workspace,
      };

      try {
        (workspaceMgr as unknown as { DispatchInterfaceAction?: (value: typeof payload) => void })
          .DispatchInterfaceAction?.(payload);
      } catch (err) {
        console.warn('[WorkspacePage] Failed to dispatch interface action', err);
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [workspaceMgr]);

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

  // Determine deploy capability based on a specific access right if configured; otherwise fallback to license
  const canDeploy = deployRightLookup
    ? accessRights?.includes(deployRightLookup) ?? false
    : !!oiLicense;

  const onActivateClick = canDeploy ? undefined : () => showLicense();

  const onDeployClick = canDeploy
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
          isDeploying={history.isDeploying}
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
