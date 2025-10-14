import {
  HubspotFormCreateEvent,
  HubspotFormLifecycleEvent,
} from '@o-industrial/atomic/organisms';
import { trackEvent } from '../../utils/analytics.ts';

export const DEFAULT_HUBSPOT_PORTAL_ID = '2687377';

export type HubspotTrackingContext = {
  location: string;
  formId?: string;
  portalId?: string;
};

type LifecyclePhase = 'init' | 'retry' | 'ready' | 'submit';

const buildPayload = (
  ctx: HubspotTrackingContext,
  event: HubspotFormLifecycleEvent,
) => ({
  location: ctx.location,
  containerId: event.id,
  portalId: event.portalId ?? ctx.portalId ?? DEFAULT_HUBSPOT_PORTAL_ID,
  formId: event.formId ?? ctx.formId,
  attempts: event.attempts,
});

const trackLifecycle = (
  phase: LifecyclePhase,
  ctx: HubspotTrackingContext,
  event: HubspotFormLifecycleEvent,
) => {
  trackEvent(`hubspot.form.${phase}`, buildPayload(ctx, event));
};

export function buildHubspotTrackingHandlers(
  ctx: HubspotTrackingContext,
): {
  onInit: (event: HubspotFormLifecycleEvent) => void;
  onRetry: (event: HubspotFormLifecycleEvent) => void;
  onReady: (event: HubspotFormLifecycleEvent) => void;
  onSubmit: (event: HubspotFormLifecycleEvent) => void;
  onCreate: (event: HubspotFormCreateEvent) => void;
} {
  return {
    onInit: (event) => trackLifecycle('init', ctx, event),
    onRetry: (event) => trackLifecycle('retry', ctx, event),
    onReady: (event) => trackLifecycle('ready', ctx, event),
    onSubmit: (event) => trackLifecycle('submit', ctx, event),
    onCreate: (event) => {
      const payload = {
        ...buildPayload(ctx, event),
        region: typeof event.options?.region === 'string'
          ? event.options.region
          : undefined,
      };

      trackEvent('hubspot.form.create', payload);
    },
  };
}
