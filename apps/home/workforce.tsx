// deno-lint-ignore-file ban-types
import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import HeroSection from '../components/oi-mockup/virtual-workforce/HeroSection.tsx';
import RoleOfAI from '../components/oi-mockup/virtual-workforce/RoleOfAI.tsx';
import AIWorkforceShowcase from '../components/oi-mockup/virtual-workforce/AIWorkforceShowcase.tsx';
import WorkforceCustomization from '../components/oi-mockup/virtual-workforce/WorkforceCustomization.tsx';
import UseCases from '../components/oi-mockup/virtual-workforce/UseCases.tsx';

export type VirtualWorkforceData = {};

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState, VirtualWorkforceData> = {
  GET: (_req, ctx) => {
    const data: VirtualWorkforceData = {};
    return ctx.Render(data);
  },
};

export default function VirtualWorkforce({}: PageProps<VirtualWorkforceData>) {
  return (
    <div class='flex flex-col space-y-12 bg-[#0A1F44] text-white'>
      <HeroSection />
      <RoleOfAI />
      <AIWorkforceShowcase />
      <WorkforceCustomization />
      <UseCases />
    </div>
  );
}
