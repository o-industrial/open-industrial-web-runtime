import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type { EverythingAsCode } from '@fathym/eac';
import type { EaCAccessRightAsCode, EaCAccessRightDetails } from '@fathym/eac-identity';
import { OpenIndustrialWebState } from '../../../../../src/state/OpenIndustrialWebState.ts';

// Types now provided by @fathym/eac-identity

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  async POST(req, ctx) {
    const { arLookup } = ctx.Params as { arLookup: string };

    try {
      let payload: Record<string, string> = {};
      let updateBody: Partial<EaCAccessRightAsCode> | undefined = undefined;

      const ct = req.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        updateBody = (await req.json()) as Partial<EaCAccessRightAsCode>;
      } else {
        const fd = await req.formData();
        fd.forEach((v, k) => (payload[k] = String(v)));
        const updJson = payload['update'];
        if (updJson) updateBody = JSON.parse(updJson) as Partial<EaCAccessRightAsCode>;
      }

      const eac = ctx.Runtime.EaC as any;
      const current = (eac?.AccessRights?.[arLookup] || {}) as EaCAccessRightAsCode;

      const mergedDetails: EaCAccessRightDetails = {
        Name: (updateBody?.Details?.Name ?? current?.Details?.Name) || undefined,
        Description: (updateBody?.Details?.Description ?? current?.Details?.Description) || undefined,
        Tags: (updateBody?.Details?.Tags ?? current?.Details?.Tags) || [],
        // Enabled is part of EaCVertexDetails; keep merge behavior if present
        Enabled: (updateBody?.Details as any)?.Enabled ?? (current?.Details as any)?.Enabled ?? false,
      };

      const commit: EverythingAsCode = {
        AccessRights: {
          [arLookup]: {
            ...(current ?? {}),
            Details: mergedDetails,
          },
        },
      } as unknown as EverythingAsCode;

      await ctx.State.OIClient.Admin.CommitEaC(commit);

      return Response.redirect(`/admin/access-rights/${arLookup}`, 303);
    } catch (err) {
      const msg = encodeURIComponent(err instanceof Error ? err.message : 'Failed to update access right');
      return Response.redirect(`/admin/access-rights/${arLookup}?error=${msg}`, 303);
    }
  },
};
