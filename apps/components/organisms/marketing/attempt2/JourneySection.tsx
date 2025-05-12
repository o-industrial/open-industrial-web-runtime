import { FunctionalComponent } from 'preact';
import { FigureImage } from '../../../molecules/writing-devices/FigureImage.tsx';
import { IntentTypes } from '@o-industrial/common/types';
import { getIntentStyles } from '../../../../../src/utils/getIntentStyles.ts';

const JourneySection: FunctionalComponent = () => {
  const beforeStyles = getIntentStyles(IntentTypes.Error);
  const afterStyles = getIntentStyles(IntentTypes.Primary);

  return (
    <section class="bg-gradient-to-b from-neutral-950 via-neon-violet-900/20 to-neutral-950 py-32 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto space-y-16 text-center">
        {/* Section Heading */}
        <div class="space-y-6">
          <h2 class="text-4xl font-bold text-white">
            From blocked and brittle — to forkable and fearless.
          </h2>
          <p class="text-lg text-neutral-300 max-w-2xl mx-auto">
            What used to take quarters now takes minutes — with every change
            versioned, governed, and explainable.
          </p>
        </div>

        {/* Before / After Comparison */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
          {/* Before */}
          <div class="bg-neutral-900 border border-white/10 rounded-xl p-8 space-y-6 shadow-inner">
            <h3 class={`text-xl font-semibold ${beforeStyles.text}`}>
              Before Open Industrial
            </h3>
            <div class="space-y-4 text-sm">
              <p
                class={`text-neutral-400 border-l-4 pl-4 ${beforeStyles.border}`}
              >
                Rule changes required long MSA cycles and vendor approval
              </p>
              <p
                class={`text-neutral-400 border-l-4 pl-4 ${beforeStyles.border}`}
              >
                Data was siloed behind integrators and outdated APIs
              </p>
              <p
                class={`text-neutral-400 border-l-4 pl-4 ${beforeStyles.border}`}
              >
                Logic updates came with production outage risks
              </p>
              <p
                class={`text-neutral-400 border-l-4 pl-4 ${beforeStyles.border}`}
              >
                No version history or change traceability
              </p>
              <p
                class={`text-neutral-400 border-l-4 pl-4 ${beforeStyles.border}`}
              >
                Dashboards and reports took quarters, not minutes
              </p>
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
          <div class="bg-neutral-900 border border-white/10 rounded-xl p-8 space-y-6 shadow-inner">
            <h3 class={`text-xl font-semibold ${afterStyles.text}`}>
              After Open Industrial
            </h3>
            <div class="space-y-4 text-sm">
              <p
                class={`text-neutral-200 border-l-4 pl-4 ${afterStyles.border}`}
              >
                Forked an agent in 30 seconds — no central approval loop
              </p>
              <p
                class={`text-neutral-200 border-l-4 pl-4 ${afterStyles.border}`}
              >
                Live surface connected to RoomState in minutes
              </p>
              <p
                class={`text-neutral-200 border-l-4 pl-4 ${afterStyles.border}`}
              >
                Schema and reflex changes diffed, confirmed, and versioned
              </p>
              <p
                class={`text-neutral-200 border-l-4 pl-4 ${afterStyles.border}`}
              >
                Signals traceable in the execution timeline
              </p>
              <p
                class={`text-neutral-200 border-l-4 pl-4 ${afterStyles.border}`}
              >
                No black boxes. No breakage. Just runtime evolution.
              </p>
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
