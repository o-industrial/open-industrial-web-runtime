import { FunctionalComponent } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';
import { ImpulseIcon, SchemaIcon, SignalIcon } from '@o-industrial/atomic/icons';
import { getIntentStyles } from '@o-industrial/atomic/utils';
import { FigureImage } from '@o-industrial/atomic/molecules';

const systemSteps = [
  {
    id: 'step-1',
    icon: ImpulseIcon,
    title: 'Reclaim your data feed',
    intent: IntentTypes.Info,
    caption: 'Live surfaces stream data directly into your runtime.',
    description:
      'No more vendor silos or IT delays. Stream data from REST, MQTT, WebSocket — and make it useful instantly.',
    image: '/assets/screenshots/hello-azi-live-impulse-stream.png',
  },
  {
    id: 'step-2',
    icon: SchemaIcon,
    title: 'Compose your intelligence',
    intent: IntentTypes.Tertiary,
    caption: 'Schemas filter structure. Reflexes author logic.',
    description:
      'Build explainable, forkable logic you can govern over time. Your AI isn’t a black box — it’s structured memory.',
    image: '/assets/screenshots/hello-azi-surface-connected.png',
  },
  {
    id: 'step-3',
    icon: SignalIcon,
    title: 'Evolve without fear',
    intent: IntentTypes.Primary,
    caption: 'Signals fire when your logic confirms it’s ready.',
    description:
      'Every signal is versioned, observable, and traceable. Evolve your system — without breaking what’s live.',
    image: '/assets/screenshots/hello-azi-execution-timeline.png',
  },
];

const SystemProofSection: FunctionalComponent = () => {
  return (
    <section class='bg-gradient-to-b from-neutral-50 dark:from-neutral-950 via-neon-blue-500/10 dark:via-neon-blue-500/10 to-neutral-50 dark:to-neutral-950 py-32 px-6 lg:px-8'>
      <div class='max-w-7xl mx-auto text-center space-y-12'>
        <h2 class='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white'>
          Not just AI inside dashboards — AI inside your runtime.
        </h2>
        <p class='text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto'>
          From reclaiming your feed to structuring reflexes and firing signals — you control how
          your system listens, reasons, and evolves.
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
                      <h3
                        class={`text-xl font-semibold text-neutral-900 dark:text-white`}
                      >
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


