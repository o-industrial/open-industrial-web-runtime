import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import type { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState, Record<string, never>> = {
  GET: (_req, ctx) => ctx.Redirect('/use-cases/safety-compliance-triggers', 308),
};
