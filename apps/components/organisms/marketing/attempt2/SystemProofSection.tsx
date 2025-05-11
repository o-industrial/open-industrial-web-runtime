import { FunctionalComponent } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';

import { ReferenceSchemaIcon } from '../../../../../build/iconset/icons/ReferenceSchemaIcon.tsx';
import { ForkIcon } from '../../../../../build/iconset/icons/ForkIcon.tsx';
import { SurfaceIcon } from '../../../../../build/iconset/icons/SurfaceIcon.tsx';
import { ReflexIcon } from '../../../../../build/iconset/icons/ReflexIcon.tsx';
import { CliIcon } from '../../../../../build/iconset/icons/CliIcon.tsx';
import { TimelineIcon } from '../../../../../build/iconset/icons/TimelineIcon.tsx';

const features = [
  {
    icon: ReferenceSchemaIcon,
    title: 'Reference Schemas',
    description: 'Enrich telemetry with device metadata, location context, and expected behavior.',
  },
  {
    icon: ForkIcon,
    title: 'Forkable Agents',
    description: 'Version your logic, compare behaviors, and promote runtime changes safely.',
  },
  {
    icon: SurfaceIcon,
    title: 'Live Surfaces',
    description: 'Ingest telemetry in real time and connect memory to reflex execution.',
  },
  {
    icon: ReflexIcon,
    title: 'Explainable Reflexes',
    description: 'Build traceable AI that explains every decision it makes — live, in your system.',
  },
  {
    icon: CliIcon,
    title: 'CLI + GitOps',
    description: 'Fork, diff, deploy, and rollback with full CLI parity and Git-native flows.',
  },
  {
    icon: TimelineIcon,
    title: 'Execution Timeline',
    description: 'Trace memory and reflex chains across time with a built-in causal replay log.',
  },
];

const SystemProofSection: FunctionalComponent = () => {
  return (
    <section class="bg-neutral-950 py-32 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto text-center space-y-10">
        <h2 class="text-3xl sm:text-4xl font-bold text-white">
          This isn’t a demo. It’s your new runtime.
        </h2>
        <p class="text-lg text-neutral-300 max-w-2xl mx-auto">
          Open Industrial is built on deployable primitives you can fork, trace, and evolve — today.
        </p>

        <div class="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map(({ icon: Icon, title, description }) => (
            <div class="bg-neutral-900 rounded-xl p-6 border border-white/5 hover:border-white/20 transition-colors">
              <div class="flex items-center justify-center w-12 h-12 rounded-full bg-neon-cyan-500/10 text-neon-cyan-400 mb-4 mx-auto">
                <Icon class="w-6 h-6" />
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">{title}</h3>
              <p class="text-sm text-neutral-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemProofSection;
