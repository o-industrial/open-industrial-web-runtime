import { PageProps } from '@fathym/eac-applications/preact';
import MarketingNavigationIsland from '../components/shared/MarketingNavigationIsland.tsx';
import type { MarketingNavCTA, MarketingNavLink } from '@o-industrial/atomic/organisms';
import {
  ctaLinks as baseCtaLinks,
  footerPrimaryLinks,
  footerSecondaryLinks,
  marketingTagline,
  primaryNavLinks,
} from '../../src/marketing/navigation.ts';

const ctaLinks: MarketingNavCTA[] = baseCtaLinks.map((cta) => ({
  ...cta,
  intent: cta.intent ?? 'primary',
}));
const renderFooterLink = (
  link: MarketingNavLink,
  className =
    'transition-colors text-neutral-600 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white',
) => (
  <a
    key={link.href}
    href={link.href}
    target={link.external ? '_blank' : undefined}
    rel={link.external ? 'noopener noreferrer' : undefined}
    class={`text-sm ${className}`}
  >
    {link.label}
  </a>
);

export default function HomeLayout({
  Data: _Data,
  Component,
  Revision,
}: PageProps) {
  return (
    <html>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        <title>Open Industrial - Telemetry Intelligence for OT & IT</title>
        <meta
          name='description'
          content='Connect MES, SCADA, historians, and lab systems. Ask in plain English. Get governed answers in seconds and publish insights as APIs in your Azure tenant.'
        />
        <meta
          property='og:title'
          content='Open Industrial - Telemetry Intelligence for OT & IT'
        />
        <meta
          property='og:description'
          content='Connect industrial systems, ask naturally with Azi, and share governed insights anywhere - all inside your cloud.'
        />

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

        <script
          charset='utf-8'
          type='text/javascript'
          src='https://js.hsforms.net/forms/embed/v2.js'
        >
        </script>
      </head>

      <body class='bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50'>
        <div class='flex min-h-screen flex-col'>
          <header class='sticky top-0 z-50 border-b border-neutral-200/80 bg-white/85 backdrop-blur-lg dark:border-white/10 dark:bg-neutral-950/95'>
            <div class='mx-auto flex max-w-7xl items-center gap-4 px-6 py-4'>
              <a href='/' class='flex items-center gap-3 group' data-eac-bypass-base>
                <img
                  src='/assets/logos/openIndustrialLogo.svg'
                  alt='Open Industrial'
                  class='h-8 w-auto transition-opacity duration-200 group-hover:opacity-90 dark:hidden'
                  data-eac-bypass-base
                />
                <img
                  src='/assets/logos/openIndustrialLogoWhiteOpen.svg'
                  alt='Open Industrial'
                  class='hidden h-8 w-auto transition-opacity duration-200 group-hover:opacity-90 dark:block'
                  data-eac-bypass-base
                />
              </a>

              <div class='ml-auto flex flex-1 justify-end'>
                <MarketingNavigationIsland
                  links={primaryNavLinks}
                  ctas={ctaLinks}
                  class='w-full justify-end'
                />
              </div>
            </div>
          </header>

          <main class='flex-1 overflow-y-auto overflow-x-hidden'>
            <Component />
          </main>

          <footer class='border-t border-neutral-200/80 bg-white/85 backdrop-blur-lg dark:border-white/10 dark:bg-neutral-950/95'>
            <div class='mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-[1fr_auto] md:items-start'>
              <div class='max-w-xl space-y-4'>
                <a href='/' class='inline-flex items-center gap-3 group' data-eac-bypass-base>
                  <img
                    src='/assets/logos/openIndustrialLogo.svg'
                    alt='Open Industrial'
                    class='h-6 w-auto transition-opacity duration-200 group-hover:opacity-90 dark:hidden'
                    data-eac-bypass-base
                  />
                  <img
                    src='/assets/logos/openIndustrialLogoAllWhite.svg'
                    alt='Open Industrial'
                    class='hidden h-6 w-auto transition-opacity duration-200 group-hover:opacity-90 dark:block'
                    data-eac-bypass-base
                  />
                </a>
                <p class='text-sm text-neutral-600 dark:text-neutral-200'>{marketingTagline}</p>
              </div>

              <div class='flex flex-col gap-6 text-sm sm:flex-row'>
                <div class='flex flex-col gap-2 text-neutral-600 dark:text-neutral-300'>
                  {footerPrimaryLinks.map((link) =>
                    renderFooterLink(
                      link,
                      'text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white',
                    )
                  )}
                </div>
                <div class='flex flex-col gap-2 text-neutral-600 dark:text-neutral-300'>
                  {footerSecondaryLinks.map((link) =>
                    renderFooterLink(
                      link,
                      'text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white',
                    )
                  )}
                </div>
              </div>
            </div>

            <div class='px-6 pb-10 text-center text-xs text-neutral-500 dark:text-neutral-300'>
              &copy; {new Date().getFullYear()} Open Industrial. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}


