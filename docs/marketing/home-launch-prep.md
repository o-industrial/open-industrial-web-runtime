# Home Launch Prep Checklist

## Feature Flags

| Flag | Purpose | Default | Notes |
| ---- | ------- | ------- | ----- |
| `QA_ENABLE_FORMS` | Toggle HubSpot form embed on hero/contact blocks. | `false` in staging, `true` in prod after legal sign-off. | Ensure consent modal copy reviewed. |
| `QA_ENABLE_MARKETING_SCROLL` | Enables scroll depth analytics dispatch. | `true` | Verify Segment property names match analytics spec. |
| `QA_ENABLE_READY_CTA_EXPERIMENT` | Switches ready CTA copy/link for experiments. | `false` | Coordinate with Growth Marketing before enabling. |

## Rollout Plan

1. Enable `QA_ENABLE_FORMS` in staging after final QA and legal review (owner: Web Platform).
2. Announce pending launch in #oi-marketing-site Slack with link to Lighthouse report and QA run document.
3. Schedule production flag flips during low-traffic window (weekday 06:00 MT). Capture before/after metrics.
4. Monitor Segment dashboards (CTA clicks, scroll depth) and HubSpot submissions for 48 hours post-launch.

## Changelog Draft

- Updated marketing home hero copy and CTA alignment per September campaign.
- Added automated smoke coverage (`deno task qa:smoke`) for hero render and workspace CTA validation.
- Refreshed Lighthouse audit workflow (`deno task qa:lighthouse`) with npm-based CLI.
- Documented marketing handoff steps and latest QA results (`docs/marketing/home-handoff-notes.md`, `docs/marketing/home-qa-run-2025-09-24.md`).

## Approvals

- Growth Marketing Lead: ___________________
- Web Platform Lead: ______________________
- Analytics Owner: _________________________
- Release Manager: ________________________

## Post-Launch Tasks

- Append summary to Marketing Decision Log with go/no-go outcome and owners.
- Archive Lighthouse HTML/JSON reports alongside release ticket.
- Update Marketing.Plan.md Phase 8 status with actual sign-off date.
