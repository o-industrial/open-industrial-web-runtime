import { FunctionalComponent } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';
import { getIntentStyles } from '../../../../../src/utils/getIntentStyles.ts';
import { BlockedIcon } from '../../../../../build/iconset/icons/BlockedIcon.tsx';
import { BrokenIcon } from '../../../../../build/iconset/icons/BrokenIcon.tsx';
import { ExpensiveIcon } from '../../../../../build/iconset/icons/ExpensiveIcon.tsx';
import { FrustratedIcon } from '../../../../../build/iconset/icons/FrustratedIcon.tsx';
import { NoAccessIcon } from '../../../../../build/iconset/icons/NoAccessIcon.tsx';
import { OutdatedIcon } from '../../../../../build/iconset/icons/OutdatedIcon.tsx';

const painPoints = [
  {
    icon: NoAccessIcon,
    title: "You don't control your own system.",
    description:
      'Data lives in vendor boxes. Logic is locked in ladder code. With Open Industrial, surfaces stream into your own runtime — structured, portable, yours.',
  },
  {
    icon: BlockedIcon,
    title: 'Change means waiting on someone else.',
    description:
      'Every tweak needs middleware, approvals, or IT delays. We give you forkable logic and self-governed promotion — no meetings required.',
  },
  {
    icon: BrokenIcon,
    title: 'Every update feels like a gamble.',
    description:
      'Legacy systems break silently. You cross your fingers on deploy. Reflex Memory gives you diffs, versions, and the ability to roll back instantly.',
  },
  {
    icon: ExpensiveIcon,
    title: 'Experiments are too risky to justify.',
    description:
      'Even small ideas require budget cycles. We make reflex evolution safe by default — versioned, simulated, testable in isolation.',
  },
  {
    icon: OutdatedIcon,
    title: 'Your UI changed. Your stack didn’t.',
    description:
      'You’re still wiring logic the same way as 1995. Open Industrial delivers modern control primitives — composable, explainable, and Git-native.',
  },
  {
    icon: FrustratedIcon,
    title: 'You know what you want. The system won’t let you do it.',
    description:
      'You can’t fork agents. You can’t trace logic. You can’t govern your own execution. Azi helps you reclaim control — and the system listens.',
  },
];

const PainSection: FunctionalComponent = () => {
  const { background, text } = getIntentStyles(IntentTypes.Secondary);

  return (
    <section class='bg-gradient-to-b from-neutral-50 dark:from-neutral-950 via-neon-cyan-500/10 dark:via-neon-cyan-500/10 to-neutral-50 dark:to-neutral-950 py-32 px-6 lg:px-8'>
      <div class='max-w-7xl mx-auto text-center space-y-10'>
        <h2 class='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white'>
          If you're honest — you don’t own your runtime.
        </h2>
        <p class='text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto'>
          Most control systems are opaque, vendor-governed, and evolution-hostile. Reflex Memory
          puts you back in charge.
        </p>

        <div class='mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {painPoints.map(({ icon: Icon, title, description }) => (
            <div class='bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-white/5 hover:border-neutral-300 dark:hover:border-white/20 transition-colors shadow-sm'>
              <div
                class={`flex items-center justify-center w-12 h-12 rounded-full mb-4 mx-auto ${background} ${text}`}
              >
                <Icon class='w-6 h-6' />
              </div>
              <h3 class='text-lg font-semibold text-neutral-800 dark:text-white mb-2 text-center'>
                {title}
              </h3>
              <p class='text-sm text-neutral-600 dark:text-neutral-400 text-center leading-relaxed'>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainSection;
