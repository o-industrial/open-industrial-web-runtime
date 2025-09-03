import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import { OpenIndustrialWebState } from '../../../../../src/state/OpenIndustrialWebState.ts';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  async DELETE(req, ctx) {
    const { licLookup } = await req.json() as { licLookup: string };

    const result = await ctx.State.OIClient.Admin.DeleteEaC({
      Licenses: [licLookup],
    });

    return Response.json(result);
  },
};
