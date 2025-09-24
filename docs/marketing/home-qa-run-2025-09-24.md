# Home QA Run - 2025-09-24

| Check | Command | Result | Notes |
| ----- | ------- | ------ | ----- |
| Type/Lint | `deno task check` | FAIL | Fails on existing workspace modules (134 TS errors unrelated to marketing). |
| Smoke tests | `QA_BASE_URL=https://www.openindustrial.co/ deno task qa:smoke` | PASS | Chrome auto-installed via Puppeteer; hero render + workspace CTA HEAD check pass. |
| Lighthouse | `QA_LIGHTHOUSE_FORMAT=json QA_LIGHTHOUSE_OUTPUT=./tmp/lighthouse-home-report.json deno task qa:lighthouse` | WARN | Perf 56, Access 86, Best Practices 74, SEO 77, PWA 38. Report saved at `./tmp/lighthouse-home-report.json`. |
| Accessibility | `QA_BASE_URL=<site> deno test -A tests/qa/home_accessibility.test.ts` | FAIL | Axe flagged missing `lang` attribute and footer contrast on production. Repo sets `lang="en"` and updates footer colors; redeploy before retest. |

## Follow-ups

- Investigate performance and PWA gaps (see Lighthouse JSON for detailed audits). Targets in Marketing.Plan.md remain unmet.
- Resolve workspace TypeScript errors to unblock `deno task check` acceptance.
- Fix axe violations: ensure `lang` attribute and updated footer contrast reach production, then rerun automated test.
- Consider adding Playwright visual regression coverage for hero/CTA once outstanding perf fixes land.
