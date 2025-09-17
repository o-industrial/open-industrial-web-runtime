import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../../../../src/state/OpenIndustrialWebState.ts';
import { EaCAzureAPIClient, loadEaCAzureAPISvc } from '@fathym/eac-azure/steward/clients';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  GET: async (_req, ctx) => {
    const azureToken = await ctx.State.AzureAccessToken?.();

    if (!azureToken) {
      return Response.json({}, { status: 200 });
    }

    const svc: EaCAzureAPIClient | undefined = await loadEaCAzureAPISvc(ctx.State.OIJWT);

    if (!svc) {
      return Response.json({}, { status: 200 });
    }

    try {
      const scopes = await svc.Azure.BillingScopes(azureToken);

      return Response.json(scopes ?? {});
    } catch (err) {
      ctx.Runtime.Logs.Package.error(
        'There was an error loading billing scopes from EaC Azure.',
        err,
      );
    }

    return Response.json({}, { status: 200 });
  },
};

export default handler;
