import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { GradientIconBadge, SectionSurface } from '@o-industrial/common/atomic/atoms';
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

  const integrationCount = homeContent.integrationColumns.reduce(
    (total, column) => total + column.items.length,
    0,
  );

  const metrics = [
    {
      label: 'Pre-built integrations',
      value: `${integrationCount}+`,
      description:
        'Protocols, middleware, and line-of-business systems ready to connect.',
    },
    {
      label: 'Steps to governed insight',
      value: `${homeContent.howItWorksSteps.length}`,
      description: 'From ingestion to activation in a guided, explainable flow.',
    },
    {
      label: 'Cloud control options',
      value: `${homeContent.cloudControlItems.length}`,
      description:
        'Run in your tenant, shared cloud, or fully managed environments.',
    },
  ];

  const spotlightHighlights = homeContent.futureVisionItems.slice(0, 3);

  return (
    <div class='relative flex flex-col overflow-hidden bg-gradient-to-b from-[#f9fbff] via-white to-[#f4f0ff] dark:from-[#020312] dark:via-[#05091d] dark:to-[#02010e]'>
      <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
        <div class='absolute left-1/2 top-[-18%] h-[620px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(141,121,255,0.35),_rgba(255,255,255,0)_72%)] opacity-70 blur-3xl dark:opacity-90' />
        <div class='absolute left-[-12%] top-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(82,206,255,0.18),_rgba(255,255,255,0)_68%)] blur-[120px] dark:bg-[radial-gradient(circle,_rgba(82,206,255,0.32),_rgba(255,255,255,0)_70%)]' />
        <div class='absolute right-[-14%] bottom-[-8%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,_rgba(255,168,236,0.2),_rgba(255,255,255,0)_72%)] blur-[140px] dark:bg-[radial-gradient(circle,_rgba(218,147,255,0.28),_rgba(255,255,255,0)_75%)]' />
      </div>

      <div class='relative isolate'>
        <div aria-hidden='true' class='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10' />
        <HeroShowcase
          header={{
            eyebrow: homeContent.hero.eyebrow,
            title: (
              <span class='block text-balance leading-tight'>
                Ask anything about your plant{' '}
                <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-emerald-400 bg-clip-text text-transparent'>
                  and get answers instantly
                </span>
              </span>
            ),
            description: (
              <span class='text-lg text-neutral-600 dark:text-neutral-200'>
                {homeContent.hero.description}
              </span>
            ),
            align: 'left',
          }}
          media={homeContent.hero.media}
          primaryAction={homeContent.hero.primaryAction}
          secondaryAction={homeContent.hero.secondaryAction}
          width='wide'
          contentClass='max-w-7xl'
          class='relative overflow-hidden rounded-b-[56px] border border-white/60 bg-white/80 pb-24 shadow-[0_45px_140px_-80px_rgba(71,45,171,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05]'
        >
          <div class='grid gap-4 pt-6 sm:grid-cols-3'>
            {heroHighlights.map((item, index) => (
              <div
                key={item.title}
                class='group relative overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-5 shadow-[0_25px_70px_-60px_rgba(62,45,171,0.65)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_45px_120px_-60px_rgba(62,45,171,0.55)] dark:border-white/10 dark:bg-white/10'
              >
                <div
                  aria-hidden='true'
                  class={`absolute inset-0 opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
                    index === 0
                      ? 'bg-[radial-gradient(circle_at_top,_rgba(167,139,250,0.45),_rgba(255,255,255,0)_72%)] dark:bg-[radial-gradient(circle_at_top,_rgba(167,139,250,0.6),_rgba(255,255,255,0)_75%)]'
                      : index === 1
                      ? 'bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.4),_rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.55),_rgba(255,255,255,0)_74%)]'
                      : 'bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.4),_rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.55),_rgba(255,255,255,0)_74%)]'
                  }`}
                />
                <div class='relative space-y-2'>
                  <span class='text-xs font-semibold uppercase tracking-[0.26em] text-neutral-400 dark:text-neutral-500'>
                    0{index + 1}
                  </span>
                  <h3 class='text-base font-semibold text-neutral-900 dark:text-white'>
                    {item.title}
                  </h3>
                  <p class='text-sm text-neutral-600 dark:text-neutral-300'>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </HeroShowcase>
      </div>

      <SectionSurface
        tone='default'
        width='wide'
        contentClass='max-w-7xl'
        class='relative overflow-hidden pb-32'
      >
        <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
          <div class='absolute -left-24 top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(96,165,250,0.25),_rgba(255,255,255,0)_65%)] blur-3xl dark:bg-[radial-gradient(circle,_rgba(96,165,250,0.35),_rgba(255,255,255,0)_70%)]' />
          <div class='absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(167,139,250,0.25),_rgba(255,255,255,0)_65%)] blur-3xl dark:bg-[radial-gradient(circle,_rgba(167,139,250,0.35),_rgba(255,255,255,0)_70%)]' />
        </div>
        <div class='relative grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center'>
          <div class='relative'>
            <div class='absolute -inset-6 rounded-[36px] border border-white/60 bg-gradient-to-br from-[#dbe7ff]/70 via-white/90 to-[#f3e9ff]/70 opacity-70 blur-[30px] dark:border-white/10 dark:from-white/20 dark:via-white/10 dark:to-white/20' />
            <MediaSpotlight media={homeContent.productSpotlightMedia} class='relative z-10 shadow-2xl' />
          </div>
          <div class='relative space-y-8'>
            <SectionHeader
              {...homeContent.valuePropositionHeading}
              align='left'
              class='max-w-md text-left'
              title={(
                <span class='block text-balance leading-tight'>
                  <span class='block text-neutral-900 dark:text-white'>
                    Connect your data.
                  </span>
                  <span class='block bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-emerald-400 bg-clip-text text-transparent'>
                    Ask anything. Share anywhere.
                  </span>
                </span>
              )}
              description={(
                <span class='text-base text-neutral-600 dark:text-neutral-300'>
                  {homeContent.valuePropositionHeading.description}
                </span>
              )}
            />
            <div class='space-y-4'>
              {spotlightHighlights.map((item) => (
                <div
                  key={String(item.title)}
                  class='flex items-start gap-4 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_20px_60px_-50px_rgba(62,45,171,0.55)] backdrop-blur-md dark:border-white/10 dark:bg-white/10'
                >
                  {item.icon
                    ? (
                      <GradientIconBadge
                        icon={item.icon}
                        intent={item.intent ?? 'purple'}
                        size='md'
                        class='shrink-0 shadow-lg'
                      />
                    )
                    : null}
                  <div class='space-y-1'>
                    <h4 class='text-base font-semibold text-neutral-900 dark:text-white'>
                      {item.title}
                    </h4>
                    {item.description
                      ? (
                        <p class='text-sm text-neutral-600 dark:text-neutral-300'>
                          {item.description}
                        </p>
                      )
                      : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionSurface>

      <SectionSurface
        tone='muted'
        width='wide'
        contentClass='max-w-6xl'
        class='relative overflow-hidden border-y border-white/60 bg-gradient-to-r from-white via-[#eef5ff] to-[#fbf0ff] text-center shadow-[0_45px_140px_-100px_rgba(71,45,171,0.55)] dark:border-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10'
      >
        <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
          <div class='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/10' />
          <div class='absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/50 to-transparent dark:via-white/10' />
        </div>
        <div class='relative space-y-12'>
          <SectionHeader
            {...homeContent.valuePropositionHeading}
            align='center'
            class='mx-auto max-w-3xl text-center'
            title={(
              <span class='block text-balance leading-tight'>
                <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-emerald-400 bg-clip-text text-transparent'>
                  Unified operational intelligence
                </span>
                <span class='mt-2 block text-neutral-900 dark:text-white'>
                  Governing data from control room to boardroom
                </span>
              </span>
            )}
          />
          <div class='grid gap-6 sm:grid-cols-3'>
            {metrics.map((metric) => (
              <div
                key={metric.label}
                class='group relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_30px_90px_-70px_rgba(62,45,171,0.6)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-white/10'
              >
                <div
                  aria-hidden='true'
                  class='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(167,139,250,0.32),_rgba(255,255,255,0)_70%)] opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_top,_rgba(167,139,250,0.45),_rgba(255,255,255,0)_72%)]'
                />
                <div class='relative space-y-2 text-left sm:text-center'>
                  <div class='text-xs uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500'>
                    {metric.label}
                  </div>
                  <div class='text-4xl font-semibold text-neutral-900 dark:text-white'>
                    {metric.value}
                  </div>
                  <p class='text-sm text-neutral-600 dark:text-neutral-300'>
                    {metric.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionSurface>

      <StepsSection
        header={{
          eyebrow: 'From ingestion to activation',
          title: (
            <span class='block text-balance'>
              How governed insight flows to action
            </span>
          ),
          description:
            'Three steps to get governed answers into production workflows.',
          align: 'center',
        }}
        steps={homeContent.howItWorksSteps}
        width='wide'
        contentClass='max-w-6xl'
        class='relative overflow-hidden border-y border-white/60 bg-gradient-to-br from-white via-[#eef3ff] to-[#f8f1ff] shadow-[0_45px_140px_-100px_rgba(62,45,171,0.55)] dark:border-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10'
      />

      <SectionSurface
        tone='default'
        width='wide'
        contentClass='max-w-7xl'
        class='relative overflow-hidden border-y border-white/60 bg-gradient-to-br from-white via-[#f6f3ff] to-white dark:border-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10'
      >
        <div aria-hidden='true' class='pointer-events-none absolute inset-x-0 top-16 mx-auto h-72 w-[34rem] rounded-full bg-[radial-gradient(circle,_rgba(96,165,250,0.2),_rgba(255,255,255,0)_70%)] blur-3xl dark:bg-[radial-gradient(circle,_rgba(96,165,250,0.3),_rgba(255,255,255,0)_70%)]' />
        <div class='relative space-y-12'>
          <SectionHeader
            eyebrow='Meet Azi, your AI query assistant'
            title={(
              <span class='block text-balance leading-tight'>
                <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-emerald-400 bg-clip-text text-transparent'>
                  Plain-language answers
                </span>
                <span class='mt-2 block text-neutral-900 dark:text-white'>
                  From governed industrial data
                </span>
              </span>
            )}
            description='Azi gives engineers direct access to live plant insights. No scripts, no SQL, no waiting on IT or vendor support.'
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
          title: (
            <span class='block text-balance leading-tight'>
              <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-emerald-400 bg-clip-text text-transparent'>
                Turn industrial data
              </span>
              <span class='mt-2 block text-neutral-900 dark:text-white'>
                Into trusted, governed insight
              </span>
            </span>
          ),
          description: (
            <span class='text-base text-neutral-600 dark:text-neutral-300'>
              Break down data silos across OT and IT systems by turning live plant data into actionable, audit-ready insight your teams can act on.
            </span>
          ),
          align: 'center',
        }}
        items={homeContent.featureGridItems}
        width='wide'
        contentClass='max-w-7xl'
        class='relative overflow-hidden border-y border-white/60 bg-gradient-to-br from-white via-[#eef4ff] to-white dark:border-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10'
      />

      <IntegrationMatrixSection
        header={{
          eyebrow: 'Works with your stack',
          title: (
            <span class='block text-balance leading-tight'>
              <span class='bg-gradient-to-r from-neon-blue-500 via-neon-purple-500 to-emerald-400 bg-clip-text text-transparent'>
                Connect seamlessly
              </span>
              <span class='mt-2 block text-neutral-900 dark:text-white'>
                To your current industrial systems
              </span>
            </span>
          ),
          description: (
            <span class='text-base text-neutral-600 dark:text-neutral-300'>
              Pre-built connectors map protocols, middleware, and execution systems into a single hub.
            </span>
          ),
          align: 'center',
          kicker: (
            <span class='text-xs uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500'>
              {integrationCount}+ integration endpoints ready out of the box
            </span>
          ),
        }}
        columns={homeContent.integrationColumns}
        width='wide'
        contentClass='max-w-7xl'
        class='relative overflow-hidden border-y border-white/60 bg-gradient-to-br from-[#eef5ff] via-white to-[#eef2ff] dark:border-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10'
      />

      <FlowDiagramSection
        header={{
          eyebrow: 'Unified intelligence hub',
          title: (
            <span class='block text-balance leading-tight'>
              <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-emerald-400 bg-clip-text text-transparent'>
                Data in, insight out
              </span>
              <span class='mt-2 block text-neutral-900 dark:text-white'>
                Trace governed telemetry from edge to action
              </span>
            </span>
          ),
          description: (
            <span class='text-base text-neutral-600 dark:text-neutral-300'>
              Visualize how telemetry lands in Open Industrial and flows back out into apps, agents, and APIs.
            </span>
          ),
          align: 'center',
        }}
        content={homeContent.flowDiagram}
        width='wide'
        contentClass='max-w-7xl'
        class='relative overflow-hidden border-y border-white/60 bg-gradient-to-br from-white via-[#f2f4ff] to-white dark:border-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10'
      />

      <BenefitsSection
        header={{
          eyebrow: 'Why teams choose Open Industrial',
          title: (
            <span class='block text-balance leading-tight'>
              <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-emerald-400 bg-clip-text text-transparent'>
                Operational clarity for every team
              </span>
              <span class='mt-2 block text-neutral-900 dark:text-white'>
                Shared truth across operations, quality, and IT
              </span>
            </span>
          ),
          description: (
            <span class='text-base text-neutral-600 dark:text-neutral-300'>
              Give operations, quality, and IT the same live source of truth to coordinate faster decisions.
            </span>
          ),
          align: 'center',
        }}
        items={homeContent.benefitsItems}
        width='wide'
        contentClass='max-w-7xl'
        class='relative overflow-hidden border-y border-white/60 bg-gradient-to-br from-[#f7faff] via-white to-[#f6f0ff] dark:border-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10'
      />

      <CloudControlSection
        header={{
          eyebrow: 'Your cloud, your rules',
          title: (
            <span class='block text-balance leading-tight'>
              <span class='bg-gradient-to-r from-neon-purple-500 via-neon-blue-500 to-emerald-400 bg-clip-text text-transparent'>
                Deploy with governed flexibility
              </span>
              <span class='mt-2 block text-neutral-900 dark:text-white'>
                Choose the control plane that matches your policy
              </span>
            </span>
          ),
          description: (
            <span class='text-base text-neutral-600 dark:text-neutral-300'>
              Run Open Industrial in your Azure tenant for full access and control, or choose from shared cloud or fully managed options.
            </span>
          ),
          align: 'center',
        }}
        items={homeContent.cloudControlItems}
        width='wide'
        contentClass='max-w-7xl'
        class='relative overflow-hidden border-y border-white/60 bg-gradient-to-br from-white via-[#f1f4ff] to-white dark:border-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10'
      />

      <SectionSurface
        tone='muted'
        width='wide'
        contentClass='max-w-6xl'
        class='relative overflow-hidden border-y border-white/60 bg-gradient-to-br from-[#eef5ff] via-white to-[#f2f0ff] dark:border-white/5 dark:from-white/10 dark:via-white/5 dark:to-white/10'
      >
        <div
          aria-hidden='true'
          class='pointer-events-none absolute inset-0 -z-10'
        >
          <div class='absolute inset-0 bg-[radial-gradient(circle,_rgba(167,139,250,0.14),_rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle,_rgba(129,140,248,0.22),_rgba(8,13,35,0)_74%)]' />
          <div class='absolute left-1/2 top-1/2 h-72 w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_160deg,_rgba(96,165,250,0.18),_rgba(52,211,153,0.12),_rgba(255,255,255,0))] blur-[140px] dark:bg-[conic-gradient(from_160deg,_rgba(56,189,248,0.26),_rgba(16,185,129,0.2),_rgba(8,13,35,0))]' />
        </div>
        <SectionHeader
          title='From insight to action'
          description='Open Industrial is evolving into a modular automation platform with adaptive agents that observe data, trigger workflows, and coordinate logic across systems.'
          align='center'
        />
        <div class='mx-auto mt-12 max-w-3xl'>
          <ChecklistGroup
            items={homeContent.futureVisionItems}
            columns={1}
            class='[&>div]:border-white/70 [&>div]:bg-white/85 [&>div]:shadow-[0_20px_70px_-60px_rgba(62,45,171,0.55)] dark:[&>div]:border-white/10 dark:[&>div]:bg-white/10'
          />
        </div>
      </SectionSurface>

      <CTADeepLinkSection
        content={{
          ...homeContent.cta,
          title: 'Ready to unlock instant telemetry insights?',
        }}
        width='wide'
        contentClass='max-w-5xl'
        class='relative overflow-hidden rounded-t-[48px] border border-white/60 bg-gradient-to-br from-[#f5f7ff] via-white to-[#f3efff] shadow-[0_60px_160px_-90px_rgba(41,29,94,0.55)] backdrop-blur-xl dark:border-white/10 dark:from-white/10 dark:via-white/5 dark:to-white/10'
      />
    </div>
  );
}
