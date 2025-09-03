// deno-lint-ignore-file no-explicit-any
import { useMemo, useState } from 'preact/hooks';
import { JSX } from 'preact';
import { PageProps } from '@fathym/eac-applications/preact';
import type { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import type {
  EaCLicenseAsCode,
  EaCLicensePlanAsCode,
  EaCLicensePriceAsCode,
  EaCLicensePriceDetails,
  EverythingAsCodeLicensing,
} from '@fathym/eac-licensing';
import { Input } from '@o-industrial/common/atomic/atoms';
import { OpenIndustrialWebState } from '../../../../../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

type PricePageData = {
  LicLookup: string;
  PlanLookup: string;
  PriceLookup: string;
  Price?: EaCLicensePriceAsCode;
  Username?: string;
  Error?: string;
};

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState, PricePageData> = {
  GET: (req, ctx) => {
    const { licLookup, planLookup, priceLookup } = ctx.Params as {
      licLookup: string;
      planLookup: string;
      priceLookup: string;
    };
    const eac = ctx.Runtime.EaC as EverythingAsCodeLicensing;
    const error = new URL(req.url).searchParams.get('error') ?? undefined;

    const lic = eac.Licenses?.[licLookup] as EaCLicenseAsCode | undefined;
    const plan = lic?.Plans?.[planLookup] as EaCLicensePlanAsCode | undefined;
    const price = plan?.Prices?.[priceLookup] as EaCLicensePriceAsCode | undefined;

    return ctx.Render({
      LicLookup: licLookup,
      PlanLookup: planLookup,
      PriceLookup: priceLookup,
      Price: price,
      Username: ctx.State.Username,
      Error: error ?? undefined,
    });
  },
};

export default function PricePage({
  Data: { Price, LicLookup, PlanLookup, PriceLookup, Username, Error },
}: PageProps<PricePageData>) {
  const defaultDetails: EaCLicensePriceDetails = useMemo(
    () => ({ Name: '', Currency: 'usd', Interval: 'month', Value: 0, Discount: 0 }),
    [],
  );

  type LocalPrice = Omit<EaCLicensePriceAsCode, 'Details'> & { Details: EaCLicensePriceDetails };
  const [local, setLocal] = useState<LocalPrice>(() =>
    Price
      ? {
        ...(Price as EaCLicensePriceAsCode),
        Details: { ...defaultDetails, ...(Price.Details as any || {}) },
      }
      : { Details: defaultDetails } as any
  );

  const update = (field: keyof EaCLicensePriceDetails, value: any) =>
    setLocal({ ...local, Details: { ...local.Details, [field]: value } });

  return (
    <div class='-:-:p-4 -:-:space-y-6'>
      <div class='-:-:flex -:-:items-center -:-:justify-between'>
        <h1 class='-:-:text-xl -:-:font-semibold text-white'>Price: {PriceLookup}</h1>
        {Username && <span class='-:-:text-sm -:-:text-slate-400'>• {Username}</span>}
      </div>

      {Error && (
        <div class='-:-:text-sm -:-:text-red-400 -:-:border -:-:border-red-700 -:-:rounded -:-:p-2'>
          {Error}
        </div>
      )}

      <form
        method='POST'
        action={`/admin/licenses/${LicLookup}/${PlanLookup}/${PriceLookup}/api/update`}
        class='-:-:space-y-2'
      >
        <Input
          name='Name'
          placeholder='Name'
          value={local.Details?.Name ?? ''}
          onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
            update('Name', e.currentTarget.value)}
        />
        <Input
          name='Currency'
          placeholder='Currency (e.g., usd)'
          value={local.Details?.Currency ?? ''}
          onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
            update('Currency', e.currentTarget.value)}
        />
        <Input
          name='Interval'
          placeholder='Interval (e.g., month)'
          value={local.Details?.Interval ?? ''}
          onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
            update('Interval', e.currentTarget.value)}
        />
        <Input
          name='Value'
          type='number'
          placeholder='Value'
          value={String(local.Details?.Value ?? 0)}
          onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
            update('Value', Number(e.currentTarget.value) || 0)}
        />
        <Input
          name='Discount'
          type='number'
          placeholder='Discount'
          value={String(local.Details?.Discount ?? 0)}
          onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
            update('Discount', Number(e.currentTarget.value) || 0)}
        />
        <button type='submit' class='-:-:px-4 -:-:py-2 -:-:bg-blue-600 -:-:rounded'>Save</button>
      </form>
    </div>
  );
}
