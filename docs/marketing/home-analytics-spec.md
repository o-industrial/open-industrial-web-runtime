# Home Analytics Instrumentation Spec

Defines the baseline analytics events for the Open Industrial home experience.
Use this as the source of truth when wiring instrumentation in `_layout.tsx`,
runtime organisms, and analytics services (Segment, GA, etc.).

## Event Catalog

| Event                      | Trigger                                                         | Properties                                                     | Notes                                                                                                            |
| -------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `cta_click`                | Any marketing CTA (`Action`, `CTADeepLinkSection`)              | `location`, `label`, `href`, `variant`, `intent`, `isExternal` | Fire on hero, closing CTA, navigation CTAs. Deduplicate events for repeated CTAs (hero + footer) via `location`. |
| `scroll_depth`             | Scroll thresholds: 25%, 50%, 75%, 100%                          | `depth`, `route`, `sessionId`                                  | Throttle to once per session. Required for long-page engagement metrics.                                         |
| `quote_interaction`        | Hover/focus on `AIConversationsSection` quote cards             | `quote`, `index`, `intent`                                     | Optional for V1; capture if interactive highlights are enabled.                                                  |
| `spotlight_highlight_view` | When `ProductSpotlightSection` highlight prompt enters viewport | `title`, `intent`, `index`                                     | Use intersection observer; helps marketing validate message resonance.                                           |
| `metrics_view`             | When each metric card is revealed in `UnifiedMetricsSection`    | `label`, `value`                                               | Optional; enable when personalization experiments run.                                                           |
| `hubspot_loaded`           | HubSpot script loads after consent granted                      | `portalId`, `formId`                                           | Ensure event fires only once per page load.                                                                      |
| `hubspot_submitted`        | Lead form submission success                                    | `portalId`, `formId`, `submissionId`                           | Extend with marketing attribution fields when available.                                                         |
| `hero_media_loaded`        | Hero media load completes (if/when asset present)               | `asset`, `width`, `height`                                     | Optional performance monitoring.                                                                                 |

## Implementation Guidelines

- Centralize dispatch helpers in `src/marketing/analytics.ts` (to be added)
  re-exported for organisms and layouts.
- Use the runtime config exposed via `window.__OI_MARKETING_RUNTIME__` (set in
  `apps/home/_layout.tsx`) to wire environment-driven analytics IDs and the
  HubSpot feature flag.
- Honour consent: events must only fire after the marketing consent flag (cookie
  banner) allows tracking.
- Use `requestIdleCallback` or small debounce for scroll/viewport events to
  reduce impact on performance.
- Include `environment` metadata (dev, staging, prod) when sending to Segment
  for filtering.
- Ensure `cta_click` is fired for keyboard activation as well as pointer events
  (`onClick`, `onKeyUp` for Enter/Space).

## Optional App Insights Dispatcher

Use `setMarketingEventDispatcher` from `src/marketing/analytics.ts` when
marketing teams want to mirror events into Application Insights (or other
BI sinks):

```ts
import { appInsights } from '../shared/appInsightsClient.ts';
import { setMarketingEventDispatcher } from '../../src/marketing/analytics.ts';

setMarketingEventDispatcher((event) => {
  appInsights.trackEvent({
    name: event.name,
    properties: event.payload,
  });
});
```

Register the dispatcher only after consent is granted so queued events flush
with the expected privacy context. When Application Insights is unavailable,
leave the default dispatcher in place to continue emitting to Segment/GA.

## Instrumentation Map

| Surface               | Component                     | Events                                                 |
| --------------------- | ----------------------------- | ------------------------------------------------------ |
| Hero                  | `HeroExperienceSection`       | `cta_click`, `hero_media_loaded`                       |
| Product Spotlight     | `ProductSpotlightSection`     | `spotlight_highlight_view`, `cta_click` (if CTA added) |
| Metrics               | `UnifiedMetricsSection`       | `metrics_view`                                         |
| Flow Steps            | `GovernedFlowSection`         | None (static)                                          |
| AI Conversations      | `AIConversationsSection`      | `quote_interaction`                                    |
| Value Delivery        | `ValueDeliverySection`        | `cta_click` (embedded)                                 |
| Integration Ecosystem | `IntegrationEcosystemSection` | `scroll_depth` (global)                                |
| Shared Truth          | `SharedTruthSection`          | None                                                   |
| Governed Deployment   | `GovernedDeploymentSection`   | `cta_click` (future)                                   |
| Future Vision         | `FutureVisionSection`         | None                                                   |
| Closing CTA           | `ReadyCTASection`             | `cta_click`, `hubspot_loaded`, `hubspot_submitted`     |

## Testing & Validation

- Add Playwright assertions ensuring `window.dataLayer`/analytics mock receives
  events for primary CTAs.
- Use unit tests (or mocked dispatch tests) in organisms to verify event payload
  structure.
- During manual QA, confirm events appear in Segment debugger and GA real-time
  dashboards.

## Roadmap

- Phase 5: implement helper module + wire events.
- Phase 6: automate analytics regression via Playwright + mocked listeners.
- Coordinate with Growth Marketing for additional campaign-specific events.
