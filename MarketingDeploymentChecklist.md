# Marketing Pages Deployment Checklist

## Pre-Deployment

- [ ] Run format, lint, and tests: deno fmt, deno lint, and deno task test.
- [ ] Build the runtime bundle locally: deno task build:dev and spot-check /, /about, /contact, /use-case, /use-case/batch-quality, /privacy, /terms.
- [ ] Validate HubSpot forms hydrate on / and /contact (check console for [HubspotForm] logs and test submissions).
- [ ] Confirm navigation and footer links resolve correctly from every marketing route.

## QA & Verification

- [ ] Cross-browser smoke test (Chromium, Firefox, Safari) at desktop & mobile breakpoints.
- [ ] Run Lighthouse (mobile + desktop) against home and batch quality pages; capture reports.
- [ ] Verify dark/light mode rendering via system preference toggle.
- [ ] Check responsive hero and matrix sections for overflow issues on sub-375px widths.

## Telemetry & Monitoring

- [ ] Confirm HubSpot embed script loads once (https://js.hsforms.net/forms/embed/v2.js).
- [ ] Validate analytics/telemetry snippets configured for the marketing runtime (Segment, GA4, etc.).
- [ ] Ensure query toggle interactions log expected events (if instrumentation exists).

## Content & Assets

- [ ] Reconfirm asset paths resolve via data-eac-bypass-base in the EaC environment.
- [ ] Coordinate with marketing for any final copy tweaks before launch.
- [ ] Archive or update documentation that references the legacy Next.js preview site.

## Release

- [ ] Merge the marketing migration branch after QA sign-off.
- [ ] Announce updated URLs to stakeholders (marketing, product, ops).
- [ ] Monitor HubSpot submissions and telemetry dashboards for anomalies post-release.
