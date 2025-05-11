import { FunctionalComponent } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';
import { getIntentStyles } from '../../../../../src/utils/getIntentStyles.ts';
import { Action, ActionStyleTypes } from '../../../atoms/Action.tsx';

import { RuntimeIcon } from '../../../../../build/iconset/icons/RuntimeIcon.tsx';
import { BuildIcon } from '../../../../../build/iconset/icons/BuildIcon.tsx';

const CallToAction: FunctionalComponent = () => {
  const primary = getIntentStyles(IntentTypes.Primary);
  const secondary = getIntentStyles(IntentTypes.Secondary);

  return (
    <section class="bg-neutral-950 py-32 px-6 lg:px-8">
      <div
        class={`max-w-4xl mx-auto bg-neutral-900 rounded-2xl border border-white/10 p-12 text-center shadow-xl ring-2 ring-inset ring-neon-violet-500/10 ${primary.glow}`}
      >
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to run your own runtime?
        </h2>
        <p class="text-neutral-300 text-lg max-w-xl mx-auto mb-10">
          Azi is ready. No installs. No gatekeepers. Just telemetry, logic, and runtime control — on your terms.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-6">
          <Action
            href="/sim"
            intentType={IntentTypes.Primary}
            styleType={
              ActionStyleTypes.Solid |
              ActionStyleTypes.Rounded |
              ActionStyleTypes.Fat
            }
          >
            <div
              class={`w-6 h-6 flex items-center justify-center rounded-full ${primary.background} ${primary.text}`}
            >
              <RuntimeIcon class="w-4 h-4" />
            </div>
            <span class="ml-2">Try the Runtime</span>
          </Action>

          <Action
            href="/docs/system-overview"
            intentType={IntentTypes.Secondary}
            styleType={
              ActionStyleTypes.Outline |
              ActionStyleTypes.Rounded |
              ActionStyleTypes.Fat
            }
          >
            <div
              class={`w-6 h-6 flex items-center justify-center rounded-full ${secondary.background} ${secondary.text}`}
            >
              <BuildIcon class="w-4 h-4" />
            </div>
            <span class="ml-2">Explore the System</span>
          </Action>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
