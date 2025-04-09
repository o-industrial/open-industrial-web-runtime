import { PageProps } from '@fathym/eac-applications/preact';
import { DocsConfig, DocsNavItem } from '@fathym/eac-applications/runtime/processors';
import { JSX } from 'preact';

export function Header({
  config,
  activePath,
}: {
  config: DocsConfig;
  activePath?: string;
}) {
  return (
    <header class='relative z-40 border-b border-slate-800 px-6 py-4 bg-slate-900 text-white'>
      <div class='flex items-center justify-between'>
        <div class='text-xl font-semibold tracking-wide'>
          Fathym AAIDEN Documentation
        </div>

        <details class='sm:hidden relative'>
          <summary class='cursor-pointer list-none'>
            <span class='inline-block px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-sm'>
              Menu
            </span>
          </summary>

          <div class='absolute top-full right-0 mt-2 z-50 bg-slate-100 dark:bg-slate-950 shadow-lg w-64 max-h-[80vh] overflow-y-auto border border-slate-200 dark:border-slate-800 rounded'>
            <SidebarNav config={config} activePath={activePath} />
          </div>
        </details>
      </div>
    </header>
  );
}

export function SidebarNav(props: { config: DocsConfig; activePath?: string }) {
  const renderNavItems = (items: DocsNavItem[], level = 0): JSX.Element[] => {
    return items.map((item) => {
      const hasChildren = item.Children && item.Children.length > 0;
      const isActive = props.activePath === item.Path;
      const isAncestorOfActive = hasChildren
        ? item.Children!.some((child) => props.activePath?.startsWith(child.Path))
        : false;

      const baseLinkClasses = 'block px-2 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800';
      const activeLinkClasses =
        'bg-slate-300 dark:bg-slate-800 font-bold text-slate-900 dark:text-white';
      const inactiveLinkClasses = 'text-slate-600 dark:text-white';

      if (hasChildren) {
        return (
          <details class='group' open={isAncestorOfActive || isActive}>
            <summary
              class={`px-2 py-1 rounded font-semibold hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-between ${
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
    <aside class='hidden sm:block w-64 bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-white border-r border-slate-200 dark:border-slate-800'>
      <div class='h-screen sticky top-0 flex flex-col'>
        <div class='overflow-y-auto px-4 py-6 flex-1'>
          <div class='text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2'>
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
    <ul class={`ml-${level * 4} mt-${level > 0 ? 2 : 0} space-y-2 list-none`}>
      {items.map((item) => (
        <li>
          <a
            href={`./${item.Path}`}
            class='block text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:underline transition-colors'
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
      <aside class='hidden lg:block text-sm text-slate-600 dark:text-slate-400 h-screen sticky top-0'>
        <div class='overflow-y-auto h-full px-4 py-6'>
          <div class='font-semibold text-slate-700 dark:text-slate-500 mb-2 ml-6'>
            On this page
          </div>
          {renderTOC(nav)}
        </div>
      </aside>

      <details class='lg:hidden sticky bottom-0 bg-slate-50 dark:bg-slate-900 p-4 z-40'>
        <summary class='w-full bg-slate-700 text-white rounded-md text-center py-2 cursor-pointer shadow'>
          On this page
        </summary>

        <div class='mt-2 border border-slate-300 dark:border-slate-700 rounded-md max-h-[60vh] overflow-y-auto px-4 py-2 bg-white dark:bg-slate-950 shadow-lg space-y-2'>
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
    <footer class='border-t border-slate-200 dark:border-slate-800 px-8 py-10 grid grid-cols-1 sm:grid-cols-2 gap-6'>
      {/* Previous Page */}
      {prev
        ? (
          <a
            href={prev.Path}
            class='group block border border-slate-200 dark:border-slate-800 rounded-lg p-5 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors'
          >
            <div class='text-xs text-slate-500 dark:text-slate-400 mb-1'>
              ← Previous
            </div>
            <div class='text-base font-semibold text-slate-800 dark:text-white group-hover:underline'>
              {prev.Title}
            </div>
            {prev.Abstract && (
              <p class='text-slate-600 dark:text-slate-400 text-sm mt-1 line-clamp-2'>
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
          class={`group block border border-slate-200 dark:border-slate-800 rounded-lg p-5 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors
            ${!hasBoth ? 'sm:col-start-2 text-left sm:text-right' : 'text-right sm:text-left'}
          `}
        >
          <div class='text-xs text-slate-500 dark:text-slate-400 mb-1'>
            Next →
          </div>
          <div class='text-base font-semibold text-slate-800 dark:text-white group-hover:underline'>
            {next.Title}
          </div>
          {next.Abstract && (
            <p class='text-slate-600 dark:text-slate-400 text-sm mt-1 line-clamp-2'>
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
          href='/assets/thinky.png'
          data-eac-bypass-base
        />

        <link
          rel='stylesheet'
          href={`/tailwind/styles.css?Revision=${Revision}`}
          data-eac-bypass-base
        />
      </head>

      <body class='bg-slate-50 dark:bg-slate-900 text-black dark:text-white font-sans'>
        <div class='h-screen flex flex-col'>
          <Header config={Data.$Config} activePath={Data.CurrentPath} />

          {/* Main Layout */}
          <div class='flex flex-1 overflow-hidden'>
            <SidebarNav config={Data.$Config} activePath={Data.CurrentPath} />

            {/* Main Content Area */}
            <main class='flex-1 flex flex-col overflow-y-auto'>
              <div class='flex-1 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8 px-4 md:px-8 py-10 prose dark:prose-invert max-w-none'>
                {/* MDX Content */}
                <div>
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
