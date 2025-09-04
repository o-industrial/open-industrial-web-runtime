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
import { Action, ActionStyleTypes, Input } from '@o-industrial/common/atomic/atoms';
import { OpenIndustrialWebState } from '../../../../../src/state/OpenIndustrialWebState.ts';
import { IntentTypes } from '@o-industrial/common/types';

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
    <div class='-:-:p-6 -:-:space-y-6'>
      <div class='-:-:flex -:-:items-center -:-:justify-between'>
        <h1 class='-:-:text-2xl -:-:font-semibold -:-:text-neutral-100'>Plan: {PlanLookup}</h1>
        {Username && <span class='-:-:text-sm -:-:text-neutral-400'>👤 {Username}</span>}
      </div>

      {Error && (
        <div class='-:-:text-sm -:-:text-neon-red-400 -:-:border -:-:border-neon-red-700 -:-:rounded -:-:p-2'>
          {Error}
        </div>
      )}

      <section class='-:-:space-y-3'>
        <div class='-:-:rounded-xl -:-:border -:-:border-neutral-700 -:-:bg-neutral-900/60 -:-:p-4 -:-:space-y-4'>
          <div>
            <h2 class='-:-:text-lg -:-:font-semibold -:-:text-neutral-100'>Details</h2>
            <p class='-:-:text-xs -:-:text-neutral-400'>Edit the plan content and behavior.</p>
          </div>
          <form
            method='POST'
            action={`/admin/licenses/${LicLookup}/${PlanLookup}/api/update`}
            class='-:-:grid -:-:grid-cols-1 md:-:-:grid-cols-2 -:-:gap-4'
          >
            <Input
              label='Name'
              name='Name'
              placeholder='Name'
              value={local.Details?.Name ?? ''}
              onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
                updateDetails('Name', e.currentTarget.value)}
            />
            <div class='md:-:-:col-span-2'>
              <Input
                label='Description'
                name='Description'
                multiline
                placeholder='Description'
                value={local.Details?.Description ?? ''}
                onInput={(e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
                  updateDetails('Description', e.currentTarget.value)}
              />
            </div>
            <Input
              label='Priority'
              name='Priority'
              type='number'
              placeholder='Priority'
              value={String(local.Details?.Priority ?? 0)}
              onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
                updateDetails('Priority', Number(e.currentTarget.value) || 0)}
            />
            <Input
              label='Trial Period Days'
              name='TrialPeriodDays'
              type='number'
              placeholder='Trial Period Days'
              value={String(local.Details?.TrialPeriodDays ?? '')}
              onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
                updateDetails('TrialPeriodDays', Number(e.currentTarget.value) || undefined)}
            />
            <Input
              label='Featured Tag'
              name='Featured'
              placeholder='Featured tag'
              value={local.Details?.Featured ?? ''}
              onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
                updateDetails('Featured', e.currentTarget.value)}
            />
            <div class='md:-:-:col-span-2'>
              <Input
                label='Features (one per line)'
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

            <div class='md:-:-:col-span-2 -:-:flex -:-:justify-end'>
              <Action type='submit'>Save</Action>
            </div>
          </form>
        </div>
      </section>

      <section class='-:-:space-y-3'>
        <div class='-:-:rounded-xl -:-:border -:-:border-neutral-700 -:-:bg-neutral-900/60 -:-:p-4 -:-:space-y-4'>
          <div class='-:-:flex -:-:items-center -:-:justify-between'>
            <div>
              <h2 class='-:-:text-lg -:-:font-semibold -:-:text-neutral-100'>Prices</h2>
              <p class='-:-:text-xs -:-:text-neutral-400'>Attach one or more prices to the plan.</p>
            </div>
          </div>
          <ul class='-:-:space-y-2'>
            {Object.keys(local.Prices || {}).length === 0 && (
              <li class='-:-:text-neutral-400'>No prices yet.</li>
            )}
            {Object.entries(local.Prices || {}).map(([priceLookup, price]) => (
              <li key={priceLookup} class='-:-:flex -:-:items-center -:-:justify-between'>
                <div class='-:-:text-neutral-200'>{price.Details?.Name || priceLookup}</div>
                <Action
                  href={`/licenses/${LicLookup}/${PlanLookup}/${priceLookup}`}
                  styleType={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
                >
                  Open
                </Action>
              </li>
            ))}
          </ul>
          <form
            method='POST'
            action={`/admin/licenses/${LicLookup}/${PlanLookup}/prices/api/create`}
            class='-:-:flex -:-:items-end -:-:gap-2'
          >
            <Input label='New price lookup' name='PriceLookup' placeholder='e.g., monthly-usd' />
            <Action type='submit' intentType={IntentTypes.Primary}>Create Price</Action>
          </form>
        </div>
      </section>
    </div>
  );
}

