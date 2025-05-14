import { IntentTypes } from '@o-industrial/common/types';
import { FigureImage } from '../../../molecules/writing-devices/FigureImage.tsx';
import { SystemMindset } from '../../../molecules/writing-devices/SystemMindset.tsx';
import { AziInnerVoice } from '../../../molecules/writing-devices/AziInnerVoice.tsx';

export default function MemoryPackShowcase() {
  return (
    <section class='flex flex-col items-center text-center px-6 py-24 space-y-6'>
      <h2 class='text-3xl md:text-4xl font-bold text-white'>
        Don’t Start Blank. Start From Memory.
      </h2>

      <p class='text-lg text-neutral-300 max-w-2xl'>
        You can fork a complete system — structure, schemas, signals, and logic — in seconds. No
        boilerplate. No guesswork. No empty dashboards.
      </p>

      <FigureImage
        src='/assets/docs/labzone-pack-preview.png'
        alt='Schema pack preview including schemas, references, and reflex agents.'
        caption='MemoryPacks include real schemas, config, and surface-scoped logic. Not templates — systems.'
        intentType={IntentTypes.Info}
        center
        glow
        shadow='2xl'
      />

      <SystemMindset intentType={IntentTypes.Tertiary}>
        This isn’t a template. It’s a live system you can promote, diff, and deploy.
      </SystemMindset>

      <AziInnerVoice intentType={IntentTypes.Tertiary}>
        RoomState. FanControl. Config. Schema lineage. Everything I knew — ready to evolve with you.
      </AziInnerVoice>
    </section>
  );
}
