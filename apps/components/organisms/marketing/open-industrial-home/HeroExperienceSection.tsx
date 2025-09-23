import { JSX } from 'preact';

import { HeroShowcase } from '@o-industrial/common/atomic/organisms';

import { homeContent } from '../../../../../src/marketing/home.ts';

export default function HeroExperienceSection(): JSX.Element {
  const heroHighlights = [
    {
      title: 'Governed by design',
      description:
        'Deploy in your Azure tenant with private networking, least-privilege access, and SOC-ready logging.',
    },
    {
      title: 'Explainable intelligence',
      description:
        'Every answer shows its KQL so engineers can validate context before action.',
    },
    {
      title: 'Activation anywhere',
      description:
        'Publish queries as APIs, dashboards, and automations with zero manual lift.',
    },
  ];

  return (
    <div class="relative isolate">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10"
      />
      <HeroShowcase
        header={{
          eyebrow: homeContent.hero.eyebrow,
          title: (
            <span class="block text-balance leading-tight">
              Ask anything about your plant{' '}
              <span class="bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-emerald-400 bg-clip-text text-transparent">
                and get answers instantly
              </span>
            </span>
          ),
          description: (
            <span class="text-lg text-neutral-600 dark:text-neutral-200">
              {homeContent.hero.description}
            </span>
          ),
          align: 'left',
        }}
        media={homeContent.hero.media}
        primaryAction={homeContent.hero.primaryAction}
        secondaryAction={homeContent.hero.secondaryAction}
        width="wide"
        contentClass="max-w-7xl"
        class="relative overflow-hidden rounded-b-[56px] border border-white/60 bg-white/80 pb-24 shadow-[0_45px_140px_-80px_rgba(71,45,171,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05]"
      >
        <div class="grid gap-4 pt-6 sm:grid-cols-3">
          {heroHighlights.map((item, index) => (
            <div
              key={item.title}
              class="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-5 shadow-[0_25px_70px_-60px_rgba(62,45,171,0.65)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_45px_120px_-60px_rgba(62,45,171,0.55)] dark:border-white/10 dark:bg-white/10"
            >
              <div
                aria-hidden="true"
                class={`absolute inset-0 opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
                  index === 0
                    ? 'bg-[radial-gradient(circle_at_top,_rgba(167,139,250,0.45),_rgba(255,255,255,0)_72%)] dark:bg-[radial-gradient(circle_at_top,_rgba(167,139,250,0.6),_rgba(255,255,255,0)_75%)]'
                    : index === 1
                    ? 'bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.4),_rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.55),_rgba(255,255,255,0)_74%)]'
                    : 'bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.4),_rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.55),_rgba(255,255,255,0)_74%)]'
                }`}
              />
              <div class="relative space-y-2">
                <span class="text-xs font-semibold uppercase tracking-[0.26em] text-neutral-400 dark:text-neutral-500">
                  0{index + 1}
                </span>
                <h3 class="text-base font-semibold text-neutral-900 dark:text-white">
                  {item.title}
                </h3>
                <p class="text-sm text-neutral-600 dark:text-neutral-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </HeroShowcase>
    </div>
  );
}
