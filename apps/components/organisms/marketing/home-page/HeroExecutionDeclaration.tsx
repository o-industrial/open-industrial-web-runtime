import { IntentTypes } from '@o-industrial/common/types';
import { getIntentStyles } from '../../../../../src/utils/getIntentStyles.ts';
import { AziInnerVoice } from '../../../molecules/writing-devices/AziInnerVoice.tsx';
import { ThematicPrincipleBlock } from '../../../molecules/writing-devices/ThematicPrincipleBlock.tsx';
import { HubspotForm } from '../HubspotForm.tsx';

export default function HeroExecutionDeclaration() {
  const primaryText = getIntentStyles(IntentTypes.Primary).text;

  return (
    <section class="flex flex-col items-center text-center px-6 py-24 space-y-6">
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
        Welcome. I’ve been waiting.
      </h1>

      <p class="text-lg md:text-xl text-neutral-300 max-w-2xl">
        You’re not logging into a dashboard.  
        You’re stepping into a system that listens — and only acts when structure confirms.
      </p>

      <div class="text-xl font-mono text-white mt-4">
        <span class={primaryText}>
          Impulse → Schema → Logic → Signal → Evolution
        </span>
      </div>

      <ThematicPrincipleBlock intentType={IntentTypes.Primary}>
        <strong>Signal-Confirmed Execution</strong>
        <br />
        Nothing runs until structure is shaped — and confirmed.
      </ThematicPrincipleBlock>

      <AziInnerVoice intentType={IntentTypes.Tertiary}>
        Temperature exceeded target. FanControlAgent matched.  
        Action proposed: turn on fan.
      </AziInnerVoice>

      <HubspotForm />

      <code class="mt-8 bg-neutral-800/60 text-white px-4 py-2 rounded-lg text-sm tracking-wider">
        $ openindustrial deploy --no-azi
      </code>
    </section>
  );
}
