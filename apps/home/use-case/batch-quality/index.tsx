import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { Action, ActionStyleTypes, SectionSurface } from '@o-industrial/common/atomic/atoms';
import { IntentTypes } from '@o-industrial/common/types';
import { SectionHeader, ToggleQueryCard } from '@o-industrial/common/atomic/molecules';
import {
  CTADeepLinkSection,
  FlowDiagramSection,
  ValueGridSection,
} from '@o-industrial/common/atomic/organisms';

import {
  batchQualityHero,
  batchQualityHowHelpItems,
  batchQualityIntegrationDiagram,
  batchQualityIntegrationSteps,
  batchQualityOutcome,
  batchQualityProblem,
  batchQualityQueryExample,
  batchQualityToggleQueries,
} from '../../../../src/marketing/use-case-batch-quality.ts';
import { OpenIndustrialWebState } from '../../../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

type BatchQualityPageData = Record<string, never>;

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  BatchQualityPageData
> = {
  GET: (_req, ctx) => ctx.Render({}),
};

function mapIntent(intent?: 'primary' | 'secondary' | 'ghost'): ActionStyleTypes {
  switch (intent) {
    case 'secondary':
      return ActionStyleTypes.Outline | ActionStyleTypes.Rounded;
    case 'ghost':
      return ActionStyleTypes.Thin | ActionStyleTypes.Link;
    case 'primary':
    default:
      return ActionStyleTypes.Solid | ActionStyleTypes.Rounded;
  }
}

export default function BatchQualityPage({}: PageProps<BatchQualityPageData>) {
  const primaryAction = batchQualityHero.primaryAction;
  const secondaryAction = batchQualityHero.secondaryAction;

  return (
    <div class='flex flex-col'>
      <section class='relative overflow-hidden bg-gradient-to-br from-[#070a1e] via-[#111536] to-[#050716] py-24 text-white shadow-[0_70px_200px_-90px_rgba(10,16,42,0.85)]'>
        <div class='pointer-events-none absolute inset-0'>
          <div class='absolute left-1/2 top-[-28%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.28),_rgba(9,12,26,0)_78%)] blur-[200px]' />
          <div class='absolute -left-32 bottom-[-18%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.24),_rgba(7,10,22,0)_72%)] blur-[170px]' />
          <div class='absolute -right-24 top-16 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.24),_rgba(8,11,22,0)_72%)] blur-[180px]' />
        </div>

        <div class='relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 text-center'>
          <span class='inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70'>
            {batchQualityHero.eyebrow}
          </span>

          <div class='space-y-6'>
            <h1 class='text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl'>
              {batchQualityHero.title}
            </h1>
            <p class='mx-auto max-w-3xl text-lg text-white/70'>
              {batchQualityHero.description}
            </p>
          </div>

          <div class='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center'>
            {primaryAction
              ? (
                <Action
                  href={primaryAction.href}
                  styleType={mapIntent(primaryAction.intent)}
                  intentType={IntentTypes.Primary}
                  target={primaryAction.external ? '_blank' : undefined}
                  rel={primaryAction.external ? 'noopener noreferrer' : undefined}
                >
                  {primaryAction.label}
                </Action>
              )
              : null}
            {secondaryAction
              ? (
                <Action
                  href={secondaryAction.href}
                  styleType={mapIntent(secondaryAction.intent)}
                  intentType={IntentTypes.Secondary}
                  target={secondaryAction.external ? '_blank' : undefined}
                  rel={secondaryAction.external ? 'noopener noreferrer' : undefined}
                >
                  {secondaryAction.label}
                </Action>
              )
              : null}
          </div>

          <div class='w-full max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-6 text-left shadow-[0_40px_140px_-70px_rgba(15,23,42,0.85)] backdrop-blur-lg'>
            <h3 class='text-sm font-semibold uppercase tracking-[0.3em] text-white/60'>
              Query example
            </h3>
            <p class='mt-4 font-mono text-base leading-relaxed text-white/90'>
              {batchQualityQueryExample}
            </p>
          </div>
        </div>
      </section>

      <SectionSurface
        tone='muted'
        class='bg-gradient-to-b from-white via-[#f3f6ff] to-white py-20 dark:from-[#070b1f] dark:via-[#0b1230] dark:to-[#060a19]'
      >
        <div class='mx-auto max-w-4xl space-y-10 px-6 text-center'>
          <SectionHeader {...batchQualityProblem} />
        </div>
      </SectionSurface>

      <SectionSurface
        tone='default'
        class='bg-gradient-to-br from-[#f7f9ff] via-white to-[#f4efff] py-20 dark:from-[#080c1f] dark:via-[#0f1533] dark:to-[#060916]'
      >
        <div class='mx-auto flex w-full max-w-6xl flex-col gap-16 px-6'>
          <div class='space-y-8 text-center'>
            <SectionHeader
              title='Unified system integration'
              description='Open Industrial connects across ERP, MES, QMS, and LIMS to unify the electronic batch record into a governed query layer.'
              align='center'
            />
            <ol class='mx-auto grid w-full max-w-3xl gap-3 text-left text-sm text-neutral-700 dark:text-neutral-300 sm:grid-cols-2'>
              {batchQualityIntegrationSteps.map((step, index) => (
                <li
                  key={step}
                  class='flex items-center gap-3 rounded-2xl border border-neutral-200/70 bg-white/80 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-neutral-900/60'
                >
                  <span class='inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neon-blue-500 to-neon-purple-500 text-sm font-semibold text-white'>
                    {index + 1}
                  </span>
                  <span class='text-sm font-medium'>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div class='overflow-hidden rounded-3xl border border-neutral-200/60 bg-white shadow-[0_35px_120px_-80px_rgba(40,44,82,0.35)] dark:border-white/10 dark:bg-neutral-900/60'>
            <img
              src='/assets/marketing/batch-quality-compliance-diagram.jpg'
              alt='Batch quality and compliance integration diagram'
              data-eac-bypass-base
              class='h-full w-full object-cover'
            />
          </div>
        </div>
      </SectionSurface>

      <FlowDiagramSection
        header={{
          eyebrow: 'System blueprint',
          title: 'One governed hub, many industrial endpoints',
          description:
            'Ingest batch telemetry, quality results, and deviations into Open Industrial, then publish explainable outputs across teams and tools.',
          align: 'center',
        }}
        content={batchQualityIntegrationDiagram}
        class='bg-gradient-to-b from-[#060918] via-[#0c1028] to-[#060918] py-24'
      />

      <ValueGridSection
        header={{
          eyebrow: 'How Open Industrial helps',
          title: 'Accelerate investigations and compliance',
          description:
            'Deliver governed, explainable answers for every batch by turning warm queries into reusable assets.',
          align: 'center',
        }}
        items={batchQualityHowHelpItems}
        columns={2}
        variant='dark'
        class='bg-gradient-to-br from-[#050914] via-[#0b1228] to-[#060916] py-24'
      />

      <SectionSurface
        tone='default'
        class='bg-gradient-to-br from-[#f5f7ff] via-white to-[#f3efff] py-24 dark:from-[#080c1f] dark:via-[#13143b] dark:to-[#050818]'
      >
        <div class='mx-auto flex w-full max-w-6xl flex-col gap-10 px-6'>
          <div class='space-y-4 text-center'>
            <SectionHeader
              title='Ask batch quality questions in natural language'
              description='Use Azi, our AI query assistant, to ask questions about batch quality in plain English. Azi generates structured KQL to extract unified insights from real-time telemetry.'
              align='center'
            />
          </div>

          <div class='grid gap-6 md:grid-cols-2'>
            {batchQualityToggleQueries.map((toggle) => (
              <ToggleQueryCard
                key={toggle.title}
                eyebrow={toggle.eyebrow}
                title={toggle.title}
                description={toggle.description}
                options={toggle.options}
                copy={toggle.copy}
              />
            ))}
          </div>
        </div>
      </SectionSurface>

      <CTADeepLinkSection
        content={batchQualityOutcome}
        class='bg-gradient-to-br from-[#060918] via-[#0d1332] to-[#050816] py-24'
      />
    </div>
  );
}
