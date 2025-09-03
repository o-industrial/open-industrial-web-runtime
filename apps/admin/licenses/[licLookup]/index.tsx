// deno-lint-ignore-file no-explicit-any
import { useMemo, useState } from 'preact/hooks';
import { JSX } from 'preact';
import { PageProps } from '@fathym/eac-applications/preact';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type {
  EaCLicenseAsCode,
  EaCLicenseStripeDetails,
  EverythingAsCodeLicensing,
} from '@fathym/eac-licensing';
import { CheckboxRow, Input } from '@o-industrial/common/atomic/atoms';
import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';

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
  GET: (req, ctx) => {
    const { licLookup } = ctx.Params as { licLookup: string };
    const eac = ctx.Runtime.EaC as EverythingAsCodeLicensing;
    const error = new URL(req.url).searchParams.get('error') ?? undefined;

    return ctx.Render({
      License: eac.Licenses?.[licLookup],
      LicLookup: licLookup,
      Username: ctx.State.Username,
      Error: error ?? undefined,
    });
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
    <div class='-:-:p-4 -:-:space-y-6'>
      <div class='-:-:flex -:-:items-center -:-:justify-between'>
        <h1 class='-:-:text-xl -:-:font-semibold text-white'>License: {LicLookup}</h1>
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
          action={`/admin/licenses/${LicLookup}/api/update`}
          class='-:-:space-y-2'
        >
          <Input
            name='Name'
            placeholder='Name'
            value={license.Details?.Name ?? ''}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              updateDetails('Name', e.currentTarget.value)}
          />
          <Input
            name='Description'
            multiline
            placeholder='Description'
            value={license.Details?.Description ?? ''}
            onInput={(e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
              updateDetails('Description', e.currentTarget.value)}
          />
          <input type='hidden' name='Enabled' value={String(license.Details.Enabled)} />
          <CheckboxRow
            label='Enabled'
            checked={license.Details?.Enabled ?? false}
            onToggle={((next: boolean) => updateDetails('Enabled', next)) as any}
          />
          <Input
            name='PublishableKey'
            placeholder='Publishable Key'
            value={license.Details?.PublishableKey ?? ''}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              updateDetails('PublishableKey', e.currentTarget.value)}
          />
          <Input
            name='SecretKey'
            placeholder='Secret Key'
            value={license.Details?.SecretKey ?? ''}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              updateDetails('SecretKey', e.currentTarget.value)}
          />
          <Input
            name='WebhookSecret'
            placeholder='Webhook Secret'
            value={license.Details?.WebhookSecret ?? ''}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              updateDetails('WebhookSecret', e.currentTarget.value)}
          />
          <div class='-:-:flex -:-:gap-2'>
            <button type='submit' class='-:-:px-4 -:-:py-2 -:-:bg-blue-600 -:-:rounded'>
              Save
            </button>
          </div>
        </form>
      </section>

      <section class='-:-:space-y-3'>
        <h2 class='-:-:text-lg -:-:font-semibold'>Plans</h2>
        <ul class='-:-:space-y-2'>
          {Object.keys(license.Plans || {}).length === 0 && (
            <li class='-:-:text-slate-400'>No plans yet.</li>
          )}
          {Object.entries(license.Plans || {}).map(([planLookup, plan]) => (
            <li key={planLookup}>
              <a
                class='-:-:text-blue-400 -:-:underline'
                href={`/admin/licenses/${LicLookup}/${planLookup}`}
              >
                {plan.Details?.Name || planLookup}
              </a>
            </li>
          ))}
        </ul>
        <form
          method='POST'
          action={`/admin/licenses/${LicLookup}/plans/api/create`}
          class='-:-:flex -:-:items-end -:-:gap-2'
        >
          <Input name='PlanLookup' placeholder='New plan lookup (e.g., basic)' />
          <button type='submit' class='-:-:px-3 -:-:py-2 -:-:bg-green-600 -:-:rounded'>
            Create Plan
          </button>
        </form>
      </section>

      <section class='-:-:space-y-3'>
        <h2 class='-:-:text-lg -:-:font-semibold'>Coupons</h2>
        <ul class='-:-:space-y-2'>
          {Object.keys(Existing?.Coupons || {}).length === 0 && (
            <li class='-:-:text-slate-400'>No coupons yet.</li>
          )}
          {Object.entries(Existing?.Coupons || {}).map(([cLookup, c]) => (
            <li key={cLookup}>
              <span class='-:-:text-slate-200'>{c.Details?.Name || cLookup}</span>
            </li>
          ))}
        </ul>
        {/* Placeholder for coupon creation in future */}
      </section>
    </div>
  );
}
