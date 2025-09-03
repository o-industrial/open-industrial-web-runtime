import { NullableArrayOrObject } from '@fathym/common';
import { EverythingAsCode } from '@fathym/eac';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  async DELETE(req, ctx) {
    try {
      let licLookup = '';
      const ct = req.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        const body = (await req.json()) as NullableArrayOrObject<EverythingAsCode> & {
          licLookup?: string;
        };
        licLookup = (body as any).licLookup ?? '';
      } else {
        const fd = await req.formData();
        licLookup = String(fd.get('licLookup') ?? '').trim();
      }

      if (!licLookup) throw new Error('licLookup is required');

      await ctx.State.OIClient.Admin.DeleteEaC({ Licenses: [licLookup] });
      return Response.redirect('/admin/licenses', 303);
    } catch (err) {
      const msg = encodeURIComponent(err instanceof Error ? err.message : 'Delete failed');
      return Response.redirect(`/admin/licenses?error=${msg}`, 303);
    }
  },
};
