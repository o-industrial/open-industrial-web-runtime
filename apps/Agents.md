# Agents Guide - Web Runtime Apps

Directory-level guide for all user-facing experiences in the Open Industrial web runtime. This overview maps each app surface, shared building blocks, and review expectations.

## Scope

- Covers content and admin applications under `apps/*`, including routing and UI wiring.
- Explains how app routes integrate with runtime state, plugins, and atomic components.
- Outlines shared assets, middleware, and components used across multiple apps.
- Excludes backend API handlers in `routes/api`; see runtime root Agents guide for server logic.

## Project Map

- `admin/` - Authenticated admin portal for licenses, access rights, and workspace management. See [admin guide](admin/Agents.md).
- `home/` - Marketing landing surfaces and top-level storytelling. See [home guide](home/Agents.md).
- `docs/` - Developer documentation and product learning paths. See [docs guide](docs/Agents.md).
- `blog/` - Editorial content hub powered by MDX. See [blog guide](blog/Agents.md).
- `workspace/` - Authenticated workspace UX and execution tools. See [workspace guide](workspace/Agents.md).
- `adb2c/` - Azure AD B2C templates for auth flows; evaluate whether separate Agents.md is needed.
- `components/` - Shared organisms used across apps (mirrors atomic patterns but runtime-specific).
- `assets/` - Static assets, marketing images, and diagrams; ensure licensing compliance.

## Commands

- `deno task dev --app=<name>` - Launch a focused dev server when working on a specific app (pass directory alias via env or config).
- `deno task check` - Validate types and lint across the runtime; required before PRs.
- `deno task test` - Run runtime test suite, including Playwright tests for critical app flows.
- `deno task build` - Production build to confirm bundling before release.

## Patterns

- Every app folder uses `_layout.tsx` for page shell, `_middleware.ts` for auth/routing, and route files for content.
- Keep UI layers thin: leverage `@o-industrial/common/*` exports and runtime `apps/components/*` when possible.
- Use `ctx.State.OIClient.*` clients within route handlers for EaC integration; avoid direct `fetch` calls.
- Store page metadata in co-located `config.ts` or frontmatter for SEO consistency.

## Review & Test Checklist

- Confirm `_middleware.ts` enforces correct auth for protected apps.
- Ensure Playwright coverage exists (or is updated) for critical flows when behavior changes.
- Validate responsive layouts across breakpoints; update Tailwind configs if new utilities are required.
- Cross-check navigation menus and breadcrumbs for broken links after structural changes.

## Safety & Guardrails

- Do not commit secrets or env values; rely on `configs/eac-runtime.config.ts` and environment variables.
- Keep asset sizes optimized; large media requires compression before adding to `assets/`.
- Avoid coupling apps directly�shared components should live in `apps/components` or the atomic library.

## Ownership Signals

- **Primary owner:** Web Platform Team - Mika Ito.
- **Point of contact:** #open-industrial-web-runtime Slack channel.
- **Escalation:** Runtime Architecture Guild (Jordan Blake).

## Dependencies & Integrations

- Relies on runtime plugins in `src/plugins/*` (MSAL, licensing) and shared state in `src/state/OpenIndustrialWebState.ts`.
- Consumes configs from `configs/eac-runtime.config.ts` and secrets provided via Deno KV.
- Builds on atomic components (`@o-industrial/common/*`) exported from the reference architecture repo.

## Related Docs

- Parent: [open-industrial-web-runtime/AGENTS.md](../AGENTS.md).
- Sibling guides: [Admin](admin/Agents.md), [Home](home/Agents.md), [Docs](docs/Agents.md), [Blog](blog/Agents.md), [Workspace](workspace/Agents.md).
- Shared plugin guidance forthcoming in `src/plugins/Agents.md` (Phase 2).

## Changelog Expectations

- Update this overview when adding/removing apps or altering routing conventions.
- Review quarterly alongside runtime releases to keep cross-links accurate.
