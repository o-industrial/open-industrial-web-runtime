import { FunctionalComponent } from 'preact';
import { FigureImage } from '../../../molecules/writing-devices/FigureImage.tsx';
import { IntentTypes } from '@o-industrial/common/types';
import { getIntentStyles } from '../../../../../src/utils/getIntentStyles.ts';

const JourneySection: FunctionalComponent = () => {
  const before = getIntentStyles(IntentTypes.Error);
  const after = getIntentStyles(IntentTypes.Primary);

  return (
    <section class="bg-gradient-to-b from-neutral-50 dark:from-neutral-950 via-neon-violet-500/20 dark:via-neon-violet-500/20 to-neutral-50 dark:to-neutral-950 py-32 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto space-y-16 text-center">
        {/* Section Heading */}
        <div class="space-y-6">
          <h2 class="text-4xl font-bold text-neutral-900 dark:text-white">
            From blocked and brittle — to forkable and fearless.
          </h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            What used to take quarters now takes minutes — with every change
            versioned, governed, and explainable.
          </p>
        </div>

        {/* Before / After Comparison */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
          {/* Before */}
          <div class="bg-white dark:bg-neutral-900 border border-white/20 dark:border-white/10 rounded-xl p-8 space-y-6 shadow-sm dark:shadow-inner">
            <h3 class={`text-xl font-semibold ${before.text}`}>
              Before Open Industrial
            </h3>
            <div class="space-y-4 text-sm">
              {[
                'Rule changes required long MSA cycles and vendor approval',
                'Data was siloed behind integrators and outdated APIs',
                'Logic updates came with production outage risks',
                'No version history or change traceability',
                'Dashboards and reports took quarters, not minutes',
              ].map((point) => (
                <p
                  class={`border-l-4 pl-4 ${before.border} text-neutral-700 dark:text-neutral-400`}
                >
                  {point}
                </p>
              ))}
            </div>
            <FigureImage
              src="/assets/before-legacy-stack2.png"
              alt="Legacy industrial software stack before Open Industrial"
              caption="Tangled legacy systems and brittle integrations slowed every change."
              intentType={IntentTypes.Error}
              center
              size="xl"
              shadow="xl"
              glow
            />
          </div>

          {/* After */}
          <div class="bg-white dark:bg-neutral-900 border border-white/20 dark:border-white/10 rounded-xl p-8 space-y-6 shadow-sm dark:shadow-inner">
            <h3 class={`text-xl font-semibold ${after.text}`}>
              After Open Industrial
            </h3>
            <div class="space-y-4 text-sm">
              {[
                'Forked an agent in 30 seconds — no central approval loop',
                'Live surface connected to RoomState in minutes',
                'Schema and reflex changes diffed, confirmed, and versioned',
                'Signals traceable in the execution timeline',
                'No black boxes. No breakage. Just runtime evolution.',
              ].map((point) => (
                <p
                  class={`border-l-4 pl-4 ${after.border} text-neutral-800 dark:text-neutral-200`}
                >
                  {point}
                </p>
              ))}
            </div>
            <FigureImage
              src="/assets/screenshots/hello-azi-surface-connected.png"
              alt="Runtime diffing and signal timeline after Open Industrial"
              caption="Forked, governed, and deployed with confidence."
              intentType={IntentTypes.Primary}
              center
              size="xl"
              shadow="2xl"
              glow
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
