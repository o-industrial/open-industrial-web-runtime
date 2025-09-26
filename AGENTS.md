# Agents Guide – open-industrial-web-runtime

Marketing + workspace runtime built on Deno + Preact. Admin surfaces have moved to [`open-industrial-admin-runtime`](../open-industrial-admin-runtime/AGENTS.md); this guide now covers public content, workspace UX, and shared runtime plumbing that remains in this repo.

## Scope
- Serve public marketing, docs, and blog surfaces under `apps/home`, `apps/docs`, `apps/blog`.
- Deliver authenticated workspace UX under `apps/workspace/*`.
- Manage shared runtime components, assets, identity, and licensing integrations needed for those surfaces.

## Project Map
- `apps/` – entry points for public + workspace experiences (see [apps overview](apps/Agents.md)).
- `src/plugins/*` – runtime plugins (MSAL, licensing, analytics).
- `src/state/OpenIndustrialWebState.ts` – request/session state helpers.
- `configs/eac-runtime.config.ts` – runtime configuration.
- `denokv/` – local KV data for development/testing.

## Commands
- `deno task dev` – start dev server (watches `apps/`, `configs/`, `routes/`, `src/`, `static/`).
- `deno task check` – format check, lint, and type-check; required before PR.
- `deno task test` – run unit/integration tests.
- `deno task build` – production build validation.
- Docker workflow: `deno task build:docker`, `deno task refresh:docker`.

## Patterns
- Public pages consume shared sections from `apps/components` and atomic templates.
- Workspace routes use `ctx.State.OIClient` to call EaC APIs; avoid manual `fetch`.
- Authenticated routes rely on `_middleware.ts` to enforce MSAL/ADB2C flows.
- Shared UI belongs in `apps/components` or the reference architecture (`@o-industrial/common/*`).

## Review & Test Checklist
- `deno task check` and `deno task test` green before requesting review.
- Update Playwright/integration tests for workspace or public navigation changes.
- Verify `_middleware.ts` auth rules for protected apps.
- Confirm Tailwind usage and responsive behavior across target breakpoints.

## Safety & Guardrails
- Do not commit secrets; rely on `.env*` files & deployment secrets.
- Keep API handlers idempotent; redirect with HTTP 303 after writes.
- Monitor bundle size/Lighthouse scores for public surfaces; coordinate with marketing for heavy assets.

## Ownership Signals
- **Primary owner:** Web Platform Team – Mika Ito.
- **Point of contact:** #open-industrial-web-runtime Slack.
- **Escalation:** Runtime Architecture Guild (Jordan Blake).

## Dependencies & Integrations
- Depends on atomic library exports from `open-industrial-reference-architecture` (`@o-industrial/common/*`).
- Authentication via MSAL/ADB2C plugins; licensing integrations used by workspace flows.
- Build/test pipeline integrates with Deno KV, Docker images, and infrastructure release tooling.

## Related Docs
- Repo root: [Agents template](../Agents.template.md) & [inventory](../Agents.inventory.md).
- Reference architecture: [atomic library guide](../open-industrial-reference-architecture/atomic/Agents.md).
- Admin runtime: [`open-industrial-admin-runtime/AGENTS.md`](../open-industrial-admin-runtime/AGENTS.md).

## Changelog Expectations
- Update this guide when adding/removing major apps, changing runtime plugins, or altering deployment workflows.
- Revisit quarterly to ensure cross-links and responsibilities remain accurate.
