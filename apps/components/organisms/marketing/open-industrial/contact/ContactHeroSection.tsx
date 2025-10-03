import { JSX } from 'preact';

import { HeroShowcase } from '@o-industrial/atomic/organisms';

import { contactHero } from '../../../../../../src/marketing/contact.ts';

export default function ContactHeroSection(): JSX.Element {
  return (
    <HeroShowcase
      header={{
        eyebrow: contactHero.eyebrow,
        title: contactHero.title,
        description: contactHero.description,
        align: 'left',
      }}
      media={contactHero.media}
      primaryAction={contactHero.primaryAction}
      secondaryAction={contactHero.secondaryAction}
      class='relative overflow-hidden bg-gradient-to-br from-[#070a1e] via-[#101435] to-[#060816] text-white'
    >
      <p class='max-w-xl text-sm text-white/70'>
        Our specialists respond within one business day with the next steps tailored to your OT
        environment.
      </p>
    </HeroShowcase>
  );
}

