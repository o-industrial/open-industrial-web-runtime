import { FunctionalComponent } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';
import { HubspotForm } from '../HubspotForm.tsx';
import { getIntentStyles } from '@o-industrial/atomic/utils';

const CallToAction: FunctionalComponent = () => {
  const primary = getIntentStyles(IntentTypes.Primary);

  return (
    <section class='bg-neutral-100 dark:bg-neutral-950 py-32 px-6 lg:px-8'>
      <div
        class={`max-w-4xl mx-auto rounded-2xl border p-12 text-center shadow-lg ring-2 ring-inset ${primary.ring} ${primary.glow} bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-50/10`}
      >
        <h2 class='text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4'>
          Ready to Own Your Runtime?
        </h2>
        <p class='text-lg text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto mb-10'>
          Azi helps you fork logic, promote changes, and evolve agents — backed by reflex memory,
          not guesswork.
        </p>

        <div class='flex flex-col sm:flex-row justify-center gap-6'>
          <HubspotForm id='cta-hubspot-form' />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

