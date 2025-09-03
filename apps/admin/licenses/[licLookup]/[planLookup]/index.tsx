// deno-lint-ignore-file no-explicit-any
import { useMemo, useState } from 'preact/hooks';
import { JSX } from 'preact';
import { PageProps } from '@fathym/eac-applications/preact';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type {
  EaCLicenseAsCode,
  EaCLicensePlanAsCode,
  EaCLicensePlanDetails,
  EverythingAsCodeLicensing,
} from '@fathym/eac-licensing';
import { Input, StringArrayEditor } from '@o-industrial/common/atomic/atoms';
import { OpenIndustrialWebState } from '../../../../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

type PlanPageData = {
  License?: EaCLicenseAsCode;
  LicLookup: string;
  PlanLookup: string;
  Plan?: EaCLicensePlanAsCode;
  Username?: string;
  Error?: string;
};

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState, PlanPageData> = {
  GET: (req, ctx) => {
    const { licLookup, planLookup } = ctx.Params as { licLookup: string; planLookup: string };
    const eac = ctx.Runtime.EaC as EverythingAsCodeLicensing;
    const error = new URL(req.url).searchParams.get('error') ?? undefined;

    const lic = eac.Licenses?.[licLookup];
    const plan = lic?.Plans?.[planLookup];

    return ctx.Render({
      License: lic,
      LicLookup: licLookup,
      PlanLookup: planLookup,
      Plan: plan,
      Username: ctx.State.Username,
      Error: error ?? undefined,
    });
  },
};

export default function PlanPage({
  Data: { License, Plan, LicLookup, PlanLookup, Username, Error },
}: PageProps<PlanPageData>) {
  const defaultDetails: EaCLicensePlanDetails = useMemo(
    () => ({ Name: '', Description: '', Features: [], Priority: 0 }),
    [],
  );

  type LocalPlan = Omit<EaCLicensePlanAsCode, 'Details'> & { Details: EaCLicensePlanDetails };
  const [local, setLocal] = useState<LocalPlan>(() =>
    Plan
      ? {
        ...(Plan as EaCLicensePlanAsCode),
        Details: { ...defaultDetails, ...(Plan.Details as any || {}) },
      }
      : { Details: defaultDetails, Prices: {} as any } as any
  );

  const updateDetails = (field: keyof EaCLicensePlanDetails, value: any) =>
    setLocal({ ...local, Details: { ...local.Details, [field]: value } });

  return (
    <div class='-:-:p-4 -:-:space-y-6'>
      <div class='-:-:flex -:-:items-center -:-:justify-between'>
        <h1 class='-:-:text-xl -:-:font-semibold text-white'>Plan: {PlanLookup}</h1>
        {Username && <span class='-:-:text-sm -:-:text-slate-400'>• {Username}</span>}
      </div>

      {Error && (
        <div class='-:-:text-sm -:-:text-red-400 -:-:border -:-:border-red-700 -:-:rounded -:-:p-2'>
          {Error}
        </div>
      )}

      <section class='-:-:space-y-3'>
        <h2 class='-:-:text-lg -:-:font-semibold'>Details</h2>
        <form
          method='POST'
          action={`/admin/licenses/${LicLookup}/${PlanLookup}/api/update`}
          class='-:-:space-y-2'
        >
          <Input
            name='Name'
            placeholder='Name'
            value={local.Details?.Name ?? ''}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              updateDetails('Name', e.currentTarget.value)}
          />
          <Input
            name='Description'
            multiline
            placeholder='Description'
            value={local.Details?.Description ?? ''}
            onInput={(e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
              updateDetails('Description', e.currentTarget.value)}
          />
          <Input
            name='Priority'
            type='number'
            placeholder='Priority'
            value={String(local.Details?.Priority ?? 0)}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              updateDetails('Priority', Number(e.currentTarget.value) || 0)}
          />
          <Input
            name='TrialPeriodDays'
            type='number'
            placeholder='Trial Period Days'
            value={String(local.Details?.TrialPeriodDays ?? '')}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              updateDetails('TrialPeriodDays', Number(e.currentTarget.value) || undefined)}
          />
          <Input
            name='Featured'
            placeholder='Featured tag'
            value={local.Details?.Featured ?? ''}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              updateDetails('Featured', e.currentTarget.value)}
          />
          <div>
            <label class='-:-:block -:-:text-xs -:-:mb-1'>Features (one per line)</label>
            <Input
              name='Features'
              multiline
              rows={4}
              value={(local.Details?.Features || []).join('\n')}
              onInput={(e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
                updateDetails(
                  'Features',
                  e.currentTarget.value.split('\n').map((s) => s.trim()).filter(Boolean),
                )}
            />
          </div>
          <button type='submit' class='-:-:px-4 -:-:py-2 -:-:bg-blue-600 -:-:rounded'>Save</button>
        </form>
      </section>

      <section class='-:-:space-y-3'>
        <h2 class='-:-:text-lg -:-:font-semibold'>Prices</h2>
        <ul class='-:-:space-y-2'>
          {Object.keys(local.Prices || {}).length === 0 && (
            <li class='-:-:text-slate-400'>No prices yet.</li>
          )}
          {Object.entries(local.Prices || {}).map(([priceLookup, price]) => (
            <li key={priceLookup}>
              <a
                class='-:-:text-blue-400 -:-:underline'
                href={`/admin/licenses/${LicLookup}/${PlanLookup}/${priceLookup}`}
              >
                {price.Details?.Name || priceLookup}
              </a>
            </li>
          ))}
        </ul>
        <form
          method='POST'
          action={`/admin/licenses/${LicLookup}/${PlanLookup}/prices/api/create`}
          class='-:-:flex -:-:items-end -:-:gap-2'
        >
          <Input name='PriceLookup' placeholder='New price lookup (e.g., monthly-usd)' />
          <button type='submit' class='-:-:px-3 -:-:py-2 -:-:bg-green-600 -:-:rounded'>
            Create Price
          </button>
        </form>
      </section>
    </div>
  );
}
