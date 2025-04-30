export type NodePreset = {
  Type: string;
  Label: string;
  IconKey: string;
};

export class WorkspaceManager {
  public static Presets: Record<string, NodePreset> = {
    empty: {
      Type: 'empty',
      Label: 'Empty Node',
      IconKey: 'schema',
    },
    connection: {
      Type: 'connection',
      Label: 'Connection',
      IconKey: 'device',
    },
    schema: {
      Type: 'schema',
      Label: 'Schema',
      IconKey: 'schema',
    },
    surface: {
      Type: 'surface',
      Label: 'Surface',
      IconKey: 'surface',
    },
  };

  public static GetPreset(type: string): NodePreset | undefined {
    return WorkspaceManager.Presets[type];
  }
}
