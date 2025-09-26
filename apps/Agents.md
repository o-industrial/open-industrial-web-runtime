# Agents Guide � Web Runtime Apps

Directory-level guide for user-facing experiences in the Open Industrial web runtime. Admin surfaces are now served from [`open-industrial-admin-runtime`](../../open-industrial-admin-runtime/apps/Agents.md); this overview covers the remaining apps in this repo.

## Scope

- Public marketing, documentation, and blog applications under `apps/*`.
- Authenticated workspace UX (`apps/workspace/*`).
- Shared runtime components, middleware, and assets consumed across apps.

## Project Map

- `home/` � Marketing landing surfaces and storytelling. See [home guide](home/Agents.md).
- `docs/` � Developer documentation and product learning paths. See [docs guide](docs/Agents.md).
- `blog/` � Editorial content hub powered by MDX. See [blog guide](blog/Agents.md).
- `workspace/` � Authenticated workspace UX and execution tools. See [workspace guide](workspace/Agents.md).
- `adb2c/` � Azure AD B2C templates for auth flows.
- `components/` � Shared runtime-specific UI pieces.
- `assets/` � Static assets, marketing images, and diagrams; ensure licensing compliance.

## Commands

- `deno task dev` � launch dev server with watch mode.
- `deno task check` � format check, lint, and type-check (required before PRs).
- `deno task test` � run runtime test suite.
- `deno task build` � production validation.

## Patterns

- Each app can provide `_layout.tsx` for page shells and `_middleware.ts` for auth/routing requirements.
- UI layers should rely on `@o-industrial/common/*` exports or `apps/components/*` to avoid duplication.
- Route handlers use `ctx.State.OIClient.*` for EaC integration; avoid bare `fetch`.
- Store page metadata in co-located helpers/frontmatter for SEO consistency.

## Review & Test Checklist

- Confirm `_middleware.ts` enforces correct auth for protected routes.
- Update Playwright coverage for critical flows when altering behavior.
- Validate responsive layouts across breakpoints; update Tailwind config if new utilities are required.
- Ensure navigation menus and breadcrumbs remain accurate after structural changes.

## Safety & Guardrails

- No secrets committed; rely on env files ignored by git.
- Optimize large assets before adding to `assets/`.
- Shared logic belongs in `apps/components` or the reference architecture.

## Ownership Signals

- **Primary owner:** Web Platform Team � Mika Ito.
- **Contact:** #open-industrial-web-runtime Slack channel.
- **Escalation:** Runtime Architecture Guild (Jordan Blake).

## Dependencies & Integrations

- Relies on runtime plugins in `src/plugins/*` (MSAL, licensing) and shared state in `src/state/OpenIndustrialWebState.ts`.
- Consumes configuration from `configs/eac-runtime.config.ts` and secrets supplied via Deno KV.
- Builds on atomic components exported from the reference architecture (`@o-industrial/common/*`).

## Related Docs

- Parent: [open-industrial-web-runtime/AGENTS.md](../AGENTS.md).
- Admin runtime guide: [`open-industrial-admin-runtime/apps/Agents.md`](../../open-industrial-admin-runtime/apps/Agents.md).
- Sibling guides: [Home](home/Agents.md), [Docs](docs/Agents.md), [Blog](blog/Agents.md), [Workspace](workspace/Agents.md).

## Changelog Expectations

- Update this overview when adding/removing apps or altering routing conventions.
- Review quarterly alongside runtime releases to keep cross-links accurate.
