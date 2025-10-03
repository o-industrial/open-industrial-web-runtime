import { FunctionalComponent } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';
import { ImpulseIcon, SchemaIcon, SignalIcon } from '@o-industrial/atomic/icons';
import { getIntentStyles } from '@o-industrial/atomic/utils';
import { FigureImage } from '@o-industrial/atomic/molecules';

const systemSteps = [
  {
    id: 'step-1',
    icon: ImpulseIcon,
    title: 'Capture Impulses as Memory',
    intent: IntentTypes.Info,
    caption: 'Live surfaces stream telemetry directly into Reflex Memory.',
    description:
      'Every signal starts as an impulse — streaming from devices, simulators, or protocols. Open Industrial turns them into structured memory with full lineage.',
    image: '/assets/screenshots/hello-azi-live-impulse-stream.png',
  },
  {
    id: 'step-2',
    icon: SchemaIcon,
    title: 'Structure Your System’s Thinking',
    intent: IntentTypes.Tertiary,
    caption: 'Schemas join memory. Reflexes author logic.',
    description:
      'Schemas compose your system context. Reflexes author decisions. You version everything — so your logic evolves without risk.',
    image: '/assets/screenshots/hello-azi-surface-connected.png',
  },
  {
    id: 'step-3',
    icon: SignalIcon,
    title: 'Govern Execution, Promote Safely',
    intent: IntentTypes.Primary,
    caption: 'Signals trigger when reflex logic confirms readiness.',
    description:
      'Every signal is traceable. Every agent is forkable. Proposals move through a Git-native loop: Proposal → Diff → Fork → Promotion.',
    image: '/assets/screenshots/hello-azi-execution-timeline.png',
  },
];

const SystemProofSection: FunctionalComponent = () => {
  return (
    <section class='bg-gradient-to-b from-neutral-50 dark:from-neutral-950 via-neon-blue-500/10 dark:via-neon-blue-500/10 to-neutral-50 dark:to-neutral-950 py-32 px-6 lg:px-8'>
      <div class='max-w-7xl mx-auto text-center space-y-12'>
        <h2 class='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white'>
          The Reflex Runtime Execution Loop
        </h2>
        <p class='text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto'>
          Your system isn’t just observable — it’s explainable. Reflex Memory powers a complete
          loop: impulses stream in, schemas shape structure, reflexes decide, and signals execute —
          all versioned.
        </p>

        <div class='mt-20 flex flex-col space-y-24'>
          {systemSteps.map(
            ({
              id,
              icon: Icon,
              title,
              intent,
              description,
              caption,
              image,
            }) => {
              const { text, background } = getIntentStyles(intent);

              return (
                <div
                  key={id}
                  class='flex flex-col lg:flex-row items-center gap-12 text-left'
                >
                  {/* Icon + Text */}
                  <div class='flex-1 space-y-6 max-w-xl'>
                    <div class='flex items-center gap-4'>
                      <div
                        class={`w-12 h-12 flex items-center justify-center rounded-full ${background} ${text}`}
                      >
                        <Icon class='w-6 h-6' />
                      </div>
                      <h3 class='text-xl font-semibold text-neutral-900 dark:text-white'>
                        {title}
                      </h3>
                    </div>
                    <p class='text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed'>
                      {description}
                    </p>
                  </div>

                  {/* Visual */}
                  <div class='flex-1'>
                    <FigureImage
                      src={image}
                      alt={caption}
                      caption={caption}
                      intentType={intent}
                      center
                      size='xl'
                      shadow='2xl'
                      glow
                    />
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
};

export default SystemProofSection;


