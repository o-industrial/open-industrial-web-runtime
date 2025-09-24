import { JSX } from 'preact';

export type MarketingEventName =
  | 'cta_click'
  | 'scroll_depth'
  | 'quote_interaction'
  | 'spotlight_highlight_view'
  | 'metrics_view'
  | 'hubspot_loaded'
  | 'hubspot_submitted'
  | 'hero_media_loaded';

export type MarketingEventPayloads = {
  cta_click: {
    location: string;
    label: string;
    href: string;
    variant?: string;
    intent?: string;
    isExternal?: boolean;
  };
  scroll_depth: {
    depth: 25 | 50 | 75 | 100;
    route: string;
    sessionId?: string;
  };
  quote_interaction: {
    quote: string;
    index: number;
    intent?: string;
    action?: 'hover' | 'focus';
  };
  spotlight_highlight_view: {
    title: string;
    intent?: string;
    index: number;
  };
  metrics_view: {
    label: string;
    value: string;
  };
  hubspot_loaded: {
    portalId: string;
    formId: string;
  };
  hubspot_submitted: {
    portalId: string;
    formId: string;
    submissionId?: string;
  };
  hero_media_loaded: {
    asset: string;
    width?: number;
    height?: number;
  };
};

export type MarketingEvent<T extends MarketingEventName = MarketingEventName> = {
  name: T;
  payload: MarketingEventPayloads[T];
  timestamp: number;
};

export type MarketingEventDispatcher = (event: MarketingEvent) => void;

type MaybeWindow = typeof globalThis extends { window: infer W } ? W : typeof globalThis;

let dispatcher: MarketingEventDispatcher | undefined;
let forcedConsent: boolean | undefined;
const pendingEvents: MarketingEvent[] = [];

function hasWindow(): boolean {
  return typeof window !== 'undefined';
}

function hasMarketingConsent(): boolean {
  if (typeof forcedConsent === 'boolean') {
    return forcedConsent;
  }

  if (!hasWindow()) {
    return false;
  }

  const consentFlag = (window as MaybeWindow & {
    __OI_MARKETING_CONSENT__?: boolean;
  }).__OI_MARKETING_CONSENT__;

  if (typeof consentFlag === 'boolean') {
    return consentFlag;
  }

  // Default opt-in when consent flag is not wired yet.
  return true;
}

function defaultDispatcher(event: MarketingEvent): void {
  if (!hasWindow()) {
    pendingEvents.push(event);
    return;
  }

  const w = window as MaybeWindow & {
    dataLayer?: Array<Record<string, unknown>>;
    OIAnalytics?: { track?: (name: string, payload: unknown) => void };
    __OI_MARKETING_EVENT_QUEUE__?: MarketingEvent[];
  };

  if (typeof w.OIAnalytics?.track === 'function') {
    try {
      w.OIAnalytics.track(event.name, event.payload);
    } catch (_error) {
      // Swallow individual tracker failures.
    }
  }

  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event: event.name, ...event.payload });
  }

  if (typeof w.dispatchEvent === 'function') {
    try {
      w.dispatchEvent(new CustomEvent('oi:marketing-event', { detail: event }));
    } catch (_error) {
      // Ignore CustomEvent issues (e.g., unsupported in server context).
    }
  }

  if (!Array.isArray(w.__OI_MARKETING_EVENT_QUEUE__)) {
    w.__OI_MARKETING_EVENT_QUEUE__ = [];
  }

  w.__OI_MARKETING_EVENT_QUEUE__!.push(event);
}

function flushPendingEvents(): void {
  if (!pendingEvents.length) {
    return;
  }

  const events = pendingEvents.splice(0, pendingEvents.length);
  for (const event of events) {
    dispatchInternal(event);
  }
}

function dispatchInternal(event: MarketingEvent): void {
  if (!hasMarketingConsent()) {
    pendingEvents.push(event);
    return;
  }

  if (dispatcher) {
    dispatcher(event);
    return;
  }

  defaultDispatcher(event);
}

export function setMarketingEventDispatcher(fn: MarketingEventDispatcher | undefined): void {
  dispatcher = fn;
  flushPendingEvents();
}

export function setMarketingAnalyticsConsent(value: boolean): void {
  forcedConsent = value;

  if (hasWindow()) {
    (window as MaybeWindow & { __OI_MARKETING_CONSENT__?: boolean }).__OI_MARKETING_CONSENT__ =
      value;
  }

  if (value) {
    flushPendingEvents();
  }
}

export function trackMarketingEvent<T extends MarketingEventName>(
  name: T,
  payload: MarketingEventPayloads[T],
): void {
  const event: MarketingEvent<T> = {
    name,
    payload,
    timestamp: Date.now(),
  };

  dispatchInternal(event as MarketingEvent);
}

export type TrackCtaClickOptions = MarketingEventPayloads['cta_click'];

export function trackCtaClick(options: TrackCtaClickOptions): void {
  trackMarketingEvent('cta_click', options);
}

export type CtaEventMeta = TrackCtaClickOptions;

type TargetedEvent =
  | JSX.TargetedMouseEvent<EventTarget>
  | JSX.TargetedKeyboardEvent<EventTarget>;

type EventHandler = (event: TargetedEvent) => void;

export function createCtaEventHandlers(meta: CtaEventMeta): {
  onClick: EventHandler;
  onKeyUp: EventHandler;
} {
  const handleActivation = (event: TargetedEvent) => {
    if (event.type === 'click') {
      const mouseEvent = event as JSX.TargetedMouseEvent<EventTarget>;
      // When triggered via keyboard, click.detail is 0 � skip and let key handler handle it.
      if (mouseEvent.detail === 0) {
        return;
      }
      trackCtaClick(meta);
      return;
    }

    const keyEvent = event as JSX.TargetedKeyboardEvent<EventTarget>;
    if (keyEvent.key !== 'Enter' && keyEvent.key !== ' ') {
      return;
    }

    trackCtaClick(meta);
  };

  return {
    onClick: handleActivation,
    onKeyUp: handleActivation,
  };
}

export function trackHubspotLoaded(portalId: string, formId: string): void {
  trackMarketingEvent('hubspot_loaded', { portalId, formId });
}

export function trackHubspotSubmitted(
  portalId: string,
  formId: string,
  submissionId?: string,
): void {
  trackMarketingEvent('hubspot_submitted', { portalId, formId, submissionId });
}

export function trackMetricsView(label: string, value: string): void {
  trackMarketingEvent('metrics_view', { label, value });
}

export function trackSpotlightHighlightView(
  title: string,
  index: number,
  intent?: string,
): void {
  trackMarketingEvent('spotlight_highlight_view', { title, index, intent });
}

export function trackQuoteInteraction(
  quote: string,
  index: number,
  intent?: string,
  action: 'hover' | 'focus' = 'hover',
): void {
  trackMarketingEvent('quote_interaction', { quote, index, intent, action });
}

export function trackHeroMediaLoaded(
  asset: string,
  dimensions?: { width?: number; height?: number },
): void {
  trackMarketingEvent('hero_media_loaded', {
    asset,
    width: dimensions?.width,
    height: dimensions?.height,
  });
}
