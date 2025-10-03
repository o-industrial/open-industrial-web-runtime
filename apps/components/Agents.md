# Agents Guide - Runtime Components

Shared runtime-specific organisms and sections reused across multiple apps. These components bridge atomic design exports with app-specific needs.

## Scope

- Provide reusable sections (heroes, feature lists, CTA blocks) tailored to Open Industrial marketing and product flows.
- Host runtime-specific organisms that are not generic enough for the reference architecture library.
- Exclude low-level atoms/molecules; those belong in the atomic repo.

## Project Map

- `organisms/` - Primary directory for reusable sections. Subdirectories group by usage (e.g., marketing, docs).
- `organisms/*/*.tsx` - Component implementations; follow naming `<Feature>Section.tsx` or similar.
- Future directories (molecules, templates) can be added as reuse grows; document structure here when created.

## Commands

- `deno task test --filter components` - Run tests covering shared runtime components.
- `deno task check` - Ensure types and lint remain clean when modifying shared props.

## Patterns

- Keep props declarative; accept data objects so apps can supply content from CMS/MDX.
- Reuse atomic primitives; only elevate here when composition requires runtime context.
- Document usage examples in component-level JSDoc or MDX stories (planned for Phase 3).

## Review & Test Checklist

- Add snapshot or visual tests when updating layout-critical components.
- Confirm all consuming apps compile and render after prop changes (search `apps/*` for usages).
- Update `apps/Agents.md` mapping if new directories or naming conventions emerge.

## Safety & Guardrails

- Avoid importing app-specific state or middleware; components here should remain app-agnostic within the runtime context.
- Do not fetch data directly; rely on props passed from app routes.
- Keep styling consistent with Tailwind tokens set in `tailwind.config.ts`.

## Ownership Signals

- **Primary owner:** Web Platform Team - Components Pod.
- **Point of contact:** #open-industrial-web-runtime Slack channel.
- **Escalation:** Runtime Architecture Guild (Jordan Blake).

## Dependencies & Integrations

- Depend on atomic library exports and Tailwind configuration.
- Consumed by marketing (`apps/home`, `apps/blog`) and docs surfaces (workspace runtime consumes these via the shared package).

## Related Docs

- Parent: [Apps overview](../Agents.md).
- Atomic references: [Atomic molecules](../../open-industrial-atomic/src/molecules/Agents.md).

## Changelog Expectations

- Review whenever new section families are added or shared props change significantly.
- Coordinate versioning with marketing and docs teams to reflect updated design patterns.

