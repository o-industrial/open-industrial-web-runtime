import { EaCRuntimeHandler } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';

export default ((_req, ctx) => {
  return ctx.Next();
}) as EaCRuntimeHandler<OpenIndustrialWebState>;
