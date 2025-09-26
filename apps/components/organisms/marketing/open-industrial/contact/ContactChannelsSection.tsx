import { JSX } from 'preact';

import { MarketingPreHeadline } from '../../../../shared/MarketingPreHeadline.tsx';
import { MarketingSectionShell } from '../../../../shared/MarketingSectionShell.tsx';
import { contactIntro, contactMethods } from '../../../../../../src/marketing/contact.ts';

const intentGradients: Record<string, { badge: string; bar: string; bullet: string }> = {
  purple: {
    badge:
      'bg-gradient-to-br from-neon-purple-500/20 via-neon-blue-500/15 to-neon-pink-500/25 text-neon-purple-100',
    bar: 'from-neon-purple-500 via-neon-blue-500 to-neon-pink-500',
    bullet: 'from-neon-purple-500 to-neon-blue-500',
  },
  blue: {
    badge: 'bg-gradient-to-br from-neon-blue-500/20 via-cyan-400/20 to-teal-400/25 text-cyan-100',
    bar: 'from-neon-blue-500 via-cyan-400 to-teal-400',
    bullet: 'from-neon-blue-500 to-cyan-400',
  },
  green: {
    badge:
      'bg-gradient-to-br from-neon-green-500/20 via-teal-400/20 to-cyan-400/25 text-emerald-100',
    bar: 'from-neon-green-500 via-teal-400 to-cyan-400',
    bullet: 'from-neon-green-500 to-teal-400',
  },
};

export default function ContactChannelsSection(): JSX.Element {
  return (
    <MarketingSectionShell variant='neutral'>
      <div class='space-y-12 text-neutral-700 dark:text-neutral-200'>
        <div class='mx-auto max-w-3xl space-y-4 text-center'>
          <MarketingPreHeadline value={contactIntro.eyebrow} />
          <h2 class='text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white'>
            {contactIntro.title}
          </h2>
          {contactIntro.description
            ? (
              <p class='text-base leading-relaxed text-neutral-700 sm:text-lg dark:text-neutral-300'>
                {contactIntro.description}
              </p>
            )
            : null}
        </div>

        <div class='grid gap-6 sm:grid-cols-3'>
          {contactMethods.map((method) => {
            const gradients = intentGradients[method.intent ?? 'purple'];
            const Icon = method.icon;

            return (
              <article
                key={method.title}
                class='group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-neutral-200/70 bg-white/90 px-6 py-8 text-left shadow-[0_45px_150px_-110px_rgba(59,130,246,0.28)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_65px_210px_-140px_rgba(59,130,246,0.45)] dark:border-white/10 dark:bg-neutral-900/85 dark:shadow-[0_60px_190px_-130px_rgba(129,140,248,0.5)]'
              >
                <div
                  class={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${gradients.bar} opacity-95`}
                />
                <div
                  class={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${gradients.badge} shadow-[0_22px_65px_-40px_rgba(59,130,246,0.55)] dark:shadow-[0_28px_80px_-50px_rgba(129,140,248,0.55)]`}
                >
                  {Icon ? <Icon class='h-5 w-5' /> : null}
                </div>
                <h3 class='text-lg font-semibold text-neutral-900 dark:text-white'>
                  {method.title}
                </h3>
                <p class='text-sm leading-relaxed text-neutral-600 dark:text-neutral-300'>
                  {method.description}
                </p>
                {method.highlights?.length
                  ? (
                    <ul class='mt-2 space-y-2 text-sm text-neutral-600 dark:text-neutral-300'>
                      {method.highlights.map((highlight) => (
                        <li key={highlight} class='flex items-center gap-2'>
                          <span
                            class={`inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-r ${gradients.bullet}`}
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )
                  : null}
              </article>
            );
          })}
        </div>
      </div>
    </MarketingSectionShell>
  );
}
