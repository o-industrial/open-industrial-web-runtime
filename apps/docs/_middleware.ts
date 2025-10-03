import { EaCRuntimeHandler } from '@fathym/eac/runtime/pipelines';
import type { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export default [
  (_req, ctx) => {
    ctx.Data.CurrentPath = ctx.Runtime.URLMatch.Path;

    return ctx.Next();
  },
] as EaCRuntimeHandler<OpenIndustrialWebState>[];

