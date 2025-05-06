import { merge } from '@fathym/common';
import { EaCVertexDetails } from '@fathym/eac';
import { useCallback, useEffect, useState } from 'preact/hooks';

import { WorkspaceManager } from '../../../src/flow/managers/WorkspaceManager.ts';
import InspectorPanelTemplate from '../templates/InspectorPanelTemplate.tsx';

export type InspectorCommonProps<
  TDetails extends EaCVertexDetails = EaCVertexDetails,
  TStats extends Record<string, unknown> = Record<string, unknown>,
  TConfig extends Record<string, unknown> = Record<string, unknown>,
> = {
  config?: TConfig;
  details: Partial<TDetails>;
  enabled: boolean;
  getStats?: () => Promise<TStats>;
  onDelete: () => void; // 👈 new
  onDetailsChanged: (next: Partial<TDetails>) => void;
  onToggleEnabled: (enabled: boolean) => void;
};

type InspectorPanelProps = {
  workspaceMgr: WorkspaceManager;
};

export default function InspectorPanel({ workspaceMgr }: InspectorPanelProps) {
  const [updateSync, setUpdateSync] = useState([]);
  const { selected } = workspaceMgr.UseSelection();
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
            workspaceMgr.EaC.UpdateDetailsForNode(selectedId, merged);

            console.log(`🟢 Live-synced EaC details for node ${selectedId}`);
          }, 300);
        }

        return merged;
      });
    },
    [selectedId],
  );

  const handleClose = useCallback(() => {
    workspaceMgr.Selection.ClearSelection();
  }, []);

  const handleDeleteNode = useCallback(() => {
    if (!selectedId) return;

    console.log(`🗑️ Deleting node ${selectedId}`);

    workspaceMgr.EaC.DeleteNode(selectedId);

    workspaceMgr.Selection.ClearSelection();

    setUpdateSync([]);
  }, [selectedId]);

  const handleToggleEnabled = useCallback(
    (val: boolean) => {
      if (selectedId) {
        workspaceMgr.EaC.UpdateMetadataForNode(selectedId, { Enabled: val });
        setUpdateSync([]);
        console.log(`🟡 Toggled enabled state for node ${selectedId} → ${val}`);
      }
    },
    [selectedId],
  );

  useEffect(() => {
    if (selectedId) {
      const loaded = workspaceMgr.EaC.GetDetailsForNode(selectedId);
      setDetails({ ...(loaded ?? {}) });
    }
  }, [selectedId]);

  useEffect(() => {
    if (!selected) {
      setCommonProps(undefined);
      return;
    }

    const presetConfig = workspaceMgr.Presets?.GetConfigForType?.(selected.id, selected.type!) ??
      {};

    const latestMetadata = workspaceMgr.EaC.GetMetadataForNode?.(selected.id);
    const enabled = latestMetadata?.Enabled ?? false;

    setCommonProps({
      config: presetConfig,
      details,
      enabled,
      getStats: selected.data.getStats,
      onDelete: handleDeleteNode,
      onDetailsChanged: handleDetailsChanged,
      onToggleEnabled: handleToggleEnabled,
    });
  }, [selectedId, selected, details, handleDetailsChanged, updateSync]);

  const renderInspector = () => {
    if (!selected || !commonProps) {
      return (
        <div class='text-neutral-500 text-xs italic'>
          No node selected. Double click a node to inspect.
        </div>
      );
    }

    const Inspector = workspaceMgr.Presets.GetInspectorForType(selected.type!);

    if (!Inspector) {
      return (
        <div class='text-neutral-500 text-xs italic'>
          No inspector available for <strong>{selected.type}</strong>.
        </div>
      );
    }

    return <Inspector {...commonProps} />;
  };

  return (
    <InspectorPanelTemplate onClose={handleClose}>
      {renderInspector()}
    </InspectorPanelTemplate>
  );
}
