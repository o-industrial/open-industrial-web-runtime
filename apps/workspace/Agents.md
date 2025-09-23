# Agents Guide - Workspace App

Authenticated workspace experience delivering execution surfaces, simulators, and collaborative tooling for Open Industrial operators.

## Scope

- Provide dashboards, simulators, and commit flows for active workspaces.
- Integrate with EaC APIs for execution, configuration, and telemetry streaming.
- Manage multi-tenant routing, feature toggles, and real-time updates where available.
- Exclude administrative license management (see admin app) and anonymous marketing flows.

## Project Map

- `_layout.tsx` - Workspace shell with navigation, workspace selector, and global toasts.
- `_middleware.ts` - Validates workspace membership and enforces authentication.
- `index.tsx` - Default workspace overview.
- `agreements.tsx`, `sink.tsx`, and feature directories (`api/`, `azure/`, `commit/`, `debug/`) for specialized tools.
- API route counterparts live under each feature directory; ensure commit flows return to UI with 303 redirects.

## Commands

- `deno task dev` - Run runtime locally; simulate workspace data via seeded KV or mocks.
- `deno task test --filter workspace` - Execute unit/integration tests targeting workspace flows.
- `deno task test:e2e` - Run end-to-end scenarios (commit pipelines, simulators) before release.

## Patterns

- Leverage atomic organisms/templates for dashboards and editors; avoid forking UI unless necessary.
- Use shared hooks for workspace context (`useWorkspaceContext` planned) and telemetry streaming.
- Build commit flows with `ctx.State.OIClient.Workspace.CommitEaC` to ensure auditability.
- Surface feature flags through context providers so UI and API stay in sync.

## Review & Test Checklist

- Validate authentication and tenant scoping in `_middleware.ts` with integration tests.
- Ensure commit actions are idempotent and log audit entries.
- Confirm loading/error states for long-running operations (simulators, pipelines).
- Coordinate with backend team for schema or DTO updates; update shared types accordingly.

## Safety & Guardrails

- Do not expose raw EaC responses directly; sanitize and map to UI-friendly DTOs.
- Protect against leaking workspace IDs or secrets in logs.
- Use exponential backoff/retry helpers from `atomic/utils` when polling backend services.

## Ownership Signals

- **Primary owner:** Workspace Experience Squad.
- **Point of contact:** #oi-workspace Slack channel.
- **Escalation:** Runtime Architecture Lead (Mika Ito).

## Dependencies & Integrations

- Heavy reliance on EaC Workspace client and telemetry services.
- Integrates with MSAL authentication plugin and licensing checks before enabling actions.
- Consumes atomic components for complex dashboards (graphs, status tiles).

## Related Docs

- Parent: [Apps overview](../Agents.md).
- Backend reference: workspace API docs (link TBD) and `open-industrial-impulse-runtime/Agents.md` for simulator context.
- UI support: [Atomic organisms guide](../../../open-industrial-reference-architecture/atomic/organisms/Agents.md).

## Changelog Expectations

- Update after major workflow launches (new simulator, commit path) or auth model changes.
- Perform release postmortems focusing on workspace reliability and feed insights back into this guide.
