# Home Marketing Handoff Notes

Use this document when briefing Growth Marketing and content teams on the current home experience. Update alongside major campaign or design revisions.

## Assets & Screenshots

- Hero, product spotlight, metrics, ready CTA: capture from latest staging build and place under `docs/marketing/assets/home/` (PNG, 1440px wide).
- Include viewport variants (mobile 375px, tablet 768px) for hero and ready CTA to highlight responsive copy breaks.
- Update screenshot filenames with release date (e.g., `home-hero-2025-09-24.png`).

## Key Messages

- Hero headline: sourced from `homeContent.hero.headline`; confirm campaign language before release.
- Strategic pillars: ensure badge labels match current go-to-market themes (governed activation, human-in-the-loop, telemetry speed).
- CTA copy: `homeContent.cta.primaryAction.label` defaults to �Get Started Today�; coordinate with Growth Marketing for experiments.

## Content Owners

- Hero, value proposition, ready CTA: Growth Marketing copy lead.
- Product spotlight highlights: Solutions marketing (industrial intelligence team).
- Metrics block: Data & Insights team for accuracy and refresh cadence.
- Quotes/testimonials: Customer marketing (review quarterly).

## Analytics Checklist

- Segment/GA page view & CTA events verified against `docs/marketing/home-analytics-spec.md`.
- HubSpot form toggles controlled by `QA_ENABLE_FORMS` feature flag; confirm environment variable before launch.
- Scroll depth tracking enabled via `trackMarketingScrollDepth` helper (ensure thresholds align with current experiments).

## Release Steps

1. Run automated suite (`deno task qa:smoke`, `deno task qa:lighthouse`, `QA_BASE_URL=<site> deno test -A tests/qa/home_accessibility.test.ts`) and attach reports to release ticket.
2. Collect updated screenshots and place under `docs/marketing/assets/home/`; link them in release notes.
3. Share summary with Growth Marketing + Web Platform Slack channels including metrics deltas and CTA destinations.
4. Record approval in Decision Log once marketing/content sign-off is received.

## Pending Items

- Add design mock links (Figma) once vNext boards are published.
- Document localization considerations for future translated campaigns.


