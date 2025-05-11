import { Action, ActionStyleTypes } from '../../../atoms/Action.tsx';
import { IntentTypes } from '$mdx/writing-devices';
import { AziInnerVoice } from '../../../molecules/writing-devices/AziInnerVoice.tsx';

export default function FinalCTASection() {
  return (
    <section class="flex flex-col items-center text-center px-6 py-24 space-y-6">
      <h2 class="text-3xl md:text-4xl font-bold text-white">
        Ready to Run Without the UI?
      </h2>

      <p class="text-lg text-neutral-300 max-w-2xl">
        Everything you’ve seen can run in CLI, GitOps, or edge.  
        Your runtime is yours — and it doesn’t wait for a login.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 mt-6">
        <Action
          href="/demo"
          intentType={IntentTypes.Primary}
          styleType={
            ActionStyleTypes.Solid |
            ActionStyleTypes.Rounded |
            ActionStyleTypes.Fat
          }
        >
          Fork the Demo Runtime
        </Action>

        <Action
          href="/docs/deploy-cli"
          intentType={IntentTypes.None}
          styleType={
            ActionStyleTypes.Outline |
            ActionStyleTypes.Rounded |
            ActionStyleTypes.Fat
          }
        >
          Deploy Without the UI
        </Action>
      </div>

      <code class="mt-6 bg-neutral-800/60 text-white px-4 py-2 rounded-lg text-sm tracking-wider">
        $ openindustrial deploy --no-azi
      </code>

      <AziInnerVoice intentType={IntentTypes.Tertiary}>
        This isn’t a product tour.  
        It’s your system — waiting to be remembered.
      </AziInnerVoice>
    </section>
  );
}
