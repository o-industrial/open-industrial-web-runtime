import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import { ChecklistGroup, SectionHeader } from '@o-industrial/common/atomic/molecules';
import {
  CTADeepLinkSection,
  HeroShowcase,
  ValueGridSection,
} from '@o-industrial/common/atomic/organisms';

import {
  aboutHero,
  capabilityCards,
  industriesServed,
  missionCopy,
  visionCopy,
  visionCTA,
} from '../../../src/marketing/about.ts';
import { OpenIndustrialWebState } from '../../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

// deno-lint-ignore ban-types
export type AboutPageData = {};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  AboutPageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

export default function AboutPage({}: PageProps<AboutPageData>) {
  return (
    <div class='flex flex-col'>
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

      <SectionSurface
        tone='muted'
        class='bg-gradient-to-r from-white via-[#f0f5ff] to-white dark:from-[#060a1f] dark:via-[#0a1028] dark:to-[#050814]'
      >
        <SectionHeader {...missionCopy} />
      </SectionSurface>

      <ValueGridSection
        header={{
          title: 'What we do',
          description:
            'Open Industrial transforms how organizations interact with their industrial data through four core capabilities.',
          align: 'center',
        }}
        items={capabilityCards}
        columns={2}
        class='bg-gradient-to-br from-white via-[#eef4ff] to-white dark:from-[#070a1d] dark:via-[#0d132f] dark:to-[#060a19]'
      />

      <SectionSurface
        tone='default'
        class='bg-gradient-to-br from-[#f6f8ff] via-white to-[#f4efff] dark:from-[#06091b] dark:via-[#0c1129] dark:to-[#06091b]'
      >
        <div class='space-y-10'>
          <SectionHeader
            title='Who we serve'
            description='We partner with OT engineers, process automation leads, lab managers, and industrial IT teams across manufacturing, life sciences, energy, utilities, and more.'
            align='center'
          />
          <ChecklistGroup items={industriesServed} columns={3} />
        </div>
      </SectionSurface>

      <SectionSurface
        tone='muted'
        class='bg-gradient-to-r from-white via-[#f2f6ff] to-white dark:from-[#060a1d] dark:via-[#0a1029] dark:to-[#060a1d]'
      >
        <SectionHeader {...visionCopy} />
      </SectionSurface>

      <CTADeepLinkSection
        content={visionCTA}
        class='bg-gradient-to-br from-[#f5f7ff] via-white to-[#f3efff] dark:from-[#080c1f] dark:via-[#141238] dark:to-[#050818] shadow-[0_40px_120px_-50px_rgba(37,29,90,0.45)]'
      />
    </div>
  );
}
