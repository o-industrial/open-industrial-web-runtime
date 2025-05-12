import { PageProps } from '@fathym/eac-applications/preact';

export default function HomeLayout({
  Data: _Data,
  Component,
  Revision,
}: PageProps) {
  return (
    <html class="dark">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>OpenIndustrial | Reflex-Powered Runtime</title>

        <link
          rel="shortcut icon"
          type="image/png"
          href="/assets/favicon.ico"
          data-eac-bypass-base
        />

        <link
          rel="stylesheet"
          href={`/tailwind/styles.css?Revision=${Revision}`}
          data-eac-bypass-base
        />

        <script
          charset="utf-8"
          type="text/javascript"
          src="https://js.hsforms.net/forms/embed/v2.js"
        ></script>
      </head>

      <body class="bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
        <div class="min-h-screen flex flex-col">
          {/* Sticky Header with Logo */}
          <header class="fixed top-0 z-50 backdrop-blur transition-all w-full">
            <div class="max-w-7xl mx-auto px-6 py-4 flex items-center">
              <a href="/" class="flex items-center space-x-2 group">
                <img
                  src="/assets/logos/openIndustrialLogoWhiteOpen.svg"
                  data-eac-bypass-base
                  alt="OpenIndustrial"
                  class="h-8 group-hover:opacity-90 transition-opacity duration-200"
                />
              </a>
            </div>
          </header>

          <main class="flex-1 overflow-x-hidden overflow-y-auto">
            <Component />
          </main>

          {/* Footer */}
          <footer class="py-12 px-6 border-t border-white/10 text-center text-sm text-neutral-500">
            <div class="mb-4">
              <img
                src="/assets/logos/openIndustrialLogoAllWhite.svg"
                data-eac-bypass-base
                alt="OpenIndustrial"
                class="mx-auto h-6 opacity-70"
              />
            </div>
            <p>
              © {new Date().getFullYear()} OpenIndustrial. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
