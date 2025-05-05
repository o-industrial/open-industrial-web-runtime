import { merge } from '@fathym/common';
import { EaCVertexDetails } from '@fathym/eac';
import { useEffect, useState, useCallback } from 'preact/hooks';

import { FlowManager } from '../../../src/flow/managers/FlowManager.ts';
import InspectorPanelTemplate from '../templates/InspectorPanelTemplate.tsx';

import { AgentInspector } from './inspectors/AgentInspector.tsx';
import { ConnectionInspector } from './inspectors/ConnectionInspector.tsx';
import { SurfaceInspector } from './inspectors/SurfaceInspector.tsx';
import { DataConnectionConfig } from '../../../src/flow/types/DataConnectionConfig.ts';

type InspectorPanelProps = {
  flowMgr: FlowManager;
};

export type InspectorCommonProps<
  TDetails extends EaCVertexDetails = EaCVertexDetails,
  TStats extends Record<string, unknown> = Record<string, unknown>,
  TConfig extends Record<string, unknown> = Record<string, unknown>
> = {
  config?: TConfig;
  details: Partial<TDetails>;
  enabled: boolean;
  getStats?: () => Promise<TStats>;
  onDetailsChanged: (next: Partial<TDetails>) => void;
};

export default function InspectorPanel({ flowMgr }: InspectorPanelProps) {
  const { selected } = flowMgr.UseSelection();
  const selectedId = selected?.id;

  const [details, setDetails] = useState<EaCVertexDetails>({});
  const [commonProps, setCommonProps] = useState<InspectorCommonProps>();

  const debounceTimers: Record<string, number> = {};

  const handleDetailsChanged = useCallback(
    (next: Partial<EaCVertexDetails>) => {
      setDetails((prev): EaCVertexDetails => {
        const merged = merge<EaCVertexDetails>(prev, next);

        if (selectedId) {
          if (debounceTimers[selectedId]) {
            clearTimeout(debounceTimers[selectedId]);
          }

          debounceTimers[selectedId] = setTimeout(() => {
            flowMgr.EaC.UpdateDetailsForNode(selectedId, merged);

            console.log(`🟢 Live-synced EaC details for node ${selectedId}`);
          }, 300);
        }

        return merged;
      });
    },
    [selectedId]
  );

  const handleSave = useCallback(() => {
    if (selectedId) {
      flowMgr.EaC.UpdateDetailsForNode(selectedId, details);
      console.log(`💾 Saved EaC details for node ${selectedId}`);
    }
  }, [selectedId, details]);

  const handleClose = useCallback(() => {
    flowMgr.Selection.ClearSelection();
  }, []);

  // 🔁 Update details when selected node changes
  useEffect(() => {
    if (selectedId) {
      const loaded = flowMgr.EaC.GetDetailsForNode(selectedId);
      setDetails({ ...(loaded ?? {}) });
    }
  }, [selectedId]);

  // 🔁 Rebuild commonProps when selected or details change
  useEffect(() => {
    if (!selected) {
      setCommonProps(undefined);
      return;
    }

    const presetConfig =
      flowMgr.Presets?.GetConfigForType?.(selected.id, selected.type!) ?? {};

    setCommonProps({
      details,
      enabled: selected.data.enabled ?? false,
      getStats: selected.data.getStats,
      onDetailsChanged: handleDetailsChanged,
      config: presetConfig,
    });
  }, [selected, details, handleDetailsChanged, handleSave]);

  const renderInspector = () => {
    if (!selected || !commonProps) {
      return (
        <div class="text-neutral-500 text-xs italic">
          No node selected. Double click a node to inspect.
        </div>
      );
    }

    switch (selected.type) {
      case 'agent':
        return <AgentInspector {...commonProps} config={commonProps.config} />;
      case 'connection':
        return (
          <ConnectionInspector
            {...commonProps}
            config={commonProps.config as DataConnectionConfig}
          />
        );
      case 'surface':
        return (
          <SurfaceInspector {...commonProps} config={commonProps.config} />
        );
      default:
        return (
          <div class="text-neutral-500 text-xs italic">
            No inspector available for <strong>{selected.type}</strong>.
          </div>
        );
    }
  };

  return (
    <InspectorPanelTemplate onClose={handleClose}>
      {renderInspector()}
    </InspectorPanelTemplate>
  );
}
