import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../../../../src/state/OpenIndustrialWebState.ts';
import { EaCAzureAPIClient, loadEaCAzureAPISvc } from '@fathym/eac-azure/steward/clients';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  GET: async (_req, ctx) => {
    const azureToken = await ctx.State.AzureAccessToken?.();

    const svc: EaCAzureAPIClient | undefined = await loadEaCAzureAPISvc(ctx.State.OIJWT);

    const accounts = await svc.Azure.BillingAccounts(azureToken ?? '');
    return Response.json(accounts);
  },
};
