import { JSX } from 'preact';

import { MarketingPreHeadline } from '../../../../shared/MarketingPreHeadline.tsx';
import { MarketingSectionShell } from '../../../../shared/MarketingSectionShell.tsx';
import { assetManagementProblem } from '../../../../../../../../src/marketing/solutions/asset-management.ts';

export default function AssetManagementProblemSection(): JSX.Element {
  return (
    <MarketingSectionShell
      variant='neutral'
      class='bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-[#041912] dark:via-[#072319] dark:to-[#020d10]'
    >
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
