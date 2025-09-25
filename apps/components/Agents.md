# Agents Guide - Runtime Components

Shared runtime-specific organisms and sections reused across multiple apps.
These components bridge atomic design exports with app-specific needs.

## Scope

- Provide reusable sections (heroes, feature lists, CTA blocks) tailored to Open
  Industrial marketing and product flows.
- Host runtime-specific organisms that are not generic enough for the reference
  architecture library.
- Exclude low-level atoms/molecules; those belong in the atomic repo.

## Project Map

- `organisms/` - Primary directory for reusable sections. Subdirectories group
  by usage (e.g., marketing, docs, workspace).
- `organisms/marketing/open-industrial-home` - Current home landing sections
  rendered by `apps/home/index.tsx`.
- `organisms/marketing/open-industrial-execute`, `automate-runtime`,
  `product-data-management` - Additional marketing surfaces aligned with
  execution, automation, and product data experiences.
- `organisms/marketing/shared/` - Shared helpers (e.g., `layout.ts`, form
  wrappers) consumed across marketing sections.
- `src/marketing/gradients.ts` - Centralized gradient tokens consumed by runtime
  organisms.
- Future directories (molecules, templates) can be added as reuse grows;
  document structure here when created.

## Commands

- `deno task test --filter components` - Run tests covering shared runtime
  components.
- `deno task check` - Ensure types and lint remain clean when modifying shared
  props.

## Patterns

- Keep props declarative; accept data objects so apps can supply content from CMS/MDX.
- Reuse atomic primitives; only elevate here when composition requires runtime context.
- Use shared helpers (`marketing/shared/layout.ts`, `src/marketing/gradients.ts`, `src/marketing/navigation.ts`) instead of duplicating utility classes or config.
- Centralize backdrop gradients in `marketing/shared/backgrounds.tsx`; reuse them across home sections to avoid bespoke Tailwind strings.
- Co-locate lightweight rendering tests under `tests/marketing/*` when adding new organisms so marketing content changes stay regression-tested.
- Document usage examples in component-level JSDoc or MDX stories (planned for Phase 3).

## Review & Test Checklist

- Add snapshot or visual tests when updating layout-critical components.
- Confirm all consuming apps compile and render after prop changes (search
  `apps/*` for usages).
- Update `apps/home/Agents.md` mapping if new directories or naming conventions
  emerge.
- Validate analytics hooks against `docs/marketing/home-analytics-spec.md` when
  components emit events.

## Safety & Guardrails

- Avoid importing app-specific state or middleware; components here should
  remain app-agnostic within the runtime context.
- Do not fetch data directly; rely on props passed from app routes.
- Keep styling consistent with Tailwind tokens set in `tailwind.config.ts`.
- Shared helpers should remain side-effect free; prefer pure functions for class
  composition and formatting.

## Ownership Signals

- **Primary owner:** Web Platform Team - Components Pod.
- **Point of contact:** #open-industrial-web-runtime Slack channel.
- **Escalation:** Runtime Architecture Guild (Jordan Blake).

## Dependencies & Integrations

- Depend on atomic library exports and Tailwind configuration.
- Consumed by marketing (`apps/home`, `apps/blog`), docs, and workspace
  surfaces.
- Coordinate with content contracts defined in `src/marketing/home.ts` and
  related fixtures when adjusting props.

## Related Docs

- Parent: [Apps overview](../Agents.md).
- Atomic references:
  - [Atomic atoms](../../../open-industrial-reference-architecture/atomic/atoms/Agents.md)
  - [Atomic molecules](../../../open-industrial-reference-architecture/atomic/molecules/Agents.md)
  - [Atomic organisms](../../../open-industrial-reference-architecture/atomic/organisms/Agents.md)
  - [Atomic templates](../../../open-industrial-reference-architecture/atomic/templates/Agents.md)
- Marketing alignment artifacts:
  - [Home component audit](../docs/marketing/home-component-audit.md)
  - [Home refactor backlog](../docs/marketing/home-refactor-backlog.md)

## Changelog Expectations

- Review whenever new section families are added or shared props change
  significantly.
- Coordinate versioning with marketing and docs teams to reflect updated design
  patterns.
