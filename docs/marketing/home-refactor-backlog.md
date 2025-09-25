# Home Refactor Backlog

This backlog captures the implementation tasks required to align `apps/home`
with the marketing strategy and atomic reuse goals. Each entry should become a
ticket (or checklist item) before coding.

## Section-Level Refactors

- [ ] **HeroExperienceSection**
      (`apps/components/organisms/marketing/open-industrial-home/HeroExperienceSection.tsx`)
  - [x] Add CTA analytics events (`cta_click` with location `hero`).
  - [x] Ensure layout helper + gradient tokens cover hero background.
  - [ ] Snapshot/story coverage for hero copy + actions.
- [ ] **ProductSpotlightSection**
  - Replace inline article markup with `FeatureCard` molecule instances or
    promote spotlight card organism.
  - [x] Add instrumentation for highlight prompt exposures.
  - Validate image asset dimensions & lazy loading.
- [ ] **StrategicPillarsSection**
  - Evaluate promotion of `PillarCard` pattern to atomic library.
  - Add tests/stories verifying badge intent tokens.
- [ ] **UnifiedMetricsSection**
  - Consider `StatHighlight` molecule upstream; add Playwright coverage for
    metric values.
- [ ] **GovernedFlowSection**
  - Confirm `StepsSection` variant works for future CMS drive content.
  - Add instrumentation for step interactions if present.
- [ ] **AIConversationsSection**
  - Assess need for quote carousel vs static cards.
  - [x] Add analytics for quote interactions.
- [ ] **ValueDeliverySection**
  - Storybook story verifying highlight chips & prompt alignment.
- [ ] **IntegrationEcosystemSection**
  - Support optional icons/category metadata; ensure long lists collapse
    gracefully.
- [ ] **UnifiedFlowSection**
  - Add alt text/context for diagram nodes; consider animation toggle.
- [ ] **SharedTruthSection**
  - Validate checklist icons + intents vs atomic defaults.
- [ ] **GovernedDeploymentSection**
  - Map cloud option CTAs once ready; instrumentation.
- [ ] **FutureVisionSection**
  - Promote checklist styling overrides upstream (dark/light).
- [ ] **ReadyCTASection**
  - [x] Wire CTA analytics events (shared helper).
  - [ ] Deduplicate analytics with hero + ensure HubSpot toggle logic.

## Cross-Cutting Tasks

- [x] Normalize marketing organism folder naming (`open-industrial-home` vs
      `home-page`).
- [ ] Promote eligible organisms/components to the atomic repo
      (Hero/Spotlight/Pillar/Metric helpers).
- [ ] Update `apps/home/Agents.md` and `apps/components/Agents.md` once
      refactors land.
- [ ] Add Storybook/visual baseline coverage for hero, spotlight, metrics, CTA.
- [x] Document analytics instrumentation contract (CTA, scroll depth,
      interactions) (`docs/marketing/home-analytics-spec.md`).

## Dependencies

- Pending approval on analytics taxonomy from Growth Marketing.
- Awaiting design sign-off on hero/spotlight visual updates before upstream
  promotion.
