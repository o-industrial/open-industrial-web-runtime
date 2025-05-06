import { Action, ActionStyleTypes } from '../../atoms/Action.tsx';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';

import { UndoIcon } from '../../../../build/iconset/icons/UndoIcon.tsx';
import { RedoIcon } from '../../../../build/iconset/icons/RedoIcon.tsx';
import { ForkIcon } from '../../../../build/iconset/icons/ForkIcon.tsx';
import { RevertIcon } from '../../../../build/iconset/icons/RevertIcon.tsx';
import { CommitIcon } from '../../../../build/iconset/icons/CommitIcon.tsx';

export type ManagementControlsProps = {
  hasChanges?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  onCommit?: () => void;
  onRevert?: () => void;
  onFork?: () => void;

  commitIntent?: IntentTypes;
  undoIntent?: IntentTypes;
  redoIntent?: IntentTypes;
  revertIntent?: IntentTypes;
  forkIntent?: IntentTypes;
};

export function ManagementControls({
  hasChanges = false,
  onUndo,
  onRedo,
  onCommit,
  onRevert,
  onFork,
  commitIntent,
  undoIntent = IntentTypes.Info,
  redoIntent = IntentTypes.Info,
  revertIntent = IntentTypes.Warning,
  forkIntent = IntentTypes.Tertiary,
}: ManagementControlsProps) {
  const effectiveCommitIntent =
    commitIntent ?? (hasChanges ? IntentTypes.Primary : IntentTypes.Secondary);

  return (
    <div class="group relative flex flex-row-reverse items-center bg-neutral-900/80 backdrop-blur-sm border border-neutral-700 rounded-md shadow-sm overflow-hidden transition-all duration-300">
      {/* Commit Button stays pinned right */}
      <Action
        styleType={ActionStyleTypes.Icon | ActionStyleTypes.Thin}
        intentType={effectiveCommitIntent}
        onClick={onCommit}
        title="Commit Changes"
        class="z-10"
      >
        <CommitIcon class="w-4 h-4" />
      </Action>

      {/* Expandable tools on the left */}
      <div
        class="flex flex-row-reverse gap-2 items-center 
               max-w-0 group-hover:max-w-[300px] 
               opacity-0 group-hover:opacity-100 
               transition-all duration-300 overflow-hidden"
      >
        <Action
          styleType={ActionStyleTypes.Icon | ActionStyleTypes.Thin}
          intentType={undoIntent}
          onClick={onUndo}
          title="Undo"
        >
          <UndoIcon class="w-4 h-4" />
        </Action>

        <Action
          styleType={ActionStyleTypes.Icon | ActionStyleTypes.Thin}
          intentType={redoIntent}
          onClick={onRedo}
          title="Redo"
        >
          <RedoIcon class="w-4 h-4" />
        </Action>

        <Action
          styleType={ActionStyleTypes.Icon | ActionStyleTypes.Thin}
          intentType={revertIntent}
          onClick={onRevert}
          title="Revert to Last Commit"
        >
          <RevertIcon class="w-4 h-4" />
        </Action>

        <Action
          styleType={ActionStyleTypes.Icon | ActionStyleTypes.Thin}
          intentType={forkIntent}
          onClick={onFork}
          title="Fork Runtime"
        >
          <ForkIcon class="w-4 h-4" />
        </Action>
      </div>
    </div>
  );
}
