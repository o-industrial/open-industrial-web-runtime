// deno-lint-ignore-file no-explicit-any
import { memo } from 'preact/compat';
import {
  EaCAzureIoTHubDataConnectionDetails,
  EaCDataConnectionAsCode,
  EaCFlowNodeMetadata,
  EaCSimulatorAsCode,
  EaCSurfaceAsCode,
} from '@o-industrial/common/eac';

import { NodeScopeTypes } from '../types/graph/NodeScopeTypes.ts';
import { NodePreset } from '../types/react/NodePreset.ts';
import { OpenIndustrialEaC } from '../../types/OpenIndustrialEaC.ts';
import { Position } from '../../types/Position.ts';

import AgentNodeRenderer from '../../../apps/components/organisms/renderers/AgentNodeRenderer.tsx';
import ConnectionNodeRenderer from '../../../apps/components/organisms/renderers/ConnectionNodeRenderer.tsx';
import DeviceNodeRenderer from '../../../apps/components/organisms/renderers/DeviceNodeRenderer.tsx';
import EmptyNodeRenderer from '../../../apps/components/organisms/renderers/EmptyNodeRenderer.tsx';
import SchemaNodeRenderer from '../../../apps/components/organisms/renderers/SchemaNodeRenderer.tsx';
import SurfaceNodeRenderer from '../../../apps/components/organisms/renderers/SurfaceNodeRenderer.tsx';
import SimulatorNodeRenderer from '../../../apps/components/organisms/renderers/SimulatorNodeRenderer.tsx';
import { AgentInspector } from '../../../apps/components/organisms/inspectors/AgentInspector.tsx';
import { ConnectionInspector } from '../../../apps/components/organisms/inspectors/ConnectionInspector.tsx';
import { SimulatorInspector } from '../../../apps/components/organisms/inspectors/SimulatorInspector.tsx';
import { SurfaceInspector } from '../../../apps/components/organisms/inspectors/SurfaceInspector.tsx';

export class PresetManager {
  private static inspectorMap: Record<string, any> = {
    agent: AgentInspector,
    connection: ConnectionInspector,
    surface: SurfaceInspector,
    simulator: SimulatorInspector,
  };

  private static presets: Record<string, NodePreset> = {
    empty: { Type: 'empty', Label: 'Empty Node', IconKey: 'empty' },
    connection: {
      Type: 'connection',
      Label: 'Connection',
      IconKey: 'connection',
    },
    schema: { Type: 'schema', Label: 'Schema', IconKey: 'schema' },
    surface: { Type: 'surface', Label: 'Surface', IconKey: 'surface' },
    device: { Type: 'device', Label: 'Device', IconKey: 'device' },
    agent: { Type: 'agent', Label: 'Agent', IconKey: 'agent' },
    simulator: { Type: 'simulator', Label: 'Simulator', IconKey: 'simulator' },
  };

  private static nodeTypes = {
    agent: memo(AgentNodeRenderer),
    connection: memo(ConnectionNodeRenderer),
    device: memo(DeviceNodeRenderer),
    empty: memo(EmptyNodeRenderer),
    schema: memo(SchemaNodeRenderer),
    surface: memo(SurfaceNodeRenderer),
    simulator: memo(SimulatorNodeRenderer),
  };

  private static scopeMap: Record<string, NodeScopeTypes[]> = {
    agent: ['surface'],
    connection: ['workspace'],
    device: [], // surface later?
    schema: ['surface'],
    surface: ['surface', 'workspace'],
    simulator: [],
    empty: [],
  };

  CreatePartialEaCFromPreset(
    type: string,
    id: string,
    position: Position,
    parentId?: string,
  ): Partial<OpenIndustrialEaC> {
    const metadata: EaCFlowNodeMetadata = {
      Position: position,
      Enabled: true,
    };

    const details = { Name: id };

    switch (type) {
      case 'connection':
        return {
          DataConnections: {
            [id]: {
              Metadata: metadata,
              Details: {
                ...details,
                Type: 'AzureIoTHub',
              } as EaCAzureIoTHubDataConnectionDetails,
            } as EaCDataConnectionAsCode,
          },
        };

      case 'simulator':
        return {
          Simulators: {
            [id]: {
              Metadata: metadata,
              Details: details,
            } as EaCSimulatorAsCode,
          },
        };

      case 'surface':
        return {
          Surfaces: {
            [id]: {
              Metadata: metadata,
              Details: details,
              ...(parentId && { ParentSurfaceLookup: parentId }),
            } as EaCSurfaceAsCode,
          },
        };

      default:
        throw new Error(`Unsupported preset type: ${type}`);
    }
  }

  GetConfigForType(_nodeId: string, type: string): Record<string, unknown> {
    switch (type) {
      case 'connection': {
        // You could later look up the specific connection type by ID if needed
        const ingestOptions = [
          { label: 'Default', value: 'Default', enabled: true },
          { label: 'REST', value: 'HTTP', enabled: true },
          { label: 'MQTT', value: 'MQTT', enabled: false },
          { label: 'Web Socket', value: 'WebSocket', enabled: false },
        ];

        return { ingestOptions };
      }

      // Example: stub for future types
      case 'surface': {
        return {
          supportedAgents: ['ReflexAgent', 'ControlAgent'],
        };
      }

      default:
        return {};
    }
  }

  GetInspectorForType(type: string): any | undefined {
    return PresetManager.inspectorMap[type];
  }

  GetPresetsForScope(scope: NodeScopeTypes): Record<string, NodePreset> {
    return Object.fromEntries(
      Object.entries(PresetManager.presets).filter(([type]) =>
        PresetManager.scopeMap[type]?.includes(scope)
      ),
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
