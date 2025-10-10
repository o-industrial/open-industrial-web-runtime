import { EaCRuntimeHandler } from '@fathym/eac/runtime/pipelines';
import type { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export default ((_req, ctx) => {
  return ctx.Next();
}) as EaCRuntimeHandler<OpenIndustrialWebState>;
