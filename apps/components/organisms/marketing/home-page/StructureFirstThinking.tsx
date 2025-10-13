import { IntentTypes } from '@o-industrial/common/types';
import {
  MarketingSectionShell,
  SectionHeader,
  SystemMindset,
  ThematicPrincipleBlock,
} from '@o-industrial/atomic/molecules';
import { getIntentStyles } from '@o-industrial/atomic/utils';

export default function StructureFirstThinking(): JSX.Element {
  const codeColor = getIntentStyles(IntentTypes.Primary).text;

  return (
    <MarketingSectionShell
      id='structure-first-thinking'
      variant='lavender'
      aria-label='Structure-first thinking section'
    >
      <SectionHeader
        align='center'
        title='Structure First. Behavior Follows.'
        description="You didn't write an automation. You shaped a contract—and now your system executes on meaning, not guesswork."
      />

      <div class='mx-auto text-center text-xl font-mono text-white'>
        <span class={codeColor}>
          Schema + Logic + Confirmed Execution + Versioned Signal
        </span>
      </div>

      <div class='mx-auto flex max-w-3xl flex-col items-center gap-6 text-center'>
        <ThematicPrincipleBlock intentType={IntentTypes.Primary}>
          <strong>No more brittle flows.</strong>
          <br />
          Every action is scoped to structure. Every structure is versioned. Nothing breaks when
          reality shifts.
        </ThematicPrincipleBlock>

        <SystemMindset intentType={IntentTypes.Tertiary}>
          Pipelines enforce behavior. You defined logic that listens—and only acts when it should.
        </SystemMindset>
      </div>
    </MarketingSectionShell>
  );
}
