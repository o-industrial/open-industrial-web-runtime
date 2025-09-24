# Home Marketing Config Schema

This reference documents the environment variables consumed by the marketing runtime helpers in `src/marketing/config.ts` and `apps/home/_layout.tsx`.

## Analytics Options

| Variable | Required | Description |
| --- | --- | --- |
| `SEGMENT_WRITE_KEY` | No | Segment write key used by the analytics helpers when present. |
| `GA_MEASUREMENT_ID` | No | GA4 measurement ID for client-side analytics. This value is used first. |
| `NEXT_PUBLIC_GA_ID` | No | Fallback GA measurement ID when `GA_MEASUREMENT_ID` is not provided. |
| `ENABLE_HUBSPOT_FORMS` | No | When set to `true`, the HubSpot embed script is loaded for the home page CTA. |
| `HUBSPOT_PORTAL_ID` | Required when HubSpot is enabled | The portal ID passed into HubSpot forms. |
| `HUBSPOT_FORM_ID` | Required when HubSpot is enabled | The form ID rendered by HubSpot on the Ready CTA module. |

## Runtime Behavior

The resolved values are exposed via `resolveMarketingAnalyticsConfig` and persisted to `window.__OI_MARKETING_RUNTIME__` during server rendering. When HubSpot is enabled, the loader ensures the embed script is only executed when all required IDs are present.

## Validation Checklist

- Use `ENABLE_HUBSPOT_FORMS=true` only when both IDs are active.
- Ensure secrets are provided through runtime configuration providers, not hard coded in routes.
- Update `configs/marketing.env.sample` whenever new keys are introduced.
