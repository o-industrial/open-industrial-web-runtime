import { useEffect, useMemo, useState } from 'preact/hooks';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import { CommitStatusPanel } from '@o-industrial/common/atomic/organisms';
import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
import { WorkspaceManager } from '@o-industrial/common/flow';
import { EverythingAsCodeOIWorkspace } from '@o-industrial/common/eac';
import OICore from '@o-industrial/common/packs/oi-core';
import { IoCContainer } from '@fathym/ioc';
import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';
import { EaCUserLicense } from '@fathym/eac-licensing';

export const IsIsland = true;

type CommitStatusPageData = {
  AziCircuitUrl: string;
  AziWarmQueryCircuitUrl: string;
  AziInterfaceCircuitUrl: string;
  OIAPIRoot: string;
  OIAPIToken: string;
  OILicense?: EaCUserLicense;
  Username: string;
  Workspace: EverythingAsCodeOIWorkspace;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  CommitStatusPageData
> = {
  GET: (_req, ctx) => {
    const interfaceCircuitUrl = Deno.env.get('AZI_INTERFACE_CIRCUIT_URL') ??
      Deno.env.get('AZI_WARM_QUERY_CIRCUIT_URL');

    if (!interfaceCircuitUrl) {
      throw new Error(
        'AZI_INTERFACE_CIRCUIT_URL or AZI_WARM_QUERY_CIRCUIT_URL must be configured.',
      );
    }

    return ctx.Render({
      AziCircuitUrl: Deno.env.get('AZI_MAIN_CIRCUIT_URL')!,
      AziWarmQueryCircuitUrl: Deno.env.get('AZI_WARM_QUERY_CIRCUIT_URL')!,
      AziInterfaceCircuitUrl: interfaceCircuitUrl,
      OIAPIRoot: '/api/',
      OIAPIToken: ctx.State.OIJWT,
      OILicense: ctx.State.UserLicenses?.['o-industrial'],
      Username: ctx.State.Username,
      Workspace: ctx.State.Workspace!,
    });
  },
};

export default function CommitStatusPage({
  Data: {
    AziCircuitUrl,
    AziWarmQueryCircuitUrl,
    AziInterfaceCircuitUrl,
    OIAPIRoot,
    OIAPIToken,
    OILicense,
    Workspace,
    Username,
  },
  Params,
}: PageProps<CommitStatusPageData>) {
  const { commitId } = Params;

  const origin = location?.origin ?? 'https://server.com';
  const root = `${origin}${OIAPIRoot}`;
  const oiSvc = useMemo(
    () => new OpenIndustrialAPIClient(new URL(root), OIAPIToken),
    [],
  );

  const [workspaceMgr, setWorkspaceMgr] = useState<WorkspaceManager | null>(
    null,
  );
  const [status, setStatus] = useState<unknown>(null);

  useEffect(() => {
    (async () => {
      const ioc = new IoCContainer();
      ioc.Register(OpenIndustrialAPIClient, () => oiSvc);
      const capabilities = (await OICore.Build(ioc)).Capabilities!;

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
        undefined,
        OIAPIToken,
      );
      setWorkspaceMgr(mgr);
    })();
  }, []);

  useEffect(() => {
    if (!workspaceMgr) return;

    (async () => {
      const commits = workspaceMgr.UseCommits();
      const cs = await commits.GetCommitStatus(commitId);
      setStatus(cs);
    })();
  }, [workspaceMgr, commitId]);

  if (!status) {
    return (
      <div class='w-full h-full flex items-center justify-center'>
        Loading commit...
      </div>
    );
  }

  return (
    <div class='w-full h-full'>
      <CommitStatusPanel commit={status} />
    </div>
  );
}
