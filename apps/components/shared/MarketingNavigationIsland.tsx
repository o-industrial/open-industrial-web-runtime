import { JSX } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import { Action, ActionStyleTypes } from '@o-industrial/common/atomic/atoms';
import type {
  MarketingNavCTA,
  MarketingNavigationProps,
  MarketingNavLink,
} from '@o-industrial/common/atomic/organisms';

import { useCaseOverview } from '../../../src/marketing/use-cases.ts';

export const IsIsland = true;

const useCaseMenuItems: MarketingNavLink[] = [
  { label: 'Overview', href: '/use-case' },
  ...useCaseOverview.map((useCase) => ({
    label: useCase.title,
    href: useCase.href,
  })),
];

const cn = (...classes: Array<string | undefined | null | false>): string =>
  classes.filter(Boolean).join(' ');

const isActiveLink = (href: string, currentPath?: string): boolean => {
  if (!currentPath) {
    return false;
  }

  return currentPath === href || currentPath.startsWith(`${href}/`);
};

const mapIntent = (intent?: MarketingNavCTA['intent']): ActionStyleTypes => {
  switch (intent) {
    case 'secondary':
      return ActionStyleTypes.Outline | ActionStyleTypes.Rounded;
    case 'ghost':
      return ActionStyleTypes.Thin | ActionStyleTypes.Link;
    case 'primary':
    default:
      return ActionStyleTypes.Solid | ActionStyleTypes.Rounded;
  }
};

export default function MarketingNavigationIsland({
  links,
  ctas = [],
  currentPath,
  class: className,
  ...rest
}: MarketingNavigationProps): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [useCaseOpen, setUseCaseOpen] = useState(false);

  const menuItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const useCaseButtonRef = useRef<HTMLButtonElement | null>(null);
  const useCaseContainerRef = useRef<HTMLDivElement | null>(null);
  const useCaseMenuRef = useRef<HTMLDivElement | null>(null);
  const hoverCloseTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (hoverCloseTimeout.current !== undefined) {
        clearTimeout(hoverCloseTimeout.current);
      }
    };
  }, []);

  const useCasesLink = links.find((link) => link.href === '/use-case');
  const otherLinks = links.filter((link) => link.href !== '/use-case');

  const toggleMobile = () => setMobileOpen((open) => !open);
  const closeMobile = () => setMobileOpen(false);

  const clearHoverCloseTimeout = () => {
    if (hoverCloseTimeout.current !== undefined) {
      clearTimeout(hoverCloseTimeout.current);
      hoverCloseTimeout.current = undefined;
    }
  };

  const openUseCaseFlyout = () => {
    clearHoverCloseTimeout();
    setUseCaseOpen(true);
  };

  const scheduleUseCaseClose = () => {
    clearHoverCloseTimeout();
    hoverCloseTimeout.current = setTimeout(() => {
      setUseCaseOpen(false);
    }, 150);
  };

  const closeUseCaseFlyout = () => {
    clearHoverCloseTimeout();
    setUseCaseOpen(false);
  };

  const toggleUseCaseFlyout = () => {
    if (useCaseOpen) {
      closeUseCaseFlyout();
    } else {
      openUseCaseFlyout();
    }
  };

  const highlightUseCases = useCaseMenuItems.some((item) => isActiveLink(item.href, currentPath));

  const focusFirstUseCaseLink = () => {
    queueMicrotask(() => {
      menuItemRefs.current[0]?.focus();
    });
  };

  const handleUseCaseButtonKeyDown = (
    event: JSX.TargetedKeyboardEvent<HTMLButtonElement>,
  ) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        openUseCaseFlyout();
        focusFirstUseCaseLink();
        break;
      case 'ArrowDown':
        event.preventDefault();
        openUseCaseFlyout();
        focusFirstUseCaseLink();
        break;
      case 'Escape':
        event.preventDefault();
        closeUseCaseFlyout();
        break;
      default:
        break;
    }
  };

  const handleUseCaseBlur = (
    event: JSX.TargetedFocusEvent<HTMLElement>,
  ) => {
    const next = event.relatedTarget as Node | null;
    if (!next) {
      closeUseCaseFlyout();
      return;
    }

    if (
      useCaseContainerRef.current?.contains(next) ||
      useCaseMenuRef.current?.contains(next)
    ) {
      return;
    }

    closeUseCaseFlyout();
  };

  return (
    <nav
      {...rest}
      class={cn('relative flex items-center gap-4', className)}
    >
      <div class='hidden items-center gap-8 md:flex'>
        <div
          ref={useCaseContainerRef}
          class='relative'
          onMouseEnter={openUseCaseFlyout}
          onMouseLeave={scheduleUseCaseClose}
          onBlurCapture={handleUseCaseBlur}
        >
          <button
            ref={useCaseButtonRef}
            type='button'
            class={cn(
              'inline-flex items-center gap-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950',
              highlightUseCases
                ? 'text-neutral-900 dark:text-white'
                : 'text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white',
            )}
            aria-haspopup='menu'
            aria-expanded={useCaseOpen}
            onClick={(event) => {
              event.preventDefault();
              toggleUseCaseFlyout();
            }}
            onKeyDown={handleUseCaseButtonKeyDown}
            onFocus={openUseCaseFlyout}
          >
            {useCasesLink?.label ?? 'Use Cases'}
            <svg
              class={cn(
                'h-3 w-3 transition-transform duration-150',
                useCaseOpen ? 'rotate-180' : 'rotate-0',
              )}
              viewBox='0 0 10 6'
              aria-hidden='true'
            >
              <path
                d='M1 1l4 4 4-4'
                fill='none'
                stroke='currentColor'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          </button>

          <div
            ref={useCaseMenuRef}
            class={cn(
              'absolute left-0 top-full z-40 mt-4 w-72 rounded-3xl border border-neutral-200/70 bg-white/95 p-4 shadow-[0_30px_120px_-60px_rgba(15,23,42,0.35)] backdrop-blur-lg transition-all duration-150 dark:border-white/10 dark:bg-neutral-900/95 dark:shadow-[0_40px_160px_-80px_rgba(129,140,248,0.45)]',
              useCaseOpen
                ? 'pointer-events-auto translate-y-0 opacity-100'
                : 'pointer-events-none -translate-y-2 opacity-0',
            )}
            onMouseEnter={openUseCaseFlyout}
            onMouseLeave={scheduleUseCaseClose}
          >
            <div class='flex flex-col gap-1.5'>
              {useCaseMenuItems.map((item, index) => {
                const active = isActiveLink(item.href, currentPath);

                return (
                  <a
                    key={item.href}
                    ref={(anchor) => (menuItemRefs.current[index] = anchor)}
                    href={item.href}
                    class={cn(
                      'flex flex-col gap-0.5 rounded-2xl border border-transparent px-4 py-3 text-left transition-colors',
                      active
                        ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white',
                    )}
                    onClick={() => closeUseCaseFlyout()}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') {
                        event.preventDefault();
                        closeUseCaseFlyout();
                        useCaseButtonRef.current?.focus();
                      }
                    }}
                    onBlur={handleUseCaseBlur}
                  >
                    <span class='text-sm font-medium'>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {otherLinks.map((link) => {
          const active = isActiveLink(link.href, currentPath);

          return (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              class={cn(
                'text-sm font-medium transition-colors',
                active
                  ? 'text-neutral-900 dark:text-white'
                  : 'text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white',
              )}
              onClick={closeUseCaseFlyout}
            >
              {link.label}
            </a>
          );
        })}
      </div>

      <div class='hidden items-center gap-3 md:flex'>
        {ctas.map((cta) => (
          <Action
            key={cta.href}
            href={cta.href}
            target={cta.external ? '_blank' : undefined}
            rel={cta.external ? 'noopener noreferrer' : undefined}
            styleType={mapIntent(cta.intent)}
          >
            {cta.label}
          </Action>
        ))}
      </div>

      <div class='flex items-center gap-3 md:hidden'>
        <button
          type='button'
          class='inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white p-2 text-neutral-700 shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 dark:focus-visible:ring-offset-neutral-950'
          aria-expanded={mobileOpen}
          onClick={toggleMobile}
        >
          <span class='sr-only'>Toggle navigation</span>
          {mobileOpen
            ? (
              <svg class='h-5 w-5' viewBox='0 0 20 20' aria-hidden='true'>
                <path
                  d='M5 5l10 10M15 5L5 15'
                  stroke='currentColor'
                  stroke-width='1.5'
                  stroke-linecap='round'
                />
              </svg>
            )
            : (
              <svg class='h-5 w-5' viewBox='0 0 20 20' aria-hidden='true'>
                <path
                  d='M3 6h14M3 10h14M3 14h14'
                  stroke='currentColor'
                  stroke-width='1.5'
                  stroke-linecap='round'
                />
              </svg>
            )}
        </button>
      </div>

      {mobileOpen
        ? (
          <div class='absolute left-0 top-full z-40 mt-3 w-full rounded-3xl border border-neutral-200 bg-white/95 p-5 shadow-[0_35px_160px_-90px_rgba(15,23,42,0.45)] backdrop-blur-lg dark:border-white/10 dark:bg-neutral-900/95 dark:shadow-[0_45px_200px_-110px_rgba(129,140,248,0.55)] md:hidden'>
            <div class='flex flex-col gap-6'>
              <div class='flex flex-col gap-2'>
                <span class='text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400'>
                  Use Cases
                </span>
                <div class='flex flex-col gap-1.5'>
                  {useCaseMenuItems.map((item) => {
                    const active = isActiveLink(item.href, currentPath);

                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        class={cn(
                          'rounded-2xl px-3 py-2 text-sm transition-colors',
                          active
                            ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                            : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white',
                        )}
                        onClick={closeMobile}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div class='flex flex-col gap-2'>
                <span class='text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400'>
                  Navigate
                </span>
                <div class='flex flex-col gap-1.5'>
                  {otherLinks.map((link) => {
                    const active = isActiveLink(link.href, currentPath);

                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        class={cn(
                          'rounded-2xl px-3 py-2 text-sm transition-colors',
                          active
                            ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                            : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white',
                        )}
                        onClick={closeMobile}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>

              {ctas.length
                ? (
                  <div class='flex flex-col gap-2'>
                    {ctas.map((cta) => (
                      <Action
                        key={cta.href}
                        href={cta.href}
                        target={cta.external ? '_blank' : undefined}
                        rel={cta.external ? 'noopener noreferrer' : undefined}
                        styleType={mapIntent(cta.intent)}
                        class='w-full justify-center'
                        onClick={closeMobile}
                      >
                        {cta.label}
                      </Action>
                    ))}
                  </div>
                )
                : null}
            </div>
          </div>
        )
        : null}
    </nav>
  );
}
