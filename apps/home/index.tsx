import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { SectionSurface } from '@o-industrial/common/atomic/atoms';
import {
  ChecklistGroup,
  MediaSpotlight,
  QuoteCard,
  SectionHeader,
} from '@o-industrial/common/atomic/molecules';
import {
  BenefitsSection,
  CloudControlSection,
  CTADeepLinkSection,
  FlowDiagramSection,
  HeroShowcase,
  IntegrationMatrixSection,
  StepsSection,
  ValueGridSection,
} from '@o-industrial/common/atomic/organisms';

import { homeContent } from '../../src/marketing/home.ts';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

// deno-lint-ignore ban-types
export type HomepageData = {};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  HomepageData
> = {
  GET: (_req, ctx) => {
    const data: HomepageData = {};
    return ctx.Render(data);
  },
};

export default function HomePage({}: PageProps<HomepageData>) {
  return (
    <div class='flex flex-col'>
      <HeroShowcase
        header={{
          eyebrow: homeContent.hero.eyebrow,
          title: homeContent.hero.title,
          description: homeContent.hero.description,
          align: 'left',
        }}
        media={homeContent.hero.media}
        primaryAction={homeContent.hero.primaryAction}
        secondaryAction={homeContent.hero.secondaryAction}
        class='relative overflow-hidden bg-gradient-to-br from-white via-[#eef4ff] to-[#f5efff] shadow-[0_45px_120px_-60px_rgba(107,82,255,0.45)] dark:from-[#070a1d] dark:via-[#110f30] dark:to-[#040314]'
      >
        <div
          aria-hidden='true'
          class='pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-neon-purple-500/30 blur-3xl dark:bg-neon-purple-500/40'
        />
        <div
          aria-hidden='true'
          class='pointer-events-none absolute -bottom-16 right-[-10%] h-80 w-80 rounded-full bg-neon-blue-500/20 blur-3xl dark:bg-neon-blue-500/30'
        />
      </HeroShowcase>

      <SectionSurface
        tone='default'
        class='bg-gradient-to-br from-[#eef5ff] via-white to-[#f7f1ff] dark:from-[#060a1c] dark:via-[#090d21] dark:to-[#0d1130]'
      >
        <div class='mx-auto max-w-5xl'>
          <MediaSpotlight media={homeContent.productSpotlightMedia} />
        </div>
      </SectionSurface>

      <SectionSurface
        tone='muted'
        class='bg-gradient-to-r from-white via-[#f0f5ff] to-white dark:from-[#060a1e] dark:via-[#0a0f27] dark:to-[#050814] text-center'
      >
        <SectionHeader {...homeContent.valuePropositionHeading} />
      </SectionSurface>

      <StepsSection
        header={{
          eyebrow: 'From ingestion to activation',
          title: 'How it works',
          description: 'Three steps to get governed answers into production workflows.',
          align: 'center',
        }}
        steps={homeContent.howItWorksSteps}
        class='bg-gradient-to-br from-white via-[#edf3ff] to-white shadow-[0_40px_120px_-60px_rgba(71,56,167,0.45)] dark:from-[#080c20] dark:via-[#12143a] dark:to-[#080b1e]'
      />

      <SectionSurface
        tone='default'
        class='relative overflow-hidden bg-gradient-to-br from-white via-[#f4f1ff] to-white dark:from-[#070818] dark:via-[#110f2c] dark:to-[#070818]'
      >
        <div
          aria-hidden='true'
          class='pointer-events-none absolute inset-x-0 top-12 mx-auto h-72 w-72 rounded-full bg-neon-blue-500/15 blur-3xl dark:bg-neon-blue-500/25'
        />
        <div class='relative space-y-10'>
          <SectionHeader
            eyebrow='Meet Azi - your AI query assistant'
            title='Plain-language answers from governed industrial data'
            description='Azi gives engineers direct access to live plant insights - no scripts, no SQL, no waiting on IT or vendor support.'
            align='center'
          />
          <div class='grid gap-6 md:grid-cols-3'>
            {homeContent.conversationalQuotes.map((quote, index) => (
              <QuoteCard
                key={`quote-${index}`}
                quote={quote.quote}
                attribution={quote.attribution}
                role={quote.role}
              />
            ))}
          </div>
        </div>
      </SectionSurface>

      <ValueGridSection
        header={{
          eyebrow: 'Operational intelligence, delivered',
          title: 'Turn industrial data into trusted insight',
          description:
            'Break down data silos across OT and IT systems by turning live plant data into actionable, audit-ready insight your teams can act on.',
          align: 'center',
        }}
        items={homeContent.featureGridItems}
        class='bg-gradient-to-br from-white via-[#f4f6ff] to-white dark:from-[#070a1c] dark:via-[#0d132d] dark:to-[#060a18]'
      />

      <IntegrationMatrixSection
        header={{
          eyebrow: 'Works with your stack',
          title: 'Connect seamlessly to your current industrial systems',
          description:
            'Pre-built connectors map protocols, middleware, and execution systems into a single hub.',
          align: 'center',
        }}
        columns={homeContent.integrationColumns}
        class='bg-gradient-to-br from-[#eef5ff] via-white to-[#eef2ff] dark:from-[#06071a] dark:via-[#0a0d25] dark:to-[#080c23]'
      />

      <FlowDiagramSection
        header={{
          eyebrow: 'Unified intelligence hub',
          title: 'Data in, insight out',
          description:
            'Visualize how telemetry lands in Open Industrial and flows back out into apps, agents, and APIs.',
          align: 'center',
        }}
        content={homeContent.flowDiagram}
        class='bg-gradient-to-br from-white via-[#f2f4ff] to-white dark:from-[#060817] dark:via-[#0b1026] dark:to-[#060817]'
      />

      <BenefitsSection
        header={{
          eyebrow: 'Why teams choose Open Industrial',
          title: 'Key benefits',
          description: 'Give operations, quality, and IT the same live source of truth.',
          align: 'center',
        }}
        items={homeContent.benefitsItems}
        class='bg-gradient-to-br from-[#f7faff] via-white to-[#f6f0ff] dark:from-[#07091a] dark:via-[#0c1129] dark:to-[#07091a]'
      />

      <CloudControlSection
        header={{
          eyebrow: 'Your cloud, your rules',
          title: 'Deploy with governed flexibility',
          description:
            'Run Open Industrial in your Azure tenant for full access and control - or choose from shared cloud or fully managed options.',
          align: 'center',
        }}
        items={homeContent.cloudControlItems}
        class='bg-gradient-to-br from-white via-[#f1f4ff] to-white dark:from-[#070a1b] dark:via-[#0b1028] dark:to-[#070a1b]'
      />

      <SectionSurface
        tone='muted'
        class='bg-gradient-to-br from-[#eef5ff] via-white to-[#f2f0ff] dark:from-[#070a1b] dark:via-[#0c1129] dark:to-[#070a1b]'
      >
        <SectionHeader
          title='From insight to action'
          description='Open Industrial is evolving into a modular automation platform with adaptive agents that observe data, trigger workflows, and coordinate logic across systems.'
          align='center'
        />
        <div class='mt-10 max-w-3xl mx-auto'>
          <ChecklistGroup items={homeContent.futureVisionItems} columns={1} />
        </div>
      </SectionSurface>

      <CTADeepLinkSection
        content={homeContent.cta}
        class='bg-gradient-to-br from-[#f5f7ff] via-white to-[#f3efff] dark:from-[#080c1f] dark:via-[#141238] dark:to-[#050818] shadow-[0_40px_120px_-50px_rgba(37,29,90,0.45)]'
      />
    </div>
  );
}
