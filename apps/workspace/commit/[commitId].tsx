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

export const IsIsland = true;

type CommitStatusPageData = {
  OIAPIRoot: string;
  OIAPIToken: string;
  Workspace: EverythingAsCodeOIWorkspace;
  AziCircuitUrl: string;
  AziWarmQueryCircuitUrl: string;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  CommitStatusPageData
> = {
  GET: (_req, ctx) => {
    return ctx.Render({
      OIAPIRoot: '/api/',
      OIAPIToken: ctx.State.OIJWT,
      Workspace: ctx.State.Workspace!,
      AziCircuitUrl: Deno.env.get('AZI_MAIN_CIRCUIT_URL')!,
      AziWarmQueryCircuitUrl: Deno.env.get('AZI_WARM_QUERY_CIRCUIT_URL')!,
    });
  },
};

export default function CommitStatusPage({
  Data: { OIAPIRoot, OIAPIToken, Workspace, AziCircuitUrl, AziWarmQueryCircuitUrl },
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
        oiSvc,
        capabilities,
        'workspace',
        AziCircuitUrl,
        AziWarmQueryCircuitUrl,
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
    return <div class='w-full h-full flex items-center justify-center'>Loading commit...</div>;
  }

  return (
    <div class='w-full h-full'>
      <CommitStatusPanel commit={status} />
    </div>
  );
}
