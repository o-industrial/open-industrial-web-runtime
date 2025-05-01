import { ComponentChildren, JSX } from 'preact';
import { Icon } from '@fathym/atomic-icons/browser';
import { classSet } from '@fathym/atomic';
import { Action, ActionStyleTypes } from '../../atoms/Action.tsx';
import { DeleteIcon } from '../../../../build/iconset/icons/DeleteIcon.tsx';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { ToggleCheckbox } from '../../atoms/ToggleCheckbox.tsx';

export type InspectorBaseProps = {
  iconKey?: string;
  label?: string;
  status?: 'normal' | 'warning' | 'error' | 'proposal';
  class?: string;
  children?: ComponentChildren;

  enabled?: boolean;
  onToggleEnabled?: (next: boolean) => void;

  onDelete?: () => void;
};

export function InspectorBase({
  iconKey,
  label,
  status = 'normal',
  class: className,
  children,
  enabled,
  onToggleEnabled,
  onDelete,
}: InspectorBaseProps): JSX.Element {
  const intentClasses = {
    normal: '',
    warning: 'text-neon-yellow-400',
    error: 'text-neon-red-400',
    proposal: 'text-neon-cyan-400',
  }[status];

  return (
    <section class={classSet(['w-full mb-4', intentClasses, className])}>
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          {onToggleEnabled !== undefined && (
            <ToggleCheckbox
              checked={enabled ?? true}
              onToggle={onToggleEnabled}
              title="Enable or disable node"
              checkedIntentType={IntentTypes.Info}
              uncheckedIntentType={IntentTypes.Error}
            />
          )}

          {iconKey && (
            <Icon icon={iconKey} src="/icons/iconset" class="w-5 h-5" />
          )}

          {label && (
            <h3 class="text-sm font-semibold uppercase tracking-wide">
              {label}
            </h3>
          )}
        </div>

        {onDelete && (
          <Action
            title="Delete Node"
            intentType={IntentTypes.Error}
            styleType={ActionStyleTypes.Icon}
            onClick={onDelete}
          >
            <DeleteIcon class="w-4 h-4" />
          </Action>
        )}
      </div>

      <div class="space-y-2">{children}</div>
    </section>
  );
}
