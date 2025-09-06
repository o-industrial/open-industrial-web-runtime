// deno-lint-ignore-file no-explicit-any
import { useMemo, useState } from 'preact/hooks';
import { JSX } from 'preact';
import { PageProps } from '@fathym/eac-applications/preact';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type {
  EaCLicenseAsCode,
  EaCLicensePlanAsCode,
  EaCLicensePlanDetails,
  EaCLicenseStripeDetails,
  EverythingAsCodeLicensing,
} from '@fathym/eac-licensing';
import { Action, ActionStyleTypes, CheckboxRow, Input } from '@o-industrial/common/atomic/atoms';
import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';
import { IntentTypes } from '@o-industrial/common/types';
import type { EverythingAsCode } from '@fathym/eac';
import { merge } from '@fathym/common';

export const IsIsland = true;

type LicensePageData = {
  License?: EaCLicenseAsCode;
  LicLookup: string;
  Username?: string;
  Error?: string;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  LicensePageData
> = {
  GET: async (req, ctx) => {
    const { licLookup } = ctx.Params as { licLookup: string };
    const eac = await ctx.State.OIClient.Admin.GetEaC<EverythingAsCodeLicensing>();
    const error = new URL(req.url).searchParams.get('error') ?? undefined;

    return ctx.Render({
      License: eac.Licenses?.[licLookup],
      LicLookup: licLookup,
      Username: ctx.State.Username,
      Error: error ?? undefined,
    });
  },
  async POST(req, ctx) {
    const { licLookup } = ctx.Params as { licLookup: string };

    try {
      const ct = req.headers.get('content-type') || '';
      const payload: Record<string, string> = {};
      if (ct.includes('application/json')) {
        Object.assign(payload, await req.json());
      } else {
        const fd = await req.formData();
        fd.forEach((v, k) => (payload[k] = String(v)));
      }

      const eac = await ctx.State.OIClient.Admin.GetEaC<EverythingAsCodeLicensing>();
      const current = (eac.Licenses?.[licLookup] || { Plans: {} }) as EaCLicenseAsCode;
      const currentDetails = current.Details as EaCLicenseStripeDetails | undefined;

      if (payload['PlanLookup']) {
        const planLookup = payload['PlanLookup'].trim();
        if (!planLookup) throw new Error('Plan lookup is required');

        const newPlan: EaCLicensePlanAsCode = {
          Details: {
            Name: '',
            Description: '',
            Features: [],
            Priority: 0,
          } as EaCLicensePlanDetails,
          Prices: {},
        } as EaCLicensePlanAsCode;

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
        return Response.redirect(
          ctx.Runtime.URLMatch.FromOrigin(
            `/admin/licenses/${licLookup}/${planLookup}`,
          ),
          303,
        );
      } else if (payload['Delete'] === 'true') {
        await ctx.State.OIClient.Admin.DeleteEaC({ Licenses: [licLookup] });
        return Response.redirect(
          ctx.Runtime.URLMatch.FromOrigin('/admin/licenses'),
          303,
        );
      } else {
        const updateBody: Partial<EaCLicenseAsCode> = {
          Details: {
            Name: payload['Name'] ?? currentDetails?.Name ?? '',
            Description: payload['Description'] ?? currentDetails?.Description ?? '',
            Enabled: (payload['Enabled'] ?? String(currentDetails?.Enabled ?? false)) === 'true',
            PublishableKey: payload['PublishableKey'] ?? currentDetails?.PublishableKey ?? '',
            SecretKey: payload['SecretKey'] ?? currentDetails?.SecretKey ?? '',
            WebhookSecret: payload['WebhookSecret'] ?? currentDetails?.WebhookSecret ?? '',
          } as EaCLicenseStripeDetails,
        };

        const commit: EverythingAsCode = {
          Licenses: {
            [licLookup]: merge(current ?? {}, updateBody ?? {}),
          },
        } as EverythingAsCode;

        await ctx.State.OIClient.Admin.CommitEaC(commit);
        return Response.redirect(
          ctx.Runtime.URLMatch.FromOrigin(`/admin/licenses/${licLookup}`),
          303,
        );
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err));
    }
  },
};

export default function LicensePage({
  Data: { License: Existing, LicLookup, Username, Error },
}: PageProps<LicensePageData>) {
  const defaultDetails: EaCLicenseStripeDetails = useMemo(
    () => ({
      Name: '',
      Description: '',
      Enabled: false,
      PublishableKey: '',
      SecretKey: '',
      WebhookSecret: '',
    }),
    [],
  );

  type StripeLicense = Omit<EaCLicenseAsCode, 'Details'> & {
    Details: EaCLicenseStripeDetails;
  };

  const [license, setLicense] = useState<StripeLicense>(() =>
    Existing
      ? {
        ...(Existing as EaCLicenseAsCode),
        Details: {
          ...defaultDetails,
          ...((Existing.Details as Partial<EaCLicenseStripeDetails>) ?? {}),
        },
        Plans: Existing.Plans ?? {},
      }
      : { Details: defaultDetails, Plans: {} }
  );

  const updateDetails = <K extends keyof EaCLicenseStripeDetails>(
    field: K,
    value: EaCLicenseStripeDetails[K],
  ) => setLicense({ ...license, Details: { ...license.Details, [field]: value } });

  return (
    <div class='-:-:p-6 -:-:space-y-6'>
      <div class='-:-:flex -:-:items-center -:-:justify-between'>
        <h1 class='-:-:text-2xl -:-:font-semibold -:-:text-neutral-100'>
          License: {LicLookup}
        </h1>
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
            <h2 class='-:-:text-lg -:-:font-semibold -:-:text-neutral-100'>
              Details
            </h2>
            <p class='-:-:text-xs -:-:text-neutral-400'>
              Configure the Stripe license settings.
            </p>
          </div>
          <form
            method='POST'
            action={`/admin/licenses/${LicLookup}`}
            class='-:-:grid -:-:grid-cols-1 md:-:-:grid-cols-2 -:-:gap-4'
          >
            <Input
              label='Name'
              name='Name'
              placeholder='Name'
              value={license.Details?.Name ?? ''}
              onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
                updateDetails('Name', e.currentTarget.value)}
            />
            <div class='md:-:-:col-span-2'>
              <Input
                label='Description'
                name='Description'
                multiline
                placeholder='Description'
                value={license.Details?.Description ?? ''}
                onInput={(e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
                  updateDetails('Description', e.currentTarget.value)}
              />
            </div>
            <input
              type='hidden'
              name='Enabled'
              value={String(license.Details.Enabled)}
            />
            <div class='md:-:-:col-span-2'>
              <CheckboxRow
                label='Enabled'
                checked={license.Details?.Enabled ?? false}
                onToggle={((next: boolean) => updateDetails('Enabled', next)) as any}
              />
            </div>
            <Input
              label='Publishable Key'
              name='PublishableKey'
              placeholder='Publishable Key'
              value={license.Details?.PublishableKey ?? ''}
              onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
                updateDetails('PublishableKey', e.currentTarget.value)}
            />
            <Input
              label='Secret Key'
              name='SecretKey'
              placeholder='Secret Key'
              value={license.Details?.SecretKey ?? ''}
              onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
                updateDetails('SecretKey', e.currentTarget.value)}
            />
            <div class='md:-:-:col-span-2'>
              <Input
                label='Webhook Secret'
                name='WebhookSecret'
                placeholder='Webhook Secret'
                value={license.Details?.WebhookSecret ?? ''}
                onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
                  updateDetails('WebhookSecret', e.currentTarget.value)}
              />
            </div>
            <div class='md:-:-:col-span-2 -:-:flex -:-:gap-2 -:-:justify-end'>
              <Action type='submit'>Save</Action>
            </div>
          </form>
        </div>
      </section>

      <section class='-:-:space-y-3'>
        <div class='-:-:rounded-xl -:-:border -:-:border-neutral-700 -:-:bg-neutral-900/60 -:-:p-4 -:-:space-y-4'>
          <div class='-:-:flex -:-:items-center -:-:justify-between'>
            <div>
              <h2 class='-:-:text-lg -:-:font-semibold -:-:text-neutral-100'>
                Plans
              </h2>
              <p class='-:-:text-xs -:-:text-neutral-400'>
                Each plan can have multiple prices.
              </p>
            </div>
          </div>
          <ul class='-:-:space-y-2'>
            {Object.keys(license.Plans || {}).length === 0 && (
              <li class='-:-:text-neutral-400'>No plans yet.</li>
            )}
            {Object.entries(license.Plans || {}).map(([planLookup, plan]) => (
              <li
                key={planLookup}
                class='-:-:flex -:-:items-center -:-:justify-between -:-:gap-2'
              >
                <div class='-:-:text-neutral-200'>
                  {plan.Details?.Name || planLookup}
                </div>
                <Action
                  href={`/admin/licenses/${LicLookup}/${planLookup}`}
                  styleType={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
                >
                  Open
                </Action>
              </li>
            ))}
          </ul>
          <form
            method='POST'
            action={`/admin/licenses/${LicLookup}/plans/api/create`}
            class='-:-:flex -:-:items-end -:-:gap-2'
          >
            <Input
              label='New plan lookup'
              name='PlanLookup'
              placeholder='e.g., basic'
            />
            <Action type='submit' intentType={IntentTypes.Primary}>
              Create Plan
            </Action>
          </form>
        </div>
      </section>

      <section class='-:-:space-y-3'>
        <div class='-:-:rounded-xl -:-:border -:-:border-neutral-700 -:-:bg-neutral-900/60 -:-:p-4 -:-:space-y-4'>
          <h2 class='-:-:text-lg -:-:font-semibold -:-:text-neutral-100'>
            Coupons
          </h2>
          <ul class='-:-:space-y-2'>
            {Object.keys(Existing?.Coupons || {}).length === 0 && (
              <li class='-:-:text-neutral-400'>No coupons yet.</li>
            )}
            {Object.entries(Existing?.Coupons || {}).map(([cLookup, c]) => (
              <li key={cLookup}>
                <span class='-:-:text-neutral-200'>
                  {c.Details?.Name || cLookup}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
