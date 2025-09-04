import type { EaCLicenseAsCode } from '@fathym/eac-licensing';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  async POST(req, ctx) {
    try {
      let licLookup = '';
      let license: EaCLicenseAsCode | undefined = undefined;

      const ct = req.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        const body = (await req.json()) as { licLookup: string; license: EaCLicenseAsCode };
        licLookup = body.licLookup;
        license = body.license;
      } else {
        const fd = await req.formData();
        licLookup = String(fd.get('licLookup') ?? '').trim();
        const licJson = fd.get('license')?.toString();
        if (licJson) license = JSON.parse(licJson) as EaCLicenseAsCode;
      }

      if (!licLookup || !license) throw new Error('licLookup and license are required');

      const eac = { Licenses: { [licLookup]: license } };
      await ctx.State.OIClient.Admin.CommitEaC(eac);

      return Response.redirect(`/admin/licenses/${licLookup}`, 303);
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err));
    }
  },
};
