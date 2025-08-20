import { EaCRuntimeHandler } from '@fathym/eac/runtime/pipelines';

import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';

export default [
  buildOpenIndustrialAdminMiddleware(),
] as EaCRuntimeHandler<OpenIndustrialWebState>[];

export function buildOpenIndustrialAdminMiddleware(): EaCRuntimeHandler<OpenIndustrialWebState> {
  return (_req, ctx) => {
    return ctx.Next();
  };
}
