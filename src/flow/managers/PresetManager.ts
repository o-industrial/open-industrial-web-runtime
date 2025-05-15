// deno-lint-ignore-file no-explicit-any
import { ComponentType, memo } from 'preact/compat';
import {
  EaCFlowNodeMetadata,
  EaCSimulatorAsCode,
  Position,
} from '@o-industrial/common/eac';

import { NodeScopeTypes } from '../types/graph/NodeScopeTypes.ts';
import { NodePreset } from '../types/react/NodePreset.ts';
import { OpenIndustrialEaC } from '../../types/OpenIndustrialEaC.ts';

import AgentNodeRenderer from '../../../apps/components/organisms/renderers/AgentNodeRenderer.tsx';
import ConnectionNodeRenderer from '../../../apps/components/organisms/renderers/ConnectionNodeRenderer.tsx';
import EmptyNodeRenderer from '../../../apps/components/organisms/renderers/EmptyNodeRenderer.tsx';
import SchemaNodeRenderer from '../../../apps/components/organisms/renderers/SchemaNodeRenderer.tsx';
import SurfaceConnectionNodeRenderer from '../../../apps/components/organisms/renderers/SurfaceConnectionNodeRenderer.tsx';
import SurfaceNodeRenderer from '../../../apps/components/organisms/renderers/SurfaceNodeRenderer.tsx';
import SimulatorNodeRenderer from '../../../apps/components/organisms/renderers/SimulatorNodeRenderer.tsx';

import { AgentInspector } from '../../../apps/components/organisms/inspectors/AgentInspector.tsx';
import { ConnectionInspector } from '../../../apps/components/organisms/inspectors/ConnectionInspector.tsx';
import { SimulatorInspector } from '../../../apps/components/organisms/inspectors/SimulatorInspector.tsx';
import { SurfaceInspector } from '../../../apps/components/organisms/inspectors/SurfaceInspector.tsx';
import { SurfaceConnectionInspector } from '../../../apps/components/organisms/inspectors/SurfaceConnectionInspector.tsx';

type InspectorMap = Record<string, ComponentType<any>>;
type RendererMap = Record<string, ComponentType<any>>;
type PresetMap = Record<string, NodePreset>;
type ScopeMap = Record<string, NodeScopeTypes[]>;

export class PresetManager {
  protected static inspectorMap: InspectorMap = {
    // agent: AgentInspector,
    // connection: ConnectionInspector,
    // surface: SurfaceInspector,
    // 'surface->connection': SurfaceConnectionInspector,
    // simulator: SimulatorInspector,
  };

  protected static nodeTypes: RendererMap = {
    // agent: memo(AgentNodeRenderer),
    // connection: memo(ConnectionNodeRenderer),
    empty: memo(EmptyNodeRenderer),
    // schema: memo(SchemaNodeRenderer),
    // surface: memo(SurfaceNodeRenderer),
    // 'surface->connection': memo(SurfaceConnectionNodeRenderer),
    // simulator: memo(SimulatorNodeRenderer),
  };

  protected static presets: PresetMap = {
    empty: { Type: 'empty', Label: 'Empty Node', IconKey: 'empty' },
    // connection: {
    //   Type: 'connection',
    //   Label: 'Connection',
    //   IconKey: 'connection',
    // },
    // schema: { Type: 'schema', Label: 'Schema', IconKey: 'schema' },
    // surface: { Type: 'surface', Label: 'Surface', IconKey: 'surface' },
    // agent: { Type: 'agent', Label: 'Agent', IconKey: 'agent' },
    // simulator: { Type: 'simulator', Label: 'Simulator', IconKey: 'simulator' },
  };

  protected static scopeMap: ScopeMap = {
    agent: ['surface'],
    connection: ['workspace'],
    device: [],
    schema: ['surface'],
    surface: ['workspace'], //'surface',
    'surface->connection': [],
    simulator: [],
    empty: [],
  };

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

  // public GetInspectorForType(type: string): ComponentType<any> | null {
  //   return PresetManager.inspectorMap[type] ?? null;
  // }

  // public GetPresetsForScope(scope: NodeScopeTypes): Record<string, NodePreset> {
  //   return Object.fromEntries(
  //     Object.entries(PresetManager.presets).filter(([type]) =>
  //       PresetManager.scopeMap[type]?.includes(scope)
  //     )
  //   );
  // }

  // public GetRendererMap(): RendererMap {
  //   return PresetManager.nodeTypes;
  // }

  // public GetPreset(type: string): NodePreset | null {
  //   return PresetManager.presets[type] ?? null;
  // }

  // public IsTypeAllowedInScope(type: string, scope: NodeScopeTypes): boolean {
  //   return PresetManager.scopeMap[type]?.includes(scope) ?? false;
  // }
}
