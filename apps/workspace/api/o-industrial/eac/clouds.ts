import { redirectRequest } from '@fathym/common';
import type { EaCCloudAzureDetails } from '@fathym/eac-azure';
import { loadEaCStewardSvc } from '@fathym/eac/steward/clients';
import { EaCStatusProcessingTypes, waitForStatus } from '@fathym/eac/steward/status';
import { EaCRuntimeHandlers } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../../../../src/state/OpenIndustrialWebState.ts';

export const handler: EaCRuntimeHandlers<OpenIndustrialWebState> = {
  async POST(req, ctx) {
    const formData = await req.formData();

    const cloudLookup = (formData.get('cloudLookup') as string) || crypto.randomUUID();

    const azureToken = await ctx.State.AzureAccessToken?.();

    const eac = {
      EnterpriseLookup: ctx.Runtime.EaC!.EnterpriseLookup,
      Clouds: {
        [cloudLookup]: {
          Token: azureToken,
          Details: {
            Name: formData.get('name') as string,
            Description: formData.get('description') as string,
            ApplicationID: formData.get('application-id') as string,
            AuthKey: formData.get('auth-key') as string,
            SubscriptionID: formData.get('subscription-id') as string,
            TenantID: formData.get('tenant-id') as string,
            // Optional for create-subscription flow
            BillingScope: formData.get('billing-scope') as string,
            IsDev: (formData.get('is-dev') as string) === 'true' || undefined,
            Type: 'Azure',
          } as EaCCloudAzureDetails,
        },
      },
    };

    const { Token } = await ctx.State.OIClient.Workspaces.EaCJWT();
    const eacSvc = await loadEaCStewardSvc(Token);

    const commitResp = await eacSvc.EaC.Commit(eac, 60);

    const status = await waitForStatus(
      eacSvc,
      commitResp.EnterpriseLookup,
      commitResp.CommitID,
    );

    if (status.Processing === EaCStatusProcessingTypes.COMPLETE) {
      return redirectRequest('/workspace', false, false);
    } else {
      return redirectRequest(
        `/workspace?commitId=${commitResp.CommitID}`,
        false,
        false,
      );
    }
  },
};
