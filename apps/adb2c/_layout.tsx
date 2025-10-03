import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import type { OpenIndustrialWebState } from '@o-industrial/common/runtimes';

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState> = {
  async GET(_req, ctx) {
    ctx.Data.BaseURL = new URL(ctx.Runtime.URLMatch.Base).origin;

    const resp = await ctx.Next();

    resp.headers.append('Access-Control-Allow-Origin', '*');
    resp.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    resp.headers.append('Access-Control-Allow-Headers', 'Content-Type');

    return resp;
  },
};

export default function ADB2CLayout({ Data, Component, Revision }: PageProps) {
  const baseURL = Data.BaseURL ?? '';

  const formEnhancements = [
    '[&>#api]:space-y-6',
    '[&>#api]:text-left',
    '[&>#api_.heading]:text-3xl',
    '[&>#api_.heading]:sm:text-4xl',
    '[&>#api_.heading]:font-semibold',
    '[&>#api_.heading]:tracking-tight',
    '[&>#api_.heading]:text-white',
    '[&>#api_.intro]:text-base',
    '[&>#api_.intro]:text-neutral-300',
    '[&>#api_.intro]:max-w-[32ch]',
    '[&>#api_.error]:mt-2',
    '[&>#api_.error]:rounded-xl',
    '[&>#api_.error]:border',
    '[&>#api_.error]:border-neon-pink-500/40',
    '[&>#api_.error]:bg-neon-pink-500/10',
    '[&>#api_.error]:px-4',
    '[&>#api_.error]:py-3',
    '[&>#api_.error]:text-neon-pink-200',
    '[&>#api_.error]:shadow-[0_18px_45px_-25px_rgba(236,72,153,0.65)]',
    '[&>#api_.error.pageLevel]:text-base',
    '[&>#api_.error.itemLevel]:text-sm',
    '[&>#api_.helpLink]:text-neon-blue-300',
    '[&>#api_.helpLink]:underline',
    '[&>#api_.helpLink]:underline-offset-4',
    '[&>#api_form]:mt-6',
    '[&>#api_form]:space-y-5',
    '[&>#api_form_label]:text-[0.65rem]',
    '[&>#api_form_label]:font-semibold',
    '[&>#api_form_label]:uppercase',
    '[&>#api_form_label]:tracking-[0.32em]',
    '[&>#api_form_label]:text-neon-blue-200',
    '[&>#api_form_input]:mt-2',
    '[&>#api_form_input]:w-full',
    '[&>#api_form_input]:rounded-xl',
    '[&>#api_form_input]:border',
    '[&>#api_form_input]:border-white/15',
    '[&>#api_form_input]:bg-white/5',
    '[&>#api_form_input]:px-4',
    '[&>#api_form_input]:py-3',
    '[&>#api_form_input]:text-white',
    '[&>#api_form_input]:placeholder:text-neutral-400',
    '[&>#api_form_input]:focus:border-neon-blue-400',
    '[&>#api_form_input]:focus:outline-none',
    '[&>#api_form_input]:focus:ring-2',
    '[&>#api_form_input]:focus:ring-neon-blue-500/60',
    '[&>#api_form>.entry]:space-y-4',
    '[&>#api_.buttons]:mt-8',
    '[&>#api_.buttons>button]:w-full',
    '[&>#api_.buttons>button]:rounded-xl',
    '[&>#api_.buttons>button]:px-4',
    '[&>#api_.buttons>button]:py-3',
    '[&>#api_.buttons>button]:text-base',
    '[&>#api_.buttons>button]:font-semibold',
    '[&>#api_.buttons>button]:tracking-[0.15em]',
    '[&>#api_.buttons>button]:uppercase',
    '[&>#api_.buttons>button]:bg-gradient-to-r',
    '[&>#api_.buttons>button]:from-neon-blue-500',
    '[&>#api_.buttons>button]:to-neon-purple-500',
    '[&>#api_.buttons>button]:text-white',
    '[&>#api_.buttons>button]:shadow-[0_20px_55px_-25px_rgba(59,130,246,0.75)]',
    '[&>#api_.buttons>button]:transition',
    '[&>#api_.buttons>button]:duration-200',
    '[&>#api_.buttons>button]:hover:shadow-[0_28px_70px_-25px_rgba(59,130,246,0.9)]',
    '[&>#api_.buttons>button:not(:first-child)]:mt-3',
    '[&>#api_.buttons>button:not(:first-child)]:bg-transparent',
    '[&>#api_.buttons>button:not(:first-child)]:border',
    '[&>#api_.buttons>button:not(:first-child)]:border-white/25',
    '[&>#api_.buttons>button:not(:first-child)]:text-neutral-200',
    '[&>#api_.buttons>button:not(:first-child)]:shadow-none',
    '[&>#api_.buttons>button:not(:first-child)]:hover:bg-white/10',
    '[&>#api_.buttons>button:not(:first-child)]:hover:text-white',
    '[&>#api_.buttons>button:#emailVerificationControl_but_verify_code]:bg-gradient-to-r',
    '[&>#api_.buttons>button:#emailVerificationControl_but_verify_code]:from-neon-blue-500',
    '[&>#api_.buttons>button:#emailVerificationControl_but_verify_code]:to-neon-purple-500',
    '[&>#api_#forgotPassword]:mt-2',
    '[&>#api_#forgotPassword]:text-neon-blue-300',
    '[&>#api_#forgotPassword]:underline',
    '[&>#api_#forgotPassword]:underline-offset-4',
    '[&>#api_#forgotPassword]:transition-colors',
    '[&>#api_#forgotPassword]:duration-200',
    '[&>#api_#forgotPassword]:hover:text-neon-blue-200',
    '[&>#api_.create]:mt-6',
    '[&>#api_.create_#createAccount]:ml-2',
    '[&>#api_.create_#createAccount]:text-neon-blue-300',
    '[&>#api_.create_#createAccount]:underline',
    '[&>#api_.create_#createAccount]:underline-offset-4',
    '[&>#api_.create_#createAccount]:transition-colors',
    '[&>#api_.create_#createAccount]:hover:text-neon-blue-200',
  ].join(' ');

  return (
    <html lang='en' class='dark'>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        <title>Open Industrial - Secure Sign In</title>
        <meta
          name='description'
          content='Sign in with your Open Industrial identity to access secured documentation, telemetry, and runtime tooling.'
        />
        <meta name='theme-color' content='#050816' />

        <link
          rel='shortcut icon'
          type='image/png'
          href={`${baseURL}/assets/favicon.ico`}
          data-eac-bypass-base
        />

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Sora:wght@300;400;500;600;700&display=swap'
          rel='stylesheet'
        />

        <link
          rel='stylesheet'
          href={`${baseURL}/tailwind/styles.css?Revision=${Revision}`}
        />

        <link
          rel='stylesheet'
          href={`${baseURL}/assets/adb2c/page/layouts/styles.css?Revision=${Revision}`}
        />
      </head>

      <body class='min-h-screen bg-[#040714] font-sans text-white antialiased selection:bg-neon-blue-500/30 selection:text-white'>
        <div class='relative min-h-screen overflow-hidden'>
          <div aria-hidden='true' class='pointer-events-none absolute inset-0 overflow-hidden'>
            <div class='absolute left-[-18%] top-[-22%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.32),rgba(4,7,20,0)_70%)] blur-[150px]' />
            <div class='absolute right-[-16%] top-[12%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.28),rgba(5,8,22,0)_72%)] blur-[160px]' />
            <div class='absolute left-1/2 bottom-[-28%] h-[520px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.28),rgba(4,6,18,0)_72%)] blur-[180px]' />
          </div>

          <main class='relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10'>
            <div class='w-full max-w-6xl'>
              <div class='relative flex w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#050b19]/80 shadow-[0_40px_140px_-60px_rgba(34,211,238,0.8)] backdrop-blur-2xl ring-1 ring-white/10 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]'>
                <div class='relative hidden min-h-[420px] overflow-hidden border-b border-white/5 bg-[#060d1f]/80 lg:flex lg:flex-col'>
                  <div class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.32),rgba(4,7,20,0)_72%)] blur-[140px]' />
                  <img
                    src={`${baseURL}/assets/logos/RetroArcadeCyberPunkOpenIndustrial.png`}
                    alt='Open Industrial neon skyline'
                    class='relative z-10 h-full w-full object-cover object-center'
                  />
                  <div class='pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(5,8,22,0.1) 0%,rgba(5,8,22,0.65) 55%,rgba(5,8,22,0.92) 100%)]' />
                  <div class='relative z-20 mt-auto flex flex-col gap-3 border-t border-white/5 bg-[#040714]/70 p-8 backdrop-blur-sm'>
                    <span class='text-xs font-semibold uppercase tracking-[0.42em] text-neon-blue-300'>
                      Open Industrial
                    </span>
                    <p class='text-lg font-semibold text-white/90'>
                      Telemetry intelligence, neon-fast.
                    </p>
                    <p class='text-sm text-neutral-300/90'>
                      Secure docs, runtime insights, and governed execution signals in one neon
                      surface.
                    </p>
                  </div>
                </div>

                <div class='relative flex flex-col gap-6 p-6 sm:p-10'>
                  <div class='flex items-center gap-3'>
                    <img
                      src={`${baseURL}/assets/logos/openIndustrialLogoWhiteOpen.svg`}
                      alt='Open Industrial'
                      class='h-10 w-auto drop-shadow-[0_0_22px_rgba(59,130,246,0.6)]'
                    />
                  </div>

                  <div class='flex flex-col gap-3'>
                    <p class='text-xs uppercase tracking-[0.38em] text-neon-blue-300'>
                      Docs Access
                    </p>
                    <h1 class='text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
                      Welcome back.
                    </h1>
                    <p class='text-sm text-neutral-300 sm:text-base'>
                      Sign in with your Open Industrial account to unlock secured documentation and
                      runtime telemetry.
                    </p>
                  </div>

                  <div class='relative -mx-2 flex h-44 overflow-hidden rounded-2xl border border-white/10 bg-[#060d1f]/60 lg:hidden'>
                    <img
                      src={`${baseURL}/assets/logos/RetroArcadeCyberPunkOpenIndustrial.png`}
                      alt='Open Industrial neon skyline'
                      class='h-full w-full object-cover object-center'
                    />
                    <div class='pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,22,0) 0%,rgba(5,8,22,0.85) 75%)]' />
                  </div>

                  <div
                    class={`relative isolate max-h-[70vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#060d1f]/70 px-3 py-4 pr-4 shadow-[0_25px_65px_-35px_rgba(59,130,246,0.75)] sm:px-5 sm:py-6 md:max-h-[68vh] lg:max-h-[78vh] ${formEnhancements}`}
                  >
                    <Component />
                  </div>

                  <p class='text-xs text-neutral-400'>
                    Need help?{' '}
                    <a
                      class='text-neon-blue-300 underline underline-offset-4 transition-colors duration-200 hover:text-neon-blue-200'
                      href='mailto:support@openindustrial.ai'
                    >
                      support@openindustrial.ai
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

