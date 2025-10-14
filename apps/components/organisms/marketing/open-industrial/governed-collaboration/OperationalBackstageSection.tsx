import type { JSX } from 'preact';

import { SectionSurface } from '@o-industrial/atomic/atoms';

import { governedCollaborationContent } from '../../../../../../src/marketing/liberty/governed-collaboration.ts';

export default function GovernedCollaborationOperationalBackstageSection(): JSX.Element {
  const { assetProof, analytics, productionChecklist } = governedCollaborationContent;
  const { visuals, stats, citations, approvals, dependencies, utmPlan } = assetProof;

  return (
    <SectionSurface
      tone='muted'
      width='wide'
      contentClass='relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 text-white'
      class='relative overflow-hidden border-t border-white/10 bg-[#050710]'
    >
      <div
        aria-hidden='true'
        class='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(129,140,248,0.22),transparent_70%)] blur-[220px]'
      />

      <div class='relative z-10 space-y-4'>
        <h2 class='text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
          Launch Ops, Proof, and Instrumentation
        </h2>
        <p class='max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg'>
          Keep the runbook close: assets, approvals, analytics hooks, and production readiness live
          here so the team can launch governed collaboration without guesswork.
        </p>
      </div>

      <div class='relative z-10 grid gap-6 lg:grid-cols-3'>
        <article class='flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left text-white/80 shadow-[0_28px_120px_-95px_rgba(59,130,246,0.6)]'>
          <header class='space-y-2 text-white'>
            <h3 class='text-xl font-semibold text-white sm:text-2xl'>Asset Requirements</h3>
            <p class='text-sm text-white/70'>
              Visuals and supporting materials needed before launch.
            </p>
          </header>
          <ul class='space-y-3 text-sm leading-relaxed'>
            {visuals.map((visual) => (
              <li key={visual.id} class='rounded-2xl border border-white/10 bg-white/5 p-4'>
                <p class='text-white font-semibold'>{visual.description}</p>
                <p class='text-xs uppercase tracking-[0.3em] text-white/60 mt-2'>
                  Owner: {visual.owner} · Status: {visual.status}
                </p>
              </li>
            ))}
          </ul>
          <div class='rounded-2xl border border-dashed border-white/20 bg-white/5 p-4 text-sm leading-relaxed'>
            <p class='text-xs uppercase tracking-[0.32em] text-white/55'>Dependencies</p>
            <ul class='mt-3 space-y-2'>
              {dependencies.map((dependency) => (
                <li key={dependency.id}>
                  <span class='font-semibold text-white'>{dependency.owner}:</span>{' '}
                  <span class='text-white/80'>{dependency.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article class='flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left text-white/80 shadow-[0_28px_120px_-95px_rgba(236,72,153,0.55)]'>
          <header class='space-y-2 text-white'>
            <h3 class='text-xl font-semibold text-white sm:text-2xl'>Proof and Compliance</h3>
            <p class='text-sm text-white/70'>
              Tie every claim to an owned artifact and keep approvals in motion.
            </p>
          </header>
          <div class='space-y-3 text-sm leading-relaxed'>
            <div class='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <p class='text-xs uppercase tracking-[0.32em] text-white/55'>Stats to Confirm</p>
              <ul class='mt-2 space-y-2'>
                {stats.map((stat) => (
                  <li key={stat.id}>
                    <span class='font-semibold text-white'>{stat.owner}:</span>{' '}
                    <span class='text-white/80'>{stat.description}</span>
                    <span class='block text-xs text-white/55'>Source: {stat.source}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div class='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <p class='text-xs uppercase tracking-[0.32em] text-white/55'>Citations</p>
              <ul class='mt-2 space-y-2'>
                {citations.map((citation) => (
                  <li key={citation.id}>
                    <span class='font-semibold text-white'>{citation.description}</span>
                    <span class='block text-xs text-white/55'>Source: {citation.source}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div class='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <p class='text-xs uppercase tracking-[0.32em] text-white/55'>Approvals</p>
              <ul class='mt-2 space-y-2'>
                {approvals.map((approval) => (
                  <li key={approval.id}>
                    <span class='font-semibold text-white'>{approval.owner}:</span>{' '}
                    <span class='text-white/80'>{approval.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <article class='flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left text-white/80 shadow-[0_28px_120px_-95px_rgba(59,130,246,0.6)]'>
          <header class='space-y-2 text-white'>
            <h3 class='text-xl font-semibold text-white sm:text-2xl'>
              Instrumentation & Readiness
            </h3>
            <p class='text-sm text-white/70'>
              Map the analytics hooks, experiments, UTMs, and production checklist items.
            </p>
          </header>
          <div class='space-y-4 text-sm leading-relaxed'>
            <div class='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <p class='text-xs uppercase tracking-[0.32em] text-white/55'>Analytics Events</p>
              <ul class='mt-2 space-y-2'>
                {analytics.events.map((event) => (
                  <li key={event.id}>
                    <span class='font-semibold text-white'>{event.id}</span>
                    <span class='block text-white/75'>{event.description}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div class='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <p class='text-xs uppercase tracking-[0.32em] text-white/55'>Experiments</p>
              <ul class='mt-2 space-y-2'>
                {analytics.experiments.map((experiment) => (
                  <li key={experiment.id}>
                    <span class='font-semibold text-white'>{experiment.id}</span>
                    <span class='block text-white/75'>{experiment.hypothesis}</span>
                  </li>
                ))}
              </ul>
              <p class='mt-3 text-xs text-white/55'>
                Scroll depth checkpoints: {analytics.scrollDepth.join('% • ')}%
              </p>
            </div>
            <div class='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <p class='text-xs uppercase tracking-[0.32em] text-white/55'>UTM Plan</p>
              <ul class='mt-2 space-y-2'>
                {utmPlan.map((utm) => (
                  <li key={utm.id}>
                    <span class='font-semibold text-white'>{utm.target}:</span>{' '}
                    <span class='text-white/80'>{utm.utm}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div class='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <p class='text-xs uppercase tracking-[0.32em] text-white/55'>Production Checklist</p>
              <ul class='mt-2 space-y-2'>
                {productionChecklist.map((item) => (
                  <li key={item.id}>
                    <span class='font-semibold text-white'>{item.label}</span>
                    <span class='block text-white/75'>
                      Owner: {item.owner} · Status: {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </SectionSurface>
  );
}
