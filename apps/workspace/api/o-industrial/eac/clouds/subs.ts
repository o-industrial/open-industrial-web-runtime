import { EaCRuntimeHandlers } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../../../../../src/state/OpenIndustrialWebState.ts';

// Placeholder endpoint for managed subscription creation flow.
// TODO(AI): Implement managed subscription provisioning under Fathym billing.
export const handler: EaCRuntimeHandlers<OpenIndustrialWebState> = {
  POST(_req, _ctx) {
    return new Response(
      JSON.stringify({ error: 'Managed subscription flow not yet implemented.' }),
      { status: 501, headers: { 'content-type': 'application/json' } },
    );
  },
};
