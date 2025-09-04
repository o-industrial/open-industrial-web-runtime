import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type { EverythingAsCode } from '@fathym/eac';
import type {
  EaCLicenseAsCode,
  EaCLicensePlanAsCode,
  EaCLicensePriceAsCode,
  EverythingAsCodeLicensing,
} from '@fathym/eac-licensing';
import { OpenIndustrialWebState } from '../../../../../../../src/state/OpenIndustrialWebState.ts';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  async POST(req, ctx) {
    const { licLookup, planLookup } = ctx.Params as { licLookup: string; planLookup: string };

    try {
      let priceLookup = '';
      const ct = req.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        const body = (await req.json()) as { PriceLookup?: string };
        priceLookup = String(body.PriceLookup ?? '').trim();
      } else {
        const fd = await req.formData();
        priceLookup = String(fd.get('PriceLookup') ?? '').trim();
      }
      if (!priceLookup) throw new Error('Price lookup is required');

      const eac = ctx.Runtime.EaC as EverythingAsCodeLicensing;
      const lic = (eac.Licenses?.[licLookup] || { Plans: {} }) as EaCLicenseAsCode;
      const plan = (lic.Plans?.[planLookup] || { Prices: {} }) as EaCLicensePlanAsCode;

      const newPrice: EaCLicensePriceAsCode = {
        Details: { Name: '', Currency: 'usd', Interval: 'month', Value: 0, Discount: 0 },
      } as unknown as EaCLicensePriceAsCode;

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
      throw err instanceof Error ? err : new Error(String(err));
    }
  },
};
