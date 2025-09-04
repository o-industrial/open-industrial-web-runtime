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
import { Action, Input } from '@o-industrial/common/atomic/atoms';
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
    <div class='-:-:p-6 -:-:space-y-6'>
      <div class='-:-:flex -:-:items-center -:-:justify-between'>
        <h1 class='-:-:text-2xl -:-:font-semibold -:-:text-neutral-100'>Price: {PriceLookup}</h1>
        {Username && <span class='-:-:text-sm -:-:text-neutral-400'>👤 {Username}</span>}
      </div>

      {Error && (
        <div class='-:-:text-sm -:-:text-neon-red-400 -:-:border -:-:border-neon-red-700 -:-:rounded -:-:p-2'>
          {Error}
        </div>
      )}

      <div class='-:-:rounded-xl -:-:border -:-:border-neutral-700 -:-:bg-neutral-900/60 -:-:p-4 -:-:space-y-4'>
        <h2 class='-:-:text-lg -:-:font-semibold -:-:text-neutral-100'>Details</h2>
        <form
          method='POST'
          action={`/admin/licenses/${LicLookup}/${PlanLookup}/${PriceLookup}/api/update`}
          class='-:-:grid -:-:grid-cols-1 md:-:-:grid-cols-2 -:-:gap-4'
        >
          <Input
            label='Name'
            name='Name'
            placeholder='Name'
            value={local.Details?.Name ?? ''}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              update('Name', e.currentTarget.value)}
          />
          <Input
            label='Currency'
            name='Currency'
            placeholder='Currency (e.g., usd)'
            value={local.Details?.Currency ?? ''}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              update('Currency', e.currentTarget.value)}
          />
          <Input
            label='Interval'
            name='Interval'
            placeholder='Interval (e.g., month)'
            value={local.Details?.Interval ?? ''}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              update('Interval', e.currentTarget.value)}
          />
          <Input
            label='Value'
            name='Value'
            type='number'
            placeholder='Value'
            value={String(local.Details?.Value ?? 0)}
            onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
              update('Value', Number(e.currentTarget.value) || 0)}
          />
          <div class='md:-:-:col-span-2'>
            <Input
              label='Discount'
              name='Discount'
              type='number'
              placeholder='Discount'
              value={String(local.Details?.Discount ?? 0)}
              onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
                update('Discount', Number(e.currentTarget.value) || 0)}
            />
          </div>
          <div class='md:-:-:col-span-2 -:-:flex -:-:justify-end'>
            <Action type='submit'>Save</Action>
          </div>
        </form>
      </div>
    </div>
  );
}
