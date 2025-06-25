import { FunctionalComponent } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';
import {
  AgentIcon,
  AppIcon,
  CompositeSchemaIcon,
  SignalIcon,
} from '@o-industrial/common/atomic/icons';
import { getIntentStyles } from '@o-industrial/common/atomic/utils';

type UseCase = {
  icon: FunctionalComponent<{ class?: string }>;
  intent: IntentTypes;
  title: string;
  description: string;
};

const useCases: UseCase[] = [
  {
    icon: CompositeSchemaIcon,
    intent: IntentTypes.Primary,
    title: 'Standardize Inputs. Own the Schema.',
    description:
      'Your data doesn’t need another warehouse — it needs structure. Open Industrial turns raw telemetry into versioned, reflex-ready schemas. Fork, filter, and evolve your models across surfaces and systems.',
  },
  {
    icon: AppIcon,
    intent: IntentTypes.Secondary,
    title: 'Compose Workflows on Your Terms.',
    description:
      'Build control UIs, audit layers, or decision interfaces from primitives — reflexes, schemas, signals, and agents — all inside your own runtime. No lock-in. No waiting.',
  },
  {
    icon: AgentIcon,
    intent: IntentTypes.Tertiary,
    title: 'Design Agents That Fork Like Code.',
    description:
      'Agents in Open Industrial aren’t static scripts — they’re versioned, testable logic units. Azi helps you fork, simulate, and promote changes — with full traceability and runtime memory.',
  },
  {
    icon: SignalIcon,
    intent: IntentTypes.Info,
    title: 'Govern Behavior. Trigger with Confidence.',
    description:
      'Every signal in Open Industrial is explainable. Changes pass through a structured lifecycle — Proposal → Diff → Fork → Promote — with memory attached. That’s runtime you can trust.',
  },
];

const UseCaseShowcaseSection: FunctionalComponent = () => {
  return (
    <section class='bg-gradient-to-b from-neutral-50 dark:from-neutral-950 via-neon-violet-500/5 to-neutral-50 dark:to-neutral-950 py-32 px-6 lg:px-8'>
      <div class='max-w-7xl mx-auto space-y-16 text-center'>
        <div class='space-y-6'>
          <h2 class='text-4xl font-bold text-neutral-900 dark:text-white'>
            Industrial Automation You Can See, Shape, and Trust
          </h2>
          <p class='text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto'>
            From vendor black boxes to composable runtime logic — Open Industrial turns scattered
            data and opaque workflows into structured, observable systems you can evolve and govern.
          </p>
        </div>

        <div class='grid grid-cols-1 md:grid-cols-2 gap-10 text-left'>
          {useCases.map(({ icon: Icon, title, description, intent }) => {
            const card = getIntentStyles(IntentTypes.Tertiary);
            const iconStyle = getIntentStyles(intent);

            return (
              <div
                key={title}
                class={`bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-white/5 hover:shadow-lg transition-shadow shadow-sm ${card.ring}`}
              >
                <div
                  class={`flex items-center justify-center w-12 h-12 rounded-full mb-4 ${iconStyle.background} ${iconStyle.text}`}
                >
                  <Icon class='w-6 h-6' />
                </div>
                <h3 class='text-lg font-semibold text-neutral-800 dark:text-white mb-2'>
                  {title}
                </h3>
                <p class='text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCaseShowcaseSection;
