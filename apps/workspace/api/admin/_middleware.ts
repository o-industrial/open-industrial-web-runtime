import { EaCRuntimeHandler } from '@fathym/eac/runtime/pipelines';

import { buildOpenIndustrialAdminMiddleware } from '../../../admin/_middleware.ts';
import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';

export default [
  buildOpenIndustrialAdminMiddleware(),
] as EaCRuntimeHandler<OpenIndustrialWebState>[];
