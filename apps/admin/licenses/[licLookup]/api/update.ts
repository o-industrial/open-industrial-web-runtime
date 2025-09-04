import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type { EverythingAsCode } from '@fathym/eac';
import type {
  EaCLicenseAsCode,
  EaCLicenseStripeDetails,
  EverythingAsCodeLicensing,
} from '@fathym/eac-licensing';
import { OpenIndustrialWebState } from '../../../../../src/state/OpenIndustrialWebState.ts';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  async POST(req, ctx) {
    const { licLookup } = ctx.Params as { licLookup: string };

    try {
      let payload: Record<string, string> = {};

      const ct = req.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        payload = (await req.json()) as Record<string, string>;
      } else {
        const fd = await req.formData();
        fd.forEach((v, k) => (payload[k] = String(v)));
      }

      const eac = ctx.Runtime.EaC as EverythingAsCode & EverythingAsCodeLicensing;
      const current = eac.Licenses?.[licLookup] as EaCLicenseAsCode | undefined;

      const details: EaCLicenseStripeDetails = {
        Name: payload['Name'] ?? current?.Details?.Name ?? '',
        Description: payload['Description'] ?? current?.Details?.Description ?? '',
        Enabled: (payload['Enabled'] ?? String(current?.Details?.Enabled ?? false)) === 'true',
        PublishableKey: payload['PublishableKey'] ?? (current?.Details as any)?.PublishableKey ??
          '',
        SecretKey: payload['SecretKey'] ?? (current?.Details as any)?.SecretKey ?? '',
        WebhookSecret: payload['WebhookSecret'] ?? (current?.Details as any)?.WebhookSecret ?? '',
      };

      const commit: EverythingAsCode = {
        Licenses: {
          [licLookup]: {
            ...(current ?? { Plans: {} }),
            Details: details as any,
          } as EaCLicenseAsCode,
        },
      } as EverythingAsCodeLicensing as unknown as EverythingAsCode;

      await ctx.State.OIClient.Admin.CommitEaC(commit);

      return Response.redirect(`/admin/licenses/${licLookup}`, 303);
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err));
    }
  },
};
