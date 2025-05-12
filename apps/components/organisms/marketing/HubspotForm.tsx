import { useEffect, useRef } from 'preact/hooks';

export const IsIsland = true;

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

  console.log(`[HubspotForm] Form #${id} loading`);
  
  useEffect(() => {
    const waitForHbspt = () => {
      if (
        typeof hbspt !== 'undefined' &&
        typeof hbspt.forms?.create === 'function'
      ) {
        console.log(`[HubspotForm] Initializing form #${id}`);
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
      } else {
        console.log('[HubspotForm] hbspt not ready yet, retrying...');
        setTimeout(waitForHbspt, 100); // retry until loaded
      }
    };

    waitForHbspt();
  }, [id, portalId, formId]);

  return <div ref={formRef} id={id} class="w-full max-w-xl mx-auto" />;
}
