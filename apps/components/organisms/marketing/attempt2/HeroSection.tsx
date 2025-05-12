import { FunctionalComponent } from 'preact';
import { Action, ActionStyleTypes } from '../../../atoms/Action.tsx';
import { IntentTypes } from '@o-industrial/common/types';
import { RuntimeIcon } from '../../../../../build/iconset/icons/RuntimeIcon.tsx';
import { BuildIcon } from '../../../../../build/iconset/icons/BuildIcon.tsx';
import { FigureImage } from '../../../molecules/writing-devices/FigureImage.tsx';
import { getIntentStyles } from '../../../../../src/utils/getIntentStyles.ts';
import { HubspotForm } from '../HubspotForm.tsx';

const HeroSection: FunctionalComponent = () => {
  const primaryStyles = getIntentStyles(IntentTypes.Primary);
  const secondaryStyles = getIntentStyles(IntentTypes.Secondary);

  return (
    <section
      id="hero"
      class="relative isolate overflow-hidden bg-neutral-950 py-32 sm:py-48"
    >
      {/* Background Glow */}
      <div class="absolute inset-0 -z-10 bg-gradient-to-br from-neon-blue-900/30 via-transparent to-neon-purple-900/20 pointer-events-none" />

      {/* Content */}
      <div class="mx-auto max-w-7xl px-6 lg:px-8 text-center space-y-10">
        {/* Headline */}
        <h1 class="text-4xl font-extrabold tracking-tight sm:text-6xl text-white leading-tight">
          Compose your intelligence. <br />
          <span class="text-neon-blue-400">
            Take back your stack — for the age of AI.
          </span>
        </h1>

        {/* Subheadline */}
        <p class="mt-6 text-lg leading-8 text-neutral-300 max-w-2xl mx-auto">
          Compose forkable logic, connect real-time telemetry, and evolve agents
          — all inside your own runtime.
        </p>

        {/* Azi Intro */}
        <p class="text-neutral-400 text-sm leading-6 max-w-md mx-auto">
          <strong class="text-white">OpenIndustrial’s Azi™</strong> isn’t just
          an agent — she’s a runtime-aware co-designer who helps you version
          logic, govern decisions, and evolve automation flows over time.
        </p>

        {/* Hero Visual */}
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

        {/* CTA Actions */}
        <div class="mt-10 flex justify-center flex-wrap gap-6 max-w-xs mx-auto">
          {/* <Action
            href="/sim"
            intentType={IntentTypes.Primary}
            styleType={
              ActionStyleTypes.Solid |
              ActionStyleTypes.Rounded |
              ActionStyleTypes.Fat
            }
          >
            <div
              class={`w-6 h-6 flex items-center justify-center rounded-full ${primaryStyles.background} ${primaryStyles.text}`}
            >
              <RuntimeIcon class="w-4 h-4" />
            </div>
            <span class="ml-2">Try the Runtime</span>
          </Action>

          <Action
            href="/docs/system-overview"
            intentType={IntentTypes.Secondary}
            styleType={
              ActionStyleTypes.Outline |
              ActionStyleTypes.Rounded |
              ActionStyleTypes.Fat
            }
          >
            <div
              class={`w-6 h-6 flex items-center justify-center rounded-full ${secondaryStyles.background} ${secondaryStyles.text}`}
            >
              <BuildIcon class="w-4 h-4" />
            </div>
            <span class="ml-2">Watch Azi Build</span>
          </Action>
         */}

          <HubspotForm />
        </div>
      </div>

      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-neutral-950 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
