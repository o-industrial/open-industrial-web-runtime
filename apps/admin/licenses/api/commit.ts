import type { EaCLicenseAsCode } from '@fathym/eac-licensing';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  async POST(req, ctx) {
    const { licLookup, license } = await req.json() as {
      licLookup: string;
      license: EaCLicenseAsCode;
    };

    const eac = { Licenses: { [licLookup]: license } };

    const result = await ctx.State.OIClient.Admin.CommitEaC(eac);

    return Response.json(result);
  },
};
