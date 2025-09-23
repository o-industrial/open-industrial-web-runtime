# Agents Guide - open-industrial-web-runtime

Admin and marketing web runtime built on Deno + Preact. Hosts admin experiences, public content, workspace surfaces, and identity/licensing integrations.

## Scope
- Build admin UIs under `apps/admin/*` and manage associated API handlers.
- Serve public marketing, docs, and blog surfaces under `apps/home`, `apps/docs`, `apps/blog`.
- Deliver authenticated workspace UX under `apps/workspace/*`.
- Integrate with EaC Identity & Licensing via runtime plugins and shared state.

## Project Map
- `apps/` - Application surfaces. See [apps overview](apps/Agents.md) and sub-guides per app.
- `src/plugins/*` - Runtime plugins (MSAL, licensing, analytics). Document usage as part of governance rollout.
- `src/state/OpenIndustrialWebState.ts` - Shared request/session state helpers.
- `configs/eac-runtime.config.ts` - Runtime configuration; align with infra team on changes.
- `denokv/` - Local KV data for development/testing.

## Commands
- `deno task dev` - Starts dev server (watches `apps/`, `configs/`, `routes/`, `src/`, `static/`).
- `deno task check` - Formatting, linting, and type checks; required before PR.
- `deno task test` - Runs unit/integration/Playwright tests.
- `deno task build` - Production build validation.
- `deno task start` - Run compiled output.
- `deno task build:docker` + `deno task refresh:docker` - Container workflow (default port 5411).

## Patterns
- For admins: `page.tsx` + form component + `apps/.../api/*` handler chaining to `ctx.State.OIClient.Admin.CommitEaC`.
- Public pages consume shared sections from `apps/components` and atomic templates for consistency.
- Use `@o-industrial/common/*` imports for design-system components; avoid duplicating atoms/molecules.
- Keep types sourced from local `@fathym/eac-*` aliases configured in `deno.jsonc`.
- Cross-link new features in the relevant `Agents.md` under `apps/` to keep contributors oriented.

## Review & Test Checklist
- `deno task check` and `deno task test` green before requesting review.
- Update Playwright or integration tests when behavior changes (admin workflows, workspace commits, public navigation).
- Verify `_middleware.ts` auth rules for protected apps.
- Confirm Tailwind class usage and ensure responsive behavior across target breakpoints.

## Safety & Guardrails
- No license header or formatter changes without approval.
- Keep API handlers idempotent; redirect with HTTP 303 after write operations.
- Do not commit secrets or environment values; rely on `.env*` files ignored by git and deployment secrets.
- Monitor bundle size and Lighthouse scores for public surfaces; coordinate with marketing before adding heavy assets.

## Ownership Signals
Many surfaces now have dedicated guides:
- [Apps overview](apps/Agents.md) with links to [admin](apps/admin/Agents.md), [home](apps/home/Agents.md), [docs](apps/docs/Agents.md), [blog](apps/blog/Agents.md), [workspace](apps/workspace/Agents.md), [adb2c](apps/adb2c/Agents.md), and [runtime components](apps/components/Agents.md).
- Asset management: [apps/assets guide](apps/assets/Agents.md).

Primary runtime ownership remains with the Web Platform Team (contact via #open-industrial-web-runtime Slack). Escalate to Runtime Architecture Guild (Jordan Blake) for cross-team blocking issues.

## Dependencies & Integrations
- Depends on atomic library exports from `open-industrial-reference-architecture` (`@o-industrial/common/*`).
- Authentication via MSAL plugin; licensing and workspace actions through EaC clients.
- Build/test pipeline integrates with Deno KV, Docker images, and infrastructure release tooling.

## Related Docs
- Repo root: [Agents template](../Agents.template.md) and inventory (`../Agents.inventory.md`).
- Reference architecture: [atomic library guide](../open-industrial-reference-architecture/atomic/Agents.md).
- Other runtime Agents: core, impulse, synaptic, api (see respective repos).

## Changelog Expectations
- Update this guide when adding/removing major apps, changing runtime plugins, or altering deployment workflow.
- Revisit quarterly to ensure cross-links and responsibilities remain accurate.
