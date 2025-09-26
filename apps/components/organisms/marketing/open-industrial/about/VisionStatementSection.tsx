import { JSX } from 'preact';

import { MarketingPreHeadline } from '../../../../shared/MarketingPreHeadline.tsx';
import { MarketingSectionShell } from '../../../../shared/MarketingSectionShell.tsx';
import { visionCopy } from '../../../../../../src/marketing/about.ts';

export default function VisionStatementSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='lavender'>
      <div class='mx-auto max-w-3xl space-y-5 text-center text-neutral-700 dark:text-neutral-200'>
        <MarketingPreHeadline value='Vision' />
        <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
          {visionCopy.title}
        </h2>
        <p class='text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300'>
          {visionCopy.description}
        </p>
      </div>
    </MarketingSectionShell>
  );
}