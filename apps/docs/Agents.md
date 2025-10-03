# Agents Guide - Docs App

Product documentation surface delivering technical guides, reference material, and conceptual content for Open Industrial. Built on MDX with dynamic navigation support.

## Scope

- Host structured documentation under `apps/docs/*` with MDX content and configuration files.
- Manage navigation metadata, table of contents, and in-page components.
- Integrate search, analytics, and feedback hooks when available.
- Exclude API spec generation (see dedicated tooling repos) and blog/editorial content.

## Project Map

- `_layout.tsx` - Documentation shell with sidebar navigation and search slots.
- `_middleware.ts` - Handles caching and optional auth for preview routes.
- `index.mdx` - Landing page for docs hub.
- Topic directories (`getting-started/`, `execution-model/`, `mission-critical/`, etc.) contain MDX plus supporting assets.
- `.config.ts` - Central navigation config; update when adding/removing topics.

## Commands

- `deno task dev` - Preview docs locally with hot reload.
- `deno task test --filter docs` - Run snapshot tests to catch structural regressions.
- `deno task build` - Ensure static generation works for all docs routes before deployment.

## Patterns

- Use frontmatter or exported metadata blocks for titles, descriptions, and ordering.
- Leverage shared MDX components from `apps/components` and the atomic design system for callouts, cards, etc.
- Keep links relative when possible; use absolute URLs only for external references.
- Document versioning strategies (e.g., include release badges) and cross-link to other runtimes when relevant.

## Review & Test Checklist

- Validate navigation updates in `.config.ts`; ensure anchors resolve correctly.
- Run link checker (planned script) or manual sweep for broken internal links.
- Confirm syntax highlighting and code samples render as expected (use fenced blocks with language tags).

## Safety & Guardrails

- Avoid importing server-only modules in MDX; components must be SSR-safe.
- Large diagrams should be optimized and stored under `apps/assets`; reference with relative paths.
- Content with compliance impact (security, data handling) must be reviewed by legal/compliance before publishing.

## Ownership Signals

- **Primary owner:** Developer Experience Team.
- **Point of contact:** #oi-docs Slack channel.
- **Escalation:** DX Lead (Alex Nguyen).

## Dependencies & Integrations

- Utilize MDX tooling configured in `deno.jsonc` and runtime bundler.
- Search integration uses `src/plugins/search` (placeholder to fill once implemented).
- Coordinate with infrastructure to publish static assets to CDN.

## Related Docs

- Parent overview: [Apps guide](../Agents.md).
- Contributing guidelines: pending addition to `docs/CONTRIBUTING.md` (Phase 3).
- Design references: [Atomic templates](../../open-industrial-atomic/src/templates/Agents.md).

## Changelog Expectations

- Update this guide when navigation structure changes or new doc families launch.
- Perform quarterly audits to prune stale content and sync with product releases.
