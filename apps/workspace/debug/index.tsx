import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState
> = {
  GET: (_req, ctx) => {
    return Response.json(ctx.State.Workspace);
  },
};
