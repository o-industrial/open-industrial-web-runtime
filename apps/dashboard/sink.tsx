import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import {
  CompositeSchemaIcon,
  DeviceIcon,
  ImpulseIcon,
  ReferenceSchemaIcon,
  SchemaIcon,
  SignalIcon,
  SurfaceIcon,
  TriggerMatchIcon,
} from '../../build/iconset/icons/_exports.ts';
import {
  Action,
  ActionIntentTypes,
  ActionStyleTypes,
} from '../components/atoms/Action.tsx';

type IndexPageData = {};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  IndexPageData
> = {
  GET: (_req, ctx) => {
    return ctx.Render({});
  },
};

export default function DashboardIndex({ Data }: PageProps<IndexPageData>) {
  return (
    <>
      <div class="py-16 px-4 bg-neutral-500/75">
        <div class="mx-auto block w-[350px] text-center">
          <h1 class="text-4xl">Dashboard</h1>

          <div class="flex flex-row py-8">{/* <Counter /> */}</div>
        </div>
      </div>

      <div class="p-4">
        <h2 class="text-2xl">
          <DeviceIcon class="w-5 h-5 text-neon-pink-400 inline" /> Device
        </h2>
        <h2 class="text-2xl">
          <ImpulseIcon class="w-5 h-5 text-neon-pink-400 inline" /> Impulse
        </h2>
        <h2 class="text-2xl">
          <SchemaIcon class="w-5 h-5 text-neon-pink-400 inline" /> Schema
        </h2>
        <h2 class="text-2xl">
          <CompositeSchemaIcon class="w-5 h-5 text-neon-pink-400 inline" />{' '}
          Composite Schema
        </h2>
        <h2 class="text-2xl">
          <ReferenceSchemaIcon class="w-5 h-5 text-neon-pink-400 inline" />{' '}
          Reference Schema
        </h2>
        <h2 class="text-2xl">
          <SignalIcon class="w-5 h-5 text-neon-pink-400 inline" /> Signal
        </h2>
        <h2 class="text-2xl">
          <SurfaceIcon class="w-5 h-5 text-neon-pink-400 inline" /> Surface
        </h2>
        <h2 class="text-2xl">
          <TriggerMatchIcon class="w-5 h-5 text-neon-pink-400 inline" /> Trigger
          Match
        </h2>

        <div class="space-y-8">
          <h1 class="text-2xl font-bold mb-6">Action Button Variants</h1>

          <div class="flex flex-wrap gap-8">
            <div class="flex flex-col items-center space-y-2">
              <h2 class="text-sm font-semibold">Primary Solid</h2>
              <Action
                styleType={ActionStyleTypes.Solid | ActionStyleTypes.Rounded}
                intentType={ActionIntentTypes.Primary}
              >
                Launch
              </Action>
            </div>

            <div class="flex flex-col items-center space-y-2">
              <h2 class="text-sm font-semibold">Secondary Outline</h2>
              <Action
                styleType={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
                intentType={ActionIntentTypes.Secondary}
                href="#"
              >
                Read Terms
              </Action>
            </div>

            <div class="flex flex-col items-center space-y-2">
              <h2 class="text-sm font-semibold">Tertiary Outline</h2>
              <Action
                styleType={ActionStyleTypes.Solid | ActionStyleTypes.Rounded}
                intentType={ActionIntentTypes.Tertiary}
                href="#"
              >
                Read Terms
              </Action>
            </div>

            <div class="flex flex-col items-center space-y-2">
              <h2 class="text-sm font-semibold">Icon Primary</h2>
              <Action
                styleType={ActionStyleTypes.Icon | ActionStyleTypes.Rounded}
                intentType={ActionIntentTypes.Primary}
              >
                <SignalIcon class="w-5 h-5" />
              </Action>
            </div>

            <div class="flex flex-col items-center space-y-2">
              <h2 class="text-sm font-semibold">Info Link</h2>
              <Action
                styleType={ActionStyleTypes.Link}
                intentType={ActionIntentTypes.Info}
                href="#"
              >
                Learn More
              </Action>
            </div>

            <div class="flex flex-col items-center space-y-2">
              <h2 class="text-sm font-semibold">Solid Warning</h2>
              <Action
                styleType={ActionStyleTypes.Solid | ActionStyleTypes.Rounded}
                intentType={ActionIntentTypes.Warning}
              >
                Retry Warning
              </Action>
            </div>

            <div class="flex flex-col items-center space-y-2">
              <h2 class="text-sm font-semibold">Outline Warning</h2>
              <Action
                styleType={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
                intentType={ActionIntentTypes.Warning}
              >
                Warning Outline
              </Action>
            </div>

            <div class="flex flex-col items-center space-y-2">
              <h2 class="text-sm font-semibold">Solid Info</h2>
              <Action
                styleType={ActionStyleTypes.Solid | ActionStyleTypes.Rounded}
                intentType={ActionIntentTypes.Info}
              >
                Info Action
              </Action>
            </div>

            <div class="flex flex-col items-center space-y-2">
              <h2 class="text-sm font-semibold">Outline Info</h2>
              <Action
                styleType={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
                intentType={ActionIntentTypes.Info}
              >
                Info Outline
              </Action>
            </div>

            <div class="flex flex-col items-center space-y-2">
              <h2 class="text-sm font-semibold">Solid Error</h2>
              <Action
                styleType={ActionStyleTypes.Solid | ActionStyleTypes.Rounded}
                intentType={ActionIntentTypes.Error}
              >
                Delete
              </Action>
            </div>

            <div class="flex flex-col items-center space-y-2">
              <h2 class="text-sm font-semibold">Outline Error</h2>
              <Action
                styleType={ActionStyleTypes.Outline | ActionStyleTypes.Rounded}
                intentType={ActionIntentTypes.Error}
              >
                Danger Outline
              </Action>
            </div>

            <div class="flex flex-col items-center space-y-2">
              <h2 class="text-sm font-semibold">Disabled Primary</h2>
              <Action
                styleType={ActionStyleTypes.Solid | ActionStyleTypes.Rounded}
                intentType={ActionIntentTypes.Primary}
                disabled
              >
                Disabled Primary
              </Action>
            </div>

            <div class="flex flex-col items-center space-y-2">
              <h2 class="text-sm font-semibold">Disabled Link</h2>
              <Action
                styleType={ActionStyleTypes.Link}
                intentType={ActionIntentTypes.Info}
                href="#"
                disabled
              >
                Disabled Link
              </Action>
            </div>
          </div>
        </div>

        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
        <h2 class="text-2xl">Welcome</h2>
      </div>
    </>
  );
}
