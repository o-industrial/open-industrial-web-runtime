# Agents Guide - Home App

Marketing landing experience for Open Industrial. Focuses on storytelling, lead
capture, and navigation into deeper product material.

## Scope

- Host public marketing pages (`index`, `about`, `contact`, `terms`, `privacy`,
  `use-case`).
- Coordinate hero sections, CTAs, and forms with reusable content components.
- Integrate analytics hooks and marketing automation scripts when required.
- Exclude authenticated flows and admin tooling.

## Project Map

- `_layout.tsx` - Shared layout with navigation, footer, and analytics
  injection.
- `_middleware.ts` - Handles locale detection and caching headers for public
  content.
- `index.tsx` - Primary landing page; ensure hero messaging matches current
  campaigns.
- `about/`, `contact/`, `use-case/`, etc. - Subsections with static/MDX content.
- Reusable sections stored under `apps/components/organisms`; import rather than
  duplicating markup.
- `src/marketing/home.ts` - Authoritative typed content contract consumed by the
  home sections.
- `src/marketing/navigation.ts` - Centralized navigation/footer/CTA config
  shared across layouts.
- `src/marketing/__fixtures__/homeContent.fixture.ts` - Content snapshot
  fixtures for testing and prototyping.

## Commands

- `deno task dev` - Run runtime locally; verify home pages render without auth.
- `deno task test --filter home` - Execute snapshot or Playwright tests for
  public pages.
- `deno task check` - Ensure SEO metadata and structured data types compile.

## Patterns

- Maintain content in MDX or JSON where possible; keep JSX lean and data-driven.
- Drive hero headline copy via `homeContent.hero.headline` so campaigns can adjust highlights without touching JSX.
- Use `ProductSpotlightSection` with `FeatureCard` entries sourced from `homeContent.productSpotlightHighlights` to keep highlight styling and analytics consistent.
- Drive `UnifiedMetricsSection` with `homeContent.metrics` so MetricCard props (intent, trend, delta) stay centralized.
- Keep `GovernedFlowSection` powered by `homeContent.howItWorksSteps` + atomic `StepsSection` to preserve CMS-driven steps and gradients.
- Drive `AIConversationsSection` from `homeContent.conversationalQuotes` and reuse QuoteCard/analytics helpers for hover/focus tracking.
- Drive `StrategicPillarsSection` from `homeContent.strategicPillars` using `FeatureCard` chips and shared backdrops; keep badges defined in content for chip labels.
- Use `ValueDeliverySection` with `ValueGridSection` pulling from `homeContent.featureGridItems`; regression covered by `tests/marketing/value_delivery_section.tests.tsx`.
- Keep `IntegrationEcosystemSection`, `SharedTruthSection`, `UnifiedFlowSection`, and `GovernedDeploymentSection` wired to their atomic counterparts with backgrounds from `marketing/shared/backgrounds.tsx`.
- Ensure `ReadyCTASection` sources actions from `homeContent.cta` and `createCtaEventHandlers`; CTA coverage lives in `tests/marketing/ready_cta_section.tests.tsx`.
- Use Tailwind utility classes consistently; align fonts/colors with atomic
  theming.
- Wire analytics through centralized helpers; avoid inline script tags without
  review. See `docs/marketing/home-analytics-spec.md` for required events.
- Keep forms (contact, lead gen) behind feature flags until backend endpoints
  are ready.
- Leverage shared layout utilities from
  `apps/components/organisms/marketing/shared/layout.ts` instead of hand-rolled
  container classes.

## Review & Test Checklist

- Confirm Lighthouse targets (>90 performance/accessibility) for landing pages.
- Validate copy, CTAs, and legal text with marketing stakeholders.
- Ensure responsive design across breakpoints and evaluate dark-mode support if
  applicable.
- Execute analytics regression checklist (event firing, HubSpot gating) per
  `docs/marketing/home-analytics-spec.md`.
- Follow automated/manual plan in `docs/marketing/home-qa-checklist.md` before
  release.

## Safety & Guardrails

- No hard-coded secrets or tracking IDs; pull from environment-specific configs.
- Large assets should be optimized and placed under `apps/assets` with CDN
  headers configured.
- Avoid heavy third-party embeds that degrade performance without explicit
  approval.

## Ownership Signals

- **Primary owner:** Growth Marketing & Web Platform.
- **Point of contact:** #oi-marketing-site Slack channel.
- **Escalation:** Web Platform Lead (Mika Ito).

## Dependencies & Integrations

- Share components with `apps/components/organisms` and the atomic design
  system.
- Optional integrations: analytics (Segment, GA), forms (HubSpot) configured via
  environment variables.
- Shared helpers: marketing gradients (`src/marketing/gradients.ts`), layout
  tokens (`apps/components/organisms/marketing/shared/layout.ts`).
- Pull shared nav/footer data from `configs/site` (to be standardized in Phase
  2).

## Related Docs

- Parent: [Apps overview](../Agents.md).
- Atomic references:
  - [Atomic atoms](../../../open-industrial-reference-architecture/atomic/atoms/Agents.md)
  - [Atomic molecules](../../../open-industrial-reference-architecture/atomic/molecules/Agents.md)
  - [Atomic organisms](../../../open-industrial-reference-architecture/atomic/organisms/Agents.md)
  - [Atomic templates](../../../open-industrial-reference-architecture/atomic/templates/Agents.md)
- Analytics instrumentation:
  - [Home analytics spec](../../docs/marketing/home-analytics-spec.md)
  - [Home QA checklist](../../docs/marketing/home-qa-checklist.md)
- Marketing process: corporate wiki entry TBD (link placeholder).

## Changelog Expectations

- Update when campaigns, brand guidelines, or analytics integrations change.
- Review quarterly with marketing to ensure content freshness.
