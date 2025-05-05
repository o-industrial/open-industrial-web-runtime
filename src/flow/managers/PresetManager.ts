import { NodeScopeTypes } from '../types/graph/NodeScopeTypes.ts';
import { NodePreset } from '../types/react/NodePreset.ts';

import AgentNodeRenderer from '../../../apps/components/organisms/renderers/AgentNodeRenderer.tsx';
import ConnectionNodeRenderer from '../../../apps/components/organisms/renderers/ConnectionNodeRenderer.tsx';
import DeviceNodeRenderer from '../../../apps/components/organisms/renderers/DeviceNodeRenderer.tsx';
import EmptyNodeRenderer from '../../../apps/components/organisms/renderers/EmptyNodeRenderer.tsx';
import SchemaNodeRenderer from '../../../apps/components/organisms/renderers/SchemaNodeRenderer.tsx';
import SurfaceNodeRenderer from '../../../apps/components/organisms/renderers/SurfaceNodeRenderer.tsx';
// import SimulatorNodeRenderer from '../../../apps/components/organisms/renderers/SimulatorNodeRenderer.tsx';

import { memo } from 'preact/compat';
import { EaCSurfaceAsCode } from '../../eac/EaCSurfaceAsCode.ts';
import { EaCSimulatorAsCode } from '../../eac/EaCSimulatorAsCode.ts';
import { EaCDataConnectionAsCode } from '../../eac/EaCDataConnectionAsCode.ts';
import { OpenIndustrialEaC } from '../../types/OpenIndustrialEaC.ts';
import { EaCFlowNodeMetadata } from '../../eac/EaCFlowNodeMetadata.ts';
import { XYPosition } from 'reactflow';
import { Position } from '../../types/Position.ts';

export class PresetManager {
  private static presets: Record<string, NodePreset> = {
    empty: { Type: 'empty', Label: 'Empty Node', IconKey: 'empty' },
    connection: { Type: 'connection', Label: 'Connection', IconKey: 'connection' },
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
    simulator: memo(EmptyNodeRenderer),
  };

  private static scopeMap: Record<string, NodeScopeTypes[]> = {
    agent: ['surface'],
    connection: ['workspace'],
    device: [], // surface later?
    schema: ['surface'],
    surface: ['surface', 'workspace'],
    simulator: ['workspace'],
    empty: [],
  };

  CreatePartialEaCFromPreset(
    type: string,
    id: string,
    position: Position,
    parentId?: string
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
            [id]: { Metadata: metadata, Details: details } as EaCDataConnectionAsCode,
          },
        };
  
      case 'simulator':
        return {
          Simulators: {
            [id]: { Metadata: metadata, Details: details } as EaCSimulatorAsCode,
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
