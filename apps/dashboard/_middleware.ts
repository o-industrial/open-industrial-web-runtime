import { EaCRuntimeHandler } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import { loadJwtConfig } from '@fathym/common';

export default (async (_req, ctx) => {
  ctx.State.OIJWT = await loadJwtConfig().Create({
    EnterpriseLookup: ctx.State.EnterpriseLookup,
    Username: ctx.State.Username,
  });

  return ctx.Next();
}) as EaCRuntimeHandler<OpenIndustrialWebState>;
