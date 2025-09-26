# Open Industrial Web Runtime

Marketing + workspace runtime for Open Industrial built on Deno, Preact, and Fathym EaC. Admin experiences now live in the dedicated [`open-industrial-admin-runtime`](../open-industrial-admin-runtime) package, so this runtime focuses on public surfaces and tenant workspaces.

Highlights

- Preact + Atomic UI backed by the shared reference architecture components.
- Deno-first toolchain (`deno task dev/test/check`) with Tailwind styling.
- Workspace portal (`apps/workspace/*`) for authenticated tenants.
- Marketing, docs, and blog surfaces under `apps/home`, `apps/docs`, `apps/blog`.

Getting Started

1. Install Deno (v1.45+ recommended).
2. Copy `.env` (see provided sample) and configure API/auth keys.
3. Run `deno task dev` for watch mode, or `deno task start` for a one-off run.
4. Validate with `deno task check` and `deno task test` before committing.

Key Tasks

- `deno task dev` – start dev server with file watching.
- `deno task check` – format check, lint, and type-check.
- `deno task test` – execute runtime test suite.
- `deno task build` – run full build validations.
- Docker helpers: `deno task build:docker`, `deno task refresh:docker`.

Project Structure

- `apps/home`, `apps/docs`, `apps/blog` – public marketing & learning content.
- `apps/workspace` – authenticated workspace UX.
- `apps/adb2c` – Azure AD B2C layout templates.
- `apps/components` – runtime-specific shared UI pieces.
- `apps/assets` – static assets served by the runtime.
- `src/plugins` – runtime plugins (atomic icons, licensing integrations, oauth, etc.).
- `src/state/OpenIndustrialWebState.ts` – shared request/session state.

Admin Surfaces

All admin dashboards, access cards, licenses, and workspace management routes moved to [`open-industrial-admin-runtime`](../open-industrial-admin-runtime). Update docs and links to point to that repo when referencing admin functionality.

Docker

- Build image: `deno task build:docker`
- Create network (optional local compose): `deno task network:docker`
- Run container: `deno task deploy:docker`

Troubleshooting

- Type errors: run `deno task check` and follow reported locations.
- Styling: ensure Tailwind output (`tailwind/styles.css`) is available; dev server injects it automatically.
- Env vars: confirm `.env` values match local API endpoints.

License
MIT
