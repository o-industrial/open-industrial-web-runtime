import { FunctionalComponent } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';
import { AgentIcon, AppIcon, CompositeSchemaIcon, SignalIcon } from '@o-industrial/atomic/icons';
import { getIntentStyles } from '@o-industrial/atomic/utils';

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
    title: 'Connect Everything. Standardize Instantly.',
    description:
      'Industrial data lives in silos—on machines, in PLCs, behind legacy protocols. Open Industrial ingests, aligns, and reshapes that raw stream into portable, structured signal. Once connected, your data becomes AI-ready, schema-confirmed, and safely usable across any system you want to plug in.',
  },
  {
    icon: AppIcon,
    intent: IntentTypes.Secondary,
    title: 'Build the App Your Workflow Actually Needs.',
    description:
      'Most teams bend their workflow around someone else’s software. We flip that. You compose apps from modular, reflexive primitives — live data, versioned schemas, identity, and logic — all deployable inside your own runtime. Think audit overlays, config UIs, control panels. Delivered without vendor friction.',
  },
  {
    icon: AgentIcon,
    intent: IntentTypes.Tertiary,
    title: 'Design Agents That Think With You.',
    description:
      'Open Industrial agents aren’t wrappers — they’re collaborators. They observe your telemetry, shape logic, and evolve proposals over time. Need an anomaly detector or a threshold tuner? Fork it. Simulate it. Promote it. They’re part of the system, building alongside you.',
  },
  {
    icon: SignalIcon,
    intent: IntentTypes.Info,
    title: 'Automation That Evolves With You.',
    description:
      'Automation shouldn’t be brittle. With Open Industrial, reflex logic adapts, schemas version safely, and agents grow alongside your operations. Azi co-designs with you. Reflex Memory tracks system history. Everything you build can be forked, simulated, and refined — right at runtime.',
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
