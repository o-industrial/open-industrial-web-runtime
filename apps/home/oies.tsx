// deno-lint-ignore-file ban-types
import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { CompanyWebState } from '../../src/state/CompanyWebState.ts';
import HeroSection from '../components/oi-mockup/oies-oieb/HeroSection.tsx';
import WhatIsOpen IndustrialEdge from '../components/oi-mockup/oies-oieb/WhatIsOpen IndustrialEdge.tsx';
import MultiEnvironmentFlow from '../components/oi-mockup/oies-oieb/MultiEnvironmentFlow.tsx';
import AISecurity from '../components/oi-mockup/oies-oieb/AISecurity.tsx';

export type OIESOIEBData = {};

export const handler: EaCRuntimeHandlerSet<CompanyWebState, OIESOIEBData> = {
  GET: (_req, ctx) => {
    const data: OIESOIEBData = {};
    return ctx.Render(data);
  },
};

export default function OIESOIEB({}: PageProps<OIESOIEBData>) {
  return (
    <div class='flex flex-col space-y-12 bg-[#0A1F44] text-white'>
      <HeroSection />
      <WhatIsOpen IndustrialEdge />
      <MultiEnvironmentFlow />
      <AISecurity />
    </div>
  );
}
