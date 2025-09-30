# Agents Guide - open-industrial-web-runtime

Public marketing runtime for Open Industrial. Workspace and admin surfaces now live in their dedicated runtimes (`open-industrial-workspace-runtime`, `open-industrial-admin-runtime`).

## Scope
- Serve public marketing, docs, and blog surfaces under apps/home, apps/docs, apps/blog.
- Provide shared assets/components consumed by those public routes.
- Handle MSAL/ADB2C hooks only for experiences that remain in this repo (e.g., docs sign-in).

## Project Map
- `apps/` – marketing and documentation apps (see [apps overview](apps/Agents.md)).
- `src/plugins/*` – runtime plugins (MSAL, analytics) scoped to public surfaces.
- `src/state/OpenIndustrialWebState.ts` – shared request/session state for web routes.
- `configs/eac-runtime.config.ts` – runtime configuration.
- `denokv/` – local KV data for development/testing.

## Commands
- `deno task dev` – start dev server with watch mode (`apps/`, `configs/`, `routes/`, `src/`, `static/`).
- `deno task check` – format check, lint, and type-check.
- `deno task test` – run runtime test suite.
- `deno task build` – production build validation.
- Docker workflow: `deno task build:docker`, `deno task refresh:docker`.

## Patterns
- Public pages consume shared sections from `apps/components` and atomic templates.
- OAuth-protected docs routes rely on `_middleware.ts`; keep auth logic minimal now that workspace moved out.
- Shared UI belongs in `apps/components` or the reference architecture (`@o-industrial/common/*`).

## Review & Test Checklist
- `deno task check` and `deno task test` green before requesting review.
- Update integration/UI tests for navigation or marketing flow changes.
- Verify Tailwind usage and Lighthouse metrics for marketing pages.

## Safety & Guardrails
- Do not commit secrets; rely on `.env*` files & deployment secrets.
- Keep API/redirect handlers idempotent; redirect with HTTP 303 after writes.
- Optimize large assets before adding to `apps/assets/`.

## Ownership Signals
- **Primary owner:** Web Platform Team – Mika Ito.
- **Point of contact:** #open-industrial-web-runtime Slack.
- **Escalation:** Runtime Architecture Guild (Jordan Blake).

## Dependencies & Integrations
- Depends on atomic library exports from `open-industrial-reference-architecture` (`@o-industrial/common/*`).
- Authentication via MSAL/ADB2C remains for docs sign-in.
- Build/test pipeline integrates with Deno KV, Docker images, and release tooling.

## Related Docs
- Repo root: [Agents template](../Agents.template.md) & [inventory](../Agents.inventory.md).
- Workspace runtime: [`open-industrial-workspace-runtime/AGENTS.md`](../open-industrial-workspace-runtime/AGENTS.md).
- Admin runtime: [`open-industrial-admin-runtime/AGENTS.md`](../open-industrial-admin-runtime/AGENTS.md).

## Changelog Expectations
- Update this guide when adding/removing marketing apps, changing runtime plugins, or altering deployment workflows.
- Revisit quarterly to keep cross-links and responsibilities accurate.
