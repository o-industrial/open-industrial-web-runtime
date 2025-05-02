import { PageProps } from '@fathym/eac-applications/preact';
import { DocsConfig, DocsNavItem } from '@fathym/eac-applications/runtime/processors';
import { classSet } from '@fathym/atomic';
import { JSX } from 'preact';

export function Header({
  config,
  activePath,
}: {
  config: DocsConfig;
  activePath?: string;
}) {
  return (
    <header class='relative z-40 border-b border-neutral-800 px-6 py-4 bg-neutral-900 text-white'>
      <div class='flex items-center justify-between'>
        <div class='text-xl font-semibold tracking-wide'>
          Fathym AAIDEN Documentation
        </div>

        <details class='sm:hidden relative'>
          <summary class='cursor-pointer list-none'>
            <span class='inline-block px-3 py-1 rounded bg-neutral-700 hover:bg-neutral-600 text-sm'>
              Menu
            </span>
          </summary>

          <div class='absolute top-full right-0 mt-2 z-50 bg-neutral-100 dark:bg-neutral-950 shadow-lg w-64 h-[300px] overflow-y-auto overflow-x-hidden border border-neutral-200 dark:border-neutral-800 rounded'>
            <SidebarNav class='sm:hidden pr-4' config={config} activePath={activePath} />
          </div>
        </details>
      </div>
    </header>
  );
}

export function SidebarNav(props: { config: DocsConfig; activePath?: string; class?: string }) {
  const renderNavItems = (items: DocsNavItem[], level = 0): JSX.Element[] => {
    return items.map((item) => {
      const hasChildren = item.Children && item.Children.length > 0;
      const isActive = (props.activePath ? props.activePath : '/') === item.Path;
      console.log(props.activePath ? props.activePath : '/');
      console.log('===');
      console.log(item.Path);
      console.log();
      const isAncestorOfActive = hasChildren
        ? item.Children!.some((child) => props.activePath?.startsWith(child.Path || '/'))
        : false;

      const baseLinkClasses =
        'block px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800';
      const activeLinkClasses =
        'bg-neutral-300 dark:bg-neutral-800 font-bold text-neutral-900 dark:text-white';
      const inactiveLinkClasses = 'text-neutral-600 dark:text-white';

      if (hasChildren) {
        return (
          <details class='group' open={isAncestorOfActive || isActive}>
            <summary
              class={`px-2 py-1 rounded font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-800 flex items-center justify-between ${
                level > 0 ? 'ml-2' : item.Children?.length ? '' : 'ml-2'
              }`}
            >
              <a
                href={item.Path}
                class={`flex-1 ${
                  isActive
                    ? `${baseLinkClasses} ${activeLinkClasses}`
                    : `${baseLinkClasses} ${inactiveLinkClasses}`
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {item.Title}
              </a>
              <span
                class='ml-2 text-xs cursor-pointer transition-transform duration-200 group-open:rotate-180'
                onClick={(e) => e.preventDefault()}
              >
                ▼
              </span>
            </summary>
            <div class='ml-4 mt-2 space-y-1'>
              {renderNavItems(item.Children ?? [], level + 1)}
            </div>
          </details>
        );
      }

      return (
        <a
          href={item.Path}
          class={`${
            isActive
              ? `${baseLinkClasses} ${activeLinkClasses}`
              : `${baseLinkClasses} ${inactiveLinkClasses}`
          } ${level > 0 ? 'ml-2' : ''}`}
        >
          {item.Title}
        </a>
      );
    });
  };

  return (
    <aside
      class={classSet([
        'w-64 bg-neutral-100 dark:bg-neutral-950 text-neutral-700 dark:text-white border-r border-neutral-200 dark:border-neutral-800',
      ], props)}
    >
      <div class='h-screen sticky top-0 flex flex-col'>
        <div class='overflow-y-auto px-4 py-6 flex-1'>
          <div class='text-sm uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2'>
            {props.config.Title}
          </div>

          <nav class='space-y-2 text-sm'>
            {renderNavItems(props.config.Nav)}
          </nav>
        </div>
      </div>
    </aside>
  );
}

export function renderTOC(items: DocsNavItem[], level = 0): JSX.Element {
  return (
    <ul
      class={`ml-${level * 2} pl-0 mt-${level > 0 ? 2 : 0} space-y-2 list-none`}
    >
      {items.map((item) => (
        <li>
          {level === 0 ? '' : '╰─▶'}
          <a
            href={`./${item.Path}`}
            class='inline text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:underline transition-colors'
          >
            {item.Title}
          </a>
          {item.Children?.length ? renderTOC(item.Children, level + 1) : null}
        </li>
      ))}
    </ul>
  );
}

export function LocalDocNav({ nav }: { nav: DocsNavItem[] }) {
  if (!nav?.length) return null;

  return (
    <>
      <aside class='hidden lg:block text-sm text-neutral-600 dark:text-neutral-400 h-screen sticky top-0'>
        <div class='overflow-y-auto h-full px-4 py-6'>
          <div class='font-semibold text-neutral-700 dark:text-neutral-500 mb-2 ml-2'>
            On this page
          </div>
          {renderTOC(nav)}
        </div>
      </aside>

      <details class='lg:hidden sticky bottom-0 bg-neutral-50 dark:bg-neutral-900 p-4 z-40'>
        <summary class='w-full bg-neutral-700 text-white rounded-md text-center py-2 cursor-pointer shadow'>
          On this page
        </summary>

        <div class='mt-2 border border-neutral-300 dark:border-neutral-700 rounded-md max-h-[60vh] overflow-y-auto px-4 py-2 bg-white dark:bg-neutral-950 shadow-lg space-y-2'>
          {renderTOC(nav)}
        </div>
      </details>
    </>
  );
}

export function PrevNextNav({
  prev,
  next,
}: {
  prev?: DocsNavItem;
  next?: DocsNavItem;
}) {
  const hasBoth = prev && next;

  return (
    <footer class='border-t border-neutral-200 dark:border-neutral-800 px-8 py-10 grid grid-cols-1 sm:grid-cols-2 gap-6'>
      {/* Previous Page */}
      {prev
        ? (
          <a
            href={prev.Path}
            class='group block border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 bg-white dark:bg-neutral-950 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors'
          >
            <div class='text-xs text-neutral-500 dark:text-neutral-400 mb-1'>
              ← Previous
            </div>
            <div class='text-base font-semibold text-neutral-800 dark:text-white group-hover:underline'>
              {prev.Title}
            </div>
            {prev.Abstract && (
              <p class='text-neutral-600 dark:text-neutral-400 text-sm mt-1 line-clamp-2'>
                {prev.Abstract}
              </p>
            )}
          </a>
        )
        : (
          // placeholder to preserve grid alignment
          <div class='hidden sm:block' />
        )}

      {/* Next Page */}
      {next && (
        <a
          href={next.Path}
          class={`group block border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 bg-white dark:bg-neutral-950 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors
            ${!hasBoth ? 'sm:col-start-2 text-left sm:text-right' : 'text-right sm:text-left'}
          `}
        >
          <div class='text-xs text-neutral-500 dark:text-neutral-400 mb-1'>
            Next →
          </div>
          <div class='text-base font-semibold text-neutral-800 dark:text-white group-hover:underline'>
            {next.Title}
          </div>
          {next.Abstract && (
            <p class='text-neutral-600 dark:text-neutral-400 text-sm mt-1 line-clamp-2'>
              {next.Abstract}
            </p>
          )}
        </a>
      )}
    </footer>
  );
}

export default function Layout({ Data, Component, Revision }: PageProps) {
  return (
    <html>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        <title>{Data?.Title ?? 'Documentation'} | Fathym EaC Runtime</title>

        <link
          rel='shortcut icon'
          type='image/png'
          href='/assets/favicon.ico'
          data-eac-bypass-base
        />

        <link
          rel='stylesheet'
          href={`/tailwind/styles.css?Revision=${Revision}`}
          data-eac-bypass-base
        />
      </head>

      <body class='bg-neutral-50 dark:bg-neutral-900'>
        <div class='h-screen flex flex-col'>
          <Header config={Data.$Config} activePath={Data.CurrentPath} />

          {/* Main Layout */}
          <div class='flex flex-1 overflow-hidden'>
            <SidebarNav
              class='hidden sm:block'
              config={Data.$Config}
              activePath={Data.CurrentPath}
            />

            {/* Main Content Area */}
            <main class='flex-1 flex flex-col overflow-y-auto'>
              <div class='flex-1 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8 px-4 md:px-8 py-10 max-w-none prose dark:prose-dark'>
                {/* MDX Content */}
                <div class=''>
                  <Component />
                </div>

                <LocalDocNav nav={Data.$DocNavItems} />
              </div>

              <PrevNextNav prev={Data.$PrevPage} next={Data.$NextPage} />
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
