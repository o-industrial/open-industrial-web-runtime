import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type { EverythingAsCode } from '@fathym/eac';
import type {
  EaCLicenseAsCode,
  EaCLicensePlanAsCode,
  EaCLicensePlanDetails,
  EverythingAsCodeLicensing,
} from '@fathym/eac-licensing';
import { OpenIndustrialWebState } from '../../../../../../src/state/OpenIndustrialWebState.ts';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  async POST(req, ctx) {
    const { licLookup, planLookup } = ctx.Params as { licLookup: string; planLookup: string };

    try {
      const eac = ctx.Runtime.EaC as EverythingAsCodeLicensing;
      const lic = (eac.Licenses?.[licLookup] || { Plans: {} }) as EaCLicenseAsCode;
      const currentPlan = (lic.Plans?.[planLookup] || { Prices: {} }) as EaCLicensePlanAsCode;

      const ct = req.headers.get('content-type') || '';
      const data: Record<string, string> = {};
      if (ct.includes('application/json')) {
        Object.assign(data, await req.json());
      } else {
        const fd = await req.formData();
        fd.forEach((v, k) => (data[k] = String(v)));
      }

      const details: EaCLicensePlanDetails = {
        Name: data['Name'] ?? (currentPlan.Details as any)?.Name ?? '',
        Description: data['Description'] ?? (currentPlan.Details as any)?.Description ?? '',
        Features: (data['Features']
          ? data['Features'].split('\n').map((s) =>
            s.trim()
          ).filter(Boolean)
          : (currentPlan.Details as any)?.Features ?? []) as string[],
        Priority: data['Priority']
          ? Number(data['Priority'])
          : ((currentPlan.Details as any)?.Priority ?? 0),
        TrialPeriodDays: data['TrialPeriodDays']
          ? Number(data['TrialPeriodDays'])
          : (currentPlan.Details as any)?.TrialPeriodDays,
        Featured: data['Featured'] ?? (currentPlan.Details as any)?.Featured,
      } as EaCLicensePlanDetails;

      const newPlan: EaCLicensePlanAsCode = {
        ...currentPlan,
        Details: details as any,
      } as EaCLicensePlanAsCode;

      const commit: EverythingAsCode = {
        Licenses: {
          [licLookup]: {
            ...lic,
            Plans: {
              ...(lic.Plans || {}),
              [planLookup]: newPlan,
            },
          } as EaCLicenseAsCode,
        },
      } as EverythingAsCode;

      await ctx.State.OIClient.Admin.CommitEaC(commit);
      return Response.redirect(`/admin/licenses/${licLookup}/${planLookup}`, 303);
    } catch (err) {
      const msg = encodeURIComponent(err instanceof Error ? err.message : 'Failed to update plan');
      return Response.redirect(`/admin/licenses/${licLookup}/${planLookup}?error=${msg}`, 303);
    }
  },
};
