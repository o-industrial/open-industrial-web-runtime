import { IntentTypes } from '@o-industrial/common/types';
import { getIntentStyles } from '../../../../../src/utils/getIntentStyles.ts';
import { ThematicPrincipleBlock } from '../../../molecules/writing-devices/ThematicPrincipleBlock.tsx';
import { SystemMindset } from '../../../molecules/writing-devices/SystemMindset.tsx';

export default function StructureFirstThinking() {
  const codeColor = getIntentStyles(IntentTypes.Primary).text;

  return (
    <section class="flex flex-col items-center text-center px-6 py-24 space-y-6">
      <h2 class="text-3xl md:text-4xl font-bold text-white">
        Structure First. Behavior Follows.
      </h2>

      <p class="text-lg text-neutral-300 max-w-2xl">
        You didn’t write an automation.  
        You shaped a contract — and now your system executes on meaning, not guesswork.
      </p>

      <div class="text-xl font-mono text-white">
        <span class={codeColor}>
          Schema → Logic → Confirmed Execution → Versioned Signal
        </span>
      </div>

      <ThematicPrincipleBlock intentType={IntentTypes.Primary}>
        <strong>No more brittle flows.</strong>
        <br />
        Every action is scoped to structure.  
        Every structure is versioned.  
        Nothing breaks when reality shifts.
      </ThematicPrincipleBlock>

      <SystemMindset intentType={IntentTypes.Tertiary}>
        Pipelines enforce behavior.  
        You defined logic that listens — and only acts when it should.
      </SystemMindset>
    </section>
  );
}
