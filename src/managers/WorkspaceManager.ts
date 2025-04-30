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
      IconKey: 'empty', 
    },
    connection: {
      Type: 'connection',
      Label: 'Connection',
      IconKey: 'connection', 
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
    device: {
      Type: 'device',
      Label: 'Device',
      IconKey: 'device',
    },
    agent: {
      Type: 'agent',
      Label: 'Agent',
      IconKey: 'agent', 
    },
  };
  
  public static GetPreset(type: string): NodePreset | undefined {
    return WorkspaceManager.Presets[type];
  }
}
