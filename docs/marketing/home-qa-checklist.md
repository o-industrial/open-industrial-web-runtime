# Home QA Checklist

Use this checklist before shipping changes to the Open Industrial home experience. Pair automated test results with manual verification notes.

## Automated Tests

- [ ] `deno task check` passes (type and lint clean).
- [ ] `deno task test --filter home` executes successfully.
- [ ] `deno task qa:smoke` runs Puppeteer smoke flows (hero render + workspace CTA link).
- [ ] `deno task qa:lighthouse` meets thresholds (Perf >= 90, Access >= 90, TBT <= 150 ms, CLS <= 0.1).
- [ ] `QA_BASE_URL=<site> deno test -A tests/qa/home_accessibility.test.ts` reports no critical axe violations.
- [ ] Visual regression snapshots/stories updated for hero, spotlight, metrics, closing CTA.

## Manual Validation

- [ ] Content review with Growth Marketing (copy, CTAs, legal text).
- [ ] Responsive checks at 320px, 768px, 1024px, 1440px (including dark mode).
- [ ] Analytics events verified in Segment/GA debugger (follow `home-analytics-spec.md`).
- [ ] HubSpot forms respect consent gating and submit successfully.
- [ ] External links (docs, workspace) open in appropriate target windows.
- [ ] No console warnings/errors in modern browsers (Chrome, Edge, Safari).

## Performance & Accessibility

- [ ] Lighthouse detailed reports archived in release notes.
- [ ] AXE (or equivalent) accessibility scan run; no critical issues remain.
- [ ] Images optimized and lazy-loaded where appropriate.

## Rollback / Monitoring

- [ ] Feature flags configured for new sections or analytics hooks.
- [ ] Observability dashboards/alerts updated (telemetry for CTA clicks, scroll depth).
- [ ] Release notes capture user-facing changes, docs updates, and telemetry impact.

## Sign-off

| Role                  | Name | Date | Notes |
| --------------------- | ---- | ---- | ----- |
| Web Platform Reviewer |      |      |       |
| Growth Marketing      |      |      |       |
| QA / Automation       |      |      |       |
| Release Manager       |      |      |       |
