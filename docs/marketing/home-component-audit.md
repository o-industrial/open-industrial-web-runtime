# Home Component Audit Matrix

Audit date: 2025-09-23 (prepared by Codex). Source content pulled from
`open-industrial-web-runtime/apps/home` and
`open-industrial-web-runtime/apps/components/organisms/marketing/open-industrial-home`.

| Section                     | File                                  | Purpose                                                            | Primary Dependencies                                         | Atomic Coverage            | Proposed Alignment Actions                                                                                                                                   |
| --------------------------- | ------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| HeroExperienceSection       | `.../HeroExperienceSection.tsx`       | Hero storytelling and primary CTAs                                 | `SectionSurface`, `SectionHeader`, `Action` atoms            | Partial (header + buttons) | Externalize gradient tokens; evaluate atomic hero template; ensure CTA tracking hook added.                                                                  |
| ProductSpotlightSection     | `.../ProductSpotlightSection.tsx`     | Explain value proposition with spotlight highlights                | `SectionSurface`, `SectionHeader`; custom article cards      | Partial                    | Replace article cards with `FeatureCard` molecules; promote badge gradient helper; extract highlight data to typed model.                                    |
| StrategicPillarsSection     | `.../StrategicPillarsSection.tsx`     | Communicate three pillars (governance, explainability, activation) | `SectionSurface`; bespoke cards                              | Minimal                    | Port to reusable `PillarCard` organism or adapt `FeatureCard`; move gradient props into shared helper.                                                       |
| UnifiedMetricsSection       | `.../UnifiedMetricsSection.tsx`       | Showcase metrics (integrations, steps, options)                    | `SectionSurface`, `SectionHeader`; bespoke metric cards      | Partial                    | Introduce `StatHighlight` molecule (if not in atomic) or reuse existing; shift metric calculation into content contract; add analytics event for card hover. |
| GovernedFlowSection         | `.../GovernedFlowSection.tsx`         | Display ingestion-to-activation flow steps                         | `StepsSection` organism                                      | High                       | Only needs styling tokens moved to shared helper; document usage in Agents.                                                                                  |
| AIConversationsSection      | `.../AIConversationsSection.tsx`      | Demonstrate Azi query prompts                                      | `SectionSurface`, `SectionHeader`, `QuoteCard` molecule      | High                       | Wrap quotes in `QuoteCarousel` if needed; add instrumentation for quote interactions; consolidate intent palette.                                            |
| ValueDeliverySection        | `.../ValueDeliverySection.tsx`        | Feature grid of governed outcomes                                  | `ValueGridSection` organism                                  | High                       | Confirm `featureGridItems` typings; ensure highlight prompt surfaces analytics; consider upstreaming variant props.                                          |
| IntegrationEcosystemSection | `.../IntegrationEcosystemSection.tsx` | List integrations grouped by domain                                | `IntegrationMatrixSection` organism                          | High                       | Move integration counts into typed content; evaluate lazy loading for large lists; document column schema.                                                   |
| UnifiedFlowSection          | `.../UnifiedFlowSection.tsx`          | Visual data flow diagram                                           | `FlowDiagramSection` organism                                | High                       | Ensure diagram content typed; reuse gradient tokens; add instrumentation for node hover if needed.                                                           |
| SharedTruthSection          | `.../SharedTruthSection.tsx`          | Benefits checklist                                                 | `BenefitsSection` organism                                   | High                       | Align item intents with atomic tokens; cross-link to atomic docs.                                                                                            |
| GovernedDeploymentSection   | `.../GovernedDeploymentSection.tsx`   | Cloud deployment options                                           | `CloudControlSection` organism                               | High                       | Confirm card order from content; add analytics for CTA (if added later).                                                                                     |
| FutureVisionSection         | `.../FutureVisionSection.tsx`         | Future roadmap checklist                                           | `SectionSurface`, `SectionHeader`, `ChecklistGroup` molecule | Partial                    | Move checklist styling overrides into helper; consider dedicated `FutureVisionSection` organism in atomic.                                                   |
| ReadyCTASection             | `.../ReadyCTASection.tsx`             | Closing CTA block                                                  | `CTADeepLinkSection` organism                                | High                       | Add analytics events; ensure CTA text derived from content contract.                                                                                         |

## Shared Styling & Tokenization Targets

- Hero, Product Spotlight, Strategic Pillars, Unified Metrics, and Future Vision
  each define bespoke gradient/backdrop utilities. Collect these into a shared
  helper (e.g., `marketingGradients.ts`) and expose typed keys. **Status:**
  initial gradient registry added at `src/marketing/gradients.ts`, consuming
  sections updated.
- Section padding, max-width, and rounded radius values repeat across sections;
  define layout tokens in a shared configuration exported from
  `apps/components/organisms/marketing/shared/layout.ts`.

## Immediate Audit Follow-ups

1. Confirm whether atomic library already offers hero/spotlight templates; open
   promotion tickets if not.
2. ✅ Analytics instrumentation spec drafted
   (`docs/marketing/home-analytics-spec.md`); expand as new events emerge.
3. ✅ `homeContent` coverage validated; ensure new sections extend the contract
   and fixtures.
4. Identify sections suitable for storybook/visual regression baselines ahead of
   implementation phases.

## Recent Updates

- Navigation contract centralized via `marketingNavigation` object
  (`src/marketing/navigation.ts`).
- Home content fixtures added for testing/prototyping
  (`src/marketing/__fixtures__/homeContent.fixture.ts`).
- Marketing organisms folders normalized (`home-page` ->
  `open-industrial-execute`, `automate` -> `automate-runtime`, `pdm` ->
  `product-data-management`).
- Analytics instrumentation spec documented
  (`docs/marketing/home-analytics-spec.md`).
- QA checklist published (`docs/marketing/home-qa-checklist.md`).

## Inline Data vs Content Contract

| Section                     | Inline Data Present | Notes                                                                                | Phase 2 Action                                                                                |
| --------------------------- | ------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| HeroExperienceSection       | No                  | Consumes `homeContent.hero`; actions already typed.                                  | Ensure CTA tracking metadata lives alongside hero content.                                    |
| ProductSpotlightSection     | Partial             | Derives `spotlightHighlights` from `futureVisionItems`, uses inline badge gradients. | Move spotlight cards into dedicated `productSpotlightItems` content block with gradient keys. |
| StrategicPillarsSection     | Yes                 | Pillar list hard-coded in component.                                                 | Move pillars to `homeContent` with typed schema; share across other surfaces.                 |
| UnifiedMetricsSection       | Yes                 | Metrics array derived in component.                                                  | Move metrics definition and computed stats into `homeContent` or a selector helper.           |
| GovernedFlowSection         | No                  | Uses typed `howItWorksSteps`.                                                        | Document props contract.                                                                      |
| AIConversationsSection      | No                  | Uses `conversationalQuotes`.                                                         | Add optional attribution fields in content contract if required.                              |
| ValueDeliverySection        | No                  | Uses `featureGridItems`.                                                             | Ensure highlight/prompt fields typed (already).                                               |
| IntegrationEcosystemSection | No                  | Uses `integrationColumns`.                                                           | Add `icon` or `cta` support if needed later.                                                  |
| UnifiedFlowSection          | No                  | Uses `flowDiagram`.                                                                  | Confirm schema covers future animation options.                                               |
| SharedTruthSection          | No                  | Uses `benefitsItems`.                                                                | Add analytics metadata if needed.                                                             |
| GovernedDeploymentSection   | No                  | Uses `cloudControlItems`.                                                            | Add CTA/support fields if required.                                                           |
| FutureVisionSection         | No                  | Uses `futureVisionItems`.                                                            | Normalize gradient tokens via typed key.                                                      |
| ReadyCTASection             | No                  | Uses `cta`.                                                                          | Ensure CTA copy/urls localized via contract.                                                  |

- Shared layout helper introduced at
  `apps/components/organisms/marketing/shared/layout.ts` to standardize
  `contentClass` usage.
