import { JSX } from 'preact';

import { MarketingPreHeadline } from '../../../../shared/MarketingPreHeadline.tsx';
import { MarketingSectionShell } from '../../../../shared/MarketingSectionShell.tsx';
import { assetManagementProblem } from '../../../../../../src/marketing/use-case-asset-management.ts';

export default function AssetManagementProblemSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='mint'>
      <div class='mx-auto max-w-4xl space-y-5 text-center text-neutral-700 dark:text-neutral-200'>
        <MarketingPreHeadline value={assetManagementProblem.eyebrow} />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {assetManagementProblem.title}
        </h2>
        {assetManagementProblem.description
          ? (
            <p class='text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300'>
              {assetManagementProblem.description}
            </p>
          )
          : null}
      </div>
    </MarketingSectionShell>
  );
}
