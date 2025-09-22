# Open Industrial Web Runtime

Admin and workspace web runtime for Open Industrial, built on Deno + Preact and Fathym EaC. It ships a modular admin UI, a workspace portal, and opinionated licensing flows powered by EaC.

Highlights

- Preact + Atomic UI: Uses Fathym Atomic Design Kit components and templates.
- Deno-first: No install step, type-checking, linting, and formatting via `deno task`.
- Admin layout: Central `AdminDashboardTemplate` and `AdminNav` live in `apps/admin/_layout.tsx`.
- Workspaces: “Enterprises” page is now “Workspaces” at `/admin/workspaces`.
- Licensing UX: Nested, form-first pages with server APIs that redirect on success/failure.

Getting Started

- Prereqs: Deno (v1.45+ recommended), optional Docker.
- Configure env: Create `.env` in the repo root. See the existing `.env` for local dev examples; do not use production secrets in development.
- Run dev: `deno task dev`
- Run tests: `deno task test`
- Lint/format/type-check: `deno task build` or individually `deno fmt`, `deno lint`, `deno check **/*.ts{,x}`

Useful Tasks

- `deno task dev` – Start the dev server with watch.
- `deno task start` – Run the server (no watch).
- `deno task build` – Format, lint, publish dry-run, and test.
- `deno task check` – Format check, lint, type-check TS/TSX.
- `deno task build:docker` / `deno task deploy:docker` – Build and run the Docker image.

Project Structure (selected)

- `apps/admin/_layout.tsx` – Admin layout that wraps all admin pages with the dashboard template + nav.
- `apps/admin/index.tsx` – Admin dashboard cards/metrics.
- `apps/admin/workspaces/index.tsx` – Workspaces list and search.
- `apps/admin/licenses/` – Licensing admin pages (see below).
- `apps/workspace/` – Workspace-facing pages.
- `src/state/OpenIndustrialWebState.ts` – Runtime state shared across requests; includes `AdminNavItems` for layout.

Licensing Admin Flow
The licensing admin has been refactored into nested, form-first pages. Each page posts to a small server API that performs an EaC commit and then redirects back to the next page. Errors are returned via `?error=...` query string.

Pages

- Licenses overview: `apps/admin/licenses/index.tsx`
- License details + plans + coupons: `apps/admin/licenses/[licLookup]/index.tsx`
- Plan details + prices: `apps/admin/licenses/[licLookup]/[planLookup]/index.tsx`
- Price details: `apps/admin/licenses/[licLookup]/[planLookup]/[priceLookup]/index.tsx`

APIs (redirect on success/failure)

- Update license details: `POST /admin/licenses/[licLookup]/api/update`
  - Accepts form or JSON body with subset of `EaCLicenseStripeDetails` fields (Name, Description, Enabled, PublishableKey, SecretKey, WebhookSecret).
- Create plan: `POST /admin/licenses/[licLookup]/plans/api/create`
  - Body: `PlanLookup`
- Update plan details: `POST /admin/licenses/[licLookup]/[planLookup]/api/update`
  - Body supports updates for `EaCLicensePlanDetails` fields (Name, Description, Features, Priority, TrialPeriodDays, Featured).
- Create price: `POST /admin/licenses/[licLookup]/[planLookup]/prices/api/create`
  - Body: `PriceLookup`
- Update price details: `POST /admin/licenses/[licLookup]/[planLookup]/[priceLookup]/api/update`
  - Body supports updates for `EaCLicensePriceDetails` fields (Name, Currency, Interval, Value, Discount).
- Legacy endpoints updated to redirect
  - `apps/admin/licenses/api/commit.ts` – commit license via form or JSON then redirect.
  - `apps/admin/licenses/api/delete.ts` – delete license via form or JSON then redirect.

UI Conventions

- Inputs use components from `@o-industrial/common/atomic/atoms` (`Input`, `CheckboxRow`, etc.).
- For multi-line text, use `<Input multiline />`.
- Admin pages do not render their own `AdminDashboardTemplate`; the admin layout wraps them.

Docker (optional)

- Build: `deno task build:docker`
- Network (local compose): `deno task network:docker`
- Run: `deno task deploy:docker`

Troubleshooting

- Type-check failures: run `deno task check` and fix reported files.
- Styling not applied: ensure Tailwind build is available (dev server injects `tailwind/styles.css`).
- Env vars: verify `.env` values match your local API endpoints.

License
MIT
