import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';
import { EverythingAsCodeIdentity } from '@fathym/eac-identity';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  GET: async (_req, ctx) => {
    return Response.json(await ctx.State.OIClient.Admin.GetEaC<EverythingAsCodeIdentity>());
  },
};
