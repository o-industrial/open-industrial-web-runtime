# Open Industrial Web Runtime

Marketing runtime for Open Industrial built on Deno, Preact, and Fathym EaC. Workspace and admin experiences now live in [open-industrial-workspace-runtime](../open-industrial-workspace-runtime) and [open-industrial-admin-runtime](../open-industrial-admin-runtime).

## Highlights
- Preact + Atomic UI backed by the shared reference architecture components.
- Deno-first toolchain (deno task dev/test/check) with Tailwind styling.
- Public marketing, docs, and blog surfaces under apps/home, apps/docs, apps/blog.

## Getting Started
1. Install Deno (v1.45+ recommended).
2. Copy .env (see provided sample) and configure API/auth keys needed for marketing/docs flows.
3. Run deno task dev for watch mode, or deno task start for a one-off run.
4. Validate with deno task check and deno task test before committing.

## Key Tasks
- deno task dev – start dev server with file watching.
- deno task check – format check, lint, and type-check.
- deno task test – execute runtime test suite.
- deno task build – run full build validations.
- Docker helpers: deno task build:docker, deno task refresh:docker.

## Project Structure
- apps/home, apps/docs, apps/blog – public marketing & learning content.
- apps/adb2c – Azure AD B2C layout templates.
- apps/components – runtime-specific shared UI pieces.
- apps/assets – static assets served by the runtime.
- src/plugins – runtime plugins (atomic icons, analytics, docs auth).
- src/state/OpenIndustrialWebState.ts – shared request/session state.

## Related Runtimes
- Workspace UX: [open-industrial-workspace-runtime](../open-industrial-workspace-runtime).
- Admin dashboards: [open-industrial-admin-runtime](../open-industrial-admin-runtime).

## Docker
- Build image: deno task build:docker
- Create network (optional local compose): deno task network:docker
- Run container: deno task deploy:docker

## Troubleshooting
- Type errors: run deno task check and follow reported locations.
- Styling: ensure Tailwind output (tailwind/styles.css) is available; dev server injects it automatically.
- Env vars: confirm .env values match local API endpoints.

## License
MIT



