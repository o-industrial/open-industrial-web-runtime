import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type { EverythingAsCode } from '@fathym/eac';
import type {
  EaCLicenseAsCode,
  EaCLicensePlanAsCode,
  EverythingAsCodeLicensing,
} from '@fathym/eac-licensing';
import { OpenIndustrialWebState } from '../../../../../../src/state/OpenIndustrialWebState.ts';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  async POST(req, ctx) {
    const { licLookup } = ctx.Params as { licLookup: string };

    try {
      let planLookup = '';
      const ct = req.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        const body = (await req.json()) as { PlanLookup?: string };
        planLookup = String(body.PlanLookup ?? '').trim();
      } else {
        const fd = await req.formData();
        planLookup = String(fd.get('PlanLookup') ?? '').trim();
      }

      if (!planLookup) throw new Error('Plan lookup is required');

      const eac = ctx.Runtime.EaC as EverythingAsCodeLicensing;
      const current = (eac.Licenses?.[licLookup] || { Plans: {} }) as EaCLicenseAsCode;

      const newPlan: EaCLicensePlanAsCode = {
        Details: { Name: '', Description: '', Features: [], Priority: 0 },
        Prices: {},
      } as unknown as EaCLicensePlanAsCode; // relying on EaCDetails typing

      const commit: EverythingAsCode = {
        Licenses: {
          [licLookup]: {
            ...current,
            Plans: {
              ...(current.Plans || {}),
              [planLookup]: newPlan,
            },
          } as EaCLicenseAsCode,
        },
      } as EverythingAsCode;

      await ctx.State.OIClient.Admin.CommitEaC(commit);

      return Response.redirect(`/admin/licenses/${licLookup}/${planLookup}`, 303);
    } catch (err) {
      const msg = encodeURIComponent(err instanceof Error ? err.message : 'Failed to create plan');
      return Response.redirect(`/admin/licenses/${licLookup}?error=${msg}`, 303);
    }
  },
};
