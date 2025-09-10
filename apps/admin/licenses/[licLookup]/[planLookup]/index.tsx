// deno-lint-ignore-file no-explicit-any
import { useMemo, useState } from 'preact/hooks';
import { JSX } from 'preact';
import { PageProps } from '@fathym/eac-applications/preact';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type {
  EaCLicenseAsCode,
  EaCLicensePlanAsCode,
  EaCLicensePlanDetails,
  EaCLicensePriceAsCode,
  EaCLicensePriceDetails,
} from '@fathym/eac-licensing';
import { Action, ActionStyleTypes, CheckboxRow, Input } from '@o-industrial/common/atomic/atoms';
import { LoadingIcon } from '@o-industrial/common/atomic/icons';
import { OpenIndustrialWebState } from '../../../../../src/state/OpenIndustrialWebState.ts';
import { IntentTypes } from '@o-industrial/common/types';
import type { EverythingAsCode } from '@fathym/eac';
import { merge } from '@fathym/common';

export const IsIsland = true;

type PlanPageData = {
  License?: EaCLicenseAsCode;
  LicLookup: string;
  PlanLookup: string;
  Plan?: EaCLicensePlanAsCode;
  Username?: string;
  Error?: string;
  AccessConfigurationOptions?: string[];
};

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState, PlanPageData> = {
  GET: async (req, ctx) => {
    const { licLookup, planLookup } = ctx.Params as { licLookup: string; planLookup: string };
    const eac = await ctx.State.OIClient.Admin.GetEaC<any>();
    const error = new URL(req.url).searchParams.get('error') ?? undefined;

    const lic = eac.Licenses?.[licLookup];
    const plan = lic?.Plans?.[planLookup];
    const accessConfigs = Object.keys(eac?.AccessConfigurations || {});

    return ctx.Render({
      License: lic,
      LicLookup: licLookup,
      PlanLookup: planLookup,
      Plan: plan,
      Username: ctx.State.Username,
      Error: error ?? undefined,
      AccessConfigurationOptions: accessConfigs,
    });
  },
  async POST(req, ctx) {
    const { licLookup, planLookup } = ctx.Params as { licLookup: string; planLookup: string };

    try {
      const eac = await ctx.State.OIClient.Admin.GetEaC<any>();
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

      if (data['PriceLookup']) {
        const priceLookup = data['PriceLookup'].trim();
        if (!priceLookup) throw new Error('Price lookup is required');

        const newPrice: EaCLicensePriceAsCode = {
          Details: {
            Name: '',
            Currency: 'usd',
            Interval: 'month',
            Value: 0,
            Discount: 0,
          } as EaCLicensePriceDetails,
        } as EaCLicensePriceAsCode;

        const commit: EverythingAsCode = {
          Licenses: {
            [licLookup]: {
              ...lic,
              Plans: {
                ...(lic.Plans || {}),
                [planLookup]: {
                  ...currentPlan,
                  Prices: {
                    ...(currentPlan.Prices || {}),
                    [priceLookup]: newPrice,
                  },
                } as EaCLicensePlanAsCode,
              },
            } as EaCLicenseAsCode,
          },
        } as EverythingAsCode;

        await ctx.State.OIClient.Admin.CommitEaC(commit);
        return Response.redirect(
          ctx.Runtime.URLMatch.FromOrigin(
            `/admin/licenses/${licLookup}/${planLookup}/${priceLookup}`,
          ),
          303,
        );
      } else {
        const currentPlanDetails = currentPlan.Details as EaCLicensePlanDetails | undefined;
        const details: EaCLicensePlanDetails = {
          Name: data['Name'] ?? currentPlanDetails?.Name ?? '',
          Description: data['Description'] ?? currentPlanDetails?.Description ?? '',
          Features: (data['Features']
            ? data['Features'].split('\n').map((s) =>
              s.trim()
            ).filter(Boolean)
            : currentPlanDetails?.Features ?? []),
          Priority: data['Priority']
            ? Number(data['Priority'])
            : (currentPlanDetails?.Priority ?? 0),
          TrialPeriodDays: data['TrialPeriodDays']
            ? Number(data['TrialPeriodDays'])
            : currentPlanDetails?.TrialPeriodDays,
          Featured: data['Featured'] ?? currentPlanDetails?.Featured,
        } as EaCLicensePlanDetails;

        const accessConfigLookups =
          (data['AccessConfigurationLookups'] || data['AccessConfigurations'] || '')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);

        const commit: EverythingAsCode = {
          Licenses: {
            [licLookup]: {
              ...lic,
              Plans: {
                ...(lic.Plans || {}),
                [planLookup]: merge(
                  currentPlan,
                  { Details: details, AccessConfigurationLookups: accessConfigLookups } as any,
                ),
              },
            } as EaCLicenseAsCode,
          },
        } as EverythingAsCode;

        await ctx.State.OIClient.Admin.CommitEaC(commit);
        return Response.redirect(
          ctx.Runtime.URLMatch.FromOrigin(
            `/admin/licenses/${licLookup}/${planLookup}`,
          ),
          303,
        );
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err));
    }
  },
  async DELETE(_req, ctx) {
    const { licLookup, planLookup } = ctx.Params as { licLookup: string; planLookup: string };

    try {
      await ctx.State.OIClient.Admin.DeleteEaC({
        Licenses: {
          [licLookup]: ({
            Plans: { [planLookup]: null },
          } as unknown as EaCLicenseAsCode),
        },
      } as any);

      return Response.json({ ok: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return new Response(msg, { status: 500 });
    }
  },
};

export default function PlanPage({
  Data: {
    License: _License,
    Plan,
    LicLookup,
    PlanLookup,
    Username,
    Error: ErrorMsg,
    AccessConfigurationOptions = [],
  },
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
  const [busy, setBusy] = useState(false);
  const [accessConfigSelections, setAccessConfigSelections] = useState<Set<string>>(
    new Set<string>((Plan as any)?.AccessConfigurationLookups || []),
  );

  const updateDetails = (field: keyof EaCLicensePlanDetails, value: any) =>
    setLocal({ ...local, Details: { ...local.Details, [field]: value } });

  return (
    <div class='-:-:p-6 -:-:space-y-6'>
      <div class='-:-:flex -:-:items-center -:-:justify-between'>
        <h1 class='-:-:text-2xl -:-:font-semibold -:-:text-neutral-100'>Plan: {PlanLookup}</h1>
        {Username && <span class='-:-:text-sm -:-:text-neutral-400'>👤 {Username}</span>}
      </div>

      {ErrorMsg && (
        <div class='-:-:text-sm -:-:text-neon-red-400 -:-:border -:-:border-neon-red-700 -:-:rounded -:-:p-2'>
          {ErrorMsg}
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
            action={`/admin/licenses/${LicLookup}/${PlanLookup}`}
            onSubmit={() => setBusy(true) as any}
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

            <input
              type='hidden'
              name='AccessConfigurationLookups'
              value={Array.from(accessConfigSelections).join(',')}
            />

            <div class='md:-:-:col-span-2 -:-:space-y-2'>
              <h4 class='-:-:text-sm -:-:font-semibold -:-:text-neutral-200'>
                Access Configurations
              </h4>
              <div class='-:-:grid -:-:grid-cols-1 sm:-:-:grid-cols-2 -:-:gap-2'>
                {AccessConfigurationOptions.map((acl) => {
                  const checked = accessConfigSelections.has(acl);
                  return (
                    <CheckboxRow
                      key={acl}
                      label={acl}
                      checked={checked}
                      onToggle={((next: boolean) => {
                        const ns = new Set(accessConfigSelections);
                        if (next) ns.add(acl);
                        else ns.delete(acl);
                        setAccessConfigSelections(ns);
                      }) as any}
                    />
                  );
                })}
              </div>
            </div>

            <div
              class='md:-:-:col-span-2 -:-:flex -:-:justify-end -:-:gap-2 -:-:items-center'
              aria-busy={busy ? 'true' : 'false'}
            >
              {busy
                ? <LoadingIcon class='-:-:w-5 -:-:h-5 -:-:animate-spin -:-:text-neon-blue-500' />
                : (
                  <>
                    <Action type='submit'>Save</Action>
                    <Action
                      type='button'
                      intentType={IntentTypes.Error}
                      styleType={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
                      onClick={async () => {
                        if (!confirm('Delete this plan? This cannot be undone.')) return;
                        try {
                          setBusy(true);
                          const res = await fetch(`/admin/licenses/${LicLookup}/${PlanLookup}`, {
                            method: 'DELETE',
                            headers: { 'content-type': 'application/json' },
                          });
                          if (res.ok) {
                            location.href = `/admin/licenses/${LicLookup}`;
                          } else {
                            setBusy(false);
                            const msg = await res.text();
                            alert(`Delete failed: ${msg || res.status}`);
                          }
                        } catch (err) {
                          setBusy(false);
                          const msg = err instanceof Error ? err.message : String(err);
                          alert(`Delete failed: ${msg}`);
                        }
                      }}
                    >
                      Delete
                    </Action>
                  </>
                )}
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
                  href={`/admin/licenses/${LicLookup}/${PlanLookup}/${priceLookup}`}
                  styleType={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
                >
                  Open
                </Action>
              </li>
            ))}
          </ul>
          <form
            method='POST'
            action={`/admin/licenses/${LicLookup}/${PlanLookup}`}
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
