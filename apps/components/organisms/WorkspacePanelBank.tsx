import NodePresetItem from '../molecules/NodePresetItem.tsx';

/**
 * WorkspacePanelBank
 *
 * Displays a bank of draggable node presets (connection, surface, etc.).
 */
export type WorkspacePanelBankProps = {
  presets: Record<string, {
    Label: string;
    IconKey: string;
    Type: string;
  }>;
};

export default function WorkspacePanelBank({ presets }: WorkspacePanelBankProps) {
  return (
    <div class="flex flex-col items-center gap-2">
      {Object.entries(presets).map(([key, preset]) => (
        <NodePresetItem
          key={key}
          label={preset.Label}
          iconKey={preset.IconKey}
          type={preset.Type}
        />
      ))}
    </div>
  );
}
