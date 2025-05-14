import { FunctionalComponent } from 'preact';
import { IntentTypes } from '@o-industrial/common/types';
import { FigureImage } from '../../../molecules/writing-devices/FigureImage.tsx';
import { getIntentStyles } from '../../../../../src/utils/getIntentStyles.ts';
import { HubspotForm } from '../HubspotForm.tsx';
import { Action, ActionStyleTypes } from '../../../atoms/Action.tsx';

const HeroSection: FunctionalComponent = () => {
  const primary = getIntentStyles(IntentTypes.Primary);

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
          Compose forkable logic, connect real-time telemetry, and evolve agents
          — all inside your own runtime.
        </p>

        <p class="mt-6 text-lg leading-8 text-neutral-300 max-w-2xl mx-auto">
          OpenIndustrial is a cloud-native industrial integration hub and
          AI-native execution engine that helps teams connect legacy systems,
          shape automation logic, and run reflexive, real-time control systems.
        </p>

        {/* Azi Intro */}
        <p class="text-sm leading-6 text-neutral-400 max-w-md mx-auto italic">
          <strong class="text-white">OpenIndustrial’s Azi™</strong> isn’t just
          an agent — she’s a runtime-aware co-designer who helps you version
          logic, govern decisions, and evolve automation flows over time.
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
        <div
          class={`max-w-xl mx-auto rounded-2xl border p-12 text-center shadow-lg ring-2 ring-inset ${primary.ring} ${primary.glow} bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-50/10`}
        >
          <h2 class="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 max-w-md mx-auto">
            We’re Launching Soon. Want a First Look?
          </h2>
          <p class="text-md text-neutral-600 dark:text-neutral-300 max-w-sm mx-auto mb-10">
            Enter your email address to be the first to get access. For a demo,
            reach out to{' '}
            <Action
              class="inline"
              href="mailto:invite@openIndustrial.co"
              styleType={ActionStyleTypes.Thin | ActionStyleTypes.Link}
              intentType={IntentTypes.Info}
            >
              invite@openIndustrial.co
            </Action>
          </p>

          <div class="flex flex-col sm:flex-row justify-center gap-6">
            {/* <Action> buttons available if re-enabled later */}
            <HubspotForm
              id="hero-hubspot-form"
              formId="bb2d84f4-0fc3-45df-8db3-ed0b2d14b717"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
