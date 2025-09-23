import { JSX } from 'preact';

import { HeroShowcase } from '@o-industrial/common/atomic/organisms';

import { aboutHero } from '../../../../../../src/marketing/about.ts';

export default function AboutHeroSection(): JSX.Element {
  return (
    <HeroShowcase
      header={{
        eyebrow: aboutHero.eyebrow,
        title: aboutHero.title,
        description: aboutHero.description,
        align: 'left',
      }}
      media={aboutHero.media}
      primaryAction={aboutHero.primaryAction}
      secondaryAction={aboutHero.secondaryAction}
      class='relative overflow-hidden bg-gradient-to-br from-white via-[#f3f6ff] to-[#f6f0ff] dark:from-[#070b1f] dark:via-[#111337] dark:to-[#050416]'
    >
      <div
        aria-hidden='true'
        class='pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-neon-purple-500/25 blur-3xl dark:bg-neon-purple-500/35'
      />
      <div
        aria-hidden='true'
        class='pointer-events-none absolute -bottom-20 right-[-8%] h-72 w-72 rounded-full bg-neon-blue-500/20 blur-3xl dark:bg-neon-blue-500/30'
      />
    </HeroShowcase>
  );
}
