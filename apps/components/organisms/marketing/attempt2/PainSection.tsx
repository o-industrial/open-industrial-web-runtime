import { FunctionalComponent } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';
import { getIntentStyles } from '../../../../../src/utils/getIntentStyles.ts';

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
    title: 'If we touch anything, it breaks.',
    description:
      'Legacy systems are brittle by design. Our versioned reflex logic evolves safely in place.',
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
    <section class="bg-neutral-950 py-24 px-6 lg:px-8">
      <div class="max-w-7xl mx-auto text-center space-y-10">
        <h2 class="text-3xl sm:text-4xl font-bold text-white">
          Every industrial team we’ve met says the same thing...
        </h2>
        <p class="text-lg text-neutral-300 max-w-2xl mx-auto">
          They're not blocked by ambition — they're blocked by the systems they inherited.
        </p>

        <div class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {painPoints.map(({ icon: Icon, title, description }) => (
            <div class="bg-neutral-900 rounded-xl p-6 border border-white/5 hover:border-white/20 transition-colors">
              <div
                class={`flex items-center justify-center w-12 h-12 rounded-full mb-4 mx-auto ${background} ${text}`}
              >
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
