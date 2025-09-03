// deno-lint-ignore-file no-explicit-any
import { useState } from 'preact/hooks';
import { PageProps } from '@fathym/eac-applications/preact';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type { EaCLicenseAsCode, EverythingAsCodeLicensing } from '@fathym/eac-licensing';
import { StringArrayEditor } from '@o-industrial/common/atomic/atoms';
import {
  AdminNav,
  PlanListEditor,
} from '@o-industrial/common/atomic/molecules';
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

  const [license, setLicense] = useState<EaCLicenseAsCode>(
    existing ?? {
      Details: {
        Name: '',
        Description: '',
        Enabled: false,
        PublishableKey: '',
        SecretKey: '',
        WebhookSecret: '',
      },
      PromotionCodes: [],
      Plans: {},
    }
  );

  const updateDetails = (field: string, value: any) => {
    setLicense({
      ...license,
      Details: { ...license.Details, [field]: value },
    });
  };

  const updatePromotionCodes = (codes: string[]) => {
    setLicense({ ...license, PromotionCodes: codes });
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
        <div class="-:-:flex -:-:items-center -:-:justify-between -:-:px-4 -:-:py-2 -:-:border-b -:-:border-slate-700">
          <h1 class="-:-:text-xl -:-:font-semibold text-white">
            License: {licLookup}
          </h1>
          {Username && (
            <span class="-:-:text-sm -:-:text-slate-400">· {Username}</span>
          )}
        </div>
      }
      nav={<AdminNav items={navItems} />}
    >
      <form onSubmit={save} class="-:-:p-4 -:-:space-y-6">
        <section class="-:-:space-y-2">
          <h2 class="-:-:text-lg -:-:font-semibold">Details</h2>
          <input
            class="-:-:w-full -:-:p-2 -:-:rounded -:-:bg-slate-800"
            placeholder="Name"
            value={license.Details?.Name ?? ''}
            onInput={(e) =>
              updateDetails('Name', (e.target as HTMLInputElement).value)
            }
          />
          <textarea
            class="-:-:w-full -:-:p-2 -:-:rounded -:-:bg-slate-800"
            placeholder="Description"
            value={license.Details?.Description ?? ''}
            onInput={(e) =>
              updateDetails(
                'Description',
                (e.target as HTMLTextAreaElement).value
              )
            }
          />
          <label class="-:-:flex -:-:items-center -:-:space-x-2">
            <input
              type="checkbox"
              checked={license.Details?.Enabled ?? false}
              onInput={(e) =>
                updateDetails('Enabled', (e.target as HTMLInputElement).checked)
              }
            />
            <span>Enabled</span>
          </label>
          <input
            class="-:-:w-full -:-:p-2 -:-:rounded -:-:bg-slate-800"
            placeholder="Publishable Key"
            value={license.Details?.PublishableKey ?? ''}
            onInput={(e) =>
              updateDetails(
                'PublishableKey',
                (e.target as HTMLInputElement).value
              )
            }
          />
          <input
            class="-:-:w-full -:-:p-2 -:-:rounded -:-:bg-slate-800"
            placeholder="Secret Key"
            value={license.Details?.SecretKey ?? ''}
            onInput={(e) =>
              updateDetails('SecretKey', (e.target as HTMLInputElement).value)
            }
          />
          <input
            class="-:-:w-full -:-:p-2 -:-:rounded -:-:bg-slate-800"
            placeholder="Webhook Secret"
            value={license.Details?.WebhookSecret ?? ''}
            onInput={(e) =>
              updateDetails(
                'WebhookSecret',
                (e.target as HTMLInputElement).value
              )
            }
          />
        </section>

        <section class="-:-:space-y-4">
          <StringArrayEditor
            items={license.PromotionCodes || []}
            onChange={updatePromotionCodes}
            label="Promotion Codes"
          />
          <PlanListEditor
            plans={license.Plans || {}}
            onChange={(plans) => setLicense({ ...license, Plans: plans })}
          />
        </section>

        <button
          type="submit"
          class="-:-:px-4 -:-:py-2 -:-:bg-blue-600 -:-:rounded"
        >
          Save License
        </button>
      </form>
    </AdminDashboardTemplate>
  );
}
