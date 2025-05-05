import { FlowManager } from '../../../src/flow/managers/FlowManager.ts';
import InspectorPanelTemplate from '../templates/InspectorPanelTemplate.tsx';

import { AgentInspector } from './inspectors/AgentInspector.tsx';
import { ConnectionInspector } from './inspectors/ConnectionInspector.tsx';
import { SurfaceInspector } from './inspectors/SurfaceInspector.tsx';
import { useEffect, useState } from 'preact/hooks';
import { FlowNodeData } from '../../../src/flow/types/react/FlowNodeData.ts';

type NodeSettings = Partial<FlowNodeData>;

type InspectorPanelProps = {
  flowMgr: FlowManager;
};

export type InspectorCommonProps<T extends FlowNodeData = FlowNodeData> = {
  settings: Partial<T>;
  onSettingsChanged: (next: Partial<T>) => void;
  onSave?: () => void;
};

export default function InspectorPanel({ flowMgr }: InspectorPanelProps) {
  const { selected } = flowMgr.UseSelection();

  const [settings, setSettings] = useState<NodeSettings>({});

  useEffect(() => {
    if (selected) setSettings({ ...selected.data });
  }, [selected]);

  const handleSettingsChanged = (next: NodeSettings) => {
    setSettings((prev) => ({ ...prev, ...next }));
  };

  const handleSave = () => {
    if (selected) {
      selected.data = { ...selected.data, ...settings };
      console.log('Updated node:', selected);
    }
  };

  const handleClose = () => {
    flowMgr.Selection.ClearSelection();
  };

  const renderInspector = () => {
    if (!selected) {
      return (
        <div class="text-neutral-500 text-xs italic">
          No node selected. Double click a node to inspect.
        </div>
      );
    }

    const commonProps: InspectorCommonProps = {
      settings,
      onSettingsChanged: handleSettingsChanged,
      onSave: handleSave,
    };

    switch (selected.type) {
      case 'agent':
        return <AgentInspector {...commonProps} />;
      case 'connection':
        return <ConnectionInspector {...commonProps} />;
      case 'surface':
        return <SurfaceInspector {...commonProps} />;
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
