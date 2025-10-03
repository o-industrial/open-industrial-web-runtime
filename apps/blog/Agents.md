# Agents Guide - Blog App

Editorial surface for thought leadership, release announcements, and stories. Powered by MDX with lightweight routing and SEO optimizations.

## Scope

- Manage the blog index, individual posts, and supporting metadata under `apps/blog/*`.
- Integrate publishing workflow with content repository or CMS (manual MDX for now).
- Handle SEO tags, open graph images, and social sharing metadata.
- Exclude product documentation and marketing landing pages handled in other apps.

## Project Map

- `_layout.tsx` - Blog shell with category navigation and subscription CTA slots.
- `_middleware.ts` - Sets caching headers; extend to handle scheduled publishing when needed.
- `index.mdx` - Blog landing page with feed layout.
- Individual posts (e.g., `beyond-the-panic.mdx`) with frontmatter for metadata.
- `.config.ts` - Optional configuration for feed ordering or categories.

## Commands

- `deno task dev` - Preview blog content locally; ensure MDX compilation works.
- `deno task test --filter blog` - Run snapshot tests for blog pages.
- `deno task build` - Verify static generation of posts before deploy.

## Patterns

- Place publication metadata in frontmatter (`title`, `description`, `date`, `authors`, `tags`).
- Use shared MDX components (Callout, Hero) from `apps/components` to maintain visual consistency.
- Maintain canonical URLs and update sitemap generation (Phase 3 deliverable).
- Keep assets per post in `apps/assets` and reference relatively.

## Review & Test Checklist

- Obtain editorial/marketing review prior to merge.
- Run link and spell checks (script to add) or manual proofing for each post.
- Validate social previews via tooling before publishing (e.g., OpenGraph preview).

## Safety & Guardrails

- Avoid embedding third-party scripts without privacy review.
- Keep scheduled posts behind feature flags or draft branches until release date.
- Ensure posts referencing roadmap items align with approved messaging.

## Ownership Signals

- **Primary owner:** Editorial & Product Marketing.
- **Point of contact:** #oi-blog Slack channel.
- **Escalation:** Head of Marketing (Leah Tran).

## Dependencies & Integrations

- Optional integration with RSS generator (add script in Phase 3).
- Coordinate with analytics/tracking configured in runtime plugins.
- Share typography and layout tokens with marketing site and docs.

## Related Docs

- Parent: [Apps overview](../Agents.md).
- Content operations playbook (link TBD) for editorial workflow.
- Atomic inspiration: [Templates guide](../../open-industrial-atomic/src/templates/Agents.md).

## Changelog Expectations

- Update when workflow changes (e.g., migrating to CMS) or when new metadata requirements appear.
- Quarterly review to archive outdated announcements or refresh evergreen posts.
