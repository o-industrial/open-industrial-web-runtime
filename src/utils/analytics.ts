// deno-lint-ignore-file no-window
export type AnalyticsPayload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    appInsights?: {
      trackEvent?: (
        event: { name: string },
        metrics?: Record<string, unknown>,
      ) => void;
    };
  }
}

export function trackEvent(
  eventName: string,
  payload: AnalyticsPayload = {},
): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...payload,
      });
    }
  } catch (_err) {
    // Silently ignore dataLayer issues
  }

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    }
  } catch (_err) {
    // Ignore gtag failures to avoid impacting UX
  }

  try {
    if (window.appInsights?.trackEvent) {
      window.appInsights.trackEvent({ name: eventName }, payload);
    }
  } catch (_err) {
    // Ignore App Insights failures as well
  }
}
