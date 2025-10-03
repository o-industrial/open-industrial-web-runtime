import { FunctionalComponent } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';
import { getIntentStyles } from '@o-industrial/atomic/utils';

const JourneySection: FunctionalComponent = () => {
  const before = getIntentStyles(IntentTypes.Error);
  const after = getIntentStyles(IntentTypes.Primary);

  return (
    <section class='bg-gradient-to-b from-neutral-50 dark:from-neutral-950 via-neon-violet-500/10 dark:via-neon-violet-500/10 to-neutral-50 dark:to-neutral-950 py-32 px-6 lg:px-8'>
      <div class='max-w-7xl mx-auto space-y-16 text-center'>
        {/* Section Heading */}
        <div class='space-y-6'>
          <h2 class='text-4xl font-bold text-neutral-900 dark:text-white'>
            From vendor-owned runtime — to sovereign execution.
          </h2>
          <p class='text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto'>
            Just like PDM made product design versioned and traceable — Reflex Runtime Memory gives
            you governance over how your systems behave.
          </p>
        </div>

        {/* Before / After Comparison */}
        <div class='grid grid-cols-1 lg:grid-cols-2 gap-12 text-left'>
          {/* Before */}
          <div class='bg-white dark:bg-neutral-900 border border-white/20 dark:border-white/10 rounded-xl p-8 space-y-6 shadow-sm dark:shadow-inner'>
            <h3 class={`text-xl font-semibold ${before.text}`}>
              Before Reflex Runtime Memory
            </h3>
            <div class='space-y-4 text-sm'>
              {[
                'Logic buried inside vendor controllers — no visibility, no version control',
                'Rule changes required SOWs, MSAs, or firmware rewrites',
                'System behavior updated by tribal knowledge, not structured memory',
                'Any change felt risky — outages, side effects, no rollback',
                'Automation logic couldn’t be forked, tested, or promoted',
              ].map((point) => (
                <p
                  class={`border-l-4 pl-4 ${before.border} text-neutral-700 dark:text-neutral-400`}
                >
                  {point}
                </p>
              ))}
            </div>
          </div>

          {/* After */}
          <div class='bg-white dark:bg-neutral-900 border border-white/20 dark:border-white/10 rounded-xl p-8 space-y-6 shadow-sm dark:shadow-inner'>
            <h3 class={`text-xl font-semibold ${after.text}`}>
              After Open Industrial
            </h3>
            <div class='space-y-4 text-sm'>
              {[
                'Every schema and agent is versioned — tracked like source code',
                'Forked RoomState agent to control real surfaces in 30 seconds',
                'Schema and logic changes flow through Proposal → Diff → Promotion',
                'Signals are explainable — with runtime memory and execution trace',
                'No black boxes. No guesswork. Just reflexive, composable logic.',
              ].map((point) => (
                <p
                  class={`border-l-4 pl-4 ${after.border} text-neutral-800 dark:text-neutral-200`}
                >
                  {point}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
