// deno-lint-ignore-file no-explicit-any
import { useState } from 'preact/hooks';
import { PageProps } from '@fathym/eac-applications/preact';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type { EaCLicenseAsCode } from '@fathym/eac-licensing';
import { AdminNav } from '@o-industrial/common/atomic/molecules';
import { AdminDashboardTemplate } from '@o-industrial/common/atomic/templates';
import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

type LicenseEditorPageData = {
  Licenses: Record<string, EaCLicenseAsCode>;
  OIAPIRoot: string;
  OIAPIToken: string;
  Username: string;
};

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState, LicenseEditorPageData> = {
  GET: (_req, ctx) => {
    return ctx.Render({
      Licenses: ctx.Runtime.EaC.Licenses || {},
      OIAPIRoot: '/api/',
      OIAPIToken: ctx.State.OIJWT,
      Username: ctx.State.Username,
    });
  },
};

export default function LicenseEditorPage({ Data, Params }: PageProps<LicenseEditorPageData>) {
  const { licLookup } = Params;
  const { Licenses, OIAPIRoot, OIAPIToken, Username } = Data;
  const existing = Licenses[licLookup];
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
      Plans: {},
    },
  );

  const updateDetails = (field: string, value: any) => {
    setLicense({
      ...license,
      Details: { ...license.Details, [field]: value },
    });
  };

  const addPlan = () => {
    const lookup = prompt('Plan lookup');
    if (!lookup) return;
    setLicense({
      ...license,
      Plans: {
        ...license.Plans,
        [lookup]: {
          Details: { Name: '', Description: '', Featured: '', Features: [], Priority: 0 },
          Prices: {},
          Coupons: {},
          Trials: {},
        },
      },
    });
  };

  const updatePlanDetail = (plan: string, field: string, value: any) => {
    const p = license.Plans[plan];
    setLicense({
      ...license,
      Plans: {
        ...license.Plans,
        [plan]: {
          ...p,
          Details: { ...p.Details, [field]: value },
        },
      },
    });
  };

  const addPrice = (plan: string) => {
    const lookup = prompt('Price lookup');
    if (!lookup) return;
    const p = license.Plans[plan];
    setLicense({
      ...license,
      Plans: {
        ...license.Plans,
        [plan]: {
          ...p,
          Prices: {
            ...p.Prices,
            [lookup]: {
              Details: { Name: '', Currency: 'USD', Discount: 0, Interval: 'month', Value: 0 },
            },
          },
        },
      },
    });
  };

  const updatePriceDetail = (plan: string, price: string, field: string, value: any) => {
    const p = license.Plans[plan];
    const pr = p.Prices[price];
    setLicense({
      ...license,
      Plans: {
        ...license.Plans,
        [plan]: {
          ...p,
          Prices: {
            ...p.Prices,
            [price]: { ...pr, Details: { ...pr.Details, [field]: value } },
          },
        },
      },
    });
  };

  const addCoupon = (plan: string) => {
    const lookup = prompt('Coupon lookup');
    if (!lookup) return;
    const p = license.Plans[plan];
    setLicense({
      ...license,
      Plans: {
        ...license.Plans,
        [plan]: {
          ...p,
          Coupons: {
            ...p.Coupons,
            [lookup]: { Details: { Code: '', PercentOff: 0 } },
          },
        },
      },
    });
  };

  const updateCouponDetail = (plan: string, coupon: string, field: string, value: any) => {
    const p = license.Plans[plan];
    const c = p.Coupons[coupon];
    setLicense({
      ...license,
      Plans: {
        ...license.Plans,
        [plan]: {
          ...p,
          Coupons: {
            ...p.Coupons,
            [coupon]: { ...c, Details: { ...c.Details, [field]: value } },
          },
        },
      },
    });
  };

  const addTrial = (plan: string) => {
    const lookup = prompt('Trial lookup');
    if (!lookup) return;
    const p = license.Plans[plan];
    setLicense({
      ...license,
      Plans: {
        ...license.Plans,
        [plan]: {
          ...p,
          Trials: {
            ...p.Trials,
            [lookup]: { Details: { Days: 0 } },
          },
        },
      },
    });
  };

  const updateTrialDetail = (plan: string, trial: string, field: string, value: any) => {
    const p = license.Plans[plan];
    const t = p.Trials[trial];
    setLicense({
      ...license,
      Plans: {
        ...license.Plans,
        [plan]: {
          ...p,
          Trials: {
            ...p.Trials,
            [trial]: { ...t, Details: { ...t.Details, [field]: value } },
          },
        },
      },
    });
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
          <h1 class='-:-:text-xl -:-:font-semibold text-white'>License: {licLookup}</h1>
          {Username && <span class='-:-:text-sm -:-:text-slate-400'>· {Username}</span>}
        </div>
      }
      nav={<AdminNav items={navItems} />}
    >
      <form onSubmit={save} class='-:-:p-4 -:-:space-y-6'>
        <section class='-:-:space-y-2'>
          <h2 class='-:-:text-lg -:-:font-semibold'>Details</h2>
          <input
            class='-:-:w-full -:-:p-2 -:-:rounded -:-:bg-slate-800'
            placeholder='Name'
            value={license.Details?.Name ?? ''}
            onInput={(e) => updateDetails('Name', (e.target as HTMLInputElement).value)}
          />
          <textarea
            class='-:-:w-full -:-:p-2 -:-:rounded -:-:bg-slate-800'
            placeholder='Description'
            value={license.Details?.Description ?? ''}
            onInput={(e) => updateDetails('Description', (e.target as HTMLTextAreaElement).value)}
          />
          <label class='-:-:flex -:-:items-center -:-:space-x-2'>
            <input
              type='checkbox'
              checked={license.Details?.Enabled ?? false}
              onInput={(e) => updateDetails('Enabled', (e.target as HTMLInputElement).checked)}
            />
            <span>Enabled</span>
          </label>
          <input
            class='-:-:w-full -:-:p-2 -:-:rounded -:-:bg-slate-800'
            placeholder='Publishable Key'
            value={license.Details?.PublishableKey ?? ''}
            onInput={(e) => updateDetails('PublishableKey', (e.target as HTMLInputElement).value)}
          />
          <input
            class='-:-:w-full -:-:p-2 -:-:rounded -:-:bg-slate-800'
            placeholder='Secret Key'
            value={license.Details?.SecretKey ?? ''}
            onInput={(e) => updateDetails('SecretKey', (e.target as HTMLInputElement).value)}
          />
          <input
            class='-:-:w-full -:-:p-2 -:-:rounded -:-:bg-slate-800'
            placeholder='Webhook Secret'
            value={license.Details?.WebhookSecret ?? ''}
            onInput={(e) => updateDetails('WebhookSecret', (e.target as HTMLInputElement).value)}
          />
        </section>

        <section class='-:-:space-y-4'>
          <div class='-:-:flex -:-:items-center -:-:justify-between'>
            <h2 class='-:-:text-lg -:-:font-semibold'>Plans</h2>
            <button type='button' class='-:-:text-blue-400' onClick={addPlan}>Add Plan</button>
          </div>
          {Object.entries(license.Plans || {}).map(([pLookup, plan]) => (
            <div key={pLookup} class='-:-:border -:-:border-slate-700 -:-:p-4 -:-:rounded'>
              <h3 class='-:-:font-semibold'>{pLookup}</h3>
              <input
                class='-:-:w-full -:-:p-2 -:-:my-1 -:-:rounded -:-:bg-slate-800'
                placeholder='Plan Name'
                value={plan.Details?.Name ?? ''}
                onInput={(e) =>
                  updatePlanDetail(pLookup, 'Name', (e.target as HTMLInputElement).value)}
              />
              <textarea
                class='-:-:w-full -:-:p-2 -:-:my-1 -:-:rounded -:-:bg-slate-800'
                placeholder='Plan Description'
                value={plan.Details?.Description ?? ''}
                onInput={(e) =>
                  updatePlanDetail(pLookup, 'Description', (e.target as HTMLTextAreaElement).value)}
              />

              <div class='-:-:mt-2 -:-:space-y-2'>
                <div class='-:-:flex -:-:items-center -:-:justify-between'>
                  <h4 class='-:-:font-semibold'>Prices</h4>
                  <button
                    type='button'
                    class='-:-:text-blue-400'
                    onClick={() =>
                      addPrice(pLookup)}
                  >
                    Add Price
                  </button>
                </div>
                {Object.entries(plan.Prices || {}).map(([priceLookup, price]) => (
                  <div
                    key={priceLookup}
                    class='-:-:p-2 -:-:border -:-:border-slate-700 -:-:rounded'
                  >
                    <h5 class='-:-:font-semibold'>{priceLookup}</h5>
                    <input
                      class='-:-:w-full -:-:p-1 -:-:my-1 -:-:rounded -:-:bg-slate-800'
                      placeholder='Currency'
                      value={price.Details?.Currency ?? ''}
                      onInput={(e) =>
                        updatePriceDetail(
                          pLookup,
                          priceLookup,
                          'Currency',
                          (e.target as HTMLInputElement).value,
                        )}
                    />
                    <input
                      class='-:-:w-full -:-:p-1 -:-:my-1 -:-:rounded -:-:bg-slate-800'
                      placeholder='Interval'
                      value={price.Details?.Interval ?? ''}
                      onInput={(e) =>
                        updatePriceDetail(
                          pLookup,
                          priceLookup,
                          'Interval',
                          (e.target as HTMLInputElement).value,
                        )}
                    />
                    <input
                      type='number'
                      class='-:-:w-full -:-:p-1 -:-:my-1 -:-:rounded -:-:bg-slate-800'
                      placeholder='Value'
                      value={price.Details?.Value ?? 0}
                      onInput={(e) =>
                        updatePriceDetail(
                          pLookup,
                          priceLookup,
                          'Value',
                          parseFloat((e.target as HTMLInputElement).value),
                        )}
                    />
                    <input
                      type='number'
                      class='-:-:w-full -:-:p-1 -:-:my-1 -:-:rounded -:-:bg-slate-800'
                      placeholder='Discount'
                      value={price.Details?.Discount ?? 0}
                      onInput={(e) =>
                        updatePriceDetail(
                          pLookup,
                          priceLookup,
                          'Discount',
                          parseFloat((e.target as HTMLInputElement).value),
                        )}
                    />
                  </div>
                ))}
              </div>

              <div class='-:-:mt-2 -:-:space-y-2'>
                <div class='-:-:flex -:-:items-center -:-:justify-between'>
                  <h4 class='-:-:font-semibold'>Coupons</h4>
                  <button
                    type='button'
                    class='-:-:text-blue-400'
                    onClick={() =>
                      addCoupon(pLookup)}
                  >
                    Add Coupon
                  </button>
                </div>
                {Object.entries(plan.Coupons || {}).map(([couponLookup, coupon]) => (
                  <div
                    key={couponLookup}
                    class='-:-:p-2 -:-:border -:-:border-slate-700 -:-:rounded'
                  >
                    <h5 class='-:-:font-semibold'>{couponLookup}</h5>
                    <input
                      class='-:-:w-full -:-:p-1 -:-:my-1 -:-:rounded -:-:bg-slate-800'
                      placeholder='Code'
                      value={coupon.Details?.Code ?? ''}
                      onInput={(e) =>
                        updateCouponDetail(
                          pLookup,
                          couponLookup,
                          'Code',
                          (e.target as HTMLInputElement).value,
                        )}
                    />
                    <input
                      type='number'
                      class='-:-:w-full -:-:p-1 -:-:my-1 -:-:rounded -:-:bg-slate-800'
                      placeholder='Percent Off'
                      value={coupon.Details?.PercentOff ?? 0}
                      onInput={(e) =>
                        updateCouponDetail(
                          pLookup,
                          couponLookup,
                          'PercentOff',
                          parseFloat((e.target as HTMLInputElement).value),
                        )}
                    />
                  </div>
                ))}
              </div>

              <div class='-:-:mt-2 -:-:space-y-2'>
                <div class='-:-:flex -:-:items-center -:-:justify-between'>
                  <h4 class='-:-:font-semibold'>Trials</h4>
                  <button type='button' class='-:-:text-blue-400' onClick={() => addTrial(pLookup)}>
                    Add Trial
                  </button>
                </div>
                {Object.entries(plan.Trials || {}).map(([trialLookup, trial]) => (
                  <div
                    key={trialLookup}
                    class='-:-:p-2 -:-:border -:-:border-slate-700 -:-:rounded'
                  >
                    <h5 class='-:-:font-semibold'>{trialLookup}</h5>
                    <input
                      type='number'
                      class='-:-:w-full -:-:p-1 -:-:my-1 -:-:rounded -:-:bg-slate-800'
                      placeholder='Days'
                      value={trial.Details?.Days ?? 0}
                      onInput={(e) =>
                        updateTrialDetail(
                          pLookup,
                          trialLookup,
                          'Days',
                          parseInt((e.target as HTMLInputElement).value),
                        )}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <button type='submit' class='-:-:px-4 -:-:py-2 -:-:bg-blue-600 -:-:rounded'>
          Save License
        </button>
      </form>
    </AdminDashboardTemplate>
  );
}
