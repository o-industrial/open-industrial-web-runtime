# Agents Guide - Home App

Marketing landing experience for Open Industrial. Focuses on storytelling, lead capture, and navigation into deeper product material.

## Scope
- Host public marketing pages (`index`, `about`, `contact`, `terms`, `privacy`, `use-case`).
- Coordinate hero sections, CTAs, and forms with reusable content components.
- Integrate analytics hooks and marketing automation scripts when required.
- Exclude authenticated flows and admin tooling.

## Project Map
- `_layout.tsx` - Shared layout with navigation, footer, and analytics injection.
- `_middleware.ts` - Handles locale detection and caching headers for public content.
- `index.tsx` - Primary landing page; ensure hero messaging matches current campaigns.
- `about/`, `contact/`, `use-case/`, etc. - Subsections with static/MDX content.
- Reusable sections stored under `apps/components/organisms`; import rather than duplicating markup.

## Commands
- `deno task dev` - Run runtime locally; verify home pages render without auth.
- `deno task test --filter home` - Execute snapshot or Playwright tests for public pages.
- `deno task check` - Ensure SEO metadata and structured data types compile.

## Patterns
- Maintain content in MDX or JSON where possible; keep JSX lean and data-driven.
- Use Tailwind utility classes consistently; align fonts/colors with atomic theming.
- Wire analytics through centralized helpers; avoid inline script tags without review.
- Keep forms (contact, lead gen) behind feature flags until backend endpoints are ready.

## Review & Test Checklist
- Confirm Lighthouse targets (>90 performance/accessibility) for landing pages.
- Validate copy, CTAs, and legal text with marketing stakeholders.
- Ensure responsive design across breakpoints and evaluate dark-mode support if applicable.

## Safety & Guardrails
- No hard-coded secrets or tracking IDs; pull from environment-specific configs.
- Large assets should be optimized and placed under `apps/assets` with CDN headers configured.
- Avoid heavy third-party embeds that degrade performance without explicit approval.

## Ownership Signals
- **Primary owner:** Growth Marketing & Web Platform.
- **Point of contact:** #oi-marketing-site Slack channel.
- **Escalation:** Web Platform Lead (Mika Ito).

## Dependencies & Integrations
- Share components with `apps/components/organisms` and the atomic design system.
- Optional integrations: analytics (Segment, GA), forms (HubSpot) configured via environment variables.
- Pull shared nav/footer data from `configs/site` (to be standardized in Phase 2).

## Related Docs
- Parent: [Apps overview](../Agents.md).
- Upstream styling: [Atomic templates guide](../../../open-industrial-reference-architecture/atomic/templates/Agents.md).
- Marketing content process docs (see corporate wiki link to add in future revision).

## Changelog Expectations
- Update when campaigns, brand guidelines, or analytics integrations change.
- Review quarterly with marketing to ensure content freshness.
