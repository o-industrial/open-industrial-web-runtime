export class PresetManager {
  public GetConfigForType(
    _nodeId: string,
    type: string
  ): Record<string, unknown> {
    switch (type) {
      case 'connection':
        return {
          ingestOptions: [
            { label: 'Default', value: 'Default', enabled: true },
            { label: 'HTTP', value: 'HTTP', enabled: true },
            { label: 'MQTT', value: 'MQTT', enabled: false },
            { label: 'ModBUS', value: 'ModBUS', enabled: false },
            { label: 'OPC', value: 'OPC', enabled: false },
            { label: 'Web Socket', value: 'WebSocket', enabled: false },
          ],
        };

      case 'surface':
        return {
          supportedAgents: ['ReflexAgent', 'ControlAgent'],
        };

      default:
        return {};
    }
  }
}
