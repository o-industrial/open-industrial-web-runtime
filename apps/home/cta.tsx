// deno-lint-ignore-file ban-types
import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import HeroSection from '../components/oi-mockup/cta-community/HeroSection.tsx';
import DeployExecution from '../components/oi-mockup/cta-community/DeployExecution.tsx';
import DeveloperEngagement from '../components/oi-mockup/cta-community/DeveloperEngagement.tsx';
import CommunityCollaboration from '../components/oi-mockup/cta-community/CommunityCollaboration.tsx';

export type CTACommunityData = {};

export const handler: EaCRuntimeHandlerSet<OpenIndustrialWebState, CTACommunityData> = {
  GET: (_req, ctx) => {
    const data: CTACommunityData = {};
    return ctx.Render(data);
  },
};

export default function CTACommunity({}: PageProps<CTACommunityData>) {
  return (
    <div class='flex flex-col space-y-12 bg-[#0A1F44] text-white'>
      <HeroSection />
      <DeployExecution />
      <DeveloperEngagement />
      <CommunityCollaboration />
    </div>
  );
}
