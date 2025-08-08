import { useEffect, useMemo, useState } from 'preact/hooks';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
import { WorkspaceManager } from '@o-industrial/common/flow';
import {
  AppFrameBar,
  BreadcrumbBar,
  MenuActionItem,
  MenuRoot,
} from '@o-industrial/common/atomic/molecules';
import {
  AccountProfileModal,
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
import { marked } from 'npm:marked@15.0.1';
import { EverythingAsCodeOIWorkspace } from '@o-industrial/common/eac';
import { IoCContainer } from '@fathym/ioc';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

type WorkspacePageData = {
  OIAPIRoot: string;
  OIAPIToken: string;
  Workspace: EverythingAsCodeOIWorkspace;
};

// Icons — reuse your existing set; add a couple of lucide fallbacks where needed
const I = {
  // existing
  save: 'https://api.iconify.design/lucide:save.svg',
  fork: 'https://api.iconify.design/lucide:git-fork.svg',
  archive: 'https://api.iconify.design/lucide:archive.svg',
  export: 'https://api.iconify.design/lucide:download.svg',
  eye: 'https://api.iconify.design/lucide:eye.svg',
  check: 'https://api.iconify.design/lucide:check.svg',

  // from your icon map
  settings: 'https://api.iconify.design/lucide:settings.svg',
  users: 'https://api.iconify.design/lucide:users.svg',
  link: 'https://api.iconify.design/mdi:link-variant.svg',
  lock: 'https://api.iconify.design/lucide:lock.svg',
  warmQuery: 'https://api.iconify.design/mdi:sql-query.svg',
  stack: 'https://api.iconify.design/lucide:layers-3.svg',
  dollar: 'https://api.iconify.design/lucide:dollar-sign.svg',

  // sensible additions (lucide)
  cloud: 'https://api.iconify.design/lucide:cloud.svg',
  cloudAttach: 'https://api.iconify.design/lucide:cloud-upload.svg',
  privateCloud: 'https://api.iconify.design/lucide:server.svg',
  license: 'https://api.iconify.design/lucide:badge-check.svg',
  creditCard: 'https://api.iconify.design/lucide:credit-card.svg',
} as const;

const runtimeMenus: MenuRoot[] = [
  // // ===== File (unchanged example) =====
  // {
  //   id: 'file',
  //   label: 'File',
  //   items: [
  //     {
  //       type: 'submenu',
  //       id: 'file.new',
  //       label: 'New',
  //       items: [
  //         { type: 'item', id: 'file.new.workspace', label: 'Workspace', iconSrc: I.archive },
  //         { type: 'item', id: 'file.new.surface', label: 'Surface', iconSrc: I.archive },
  //       ],
  //     },
  //     { type: 'item', id: 'file.save', label: 'Save', shortcut: '⌘S', iconSrc: I.save },
  //     { type: 'item', id: 'file.fork', label: 'Fork Workspace', iconSrc: I.fork },
  //     { type: 'separator', id: 'file.sep1' },
  //     {
  //       type: 'submenu',
  //       id: 'file.export',
  //       label: 'Export',
  //       items: [
  //         { type: 'item', id: 'file.export.json', label: 'Export JSON', iconSrc: I.export, payload: { format: 'json' } },
  //         { type: 'item', id: 'file.export.png', label: 'Export PNG', iconSrc: I.export, payload: { format: 'png' } },
  //       ],
  //     },
  //   ],
  // },

  // ===== View (unchanged example) =====
  // {
  //   id: 'view',
  //   label: 'View',
  //   items: [
  //     {
  //       type: 'submenu',
  //       id: 'view.panels',
  //       label: 'Panels',
  //       items: [
  //         {
  //           type: 'item',
  //           id: 'view.toggle.azi',
  //           label: 'Azi',
  //           iconSrc: I.eye,
  //           checked: true,
  //         },
  //         {
  //           type: 'item',
  //           id: 'view.toggle.inspector',
  //           label: 'Inspector',
  //           iconSrc: I.eye,
  //           checked: true,
  //         },
  //         {
  //           type: 'item',
  //           id: 'view.toggle.stream',
  //           label: 'Stream',
  //           iconSrc: I.eye,
  //           checked: true,
  //         },
  //         {
  //           type: 'item',
  //           id: 'view.toggle.timeline',
  //           label: 'Timeline',
  //           iconSrc: I.eye,
  //           checked: true,
  //         },
  //       ],
  //     },
  //     { type: 'item', id: 'view.fullscreen', label: 'Enter Fullscreen' },
  //     { type: 'item', id: 'view.reset', label: 'Reset Layout' },
  //   ],
  // },

  // ===== Workspace =====
  {
    id: 'workspace',
    label: 'Workspace',
    items: [
      {
        type: 'item',
        id: 'workspace.settings',
        label: 'Settings',
        iconSrc: I.settings,
      },
      {
        type: 'item',
        id: 'workspace.team',
        label: 'Team Members',
        iconSrc: I.users,
      },
      {
        type: 'item',
        id: 'workspace.viewAll',
        label: 'View All…',
        iconSrc: I.stack,
        payload: { target: 'workspace-index' },
      },
    ],
  },

  // ===== Environment =====
  {
    id: 'environment',
    label: 'Environment',
    items: [
      {
        type: 'item',
        id: 'env.secrets',
        label: 'Manage Secrets',
        iconSrc: I.lock,
      },
      {
        type: 'item',
        id: 'env.connections',
        label: 'External Connections',
        iconSrc: I.link,
      },
      {
        type: 'submenu',
        id: 'env.cloud',
        label: 'Cloud',
        iconSrc: I.cloud,
        items: [
          {
            type: 'item',
            id: 'env.cloud.attachManaged',
            label: 'Attach Managed Cloud',
            iconSrc: I.cloudAttach,
          },
          {
            type: 'item',
            id: 'env.cloud.addPrivate',
            label: 'Add Private Cloud',
            iconSrc: I.privateCloud,
          },
        ],
      },
    ],
  },

  // ===== APIs =====
  {
    id: 'apis',
    label: 'APIs',
    items: [
      {
        type: 'item',
        id: 'apis.dataSuite',
        label: 'Data API Suite',
        iconSrc: I.stack,
        payload: { section: 'data' },
      },
      {
        type: 'item',
        id: 'apis.warmQuery',
        label: 'Warm Query Management',
        iconSrc: I.warmQuery,
      },
    ],
  },

  // ===== Billing =====
  {
    id: 'billing',
    label: 'Billing',
    items: [
      {
        type: 'item',
        id: 'billing.license',
        label: 'Current License',
        iconSrc: I.license,
      },
      {
        type: 'item',
        id: 'billing.details',
        label: 'Billing Details',
        iconSrc: I.creditCard /* or I.dollar */,
      },
    ],
  },
];

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

        const mgr = new WorkspaceManager(
          initialEaC,
          oiSvc,
          capabilities,
          'workspace',
          aziCircuit,
          oiApiToken
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

  const [showMarketplace, setShowMarketplace] = useState(false);
  const [showAccountProfile, setShowAccountProfile] = useState(false);
  const [showWorkspaceSettings, setShowWorkspaceSettings] = useState(false);

  const modals = (
    <>
      {showMarketplace && (
        <SimulatorLibraryModal
          workspaceMgr={workspaceMgr}
          onClose={() => setShowMarketplace(false)}
        />
      )}

      {showAccountProfile && (
        <AccountProfileModal
          workspaceMgr={workspaceMgr}
          onClose={() => setShowAccountProfile(false)}
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

  const handleMenu = (item: MenuActionItem) => {
    console.log('menu', item);

    switch (item.id) {
      case 'workspace.settings': {
        setShowWorkspaceSettings(true);
        break;
      }
    }
  };

  return (
    <RuntimeWorkspaceDashboardTemplate
      appBar={
        <AppFrameBar
          menus={runtimeMenus}
          onMenuOption={handleMenu}
          onProfileClick={() => setShowAccountProfile(true)}
          onSettingsClick={() => setShowWorkspaceSettings(true)}
        />
      }
      azi={
        <AziPanel
          workspaceMgr={workspaceMgr}
          renderMessage={(msg) => marked.parse(msg) as string}
        />
      }
      breadcrumb={
        <BreadcrumbBar
          pathParts={pathParts}
          // onSettingsClick={() => setShowWorkspaceSettings(true)}
        />
      }
      inspector={<InspectorPanel workspaceMgr={workspaceMgr} />}
      stream={<StreamPanel workspaceMgr={workspaceMgr} />}
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
