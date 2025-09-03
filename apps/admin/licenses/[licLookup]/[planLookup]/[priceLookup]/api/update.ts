import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type { EverythingAsCode } from '@fathym/eac';
import type {
  EaCLicenseAsCode,
  EaCLicensePlanAsCode,
  EaCLicensePriceAsCode,
  EaCLicensePriceDetails,
  EverythingAsCodeLicensing,
} from '@fathym/eac-licensing';
import { OpenIndustrialWebState } from '../../../../../../../src/state/OpenIndustrialWebState.ts';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  async POST(req, ctx) {
    const { licLookup, planLookup, priceLookup } = ctx.Params as {
      licLookup: string;
      planLookup: string;
      priceLookup: string;
    };

    try {
      const eac = ctx.Runtime.EaC as EverythingAsCodeLicensing;
      const lic = (eac.Licenses?.[licLookup] || { Plans: {} }) as EaCLicenseAsCode;
      const plan = (lic.Plans?.[planLookup] || { Prices: {} }) as EaCLicensePlanAsCode;
      const price = (plan.Prices?.[priceLookup] || {}) as EaCLicensePriceAsCode;

      const ct = req.headers.get('content-type') || '';
      const data: Record<string, string> = {};
      if (ct.includes('application/json')) {
        Object.assign(data, await req.json());
      } else {
        const fd = await req.formData();
        fd.forEach((v, k) => (data[k] = String(v)));
      }

      const details: EaCLicensePriceDetails = {
        Name: data['Name'] ?? (price.Details as any)?.Name ?? '',
        Currency: data['Currency'] ?? (price.Details as any)?.Currency ?? 'usd',
        Interval: data['Interval'] ?? (price.Details as any)?.Interval ?? 'month',
        Value: data['Value'] ? Number(data['Value']) : (price.Details as any)?.Value ?? 0,
        Discount: data['Discount']
          ? Number(data['Discount'])
          : (price.Details as any)?.Discount ?? 0,
      } as EaCLicensePriceDetails;

      const newPrice: EaCLicensePriceAsCode = {
        ...price,
        Details: details as any,
      } as EaCLicensePriceAsCode;

      const commit: EverythingAsCode = {
        Licenses: {
          [licLookup]: {
            ...lic,
            Plans: {
              ...(lic.Plans || {}),
              [planLookup]: {
                ...plan,
                Prices: {
                  ...(plan.Prices || {}),
                  [priceLookup]: newPrice,
                },
              } as EaCLicensePlanAsCode,
            },
          } as EaCLicenseAsCode,
        },
      } as EverythingAsCode;

      await ctx.State.OIClient.Admin.CommitEaC(commit);
      return Response.redirect(`/admin/licenses/${licLookup}/${planLookup}/${priceLookup}`, 303);
    } catch (err) {
      const msg = encodeURIComponent(err instanceof Error ? err.message : 'Failed to update price');
      return Response.redirect(
        `/admin/licenses/${licLookup}/${planLookup}/${priceLookup}?error=${msg}`,
        303,
      );
    }
  },
};
