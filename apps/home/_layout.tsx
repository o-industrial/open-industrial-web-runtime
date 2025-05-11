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
          {/* You can add a shared header here if needed */}
          <main class="flex-1 overflow-x-hidden overflow-y-auto">
            <Component />
          </main>
        </div>
      </body>
    </html>
  );
}
