import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  GET: async (_req, ctx) => {
    const token = await ctx.State.AzureAccessToken?.();
    return Response.json({ connected: !!token });
  },
};

