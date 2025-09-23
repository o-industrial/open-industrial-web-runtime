# Agents Guide - ADB2C Templates

Custom Azure AD B2C pages and flows used during authentication for Open Industrial apps.

## Scope

- Hosts content and layout for self-asserted, unified, and error pages consumed by Azure AD B2C.
- Provides styling and messaging consistent with the marketing site while meeting B2C constraints.
- Excludes runtime logic; these pages are rendered by B2C outside of the main application shell.

## Project Map

- _layout.tsx - Shared layout for B2C pages; ensure inline styles comply with B2C policies.
- selfAsserted.tsx - Registration/update profile form template.
- unified.tsx - Sign-in/sign-up combined experience.
- exception.tsx - Error/exception handling page.

## Commands

- deno task dev --app=adb2c (with env overrides) - Preview B2C pages locally.
- deno task check - Validate types and ensure inline scripts compile.

## Patterns

- Limit external dependencies; Azure AD B2C restricts external script usage.
- Inline CSS where necessary, but keep design tokens synchronized with marketing site.
- Provide localized strings where B2C policies require; plan localization pass in Phase 3.

## Review & Test Checklist

- Validate markup against B2C preview tenant before merging.
- Confirm accessibility (contrast, keyboard navigation) despite inline styling constraints.
- Coordinate with security for content changes impacting authentication.

## Safety & Guardrails

- No runtime secrets; all configuration is handled inside Azure AD B2C policy files.
- Avoid referencing assets that are not publicly accessible via CDN.
- Ensure error messaging does not disclose sensitive tenant or diagnostic data.

## Ownership Signals

- **Primary owner:** Identity & Access Squad.
- **Point of contact:** #oi-identity Slack channel.
- **Escalation:** Identity Platform Lead (Jordan Blake).

## Dependencies & Integrations

- Integrates with Azure AD B2C custom policies; coordinate updates with infra team.
- Shares brand assets with marketing site; update via CDN when branding changes.

## Related Docs

- Parent: [Apps overview](../Agents.md).
- Identity workflows: see open-industrial-api-runtime/Agents.md for backend policy alignment.

## Changelog Expectations

- Update whenever B2C policies change or new localization requirements land.
- Review ahead of major branding refreshes to keep identity flows consistent.
