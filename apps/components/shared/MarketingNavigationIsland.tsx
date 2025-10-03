import { JSX } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

import { Action, ActionStyleTypes } from '@o-industrial/atomic/atoms';
import type {
  MarketingNavCTA,
  MarketingNavigationProps,
  MarketingNavLink,
} from '@o-industrial/atomic/organisms';

import { solutionOverview } from '../../../src/marketing/solutions.ts';
import { useCaseOverview } from '../../../src/marketing/use-cases.ts';

export const IsIsland = true;

type MenuGroup = {
  title: string;
  items: MarketingNavLink[];
};

const solutionsMenuItems = [
  { label: 'Overview', href: '/solutions' },
  ...solutionOverview.map((solution) => ({
    label: solution.title,
    href: solution.href,
  })),
];

const useCaseMenuItems = [
  { label: 'Overview', href: '/use-cases' },
  ...useCaseOverview.map((useCase) => ({
    label: useCase.title,
    href: useCase.href,
  })),
];

const menuGroups: MenuGroup[] = [
  {
    title: 'Solutions',
    items: solutionsMenuItems,
  },
];

if (useCaseOverview.length) {
  menuGroups.push({
    title: 'Use Cases',
    items: useCaseMenuItems,
  });
}

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
  const mobileMenuGroups = useMemo(() => menuGroups, []);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [useCasesOpen, setUseCasesOpen] = useState(false);

  const solutionsItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const useCasesItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const solutionsButtonRef = useRef<HTMLButtonButtonElement | null>(null);
  const useCasesButtonRef = useRef<HTMLButtonElement | null>(null);
  const solutionsContainerRef = useRef<HTMLDivElement | null>(null);
  const useCasesContainerRef = useRef<HTMLDivElement | null>(null);
  const solutionsMenuRef = useRef<HTMLDivElement | null>(null);
  const useCasesMenuRef = useRef<HTMLDivElement | null>(null);
  const solutionsHoverTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const useCasesHoverTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (solutionsHoverTimeout.current !== undefined) {
        clearTimeout(solutionsHoverTimeout.current);
      }

      if (useCasesHoverTimeout.current !== undefined) {
        clearTimeout(useCasesHoverTimeout.current);
      }
    };
  }, []);

  const solutionsLink = links.find((link) => link.href === '/solutions');
  const useCasesLink = links.find((link) => link.href === '/use-cases');
  const otherLinks = links.filter(
    (link) => link.href !== '/solutions' && link.href !== '/use-cases',
  );

  const toggleMobile = () => setMobileOpen((open) => !open);
  const closeMobile = () => setMobileOpen(false);

  const clearSolutionsHoverTimeout = () => {
    if (solutionsHoverTimeout.current !== undefined) {
      clearTimeout(solutionsHoverTimeout.current);
      solutionsHoverTimeout.current = undefined;
    }
  };

  const clearUseCasesHoverTimeout = () => {
    if (useCasesHoverTimeout.current !== undefined) {
      clearTimeout(useCasesHoverTimeout.current);
      useCasesHoverTimeout.current = undefined;
    }
  };

  const openSolutionsFlyout = () => {
    clearSolutionsHoverTimeout();
    setUseCasesOpen(false);
    setSolutionsOpen(true);
  };

  const openUseCasesFlyout = () => {
    clearUseCasesHoverTimeout();
    setSolutionsOpen(false);
    setUseCasesOpen(true);
  };

  const scheduleSolutionsClose = () => {
    clearSolutionsHoverTimeout();
    solutionsHoverTimeout.current = setTimeout(() => {
      setSolutionsOpen(false);
    }, 150);
  };

  const scheduleUseCasesClose = () => {
    clearUseCasesHoverTimeout();
    useCasesHoverTimeout.current = setTimeout(() => {
      setUseCasesOpen(false);
    }, 150);
  };

  const closeSolutionsFlyout = () => {
    clearSolutionsHoverTimeout();
    setSolutionsOpen(false);
  };

  const closeUseCasesFlyout = () => {
    clearUseCasesHoverTimeout();
    setUseCasesOpen(false);
  };

  const focusFirstSolutionsLink = () => {
    queueMicrotask(() => {
      solutionsItemRefs.current[0]?.focus();
    });
  };

  const focusFirstUseCaseLink = () => {
    queueMicrotask(() => {
      useCasesItemRefs.current[0]?.focus();
    });
  };

  const handleSolutionsButtonKeyDown = (
    event: JSX.TargetedKeyboardEvent<HTMLButtonElement>,
  ) => {
    switch (event.key) {
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (solutionsOpen) {
          closeSolutionsFlyout();
        } else {
          openSolutionsFlyout();
          focusFirstSolutionsLink();
        }
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        openSolutionsFlyout();
        focusFirstSolutionsLink();
        break;
      }
      case 'Escape': {
        closeSolutionsFlyout();
        solutionsButtonRef.current?.focus();
        break;
      }
      default:
        break;
    }
  };

  const handleUseCasesButtonKeyDown = (
    event: JSX.TargetedKeyboardEvent<HTMLButtonElement>,
  ) => {
    switch (event.key) {
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (useCasesOpen) {
          closeUseCasesFlyout();
        } else {
          openUseCasesFlyout();
          focusFirstUseCaseLink();
        }
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        openUseCasesFlyout();
        focusFirstUseCaseLink();
        break;
      }
      case 'Escape': {
        closeUseCasesFlyout();
        useCasesButtonRef.current?.focus();
        break;
      }
      default:
        break;
    }
  };

  const handleSolutionsBlur = (event: JSX.TargetedFocusEvent<HTMLAnchorElement>) => {
    const next = event.relatedTarget as HTMLElement | null;

    if (
      !next ||
      solutionsContainerRef.current?.contains(next) ||
      solutionsMenuRef.current?.contains(next)
    ) {
      return;
    }

    closeSolutionsFlyout();
  };

  const handleUseCasesBlur = (event: JSX.TargetedFocusEvent<HTMLAnchorElement>) => {
    const next = event.relatedTarget as HTMLElement | null;

    if (
      !next ||
      useCasesContainerRef.current?.contains(next) ||
      useCasesMenuRef.current?.contains(next)
    ) {
      return;
    }

    closeUseCasesFlyout();
  };

  const highlightSolutions = solutionsMenuItems.some((item) =>
    isActiveLink(item.href, currentPath)
  );
  const highlightUseCases = useCaseOverview.length
    ? useCaseMenuItems.some((item) => isActiveLink(item.href, currentPath))
    : false;

  solutionsItemRefs.current.length = solutionsMenuItems.length;
  useCasesItemRefs.current.length = useCaseMenuItems.length;

  return (
    <nav
      {...rest}
      class={cn('relative flex items-center gap-4', className)}
    >
      <div class='hidden items-center gap-8 md:flex'>
        <div
          ref={solutionsContainerRef}
          class='relative'
          onMouseEnter={openSolutionsFlyout}
          onMouseLeave={scheduleSolutionsClose}
          onBlurCapture={handleSolutionsBlur}
        >
          <button
            ref={solutionsButtonRef}
            type='button'
            class={cn(
              'inline-flex items-center gap-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950',
              highlightSolutions
                ? 'text-neutral-900 dark:text-white'
                : 'text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white',
            )}
            aria-haspopup='menu'
            aria-expanded={solutionsOpen}
            onClick={(event) => {
              event.preventDefault();
              if (solutionsOpen) {
                closeSolutionsFlyout();
              } else {
                openSolutionsFlyout();
              }
            }}
            onKeyDown={handleSolutionsButtonKeyDown}
            onFocus={openSolutionsFlyout}
          >
            {solutionsLink?.label ?? 'Solutions'}
            <svg
              class={cn(
                'h-3 w-3 transition-transform duration-150',
                solutionsOpen ? 'rotate-180' : 'rotate-0',
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
            ref={solutionsMenuRef}
            class={cn(
              'absolute left-0 top-full z-40 mt-4 w-80 rounded-3xl border border-neutral-200/70 bg-white/95 p-4 shadow-[0_30px_120px_-60px_rgba(15,23,42,0.35)] backdrop-blur-lg transition-all duration-150 dark:border-white/10 dark:bg-neutral-900/95 dark:shadow-[0_40px_160px_-80px_rgba(129,140,248,0.45)]',
              solutionsOpen
                ? 'pointer-events-auto translate-y-0 opacity-100'
                : 'pointer-events-none -translate-y-2 opacity-0',
            )}
            onMouseEnter={openSolutionsFlyout}
            onMouseLeave={scheduleSolutionsClose}
          >
            <div class='flex flex-col gap-1'>
              {solutionsMenuItems.map((item, index) => {
                const active = isActiveLink(item.href, currentPath);

                return (
                  <a
                    key={item.href}
                    ref={(anchor) => {
                      solutionsItemRefs.current[index] = anchor;
                    }}
                    href={item.href}
                    class={cn(
                      'flex flex-col gap-0.5 rounded-2xl border border-transparent px-4 py-3 text-left transition-colors',
                      active
                        ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white',
                    )}
                    onClick={() => closeSolutionsFlyout()}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') {
                        event.preventDefault();
                        closeSolutionsFlyout();
                        solutionsButtonRef.current?.focus();
                      }
                    }}
                    onBlur={handleSolutionsBlur}
                  >
                    <span class='text-sm font-medium'>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {useCaseOverview.length
          ? (
            <div
              ref={useCasesContainerRef}
              class='relative'
              onMouseEnter={openUseCasesFlyout}
              onMouseLeave={scheduleUseCasesClose}
              onBlurCapture={handleUseCasesBlur}
            >
              <button
                ref={useCasesButtonRef}
                type='button'
                class={cn(
                  'inline-flex items-center gap-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950',
                  highlightUseCases
                    ? 'text-neutral-900 dark:text-white'
                    : 'text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white',
                )}
                aria-haspopup='menu'
                aria-expanded={useCasesOpen}
                onClick={(event) => {
                  event.preventDefault();
                  if (useCasesOpen) {
                    closeUseCasesFlyout();
                  } else {
                    openUseCasesFlyout();
                  }
                }}
                onKeyDown={handleUseCasesButtonKeyDown}
                onFocus={openUseCasesFlyout}
              >
                {useCasesLink?.label ?? 'Use Cases'}
                <svg
                  class={cn(
                    'h-3 w-3 transition-transform duration-150',
                    useCasesOpen ? 'rotate-180' : 'rotate-0',
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
                ref={useCasesMenuRef}
                class={cn(
                  'absolute left-0 top-full z-40 mt-4 w-80 rounded-3xl border border-neutral-200/70 bg-white/95 p-4 shadow-[0_30px_120px_-60px_rgba(15,23,42,0.35)] backdrop-blur-lg transition-all duration-150 dark:border-white/10 dark:bg-neutral-900/95 dark:shadow-[0_40px_160px_-80px_rgba(129,140,248,0.45)]',
                  useCasesOpen
                    ? 'pointer-events-auto translate-y-0 opacity-100'
                    : 'pointer-events-none -translate-y-2 opacity-0',
                )}
                onMouseEnter={openUseCasesFlyout}
                onMouseLeave={scheduleUseCasesClose}
              >
                <div class='flex flex-col gap-1'>
                  {useCaseMenuItems.map((item, index) => {
                    const active = isActiveLink(item.href, currentPath);

                    return (
                      <a
                        key={item.href}
                        ref={(anchor) => {
                          useCasesItemRefs.current[index] = anchor;
                        }}
                        href={item.href}
                        class={cn(
                          'flex flex-col gap-0.5 rounded-2xl border border-transparent px-4 py-3 text-left transition-colors',
                          active
                            ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                            : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white',
                        )}
                        onClick={() => closeUseCasesFlyout()}
                        onKeyDown={(event) => {
                          if (event.key === 'Escape') {
                            event.preventDefault();
                            closeUseCasesFlyout();
                            useCasesButtonRef.current?.focus();
                          }
                        }}
                        onBlur={handleUseCasesBlur}
                      >
                        <span class='text-sm font-medium'>{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          )
          : null}

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
              {mobileMenuGroups.map((group) => (
                <div key={group.title} class='flex flex-col gap-2'>
                  <span class='text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400'>
                    {group.title}
                  </span>
                  <div class='flex flex-col gap-1.5'>
                    {group.items.map((item) => {
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
              ))}

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
