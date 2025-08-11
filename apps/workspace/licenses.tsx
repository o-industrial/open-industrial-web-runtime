import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import Licenses from '../components/organisms/licensing/Licenses.tsx';
import {
  EaCLicenseAsCode,
  EaCLicenseStripeDetails,
  EverythingAsCodeLicensing,
} from '@fathym/eac-licensing';

export const IsIsland = true;

type IndexPageData = {
  License: EaCLicenseAsCode;

  LicenseLookup: string;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  IndexPageData
> = {
  GET: (_req, ctx) => {
    const eac = ctx.Runtime.EaC as EverythingAsCodeLicensing;

    const licLookup = 'o-industrial';

    const lic = eac.Licenses![licLookup];

    return ctx.Render({
      License: lic,
      LicenseLookup: licLookup,
    });
  },
};

export default function DashboardIndex({
  Data: { License, LicenseLookup },
}: PageProps<IndexPageData>) {
  const licDetails = License.Details as EaCLicenseStripeDetails;

  return (
    <>
      <Licenses
        stripePublishableKey={licDetails.PublishableKey}
        licLookup={LicenseLookup}
        license={License}
      />
    </>
  );
}
