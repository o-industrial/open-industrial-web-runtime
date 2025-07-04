import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  GET: async (_req, ctx) => {
    const jwt = await ctx.State.OIClient.Workspaces.EaCJWT();

    return Response.json(jwt.Token);
  },
};
