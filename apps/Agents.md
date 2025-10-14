# Agents Guide - Web Runtime Apps

Directory-level guide for marketing-facing apps that remain in the Open Industrial web runtime. Workspace UX now lives in [open-industrial-workspace-runtime](../../open-industrial-workspace-runtime/apps/Agents.md).

## Scope

- Public marketing, documentation, and blog applications under apps/*.
- Shared runtime components, middleware, and assets consumed across those public apps.

## Project Map

- home/ - marketing landing experiences. See [home guide](home/Agents.md).
- docs/ - developer documentation and product learning paths. See [docs guide](docs/Agents.md).
- blog/ - editorial content hub powered by MDX. See [blog guide](blog/Agents.md).
- adb2c/ - Azure AD B2C templates for auth flows.
- components/ - shared runtime-specific UI pieces.
- assets/ - static assets, marketing images, and diagrams; ensure licensing compliance.
- tailwind/ - shared Tailwind template used during builds.

## Commands

- deno task dev - launch dev server with watch mode.
- deno task check - format check, lint, and type-check.
- deno task test - run runtime test suite.
- deno task build - production validation.

## Patterns

- _layout.tsx can provide marketing shells; _middleware.ts enforces auth when necessary (e.g., docs).
- UI layers should rely on @o-industrial/common/* exports or apps/components/* to avoid duplication.
- Route handlers use ctx.State.OIClient.* sparingly; most public pages remain static/MDX.

## Review & Test Checklist

- Confirm _middleware.ts enforces correct auth for protected routes (docs).
- Update integration/UI coverage for navigation or marketing funnel changes.
- Validate responsive layouts across breakpoints; update Tailwind config if new utilities are required.
- Ensure navigation menus and breadcrumbs remain accurate after structural changes.

## Safety & Guardrails

- No secrets committed; rely on env files ignored by git.
- Optimize large assets before adding to assets/.
- Shared logic belongs in apps/components or the reference architecture.

## Ownership Signals

- **Primary owner:** Web Platform Team - Mika Ito.
- **Contact:** #open-industrial-web-runtime Slack channel.
- **Escalation:** Runtime Architecture Guild (Jordan Blake).

## Related Docs

- Parent: [open-industrial-web-runtime/AGENTS.md](../AGENTS.md).
- Workspace runtime apps: [open-industrial-workspace-runtime/apps/Agents.md](../../open-industrial-workspace-runtime/apps/Agents.md).
- Sibling guides: [Home](home/Agents.md), [Docs](docs/Agents.md), [Blog](blog/Agents.md).

## Changelog Expectations

- Update this overview when adding/removing marketing apps or altering routing conventions.
- Review quarterly alongside runtime releases to keep cross-links accurate.