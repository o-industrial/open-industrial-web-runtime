import { PageProps } from '@fathym/eac-applications/preact';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';

import HeroExperienceSection from '../components/organisms/marketing/open-industrial-home/HeroExperienceSection.tsx';
import IntroBand from '../components/organisms/marketing/open-industrial-home/IntroBand.tsx';
import GovernedFlowSection from '../components/organisms/marketing/open-industrial-home/GovernedFlowSection.tsx';
import AIConversationsSection from '../components/organisms/marketing/open-industrial-home/AIConversationsSection.tsx';
import ValueDeliverySection from '../components/organisms/marketing/open-industrial-home/ValueDeliverySection.tsx';
import UnifiedFlowSection from '../components/organisms/marketing/open-industrial-home/UnifiedFlowSection.tsx';
import WhyOiGuardrailsSection from '../components/organisms/marketing/open-industrial-home/WhyOiGuardrailsSection.tsx';
import CloudOptionsSection from '../components/organisms/marketing/open-industrial-home/CloudOptionsSection.tsx';
import FutureVisionSection from '../components/organisms/marketing/open-industrial-home/FutureVisionSection.tsx';
import ReadyCTASection from '../components/organisms/marketing/open-industrial-home/ReadyCTASection.tsx';

import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';

export const IsIsland = true;

// deno-lint-ignore ban-types
export type HomepageData = {};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  HomepageData
> = {
  GET: (_req, ctx) => {
    const data: HomepageData = {};
    return ctx.Render(data);
  },
};

export default function HomePage({}: PageProps<HomepageData>) {
  return (
    <div class='relative flex flex-col overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-neutral-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900'>
      <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
        <div class='absolute left-1/2 top-[-18%] h-[620px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.22),_rgba(255,255,255,0)_72%)] opacity-60 blur-3xl dark:opacity-90' />
        <div class='absolute left-[-12%] top-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.16),_rgba(255,255,255,0)_68%)] blur-[120px] dark:bg-[radial-gradient(circle,_rgba(34,211,238,0.32),_rgba(255,255,255,0)_70%)]' />
        <div class='absolute right-[-14%] bottom-[-8%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,_rgba(249,168,212,0.18),_rgba(255,255,255,0)_72%)] blur-[140px] dark:bg-[radial-gradient(circle,_rgba(196,181,253,0.28),_rgba(255,255,255,0)_75%)]' />
      </div>

      <HeroExperienceSection />
      <IntroBand />
      <GovernedFlowSection />
      <AIConversationsSection />
      <ValueDeliverySection />
      <UnifiedFlowSection />
      <WhyOiGuardrailsSection />
      <CloudOptionsSection />
      <FutureVisionSection />
      <ReadyCTASection />
    </div>
  );
}