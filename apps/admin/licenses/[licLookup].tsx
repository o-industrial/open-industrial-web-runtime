// deno-lint-ignore-file no-explicit-any
import { useState } from 'preact/hooks';
import { JSX } from 'preact';
import { PageProps } from '@fathym/eac-applications/preact';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type {
  EaCLicenseAsCode,
  EaCLicenseStripeDetails,
  EverythingAsCodeLicensing,
} from '@fathym/eac-licensing';
import { CheckboxRow, Input } from '@o-industrial/common/atomic/atoms';
import { AdminNav, PlanListEditor } from '@o-industrial/common/atomic/molecules';
import { AdminDashboardTemplate } from '@o-industrial/common/atomic/templates';
import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

type LicenseEditorPageData = {
  Licenses: Record<string, EaCLicenseAsCode>;
  OIAPIRoot: string;
  OIAPIToken: string;
  Username: string;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  LicenseEditorPageData
> = {
  GET: (_req, ctx) => {
    const eac = ctx.Runtime.EaC as EverythingAsCodeLicensing;

    return ctx.Render({
      Licenses: eac.Licenses || {},
      OIAPIRoot: '/api/',
      OIAPIToken: ctx.State.OIJWT,
      Username: ctx.State.Username,
    });
  },
};

export default function LicenseEditorPage({
  Data,
  Params,
}: PageProps<LicenseEditorPageData>) {
  const { licLookup } = Params;

  const { Licenses, OIAPIRoot, OIAPIToken, Username } = Data;

  const existing = Licenses[licLookup!];

  const defaultDetails: EaCLicenseStripeDetails = {
    Name: '',
    Description: '',
    Enabled: false,
    PublishableKey: '',
    SecretKey: '',
    WebhookSecret: '',
  };

  type StripeLicense = Omit<EaCLicenseAsCode, 'Details'> & {
    Details: EaCLicenseStripeDetails;
  };

  const [license, setLicense] = useState<StripeLicense>(
    existing
      ? {
        ...existing,
        Details: {
          ...defaultDetails,
          ...((existing.Details as Partial<EaCLicenseStripeDetails>) ?? {}),
        },
        Plans: existing.Plans ?? {},
      }
      : {
        Details: { ...defaultDetails },
        Plans: {},
      },
  );

  const updateDetails = <K extends keyof EaCLicenseStripeDetails>(
    field: K,
    value: EaCLicenseStripeDetails[K],
  ) => {
    const base: EaCLicenseStripeDetails = {
      ...defaultDetails,
      ...(license.Details ?? {}),
    } as EaCLicenseStripeDetails;

    const next: EaCLicenseStripeDetails = { ...base, [field]: value } as EaCLicenseStripeDetails;

    setLicense({ ...license, Details: next });
  };

  const save = async (e: Event) => {
    e.preventDefault();
    await fetch(`${OIAPIRoot}admin/licenses/${licLookup}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OIAPIToken}`,
      },
      body: JSON.stringify({ Lookup: licLookup, ...license }),
    });
    alert('License saved');
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/enterprises', label: 'Enterprises' },
    { href: '/admin/access-rights', label: 'Access Rights' },
    { href: '/admin/access-cards', label: 'Access Cards' },
    { href: '/admin/licenses', label: 'Licenses' },
    { href: '/admin/users', label: 'Users' },
  ];

  return (
    <AdminDashboardTemplate
      appBar={
        <div class='-:-:flex -:-:items-center -:-:justify-between -:-:px-4 -:-:py-2 -:-:border-b -:-:border-slate-700'>
          <h1 class='-:-:text-xl -:-:font-semibold text-white'>
            License: {licLookup}
          </h1>
          {Username && <span class='-:-:text-sm -:-:text-slate-400'>· {Username}</span>}
        </div>
      }
      nav={<AdminNav items={navItems} />}
    >
      <form onSubmit={save} class='-:-:p-4 -:-:space-y-6'>
        <section class='-:-:space-y-2'>
          <h2 class='-:-:text-lg -:-:font-semibold'>Details</h2>
          <Input
            placeholder='Name'
            value={license.Details?.Name ?? ''}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              updateDetails('Name', e.currentTarget.value)}
          />
          <Input
            multiline
            placeholder='Description'
            value={license.Details?.Description ?? ''}
            onInput={(e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) =>
              updateDetails(
                'Description',
                e.currentTarget.value,
              )}
          />
          <CheckboxRow
            label='Enabled'
            checked={license.Details?.Enabled ?? false}
            onToggle={((checked: boolean) => updateDetails('Enabled', checked)) as any}
          />
          <Input
            placeholder='Publishable Key'
            value={license.Details?.PublishableKey ?? ''}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              updateDetails(
                'PublishableKey',
                e.currentTarget.value,
              )}
          />
          <Input
            placeholder='Secret Key'
            value={license.Details?.SecretKey ?? ''}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              updateDetails('SecretKey', e.currentTarget.value)}
          />
          <Input
            placeholder='Webhook Secret'
            value={license.Details?.WebhookSecret ?? ''}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              updateDetails(
                'WebhookSecret',
                e.currentTarget.value,
              )}
          />
        </section>

        <section class='-:-:space-y-4'>
          <PlanListEditor
            plans={(license.Plans as unknown as Record<string, any>) || {}}
            onChange={(plans) =>
              setLicense({
                ...license,
                Plans: plans as unknown as EaCLicenseAsCode['Plans'],
              })}
          />
        </section>

        <button
          type='submit'
          class='-:-:px-4 -:-:py-2 -:-:bg-blue-600 -:-:rounded'
        >
          Save License
        </button>
      </form>
    </AdminDashboardTemplate>
  );
}
