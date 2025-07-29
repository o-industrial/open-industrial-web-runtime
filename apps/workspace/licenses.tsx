import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import Licenses from '../components/organisms/licensing/Licenses.tsx';
import { EaCLicenseStripeDetails, EaCLicenseAsCode, EverythingAsCodeLicensing } from '@fathym/eac-licensing';

export const IsIsland = true;

type IndexPageData = {
  License: EaCLicenseAsCode;

  LicenseLookup: string;

  StripePublishableKey: string;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  IndexPageData
> = {
  GET: (_req, ctx) => {
    const eac = ctx.Runtime.EaC as EverythingAsCodeLicensing;
    
    const licDetails = eac.Licenses!['o-industrial']
      .Details as EaCLicenseStripeDetails;

    return ctx.Render({
      License: eac.Licenses!['o-industrial'],
      LicenseLookup: 'o-industrial',
      StripePublishableKey: licDetails.PublishableKey,
    });
  },
};

export default function DashboardIndex({
  Data: { License, LicenseLookup, StripePublishableKey },
}: PageProps<IndexPageData>) {
  return (
    <>
      <Licenses
        stripePublishableKey={StripePublishableKey}
        licLookup={LicenseLookup}
        license={License}
      />
    </>
  );
}
