Open Industrial Web Runtime — Agent Guide

Purpose
- Admin and workspace web runtime for Open Industrial, built on Deno + Preact with EaC-powered licensing and runtime services.

How To Run
- Dev server (watch): `deno task dev`
- Start server: `deno task start`
- Test (with coverage): `deno task test`
- Lint/format/type-check: `deno task check` or `deno task build`
- Docker: `deno task build:docker`, `deno task deploy:docker`

Entrypoints
- `main.ts`: app/server runtime entry.
- `dev.ts`: dev server/watcher.

Project Structure (selected)
- `apps/admin/`: Admin UI pages; shared layout `apps/admin/_layout.tsx`.
- `apps/workspace/`: Workspace-facing pages and debug routes.
- `apps/home/`, `apps/docs/`, `apps/blog/`, `apps/adb2c/`: Marketing/docs flows and ADB2C pages.
- `src/state/OpenIndustrialWebState.ts`: Shared runtime state (e.g., AdminNavItems).
- `src/plugins/`: Runtime plugins (licensing, MSAL, core handlers).
- `src/agreements/`: Agreements middleware and manager.
- `configs/`: Tailwind/Atomic config and runtime configurations.
- `tests/`: Test entry `tests/tests.ts` and focused suites.

Tooling & Conventions
- Deno-first: Use `deno task` for all operations. No Node install step is required for core workflows.
- UI: Preact with Atomic Design Kit components.
- Imports: Path/JSR/npm mappings defined in `deno.jsonc` under `imports`.
- Formatting/Linting: Controlled by `deno.jsonc` `fmt`/`lint` sections.

Environment
- Place a `.env` file at repo root for local development (see team conventions). Do not store production secrets in local `.env`.

Notes for Agents
- Prefer running the provided `deno task` commands rather than ad-hoc commands.
- Some imports reference sibling repos (e.g., `../open-industrial-reference-architecture`, `../../fathym-deno`). If absent locally, certain tasks may fail; coordinate or adjust imports as needed for isolated work.
- Use watch/dev via `deno task dev` during UI changes; use `deno task test` for verification.

Common Tasks
- Run checks quickly: `deno task check`
- Publish dry-run: `deno task publish:check`
- Coverage output: created under `./cov` when running tests.

Troubleshooting
- Type issues: `deno task check` and follow diagnostics.
- Styling: Tailwind styles are injected via `apps/tailwind/styles.css` in dev.
- Env mismatches: Ensure `.env` aligns with local services and API endpoints.

