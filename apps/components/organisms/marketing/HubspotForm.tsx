import { useEffect, useRef } from 'preact/hooks';

// deno-lint-ignore no-explicit-any
declare const hbspt: any;

export function HubspotForm({
  id = 'hubspot-form',
  portalId = '2687377',
  formId = '560105cb-d75e-480b-9e1a-cdbd10172e56',
}: {
  id?: string;
  portalId?: string;
  formId?: string;
}) {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formRef.current) {
      console.warn(`[HubspotForm] No DOM ref available for target: #${id}`);
      return;
    }

    if (!hbspt || typeof hbspt.forms?.create !== 'function') {
      console.warn('[HubspotForm] hbspt not available or not ready');
      return;
    }

    console.log(`[HubspotForm] Initializing form #${id} with formId=${formId}`);

    hbspt.forms.create({
      portalId,
      formId,
      region: 'na1',
      target: `#${id}`,
      onFormReady: () => {
        console.log(`[HubspotForm] Form #${id} ready`);
      },
      onFormSubmit: () => {
        console.log(`[HubspotForm] Form #${id} submitted`);
      },
    });
  }, [id, portalId, formId]);

  return <div ref={formRef} id={id} class="w-full max-w-xl mx-auto" />;
}
