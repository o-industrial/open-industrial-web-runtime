import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';
import { EaCAzureAPIClient, loadEaCAzureAPISvc } from '@fathym/eac-azure/steward/clients';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  GET: async (_req, ctx) => {
    const azureToken = await ctx.State.AzureAccessToken?.();

    // Prefer official loader; fallback to manual client if not configured
    let svc: EaCAzureAPIClient | undefined;
    try {
      svc = await loadEaCAzureAPISvc(ctx.State.OIJWT);
    } catch {
      const apiRoot = Deno.env.get('OPEN_INDUSTRIAL_API_ROOT')!;
      const base = new URL('/api/azure/', apiRoot);
      svc = new EaCAzureAPIClient(base, ctx.State.OIJWT!);
    }

    const subs = await svc.Azure.Subscriptions(azureToken ?? '');
    return Response.json(subs);
  },
};
