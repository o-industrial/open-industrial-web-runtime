import { redirectRequest } from '@fathym/common';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type { EaCAccessRightAsCode } from '@fathym/eac-identity';
import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  async POST(req, ctx) {
    try {
      let arLookup = '';
      let accessRight: EaCAccessRightAsCode | undefined = undefined;

      const ct = req.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        const body = (await req.json()) as { arLookup: string; accessRight: EaCAccessRightAsCode };
        arLookup = String(body.arLookup ?? '').trim();
        accessRight = body.accessRight;
      } else {
        const fd = await req.formData();
        arLookup = String(fd.get('arLookup') ?? '').trim();
        const arJson = fd.get('accessRight')?.toString();
        if (arJson) accessRight = JSON.parse(arJson) as EaCAccessRightAsCode;
      }

      if (!arLookup || !accessRight) throw new Error('arLookup and accessRight are required');

      const eac = { AccessRights: { [arLookup]: accessRight } } as any;
      await ctx.State.OIClient.Admin.CommitEaC(eac);

      return redirectRequest(`/admin/access-rights/${arLookup}`, false, false, req);
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err));
    }
  },
};
