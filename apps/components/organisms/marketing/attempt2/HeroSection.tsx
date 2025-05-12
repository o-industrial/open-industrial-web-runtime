import { FunctionalComponent } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';
import { FigureImage } from '../../../molecules/writing-devices/FigureImage.tsx';
import { getIntentStyles } from '../../../../../src/utils/getIntentStyles.ts';
import { HubspotForm } from '../HubspotForm.tsx';

const HeroSection: FunctionalComponent = () => {
  const info = getIntentStyles(IntentTypes.Info);

  return (
    <section
      id="hero"
      class="relative isolate overflow-hidden dark bg-neutral-950 py-32 sm:py-48 text-netural-50"
    >
      {/* Background Glow */}
      <div class="absolute inset-0 -z-10 bg-gradient-to-br from-neon-blue-900/40 via-transparent to-neon-purple-900/40 pointer-events-none" />

      <div class="mx-auto max-w-7xl px-6 lg:px-8 text-center space-y-10">
        {/* Headline */}
        <h1 class="text-4xl text-neutral-50 font-extrabold tracking-tight sm:text-6xl leading-tight">
          Compose your intelligence. <br />
          <span class={info.text}>
            Take back your stack — for the age of AI.
          </span>
        </h1>

        {/* Subheadline */}
        <p class="mt-6 text-lg leading-8 text-neutral-300 max-w-2xl mx-auto">
          Compose forkable logic, connect real-time telemetry, and evolve agents — all inside your own runtime.
        </p>

        {/* Azi Intro */}
        <p class="text-sm leading-6 text-neutral-400 max-w-md mx-auto italic">
          <strong class="text-white">OpenIndustrial’s Azi™</strong> isn’t just an agent — she’s a runtime-aware co-designer who helps you version logic, govern decisions, and evolve automation flows over time.
        </p>

        {/* Visual */}
        <div class="max-w-4xl mx-auto">
          <FigureImage
            intentType={IntentTypes.Info}
            src="/assets/screenshots/live-workspace-example.png"
            alt="Open Industrial workspace showing Azi-controlled RoomState logic flow with real-time telemetry and inspector"
            caption="Azi forks a new agent to control RoomState from real-time telemetry and schema joins."
            center
            size="full"
            shadow="2xl"
            glow
          />
        </div>

        {/* CTA / Hubspot */}
        <div class="mt-8 flex justify-center flex-wrap gap-6 max-w-xs mx-auto">
          <HubspotForm />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
