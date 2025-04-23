import { EaCRuntimeHandler } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';

export default ((_req, ctx) => {
  ctx.Data.CurrentPath = ctx.Runtime.URLMatch.Path;

  return ctx.Next();
}) as EaCRuntimeHandler<OpenIndustrialWebState>;
