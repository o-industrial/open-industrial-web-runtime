import { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { SectionHeader, ToggleQueryCard } from '@o-industrial/common/atomic/molecules';

import { batchQualityToggleQueries } from '../../../../../src/marketing/use-case-batch-quality.ts';

export default function BatchQualityToggleSection(): JSX.Element {
  return (
    <SectionSurface
      tone='default'
      class='bg-gradient-to-br from-[#f5f7ff] via-white to-[#f3efff] py-24 dark:from-[#080c1f] dark:via-[#13143b] dark:to-[#050818]'
    >
      <div class='mx-auto flex w-full max-w-6xl flex-col gap-10 px-6'>
        <div class='space-y-4 text-center'>
          <SectionHeader
            title='Ask batch quality questions in natural language'
            description='Use Azi, our AI query assistant, to ask questions about batch quality in plain English. Azi generates structured KQL to extract unified insights from real-time telemetry.'
            align='center'
          />
        </div>

        <div class='grid gap-6 md:grid-cols-2'>
          {batchQualityToggleQueries.map((toggle) => (
            <ToggleQueryCard
              key={toggle.title}
              eyebrow={toggle.eyebrow}
              title={toggle.title}
              description={toggle.description}
              options={toggle.options}
              copy={toggle.copy}
            />
          ))}
        </div>
      </div>
    </SectionSurface>
  );
}
