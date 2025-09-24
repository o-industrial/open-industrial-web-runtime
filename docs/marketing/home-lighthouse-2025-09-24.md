# Lighthouse Findings � 2025-09-24

- Performance: 56
- Accessibility: 86
- Best Practices: 74
- SEO: 77
- PWA: 38

## Top Opportunities (ordered by impact)

1. Use HTTP/2 � 44 requests still served over HTTP/1.1
2. Eliminate render-blocking resources � potential savings 1.4s
3. Reduce unused JavaScript � potential savings 333 KiB
4. Serve images in next-gen formats � potential savings 197 KiB
5. Properly size images � potential savings 312 KiB
6. Preload key requests
7. Reduce unused CSS � potential savings 20 KiB
8. Defer offscreen images � potential savings 5 KiB
9. Avoid serving legacy JavaScript to modern browsers
10. Additional lower-priority checks: server-response-time, redirects, preconnect, minification, compression, duplication, GIF usage

## Suggested Actions

- Audit bundle composition to remove unused / duplicate modules (see `unused-javascript`, `duplicated-javascript`).
- Evaluate Tailwind purge configuration for marketing surfaces to lower CSS payload.
- Convert hero & spotlight assets in `apps/assets/marketing` to WebP/AVIF and provide responsive sources.
- Ensure CDN/server enables HTTP/2 and gzip/brotli for marketing assets.
- Add `rel=preload` for hero fonts and primary CSS, `rel=preconnect` for HubSpot/analytics origins.
- Introduce lazy-loading via `loading="lazy"` for below-the-fold imagery.

## Implemented Mitigations

- Added preconnect/dns-prefetch for Segment and HubSpot origins in `apps/home/_layout.tsx` to reduce first-request latency.
- Enabled lazy-loading and async decoding for product spotlight imagery to defer non-critical bytes.
- Added hero media dimensions so reuse in spotlight honors CLS budget.


