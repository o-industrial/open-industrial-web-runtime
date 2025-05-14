import { getIntentStyles } from '../../../../../src/utils/getIntentStyles.ts';
import { IntentTypes } from '@o-industrial/common/types';
import { SystemMindset } from '../../../molecules/writing-devices/SystemMindset.tsx';

export default function NotADashboardSection() {
  const legacyText = getIntentStyles(IntentTypes.Warning).text;
  const structureText = getIntentStyles(IntentTypes.Tertiary).text;

  return (
    <section class='flex flex-col items-center text-center px-6 py-24 space-y-6'>
      <div class=' space-y-4'>
        <h2 class='text-3xl md:text-4xl font-bold text-white'>
          This Isn’t a Dashboard. This Executes.
        </h2>
        <p class='text-lg text-neutral-300 max-w-2xl mx-auto'>
          Dashboards show what already happened. This system acts — precisely when it should.
        </p>
      </div>

      <div class='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-sm md:text-base text-left'>
        <div class='bg-neutral-800/40 p-6 rounded-xl border border-white/10 space-y-4'>
          <h3 class={`font-semibold text-lg ${legacyText}`}>
            What Breaks
          </h3>
          <ul class='space-y-2 list-disc list-inside text-neutral-300'>
            <li>ETL pipelines collapse on schema drift</li>
            <li>Alert fatigue from shallow thresholds</li>
            <li>LLMs guess — but can’t trace structure</li>
          </ul>
        </div>

        <div class='bg-neutral-900/40 p-6 rounded-xl border space-y-4 text-white'>
          <h3 class={`font-semibold text-lg ${structureText}`}>
            What Holds
          </h3>
          <ul class='space-y-2 list-disc list-inside'>
            <li>Versioned schemas govern behavior</li>
            <li>Agents act only on structure match</li>
            <li>Execution persists — even without insight tools</li>
          </ul>
        </div>
      </div>

      <SystemMindset intentType={IntentTypes.Tertiary}>
        You didn’t configure an integration. You promoted structure. And the system responded.
      </SystemMindset>
    </section>
  );
}
