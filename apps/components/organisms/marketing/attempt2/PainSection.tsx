import { FunctionalComponent } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';

import { NoAccessIcon } from '../../../../../build/iconset/icons/NoAccessIcon.tsx';
import { BlockedIcon } from '../../../../../build/iconset/icons/BlockedIcon.tsx';
import { BrokenIcon } from '../../../../../build/iconset/icons/BrokenIcon.tsx';
import { ExpensiveIcon } from '../../../../../build/iconset/icons/ExpensiveIcon.tsx';
import { OutdatedIcon } from '../../../../../build/iconset/icons/OutdatedIcon.tsx';
import { FrustratedIcon } from '../../../../../build/iconset/icons/FrustratedIcon.tsx';

const painPoints = [
  {
    icon: NoAccessIcon,
    title: 'We can’t even get our own data.',
    description: 'Everything lives in someone else’s system — or buried under IT lockout.',
  },
  {
    icon: BlockedIcon,
    title: 'We’re blocked by the SI.',
    description: 'We need a multi-year SOW to add a single column to a dashboard.',
  },
  {
    icon: BrokenIcon,
    title: 'If we touch anything, it breaks.',
    description: 'Legacy systems are brittle. Every change is a risk to uptime.',
  },
  {
    icon: ExpensiveIcon,
    title: 'It’s “too expensive” to try anything.',
    description: 'Even simple improvements get buried in politics, price, or procurement.',
  },
  {
    icon: OutdatedIcon,
    title: 'Our software looks like Windows 95.',
    description: 'Modern teams are stuck using tools designed for a past era.',
  },
  {
    icon: FrustratedIcon,
    title: 'We know what’s possible — we just can’t do it.',
    description: 'Other industries have velocity. We have red tape and regrets.',
  },
];

const PainSection: FunctionalComponent = () => {
  return (
    <section class="bg-neutral-950 py-24 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto text-center space-y-10">
        <h2 class="text-3xl sm:text-4xl font-bold text-white">
          Every industrial team we’ve met says the same thing...
        </h2>
        <p class="text-lg text-neutral-300 max-w-2xl mx-auto">
          They're not blocked by ambition — they're blocked by infrastructure.
        </p>

        <div class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {painPoints.map(({ icon: Icon, title, description }) => (
            <div class="bg-neutral-900 rounded-xl p-6 border border-white/5 hover:border-white/20 transition-colors">
              <div class="flex items-center justify-center w-12 h-12 rounded-full bg-neon-indigo-500/10 text-neon-indigo-400 mb-4 mx-auto">
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

export default PainSection;
