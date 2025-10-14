import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { loadJwtConfig } from '@fathym/common';
import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';
import { EaCApplicationsRuntimeContext } from 'jsr:@fathym/eac-applications/runtime';

type DeleteWorkspaceReq = {
  WorkspaceLookup?: string;
  Lookup?: string;
};

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  async POST(req, ctx) {
    try {
      const ct = (req.headers.get('content-type') || '').toLowerCase();

      let lookup = '';

      if (ct.includes('application/json')) {
        const body = (await req.json()) as DeleteWorkspaceReq;
        lookup = body.WorkspaceLookup || body.Lookup || '';
      } else if (
        ct.includes('application/x-www-form-urlencoded') ||
        ct.includes('multipart/form-data')
      ) {
        const form = await req.formData();
        lookup = (form.get('WorkspaceLookup') as string) ||
          (form.get('Lookup') as string) || '';
      } else {
        // Fallback attempts
        try {
          const body = (await req.json()) as DeleteWorkspaceReq;
          lookup = body.WorkspaceLookup || body.Lookup || '';
        } catch {
          const form = await req.formData();
          lookup = (form.get('WorkspaceLookup') as string) ||
            (form.get('Lookup') as string) || '';
        }
      }

      if (!lookup) return new Response('Missing workspace lookup', { status: 400 });

      // Prevent deleting the active workspace
      const active = ctx.State.WorkspaceLookup;
      if (active && active === lookup) {
        return new Response('Cannot delete the active workspace', { status: 400 });
      }

      // Create a scoped JWT for the target workspace
      const appCtx = ctx as EaCApplicationsRuntimeContext<OpenIndustrialWebState>;
      const jwt = await loadJwtConfig().Create({
        Username: ctx.State.Username!,
        WorkspaceLookup: lookup,
        EnterpriseLookup: lookup,
        AccessRights: appCtx.Runtime.AccessRights,
      } as any);

      const oiApiRoot = Deno.env.get('OPEN_INDUSTRIAL_API_ROOT')!;
      const apiBaseUrl = new URL(oiApiRoot);

      const client = new OpenIndustrialAPIClient(apiBaseUrl, jwt);

      // Archive (delete) the target workspace via API service
      const status = await client.Workspaces.Archive();

      return Response.json(status);
    } catch (err) {
      console.error('Failed to delete workspace:', err);
      return new Response('Failed to delete workspace', { status: 500 });
    }
  },
};

export default handler;
