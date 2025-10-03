import { IntentTypes } from '@o-industrial/common/types';
import { FigureImage, SystemMindset } from '@o-industrial/atomic/molecules';

export default function GitRuntimeLayout() {
  return (
    <section class='flex flex-col items-center text-center px-6 py-24 space-y-6'>
      <h2 class='text-3xl md:text-4xl font-bold text-white'>
        A Runtime You Can Fork
      </h2>

      <p class='text-lg text-neutral-300 max-w-2xl'>
        Every schema, agent, and surface you create lives in a Git-native structure. Version it.
        Diff it. Deploy it anywhere.
      </p>

      <FigureImage
        src='/assets/docs/structure-runtime-map.png'
        alt='Visual map showing agents, schemas, surfaces connected as a deployable system.'
        caption='This runtime isn’t configuration. It’s authored logic and live memory.'
        intentType={IntentTypes.Info}
        center
        glow
        shadow='2xl'
      />

      <code class='mt-6 bg-neutral-800/60 text-white px-4 py-2 rounded-lg text-sm tracking-wider'>
        git clone https://github.com/openindustrial/examples/roomstate-runtime
      </code>

      <SystemMindset intentType={IntentTypes.Tertiary}>
        Your system isn’t a dashboard. It’s a contract — and it lives in code you control.
      </SystemMindset>
    </section>
  );
}

