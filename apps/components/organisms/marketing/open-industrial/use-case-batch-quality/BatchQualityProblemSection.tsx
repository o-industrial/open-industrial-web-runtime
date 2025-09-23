import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { SectionHeader } from '@o-industrial/common/atomic/molecules';

import { batchQualityProblem } from '../../../../../../src/marketing/use-case-batch-quality.ts';

export default function BatchQualityProblemSection(): JSX.Element {
  return (
    <SectionSurface
      tone='muted'
      class='bg-gradient-to-b from-white via-[#f3f6ff] to-white py-20 dark:from-[#070b1f] dark:via-[#0b1230] dark:to-[#060a19]'
    >
      <div class='mx-auto max-w-4xl space-y-10 px-6 text-center'>
        <SectionHeader {...batchQualityProblem} />
      </div>
    </SectionSurface>
  );
}
