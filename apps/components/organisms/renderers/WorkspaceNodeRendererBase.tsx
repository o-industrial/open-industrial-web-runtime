import { useState } from 'preact/hooks';
import { classSet } from '@fathym/atomic';
import { ComponentChildren, JSX } from 'preact';
import { Icon } from '@fathym/atomic-icons/browser';
import { Action, ActionStyleTypes } from '../../atoms/Action.tsx';
import { CloseIcon } from '../../../../build/iconset/icons/CloseIcon.tsx';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';

export type WorkspaceNodeState = 'default' | 'expanded';

export type WorkspaceNodeStatus = 'normal' | 'warning' | 'error' | 'proposal';

export type WorkspaceNodeRendererBaseProps = {
  iconKey?: string;
  label?: string;
  status?: WorkspaceNodeStatus;
  isSelected?: boolean;

  outerClass?: string;
  class?: string;

  preMain?: ComponentChildren;
  preInner?: ComponentChildren;
  postInner?: ComponentChildren;
  postMain?: ComponentChildren;

  children?: ComponentChildren;
  enabled?: boolean;

  onDoubleClick?: () => void;
} & JSX.HTMLAttributes<HTMLDivElement>;

/**
 * WorkspaceNodeRendererBase
 *
 * Base layout and interaction shell for any node.
 * Supports expand/collapse, icon injection, status styling, and slot customization.
 */
export default function WorkspaceNodeRendererBase({
  iconKey,
  label,
  status = 'normal',
  isSelected,
  class: className,
  outerClass,
  preMain,
  preInner,
  postInner,
  postMain,
  children,
  enabled,
  onDoubleClick,
  ...props
}: WorkspaceNodeRendererBaseProps) {
  const [state, setState] = useState<WorkspaceNodeState>('default');

  let clickTimer: number | null = null;

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (clickTimer) {
      clearTimeout(clickTimer);
      clickTimer = null;
    } else {
      clickTimer = setTimeout(() => {
        setState('expanded');
        clickTimer = null;
      }, 250);
    }
  };

  const handleDoubleClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (clickTimer) {
      clearTimeout(clickTimer);
      clickTimer = null;
    }

    onDoubleClick?.();
  };

  const statiMap = {
    normal: {
      border: isSelected ? '-:border-indigo-700' : '-:border-neutral-700',
      background: isSelected ? '-:bg-indigo-300/30' : '-:bg-neutral-300/30',
    },
    warning: {
      border: '-:border-neon-yellow-700',
      background: '-:bg-neon-yellow-300/30',
    },
    error: {
      border: '-:border-neon-red-700',
      background: '-:bg-neon-red-300/30',
    },
    proposal: {
      border: '-:border-neon-cyan-700',
      background: '-:bg-neon-cyan-300/30',
    },
  };

  const statusMap = statiMap[status ?? 'normal'];

  const statusClasses = `${statusMap.border} ${statusMap.background}`;

  return (
    <div
      class={classSet(
        [
          '-:relative -:flex -:flex-row -:items-center -:align-middle',
          !enabled ? 'opacity-40' : '',
          !enabled ? 'pointer-events-none' : '',
        ],
        { class: outerClass }
      )}
      style={{ pointerEvents: 'auto', zIndex: 1 }}
      onClick={enabled === false ? undefined : handleClick}
      onDblClick={handleDoubleClick}
    >
      {enabled && preMain}

      <div
        data-state={state}
        data-selected={isSelected}
        class={classSet(
          [
            '-:transition-all -:duration-300 -:ease-in-out',
            '-:relative -:rounded-full -:flex -:items-start -:justify-start',
            state === 'default' ? '-:w-14 -:h-14' : '-:w-[250px] -:h-14',
            statusClasses,
          ],
          { class: className }
        )}
        {...props}
      >
        {enabled && preInner}

        <div
          class={classSet([
            'relative w-full',
            state === 'expanded' ? 'h-auto' : 'h-full',
          ])}
        >
          <div
            class={classSet([
              'pointer-events-none absolute',
              '-:flex -:flex-row -:items-center -:justify-center',
              '-:transition-all -:duration-300 -:ease-in-out',
              state === 'default'
                ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                : 'top-2 left-2 translate-x-0 translate-y-0',
            ])}
          >
            {iconKey && (
              <Icon
                icon={iconKey}
                src="/icons/iconset"
                class={classSet([
                  '-:transition-all -:duration-300 -:ease-in-out',
                  state === 'default' ? 'w-6 h-6' : 'w-8 h-8',
                ])}
              />
            )}

            {label && (
              <span
                class={classSet([
                  '-:transition-all -:duration-750 -:ease-in-out',
                  state === 'default'
                    ? '-:ml-0 -:opacity-0'
                    : '-:ml-1 -:opacity-100',
                ])}
              >
                {state !== 'default' && label}
              </span>
            )}
          </div>

          <div class="pt-8">{state !== 'default' && children}</div>
        </div>

        {enabled && postInner}

        {state === 'expanded' && (
          <Action
            title="Collapse"
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              setState('default');
            }}
            styleType={ActionStyleTypes.Icon}
            intentType={IntentTypes.Error}
            class="-:absolute -:top-0 -:right-0 -:font-bold -:pointer-events-auto"
          >
            <CloseIcon class="w-6 h-6" />
          </Action>
        )}
      </div>

      {enabled && postMain}
    </div>
  );
}
