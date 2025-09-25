# Home Marketing Alignment Summary

## Page Purpose
- Present Open Industrial as the AI-powered telemetry hub for manufacturing teams.
- Highlight the unified data ingestion, natural language querying (Azi), and governed sharing value loops.
- Drive visitors toward workspace signup and demo scheduling while routing to docs and detailed use cases.

## Messaging Pillars
1. **Unified Operational Data** — ingest telemetry across DCS, SCADA, MES, historians, lab systems into a governed hub.
2. **Instant, Explainable Intelligence** — natural language questions through Azi with explainable KQL output.
3. **Governed Distribution & Automation** — publish results as APIs, embed within apps, automate with guardrails.
4. **Trust & Control** — security, auditing, and policy enforcement highlighted in cloud control items.

## Target Personas & Jobs-to-be-Done
- **Operations Leaders** — need cross-line visibility, downtime diagnosis, governance oversight.
- **Process / Quality Engineers** — require batch analysis, compliance reporting, contextual data correlation.
- **Digital Transformation / OT IT** — own data connectivity, integration ecosystems, and secure rollout.
- **Plant Managers / Supervisors** — interested in instant anomaly detection, shift performance, action triggers.

## CTA Hierarchy & Destinations
| Placement | Copy | URL | Notes |
| --- | --- | --- | --- |
| Global Nav CTA | Get Started | `/workspace` (external) | Primary sign-up CTA shown in nav & hero |
| Hero Primary | Get Started | `https://www.openindustrial.co/workspace` | Should fire `cta_hero_primary` event |
| Hero Secondary | Learn More | `https://www.openindustrial.co/docs/` | External docs; track `cta_hero_secondary` |
| Value CTA | (within Product Spotlight summary) | n/a | Informational; ensure scroll-depth events |
| Closing CTA Primary | Get Started Today | `https://www.openindustrial.co/workspace` | Duplicate of hero primary; confirm dedup in analytics |
| Closing CTA Secondary | Schedule Demo | `/contact` | Should open HubSpot form modal when available |

## Analytics & Instrumentation
- **HubSpot** form embed requested via `<script src="https://js.hsforms.net/forms/embed/v2.js">` in `_layout.tsx`; needs feature-flag toggle + consent gating.
- **Segment/GA** not yet wired in repo; plan to configure via env-driven IDs in Phase 5 (ensure no inline IDs).
- Proposed event taxonomy:
  - `cta_click` with properties `{ location, label, href, variant }`.
  - `scroll_depth` at 25/50/75/100 to measure engagement across long page.
  - `hero_interaction`, `feature_card_hover`, `quote_cycle` optional for qualitative insight.
- Add consent banner hook aligned with marketing policy before enabling pixel scripts.
- Ensure HubSpot forms load only after consent accepted (Phase 5 task).

## Performance & Accessibility Targets
- Lighthouse Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 95, SEO ≥ 90.
- CLS ≤ 0.1, TTI ≤ 3.5s on cable 4G, TBT ≤ 150ms.
- Enforce via Playwright+Lighthouse smoke suite (Phase 6) and CI threshold gating.
- Avoid layout shift by reserving hero media dimensions and deferring heavy background gradients.

## Content Governance
- Adopt monthly copy review with Growth Marketing; emergency updates allowed via MDX override once CMS workflow established.
- Legal copy (Privacy, Terms) sync with corporate counsel quarterly.
- Localization not in MVP scope; capture translation requirements during quarterly review.

## Dependencies & Approvals
- Growth Marketing: copy sign-off, CTA tracking taxonomy, consent messaging.
- Design System Guild: gradient tokenization, component promotion upstream.
- Web Platform Components Pod: runtime component alignment and tests.
- QA: Lighthouse + a11y automation support.

## Open Questions
- Confirm instrumentation stack (Segment vs GA4) and required data layer schema.
- Decide on gating for HubSpot script (consent vs always-on for beta).
- Clarify owner for monthly content review + change management.
- Determine dark-mode storytelling adjustments (current design heavy on dark gradients).
