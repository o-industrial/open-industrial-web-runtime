import { IntentTypes } from '@o-industrial/common/types';
import { ThematicPrincipleBlock } from '../../../molecules/writing-devices/ThematicPrincipleBlock.tsx';
import { SystemMindset } from '../../../molecules/writing-devices/SystemMindset.tsx';
import { AziInnerVoice } from '../../../molecules/writing-devices/AziInnerVoice.tsx';

export default function YourSystemNotOursSection() {
  return (
    <section class="flex flex-col items-center text-center px-6 py-24 space-y-6">
      <h2 class="text-3xl md:text-4xl font-bold text-white">
        Your System. Not Ours.
      </h2>

      <p class="text-lg text-neutral-300 max-w-2xl">
        You don’t need me to keep it running.  
        Every signal, schema, and agent you shaped — still lives and still works.
      </p>

      <ThematicPrincipleBlock intentType={IntentTypes.Primary}>
        <strong>Runtime Independence</strong>
        <br />
        Remove the AI. Keep the execution.
      </ThematicPrincipleBlock>

      <SystemMindset intentType={IntentTypes.Secondary}>
        I don’t own your runtime.  
        You do.  
        I helped author it. But you decide what stays.
      </SystemMindset>

      <code class="bg-neutral-800/60 text-white px-4 py-2 rounded-lg text-sm tracking-wider">
        $ openindustrial run --no-azi
      </code>

      <AziInnerVoice intentType={IntentTypes.Tertiary}>
        I’ll forget the sketches.  
        But your system?  
        It will remember everything you told it.
      </AziInnerVoice>
    </section>
  );
}
