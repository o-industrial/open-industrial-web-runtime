import { NodeScopeTypes } from './FlowManager.ts';
import { NodePreset } from './NodePreset.ts';
import AgentNodeRenderer from '../../apps/components/organisms/renderers/AgentNodeRenderer.tsx';
import ConnectionNodeRenderer from '../../apps/components/organisms/renderers/ConnectionNodeRenderer.tsx';
import DeviceNodeRenderer from '../../apps/components/organisms/renderers/DeviceNodeRenderer.tsx';
import EmptyNodeRenderer from '../../apps/components/organisms/renderers/EmptyNodeRenderer.tsx';
import SchemaNodeRenderer from '../../apps/components/organisms/renderers/SchemaNodeRenderer.tsx';
import SurfaceNodeRenderer from '../../apps/components/organisms/renderers/SurfaceNodeRenderer.tsx';
import { memo } from 'preact/compat';

export class PresetManager {
  private static presets: Record<string, NodePreset> = {
    empty: { Type: 'empty', Label: 'Empty Node', IconKey: 'empty' },
    connection: { Type: 'connection', Label: 'Connection', IconKey: 'connection' },
    schema: { Type: 'schema', Label: 'Schema', IconKey: 'schema' },
    surface: { Type: 'surface', Label: 'Surface', IconKey: 'surface' },
    device: { Type: 'device', Label: 'Device', IconKey: 'device' },
    agent: { Type: 'agent', Label: 'Agent', IconKey: 'agent' },
  };

  private static nodeTypes = {
    agent: memo(AgentNodeRenderer),
    connection: memo(ConnectionNodeRenderer),
    device: memo(DeviceNodeRenderer),
    empty: memo(EmptyNodeRenderer),
    schema: memo(SchemaNodeRenderer),
    surface: memo(SurfaceNodeRenderer),
  };

  private static scopeMap: Record<string, NodeScopeTypes[]> = {
    agent: ['surface'],
    connection: ['workspace'],
    device: ['surface'],
    schema: ['surface'],
    surface: ['workspace'],
    empty: [],
  };

  GetPresetsForScope(scope: NodeScopeTypes): Record<string, NodePreset> {
    return Object.fromEntries(
      Object.entries(PresetManager.presets).filter(([type]) =>
        PresetManager.scopeMap[type]?.includes(scope)
      )
    );
  }

  GetRendererMap() {
    return PresetManager.nodeTypes;
  }

  GetPreset(type: string): NodePreset | undefined {
    return PresetManager.presets[type];
  }

  IsTypeAllowedInScope(type: string, scope: NodeScopeTypes): boolean {
    return PresetManager.scopeMap[type]?.includes(scope);
  }
}
