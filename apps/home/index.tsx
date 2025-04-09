// deno-lint-ignore-file ban-types
import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { CompanyWebState } from '../../src/state/CompanyWebState.ts';
import HeroSection from '../components/oi-mockup/homepage/HeroSection.tsx';
import WhyOpenIndustrial from '../components/oi-mockup/homepage/WhyOpenIndustrial.tsx';
import VirtualWorkforceShowcase from '../components/oi-mockup/homepage/VirtualWorkforceShowcase.tsx';
import OpenIndustrialEdge from '../components/oi-mockup/homepage/OpenIndustrialEdge.tsx';
import EnterpriseUseCases from '../components/oi-mockup/homepage/EnterpriseUseCases.tsx';
import AIGovernance from '../components/oi-mockup/homepage/AIGovernance.tsx';

export type HomepageData = {};

export const handler: EaCRuntimeHandlerSet<CompanyWebState, HomepageData> = {
  GET: (_req, ctx) => {
    const data: HomepageData = {};
    return ctx.Render(data);
  },
};

export default function Homepage({}: PageProps<HomepageData>) {
  return (
    <div class='flex flex-col space-y-12 bg-[#0A1F44] text-white'>
      <HeroSection />
      <WhyOpenIndustrial />
      <VirtualWorkforceShowcase />
      <OpenIndustrialEdge />
      <EnterpriseUseCases />
      <AIGovernance />
    </div>
  );
}
