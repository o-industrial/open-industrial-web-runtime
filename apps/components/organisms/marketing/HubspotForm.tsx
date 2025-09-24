import { useEffect, useRef } from 'preact/hooks';

import { trackHubspotLoaded, trackHubspotSubmitted } from '../../../../src/marketing/analytics.ts';
import { getHubspotFormConfig, isHubspotFormsEnabled } from '../../../../src/marketing/runtime.ts';

export const IsIsland = true;

// deno-lint-ignore no-explicit-any
declare const hbspt: any;

export function HubspotForm({
  id = 'hubspot-form',
  portalId,
  formId,
}: {
  id?: string;
  portalId?: string;
  formId?: string;
}) {
  const formRef = useRef<HTMLDivElement>(null);

  const configIds = getHubspotFormConfig();
  const resolvedPortalId = portalId ?? configIds.portalId;
  const resolvedFormId = formId ?? configIds.formId;
  const configEnabled = isHubspotFormsEnabled();
  const hubspotReady = Boolean(
    resolvedPortalId &&
      resolvedFormId &&
      (configEnabled || (portalId && formId)),
  );

  useEffect(() => {
    if (!hubspotReady || !resolvedPortalId || !resolvedFormId) {
      return;
    }

    let loadedTracked = false;
    let cancelled = false;

    const waitForHbspt = () => {
      if (cancelled) {
        return;
      }

      if (
        typeof hbspt !== 'undefined' &&
        typeof hbspt.forms?.create === 'function'
      ) {
        hbspt.forms.create({
          portalId: resolvedPortalId,
          formId: resolvedFormId,
          region: 'na1',
          target: '#' + id,
          onFormReady: () => {
            if (!loadedTracked) {
              trackHubspotLoaded(resolvedPortalId, resolvedFormId);
              loadedTracked = true;
            }
          },
          onFormSubmit: (form: unknown) => {
            const submissionId = (form as { guid?: string } | undefined)?.guid;
            trackHubspotSubmitted(resolvedPortalId, resolvedFormId, submissionId);
          },
        });
      } else {
        setTimeout(waitForHbspt, 100);
      }
    };

    waitForHbspt();

    return () => {
      cancelled = true;
    };
  }, [hubspotReady, id, resolvedPortalId, resolvedFormId]);

  return (
    <div
      ref={formRef}
      id={id}
      data-hubspot-ready={hubspotReady ? 'true' : 'false'}
      class='w-full max-w-xl mx-auto'
    />
  );
}
