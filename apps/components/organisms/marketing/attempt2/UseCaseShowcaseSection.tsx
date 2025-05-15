import { FunctionalComponent } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';
import { getIntentStyles } from '../../../../../src/utils/getIntentStyles.ts';
import { AppIcon } from '../../../../../build/iconset/icons/AppIcon.tsx';
import { AgentIcon } from '../../../../../build/iconset/icons/AgentIcon.tsx';
import { SignalIcon } from '../../../../../build/iconset/icons/SignalIcon.tsx';
import { CompositeSchemaIcon } from '../../../../../build/iconset/icons/CompositeSchemaIcon.tsx';

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
      'Industrial data lives in silos—on machines, in PLCs, behind legacy protocols. Open Industrial ingests, aligns, and reshapes that raw stream into portable, structured signal. Once connected, your data becomes reflex-ready: AI-native, schema-confirmed, and ready for whatever you plug in next.',
  },
  {
    icon: AppIcon,
    intent: IntentTypes.Secondary,
    title: 'Build the App Your Workflow Actually Needs.',
    description:
      'Most teams bend their workflow around someone else’s software. We flip that. You compose apps from reflexive primitives — live data, versioned schemas, identity, logic — all deployable inside your own runtime. Think audit overlays, config UIs, or full control panels. Delivered in days, not quarters.',
  },
  {
    icon: AgentIcon,
    intent: IntentTypes.Tertiary,
    title: 'Design Agents That Think With You.',
    description:
      'These aren’t wrappers. They’re co-workers. Open Industrial agents observe live data, shape logic, and evolve proposals — at runtime. Need an agent to spot anomalies or adjust thresholds based on operator patterns? Fork it. Sim it. Promote it. These agents don’t report back. They build forward.',
  },
  {
    icon: SignalIcon,
    intent: IntentTypes.Info,
    title: 'Automation That Evolves With You.',
    description:
      'Automation isn’t a static config. It’s a living system. Azi helps co-design your logic and reflex memory tracks every decision. Every schema, every agent, every signal is versioned — and forkable. Iterate without fear. Push runtime changes. Reverse if needed. You’re always in control.',
  },
];

const UseCaseShowcaseSection: FunctionalComponent = () => {
  return (
    <section class="bg-gradient-to-b from-neutral-50 dark:from-neutral-950 via-neon-violet-500/5 to-neutral-50 dark:to-neutral-950 py-32 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto space-y-16 text-center">
        <div class="space-y-6">
          <h2 class="text-4xl font-bold text-neutral-900 dark:text-white">
            From rigid stacks to reflex-ready runtime.
          </h2>
          <p class="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Whether you’re stuck in brittle systems or dreaming up your own
            agent co-pilot — Open Industrial gets you there, safely, with
            composable runtime logic and live signal control.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
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
                  <Icon class="w-6 h-6" />
                </div>
                <h3 class="text-lg font-semibold text-neutral-800 dark:text-white mb-2">
                  {title}
                </h3>
                <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
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
