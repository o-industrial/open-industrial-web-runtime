// src/components/molecules/BreadcrumbBar.tsx

import { JSX } from 'preact';
import { classSet } from '@fathym/atomic';
import { IntentTypes } from '../../../src/types/IntentTypes.ts';
import { Action, ActionStyleTypes } from '../atoms/Action.tsx';
import { SettingsIcon } from '../../../build/iconset/icons/SettingsIcon.tsx';

export type BreadcrumbBarProps = {
  pathParts: string[];
  rootIntentType?: IntentTypes;
  activeIntentType?: IntentTypes;
  onSettingsClick?: () => void;
  settingsTitle?: string;
  settingsIntentType?: IntentTypes;
};

export default function BreadcrumbBar({
  pathParts,
  rootIntentType = IntentTypes.None,
  activeIntentType = IntentTypes.Primary,
  onSettingsClick,
  settingsTitle = 'Workspace Settings',
  settingsIntentType = IntentTypes.Info,
}: BreadcrumbBarProps): JSX.Element {
  const rootPath = pathParts.slice(0, -1).join(' / ');
  const activePath = pathParts[pathParts.length - 1];

  const rootIntentClass = getTextIntentClass(rootIntentType);
  const activeIntentClass = getTextIntentClass(activeIntentType);

  return (
    <div
      class={classSet([
        '-:w-full -:text-xs -:bg-neutral-900',
        '-:tracking-wide -:font-light -:px-4 -:pt-1.5 -:pb-1',
        '-:flex -:items-center -:justify-between',
      ])}
    >
      <div class='-:truncate'>
        {rootPath && <span class={rootIntentClass}>{rootPath} /</span>}
        <span class={activeIntentClass}>{activePath}</span>
      </div>

      {onSettingsClick && (
        <Action
          title={settingsTitle}
          onClick={onSettingsClick}
          styleType={ActionStyleTypes.Icon | ActionStyleTypes.Thin}
          intentType={settingsIntentType}
        >
          <SettingsIcon class='w-4 h-4' />
        </Action>
      )}
    </div>
  );
}

// ⬇ Utility to map IntentTypes to text color
function getTextIntentClass(intent: IntentTypes): string {
  switch (intent) {
    case IntentTypes.Primary:
      return '-:text-neon-violet-400';
    case IntentTypes.Secondary:
      return '-:text-neon-indigo-400';
    case IntentTypes.Tertiary:
      return '-:text-neon-blue-400';
    case IntentTypes.Warning:
      return '-:text-neon-yellow-400';
    case IntentTypes.Error:
      return '-:text-neon-red-400';
    case IntentTypes.Info:
    default:
      return '-:text-neon-neutral-400';
  }
}
