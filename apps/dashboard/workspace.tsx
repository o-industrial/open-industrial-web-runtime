import { useMemo, useEffect, useState } from 'preact/hooks';
import { EverythingAsCode } from '@fathym/eac';
import { EaCRuntimeHandlerSet } from '@fathym/eac/runtime/pipelines';
import { PageProps } from '@fathym/eac-applications/preact';

import { OpenIndustrialWebState } from '../../src/state/OpenIndustrialWebState.ts';
import RuntimeWorkspaceDashboardTemplate from '../components/templates/RuntimeWorkspaceDashboardTemplate.tsx';
import FlowPanel from '../components/organisms/FlowPanel.tsx';
import InspectorPanel from '../components/organisms/InspectorPanel.tsx';
import AziPanel from '../components/organisms/AziPanel.tsx';
import StreamPanel from '../components/organisms/StreamPanel.tsx';
import TimelinePanel from '../components/organisms/TimelinePanel.tsx';
import { FlowManager } from '../../src/flow/managers/FlowManager.ts';
import { SimulatorLibraryModal } from '../components/organisms/SimulatorLibraryModal.tsx';
import { OpenIndustrialEaC } from '../../src/types/OpenIndustrialEaC.ts';
import { SimulatedOIEaC } from '../../src/utils/SimulatedOIEaC.ts';

export const IsIsland = true;

type WorkspacePageData = {
  EaC: OpenIndustrialEaC;
};

export const handler: EaCRuntimeHandlerSet<
  OpenIndustrialWebState,
  WorkspacePageData
> = {
  GET: (_req, ctx) => {
    return ctx.Render({
      EaC: SimulatedOIEaC,
    });
  },
};

export default function WorkspacePage({
  Data: { EaC },
}: PageProps<WorkspacePageData>) {
  console.log('🌀 WorkspacePage mounted');

  const flowMgr = useMemo(() => {
    const mgr = new FlowManager({}, 'workspace');
    console.log('🧩 New FlowManager created');
    return mgr;
  }, []);

  const [showMarketplace, setShowMarketplace] = useState(false);

  useEffect(() => {
    if (EaC) {
      console.log('📥 Merging partial EaC:', EaC);
      flowMgr.EaC.MergePartial(EaC);
    }
  }, [EaC]);

  const modals = (
    <>
      {showMarketplace && (
        <SimulatorLibraryModal
          flowMgr={flowMgr}
          onClose={() => setShowMarketplace(false)}
        />
      )}
    </>
  );

  return (
    <RuntimeWorkspaceDashboardTemplate
      azi={<AziPanel flowMgr={flowMgr} />}
      breadcrumb={
        <div class="-:w-full -:text-xs -:text-neutral-400 -:bg-neutral-900 -:tracking-wide -:font-light -:px-4 -:pt-1.5 -:pb-1">
          {EaC.Details?.Name} (Workspace) /{' '}
          <span class="-:text-white">Management</span>
        </div>
      }
      inspector={<InspectorPanel flowMgr={flowMgr} />}
      stream={<StreamPanel />}
      timeline={<TimelinePanel />}
      modals={modals}
    >
      <FlowPanel
        flowMgr={flowMgr}
        onShowSimulatorLibrary={() => setShowMarketplace(true)}
      />
    </RuntimeWorkspaceDashboardTemplate>
  );
}
