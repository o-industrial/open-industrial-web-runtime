import { Action, ActionStyleTypes } from '../../atoms/Action.tsx';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { SimulatorIcon } from '../../../../build/iconset/icons/SimulatorIcon.tsx';

export type SystemControlsProps = {
  onOpenSimulatorLibrary?: () => void;
  simIntent?: IntentTypes;
};

export function SystemControls({
  onOpenSimulatorLibrary,
  simIntent = IntentTypes.Tertiary,
}: SystemControlsProps) {
  return (
    <div class="flex flex-row items-center justify-center gap-2 px-2 py-1 bg-neutral-900/80 backdrop-blur-sm border border-neutral-700 rounded-md shadow-sm">
      <Action
        styleType={ActionStyleTypes.Icon | ActionStyleTypes.Thin}
        intentType={simIntent}
        onClick={onOpenSimulatorLibrary}
        title="Open Simulator Library"
      >
        <SimulatorIcon class="w-4 h-4" />
      </Action>
    </div>
  );
}
