import { FunctionalComponent } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';
import {
  BlockedIcon,
  BrokenIcon,
  ExpensiveIcon,
  FrustratedIcon,
  NoAccessIcon,
  OutdatedIcon,
} from '@o-industrial/atomic/icons';
import { getIntentStyles } from '@o-industrial/atomic/utils';

const painPoints = [
  {
    icon: NoAccessIcon,
    title: 'We can’t even get our own data.',
    description:
      'Data lives in systems we don’t control. Open Industrial connects your surfaces directly.',
  },
  {
    icon: BlockedIcon,
    title: 'Change takes months.',
    description:
      'Every tweak needs approvals, SOWs, or middleware. We let you fork, test, and deploy in minutes.',
  },
  {
    icon: BrokenIcon,
    title: 'We’re afraid to touch anything.',
    description:
      'Legacy systems are brittle and unpredictable. Open Industrial helps you evolve safely — with versioned, traceable logic.',
  },
  {
    icon: ExpensiveIcon,
    title: 'It’s “too expensive” to try anything.',
    description:
      'Simple ideas get buried in procurement. With runtime control, experimentation is safe — and fast.',
  },
  {
    icon: OutdatedIcon,
    title: 'Our software looks like Windows 95.',
    description:
      'The UI changed. The architecture didn’t. Open Industrial gives your team modern control primitives.',
  },
  {
    icon: FrustratedIcon,
    title: 'We know what’s possible — we just can’t do it.',
    description:
      'Other industries move fast. You deserve the same autonomy. Azi helps you reclaim it.',
  },
];

const PainSection: FunctionalComponent = () => {
  const { background, text } = getIntentStyles(IntentTypes.Secondary);

  return (
    <section class='bg-gradient-to-b from-neutral-50 dark:from-neutral-950 via-neon-cyan-500/10 dark:via-neon-cyan-500/10 to-neutral-50 dark:to-neutral-950 py-32 px-6 lg:px-8'>
      <div class='max-w-7xl mx-auto text-center space-y-10'>
        <h2 class='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white'>
          Every industrial team we’ve met says the same thing...
        </h2>
        <p class='text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto'>
          They're not blocked by ambition — they're blocked by the systems they inherited.
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
