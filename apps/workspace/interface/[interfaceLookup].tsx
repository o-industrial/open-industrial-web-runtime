import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { EaCApplicationsRuntimeContext } from '@fathym/eac-applications/runtime';
import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';
import {
  EaCInterfaceDetails,
  EverythingAsCodeOIWorkspace,
  InterfaceSpec,
} from '@o-industrial/common/eac';
import { EaCUserLicense } from '@fathym/eac-licensing';
import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
import { WorkspaceManager } from '@o-industrial/common/flow';
import { IoCContainer } from '@fathym/ioc';
import OICore from '@o-industrial/common/packs/oi-core';
import {
  InterfaceEditorHost,
  InterfaceEditorMode,
} from '../../../../open-industrial-reference-architecture/src/packs/oi-core/capabilities/surface-interface/InterfaceEditorHost.tsx';
import { AziPanel } from '@o-industrial/common/atomic/organisms';
import { marked } from 'npm:marked@15.0.1';

export const IsIsland = true;

type InterfaceHostPageData = {
  Workspace: EverythingAsCodeOIWorkspace;
  InterfaceLookup: string;
  InterfaceDetails: EaCInterfaceDetails;
  InterfaceSpec: InterfaceSpec;
  DefaultMode: InterfaceEditorMode;
  OIAPIRoot: string;
  OIAPIToken: string;
  OILicense?: EaCUserLicense;
  AccessRights?: string[];
  Username: string;
  AziCircuitUrl: string;
  AziWarmQueryCircuitUrl: string;
  AziInterfaceCircuitUrl: string;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  InterfaceHostPageData
> = {
  GET: (req, ctx) => {
    const { interfaceLookup } = ctx.Params;

    if (!interfaceLookup) {
      return ctx.NotFound({ Message: 'Interface lookup is required.' });
    }

    const workspace = ctx.State.Workspace;
    const interfaceEntry = workspace?.Interfaces?.[interfaceLookup];

    if (!workspace || !interfaceEntry?.Details) {
      return ctx.NotFound({ Message: `Interface '${interfaceLookup}' was not found.` });
    }

    const url = new URL(req.url);
    const modeParam = url.searchParams.get('mode') ?? undefined;
    const allowedModes: InterfaceEditorMode[] = ['overview', 'visual', 'code', 'preview'];
    const defaultMode = allowedModes.includes(modeParam as InterfaceEditorMode)
      ? (modeParam as InterfaceEditorMode)
      : 'overview';

    const spec: InterfaceSpec = interfaceEntry.Details.Spec ?? {
      Meta: {
        Name: interfaceEntry.Details.Name ?? interfaceLookup,
        Version: interfaceEntry.Details.Version ?? 1,
      },
      Imports: {},
      Data: { Providers: [], Bindings: {} },
      Layout: [],
      Actions: [],
    };

    const interfaceCircuitUrl = Deno.env.get('AZI_INTERFACE_CIRCUIT_URL') ??
      Deno.env.get('AZI_WARM_QUERY_CIRCUIT_URL');

    if (!interfaceCircuitUrl) {
      throw new Error(
        'AZI_INTERFACE_CIRCUIT_URL or AZI_WARM_QUERY_CIRCUIT_URL must be configured.',
      );
    }

    const appCtx = ctx as EaCApplicationsRuntimeContext<
      OpenIndustrialWebState,
      InterfaceHostPageData
    >;

    return ctx.Render({
      Workspace: workspace,
      InterfaceLookup: interfaceLookup,
      InterfaceDetails: interfaceEntry.Details,
      InterfaceSpec: spec,
      DefaultMode: defaultMode,
      OIAPIRoot: '/api/',
      OIAPIToken: ctx.State.OIJWT,
      OILicense: ctx.State.UserLicenses?.['o-industrial'],
      AccessRights: appCtx.Runtime.AccessRights ?? [],
      Username: ctx.State.Username,
      AziCircuitUrl: Deno.env.get('AZI_MAIN_CIRCUIT_URL')!,
      AziWarmQueryCircuitUrl: Deno.env.get('AZI_WARM_QUERY_CIRCUIT_URL')!,
      AziInterfaceCircuitUrl: interfaceCircuitUrl,
    });
  },
};

export default function InterfaceHostPage({
  Data: {
    Workspace,
    InterfaceLookup,
    InterfaceDetails,
    InterfaceSpec: initialSpec,
    DefaultMode,
    OIAPIRoot,
    OIAPIToken,
    OILicense,
    AccessRights,
    Username,
    AziCircuitUrl,
    AziWarmQueryCircuitUrl,
    AziInterfaceCircuitUrl,
  },
}: PageProps<InterfaceHostPageData>) {
  const origin = typeof location !== 'undefined' ? location.origin : 'https://server.com';
  const apiRoot = useMemo(() => new URL(`${origin}${OIAPIRoot}`), [origin, OIAPIRoot]);
  const oiSvc = useMemo(() => new OpenIndustrialAPIClient(apiRoot, OIAPIToken), [
    apiRoot,
    OIAPIToken,
  ]);

  const [workspaceMgr, setWorkspaceMgr] = useState<WorkspaceManager | null>(null);
  const [currentSpec, setCurrentSpec] = useState<InterfaceSpec>(initialSpec);
  const [initError, setInitError] = useState<string>('');

  useEffect(() => {
    setCurrentSpec(initialSpec);
  }, [initialSpec]);

  useEffect(() => {
    let disposed = false;

    (async () => {
      try {
        const ioc = new IoCContainer();
        ioc.Register(OpenIndustrialAPIClient, () => oiSvc);
        const capabilities = (await OICore.Build(ioc)).Capabilities!;

        if (disposed) return;

        const mgr = new WorkspaceManager(
          Workspace,
          Username,
          OILicense,
          oiSvc,
          capabilities,
          'workspace',
          AziCircuitUrl,
          AziWarmQueryCircuitUrl,
          AziInterfaceCircuitUrl,
          AccessRights,
          OIAPIToken,
        );

        if (!disposed) {
          setWorkspaceMgr(mgr);
        }
      } catch (err) {
        console.error('Failed to initialize interface workspace manager', err);
        if (!disposed) {
          setInitError(err instanceof Error ? err.message : String(err));
        }
      }
    })();

    return () => {
      disposed = true;
    };
  }, [
    Workspace,
    Username,
    OILicense,
    oiSvc,
    AziCircuitUrl,
    AziWarmQueryCircuitUrl,
    AziInterfaceCircuitUrl,
    AccessRights,
    OIAPIToken,
  ]);

  useEffect(() => {
    if (!workspaceMgr) return;

    const unsubscribe = workspaceMgr.EaC.OnEaCChanged(() => {
      const updated = workspaceMgr.EaC.GetEaC().Interfaces?.[InterfaceLookup]?.Details?.Spec;
      if (updated) {
        setCurrentSpec(updated);
      }
    });

    workspaceMgr.CreateInterfaceAziIfNotExist(InterfaceLookup);

    return () => {
      unsubscribe?.();
    };
  }, [workspaceMgr, InterfaceLookup]);

  const handleSpecChange = useCallback(
    (next: InterfaceSpec) => {
      setCurrentSpec(next);
      workspaceMgr?.EaC.MergePartial({
        Interfaces: {
          [InterfaceLookup]: {
            Details: { Spec: next } as Partial<EaCInterfaceDetails>,
          },
        },
      });
    },
    [workspaceMgr, InterfaceLookup],
  );

  if (initError) {
    return (
      <div class='flex h-full items-center justify-center bg-slate-950 text-slate-300'>
        <div class='max-w-md text-center'>
          <h1 class='text-lg font-semibold text-red-400'>Failed to load interface editor</h1>
          <p class='mt-3 text-sm text-slate-400'>{initError}</p>
        </div>
      </div>
    );
  }

  if (!workspaceMgr) {
    return (
      <div class='flex h-full items-center justify-center bg-slate-950 text-slate-200'>
        Loading interface editor...
      </div>
    );
  }

  const history = workspaceMgr.UseHistory();
  const activeDetails = workspaceMgr.EaC.GetEaC().Interfaces?.[InterfaceLookup]?.Details ??
    InterfaceDetails;

  return (
    <div class='flex h-full bg-slate-950 text-slate-100'>
      <main class='flex-1 overflow-auto p-6'>
        <header class='flex flex-col gap-2 border-b border-slate-800 pb-4 md:flex-row md:items-end md:justify-between'>
          <div class='space-y-2'>
            <a href='/workspace' class='text-xs text-slate-500 transition hover:text-teal-300'>
              Back to workspace
            </a>
            <div>
              <h1 class='text-2xl font-semibold text-slate-100'>
                {activeDetails.Name ?? InterfaceLookup}
              </h1>
              <p class='text-sm text-slate-400'>
                {activeDetails.Description ?? 'Interface workspace editor'}
              </p>
            </div>
            <dl class='grid grid-cols-2 gap-4 text-xs text-slate-400 md:grid-cols-4'>
              <div>
                <dt class='uppercase tracking-wide text-slate-500'>Version</dt>
                <dd class='text-lg font-semibold text-slate-100'>v{activeDetails.Version ?? 1}</dd>
              </div>
              <div>
                <dt class='uppercase tracking-wide text-slate-500'>Layout Nodes</dt>
                <dd class='text-lg font-semibold text-slate-100'>
                  {currentSpec.Layout?.length ?? 0}
                </dd>
              </div>
              <div>
                <dt class='uppercase tracking-wide text-slate-500'>Bindings</dt>
                <dd class='text-lg font-semibold text-slate-100'>
                  {Object.keys(currentSpec.Data?.Bindings ?? {}).length}
                </dd>
              </div>
              <div>
                <dt class='uppercase tracking-wide text-slate-500'>API Path</dt>
                <dd class='text-sm font-semibold text-teal-300'>
                  {activeDetails.ApiPath ?? 'Not configured'}
                </dd>
              </div>
            </dl>
          </div>

          <div class='flex flex-col items-end gap-2'>
            <div class='flex flex-wrap gap-2'>
              <button
                type='button'
                disabled={!history.canUndo}
                onClick={history.undo}
                class={`rounded-md border border-slate-700 px-3 py-1 text-sm transition ${
                  history.canUndo
                    ? 'hover:border-teal-400 hover:text-teal-300'
                    : 'opacity-40 cursor-not-allowed'
                }`}
              >
                Undo
              </button>
              <button
                type='button'
                disabled={!history.canRedo}
                onClick={history.redo}
                class={`rounded-md border border-slate-700 px-3 py-1 text-sm transition ${
                  history.canRedo
                    ? 'hover:border-teal-400 hover:text-teal-300'
                    : 'opacity-40 cursor-not-allowed'
                }`}
              >
                Redo
              </button>
              <button
                type='button'
                disabled={!history.hasChanges}
                onClick={() => history.commit()}
                class={`rounded-md bg-teal-500 px-3 py-1 text-sm font-semibold text-slate-900 transition hover:bg-teal-400 ${
                  history.hasChanges ? '' : 'opacity-50 cursor-not-allowed'
                }`}
              >
                Commit Draft
              </button>
            </div>
            <span class='text-xs text-slate-500'>
              {history.hasChanges
                ? 'Unsaved changes pending commit.'
                : 'All changes synced to workspace.'}
            </span>
          </div>
        </header>

        <section class='mt-6 h-[calc(100vh-220px)] rounded-lg border border-slate-800 bg-slate-900/60 p-4'>
          <InterfaceEditorHost
            spec={currentSpec}
            draftSpec={undefined}
            onSpecChange={handleSpecChange}
            defaultMode={DefaultMode}
          />
        </section>
      </main>

      <aside class='hidden w-full max-w-sm border-l border-slate-900/80 bg-slate-950/70 p-4 md:block'>
        {workspaceMgr.InterfaceAzis[InterfaceLookup]
          ? (
            <AziPanel
              workspaceMgr={workspaceMgr}
              aziMgr={workspaceMgr.InterfaceAzis[InterfaceLookup]!}
              renderMessage={(message) => marked.parse(message) as string}
              extraInputs={{ interfaceLookup: InterfaceLookup, spec: currentSpec }}
            />
          )
          : (
            <div class='flex h-full items-center justify-center text-sm text-slate-500'>
              Initializing Azi collaborator...
            </div>
          )}
      </aside>
    </div>
  );
}
