import type { JSX } from 'preact';

import { Action, ActionStyleTypes } from '@o-industrial/atomic/atoms';

import type { MarketingAction } from '../../../../src/marketing/content.ts';

function mapIntent(intent?: MarketingAction['intent']): ActionStyleTypes {
  switch (intent) {
    case 'secondary':
      return ActionStyleTypes.Outline | ActionStyleTypes.Rounded;
    case 'ghost':
      return ActionStyleTypes.Thin | ActionStyleTypes.Link;
    case 'primary':
    default:
      return ActionStyleTypes.Solid | ActionStyleTypes.Rounded;
  }
}

interface MarketingActionButtonProps {
  action?: MarketingAction;
  class?: string;
}

export function MarketingActionButton({
  action,
  class: className,
}: MarketingActionButtonProps): JSX.Element | null {
  if (!action) {
    return null;
  }

  const componentClass = className ? `w-full sm:w-auto ${className}` : 'w-full sm:w-auto';

  return (
    <Action
      class={componentClass}
      href={action.href}
      styleType={mapIntent(action.intent)}
      target={action.external ? '_blank' : undefined}
      rel={action.external ? 'noopener noreferrer' : undefined}
    >
      {action.label}
    </Action>
  );
}

type ActionAlign = 'start' | 'center' | 'end';
type StackBreakpoint = 'sm' | 'md' | 'lg';

interface MarketingActionGroupProps {
  primary?: MarketingAction;
  secondary?: MarketingAction;
  align?: ActionAlign;
  stackAt?: StackBreakpoint;
  class?: string;
}

const stackClassMap: Record<StackBreakpoint, string> = {
  sm: 'sm:flex-row sm:items-center',
  md: 'md:flex-row md:items-center',
  lg: 'lg:flex-row lg:items-center',
};

const alignClassMap: Record<ActionAlign, string> = {
  start: 'sm:justify-start',
  center: 'sm:justify-center',
  end: 'sm:justify-end',
};

export function MarketingActionGroup({
  primary,
  secondary,
  align = 'center',
  stackAt = 'sm',
  class: className,
}: MarketingActionGroupProps): JSX.Element | null {
  if (!primary && !secondary) {
    return null;
  }

  const baseClass = 'flex flex-col gap-3';
  const stackClass = stackClassMap[stackAt];
  const alignClass = alignClassMap[align];
  const combinedClass = [baseClass, stackClass, alignClass, className].filter(Boolean).join(' ');

  return (
    <div class={combinedClass}>
      <MarketingActionButton action={primary} />
      <MarketingActionButton action={secondary} />
    </div>
  );
}
