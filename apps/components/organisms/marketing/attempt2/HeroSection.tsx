import { FunctionalComponent } from 'preact';
import { Action, ActionStyleTypes } from '../../../atoms/Action.tsx';
import { IntentTypes } from '@o-industrial/common/types';
import { RuntimeIcon } from '../../../../../build/iconset/icons/RuntimeIcon.tsx';
import { BuildIcon } from '../../../../../build/iconset/icons/BuildIcon.tsx';
import { FigureImage } from '../../../molecules/writing-devices/FigureImage.tsx';

const HeroSection: FunctionalComponent = () => {
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
          Fire your black box. <br />
          <span class="text-neon-blue-400">Command your own runtime.</span>
        </h1>

        {/* Subheadline */}
        <p class="mt-6 text-lg leading-8 text-neutral-300 max-w-2xl mx-auto">
          Azi lets your team deploy forkable logic, real-time telemetry, and
          explainable agents — no SaaS, no SIs, no lock-in.
        </p>

        {/* CTA Actions */}
        <div class="mt-10 flex justify-center flex-wrap gap-6">
          <Action
            href="/sim"
            intentType={IntentTypes.Primary}
            styleType={
              ActionStyleTypes.Solid |
              ActionStyleTypes.Rounded |
              ActionStyleTypes.Fat
            }
          >
            <RuntimeIcon class="w-5 h-5 mr-2" />
            Try the Runtime
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
            <BuildIcon class="w-5 h-5 mr-2" />
            Watch Azi Build
          </Action>
        </div>

        {/* Hero Visual */}
        <FigureImage
          intentType={IntentTypes.Info}
          src="/assets/screenshots/live-workspace-example.png"
          alt="Open Industrial workspace showing Azi-controlled RoomState logic flow with real-time telemetry and inspector"
          caption="Azi forks a new agent to control RoomState from real-time telemetry and schema joins."
          center
          size="xl"
          shadow="2xl"
          glow
        />
      </div>

      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-neutral-950 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
