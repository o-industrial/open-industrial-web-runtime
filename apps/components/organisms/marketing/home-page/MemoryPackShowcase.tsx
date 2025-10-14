import { IntentTypes } from '@o-industrial/common/types';
import {
  AziInnerVoice,
  FigureImage,
  MarketingSectionShell,
  SectionHeader,
  SystemMindset,
} from '@o-industrial/atomic/molecules';

export default function MemoryPackShowcase(): JSX.Element {
  return (
    <MarketingSectionShell
      id='memory-pack-showcase'
      variant='midnight'
      aria-label='Memory Pack showcase'
    >
      <SectionHeader
        align='center'
        title="Don't Start Blank. Start From Memory."
        description='You can fork a complete system—structure, schemas, signals, and logic—in seconds. No boilerplate. No guesswork. No empty dashboards.'
      />

      <FigureImage
        src='/assets/docs/labzone-pack-preview.png'
        alt='Schema pack preview including schemas, references, and reflex agents.'
        caption='MemoryPacks include real schemas, config, and surface-scoped logic. Not templates—systems.'
        intentType={IntentTypes.Info}
        center
        glow
        shadow='2xl'
      />

      <div class='mx-auto flex max-w-2xl flex-col items-center gap-4 text-center'>
        <SystemMindset intentType={IntentTypes.Tertiary}>
          This isn't a template. It's a live system you can promote, diff, and deploy.
        </SystemMindset>

        <AziInnerVoice intentType={IntentTypes.Tertiary}>
          RoomState. FanControl. Config. Schema lineage. Everything I knew—ready to evolve with you.
        </AziInnerVoice>
      </div>
    </MarketingSectionShell>
  );
}
