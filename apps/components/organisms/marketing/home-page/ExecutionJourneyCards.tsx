import { IntentTypes } from '@o-industrial/common/types';
import { SystemMindset } from '../../../molecules/writing-devices/SystemMindset.tsx';

const journeys = [
  {
    emoji: '🧪',
    title: 'Pharma Factory',
    subtitle: 'Regulated logic with reflex-bound auditability.',
    link: '/journeys/pharma-factory',
  },
  {
    emoji: '🏭',
    title: 'Food Processing',
    subtitle: 'Batch traceability and recipe-based runtime control.',
    link: '/journeys/food-processing',
  },
  {
    emoji: '🏢',
    title: 'Smart Building',
    subtitle: 'Drift detection across floors, zones, and time.',
    link: '/journeys/smart-building',
  },
];

export default function ExecutionJourneyCards() {
  return (
    <section class="flex flex-col items-center text-center px-6 py-24 space-y-6">
      <h2 class="text-3xl md:text-4xl font-bold text-white">
        Start From a Real System
      </h2>
      <p class="text-lg text-neutral-300 max-w-2xl">
        Each Execution Journey is a live, forkable runtime.  
        Choose your domain. Deploy the memory. Evolve the logic.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full max-w-5xl text-left">
        {journeys.map((j) => (
          <a
            href={j.link}
            class="bg-neutral-800/40 border border-white/10 rounded-xl p-6 hover:ring-2 hover:ring-neon-blue-500 transition shadow-md"
          >
            <div class="text-3xl">{j.emoji}</div>
            <div class="mt-2 font-semibold text-white text-lg">{j.title}</div>
            <div class="text-sm text-neutral-300">{j.subtitle}</div>
          </a>
        ))}
      </div>

      <SystemMindset intentType={IntentTypes.Secondary}>
        Simulation isn’t a toy.  
        It’s how your real runtime starts.
      </SystemMindset>
    </section>
  );
}
