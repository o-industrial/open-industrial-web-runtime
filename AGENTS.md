# Agents Guide — open-industrial-web-runtime

Admin and marketing web runtime built on Deno + Preact. Hosts admin screens, public content, and identity/licensing integrations.

## Scope
- Build admin UIs (e.g., Licenses, Access Rights) under `apps/admin/*`.
- Implement backend actions in colocated `api/` routes.
- Integrate with EaC Identity & Licensing for commit flows.

## Project Map
- `apps/admin/*`: Admin pages and actions
- `apps/home`, `apps/docs`, `apps/blog`: Public content
- `apps/components/*`: Reusable page sections
- `src/plugins/*`: Runtime plugins (MSAL, Licensing)
- `src/state/OpenIndustrialWebState.ts`: Shared request state
- `configs/eac-runtime.config.ts`: Runtime config

## Commands
- Dev: `deno task dev` (watches `apps/, configs/, routes/, src/, static/`)
- Check: `deno task check`
- Test: `deno task test`
- Build: `deno task build`
- Start: `deno task start`
- Docker: `deno task build:docker` → `deno task refresh:docker`
  - Default port: 5411

## Patterns
- Admin pages follow: page.tsx → form → `apps/.../api/*` handler → `ctx.State.OIClient.Admin.CommitEaC`.
- Use `@o-industrial/common/*` components for consistent UI.
- Keep types imported from local `@fathym/eac-*` mappings where configured in `deno.jsonc`.

## PR Checklist
- `deno task check` and `deno task test` must pass.
- Avoid wide refactors; match existing style (tailwind utility classes, atoms/molecules).
- Update or add tests in `tests/` when changing behavior.

## Safety
- No license header changes.
- Do not add new formatters; use repo formatting rules.
- Keep API handlers idempotent and redirect with 303 after mutating operations.

