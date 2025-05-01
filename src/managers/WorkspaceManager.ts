import { JSX } from 'preact';
import { memo } from 'preact/compat';
import { Node, NodeProps, XYPosition } from 'reactflow';
import { NodePreset } from './NodePreset.ts';
import { WorkspaceNodeData } from './WorkspaceNodeData.ts';

import AgentNodeRenderer from '../../apps/components/organisms/renderers/AgentNodeRenderer.tsx';
import ConnectionNodeRenderer from '../../apps/components/organisms/renderers/ConnectionNodeRenderer.tsx';
import DeviceNodeRenderer from '../../apps/components/organisms/renderers/DeviceNodeRenderer.tsx';
import EmptyNodeRenderer from '../../apps/components/organisms/renderers/EmptyNodeRenderer.tsx';
import SchemaNodeRenderer from '../../apps/components/organisms/renderers/SchemaNodeRenderer.tsx';
import SurfaceNodeRenderer from '../../apps/components/organisms/renderers/SurfaceNodeRenderer.tsx';

export type NodeScopeTypes = 'workspace' | 'surface';

export class WorkspaceManager {
  private static nodeScopes: Record<string, NodeScopeTypes[]> = {
    agent: ['surface'],
    connection: ['workspace'],
    device: ['surface'],
    schema: ['surface'],
    surface: ['workspace'],
    empty: [], // explicitly not allowed anywhere
  };

  private static nodeTypes = {
    agent: memo(AgentNodeRenderer),
    connection: memo(ConnectionNodeRenderer),
    device: memo(DeviceNodeRenderer),
    empty: memo(EmptyNodeRenderer),
    schema: memo(SchemaNodeRenderer),
    surface: memo(SurfaceNodeRenderer),
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
  };

  public static GetAvailablePresets(
    scope: NodeScopeTypes
  ): Record<string, NodePreset> {
    return Object.entries(WorkspaceManager.presets).reduce(
      (acc, [type, preset]) => {
        if (WorkspaceManager.nodeScopes[type]?.includes(scope)) {
          acc[type] = preset;
        }
        return acc;
      },
      {} as Record<string, NodePreset>
    );
  }

  public static GetAvailableTypes(
    scope: NodeScopeTypes
  ): Record<
    string,
    (props: NodeProps<WorkspaceNodeData>) => JSX.Element | null
  > {
    return WorkspaceManager.nodeTypes;
    // return Object.entries(WorkspaceManager.nodeTypes)
    //   .filter(([type]) => WorkspaceManager.nodeScopes[type]?.includes(scope))
    //   .reduce((acc, [type, component]) => {
    //     acc[type] = component;
    //     return acc;
    //   }, {} as Record<string, (props: NodeProps<WorkspaceNodeData>) => JSX.Element | null>);
  }

  public static GetNodeType(
    type: keyof typeof WorkspaceManager.nodeTypes
  ): (props: NodeProps<WorkspaceNodeData>) => JSX.Element | null {
    return (
      WorkspaceManager.nodeTypes[type] ?? WorkspaceManager.nodeTypes['empty']
    );
  }

  public static GetPreset(
    type: keyof typeof WorkspaceManager.presets
  ): NodePreset | undefined {
    return WorkspaceManager.presets[type];
  }

  public static HandleDrop(
    event: DragEvent,
    nodes: Node<WorkspaceNodeData>[],
    project: (p: XYPosition) => XYPosition
  ): { newNode: Node<WorkspaceNodeData>; selectedId: string } | null {
    event.preventDefault();
    const transfer = event.dataTransfer;
    if (!transfer) return null;

    const type = transfer.getData('application/node-type');
    if (!type) return null;

    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();

    const position = project({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });

    const preset = WorkspaceManager.GetPreset(type);
    if (!preset) return null;

    const id = `${type}-${Date.now()}`;

    // Determine if this drop is inside a surface (i.e., within a scoped container)
    const surfaceParent = nodes.find((node) => {
      if (node.type !== 'surface') return false;
      const style = node.style || {};
      const width = typeof style.width === 'number' ? style.width : 300;
      const height = typeof style.height === 'number' ? style.height : 200;
      return (
        position.x >= node.position.x &&
        position.x <= node.position.x + width &&
        position.y >= node.position.y &&
        position.y <= node.position.y + height
      );
    });

    // Determine the target scope
    const scope = surfaceParent ? 'surface' : 'workspace';

    // Abort if the node type isn't allowed in the current scope
    if (!WorkspaceManager.IsTypeAllowedInScope(type, scope)) {
      console.warn(`Node type "${type}" not allowed in scope "${scope}".`);
      return null;
    }

    const newNode = WorkspaceManager.CreateNode(
      id,
      preset.Type,
      position,
      surfaceParent
    );

    return { newNode, selectedId: id };
  }

  public static IsTypeAllowedInScope(type: string, scope: NodeScopeTypes): boolean {
    return WorkspaceManager.nodeScopes[type]?.includes(scope);
  }
  
  public static CreateNode(
    id: string,
    type: keyof typeof WorkspaceManager.presets,
    position: XYPosition,
    surfaceParent?: Node<WorkspaceNodeData>
  ): Node<WorkspaceNodeData> {
    const preset = WorkspaceManager.GetPreset(type);
    if (!preset) throw new Error(`Unknown preset type: ${type}`);

    const relativePosition = surfaceParent
      ? {
          x: position.x - (surfaceParent.position.x ?? 0),
          y: position.y - (surfaceParent.position.y ?? 0),
        }
      : position;

    const baseData: WorkspaceNodeData = {
      type: preset.Type,
      label: preset.Label,
      iconKey: preset.IconKey,
      isSelected: false,
      onDoubleClick: () => {},
      childNodeIds: [],
    };

    const enhancedData = WorkspaceManager.enhanceNodeData(type, baseData);

    return {
      id,
      type: preset.Type,
      position: relativePosition,
      data: enhancedData,
      ...(surfaceParent && {
        parentId: surfaceParent.id,
        extent: 'parent',
      }),
    };
  }

  private static enhanceNodeData(
    type: string,
    data: WorkspaceNodeData
  ): WorkspaceNodeData {
    switch (type) {
      case 'agent':
        return WorkspaceManager.buildAgentNodeData(data);
      case 'connection':
        return WorkspaceManager.buildConnectionNodeData(data);
      case 'device':
        return WorkspaceManager.buildDeviceNodeData(data);
      case 'empty':
        return WorkspaceManager.buildEmptyNodeData(data);
      case 'schema':
        return WorkspaceManager.buildSchemaNodeData(data);
      case 'surface':
        return WorkspaceManager.buildSurfaceNodeData(data);
      default:
        return data;
    }
  }

  private static buildAgentNodeData(
    base: WorkspaceNodeData
  ): WorkspaceNodeData {
    const buffer: number[] = Array.from({ length: 20 }, () =>
      Number((10 + Math.random() * 5).toFixed(2))
    );

    return {
      ...base,
      stats: {
        impulseRates: [...buffer],
        matchesHandled: Math.floor(Math.random() * 200),
        avgLatencyMs: Number((Math.random() * 40 + 10).toFixed(1)),
        lastRunAgo: `${Math.floor(Math.random() * 90)}s ago`,
      },
      getStats: async () => {
        const next = Number((10 + Math.random() * 5).toFixed(2));
        buffer.push(next);
        if (buffer.length > 20) buffer.shift();

        return {
          impulseRates: [...buffer],
          matchesHandled: Math.floor(Math.random() * 200),
          avgLatencyMs: Number((Math.random() * 40 + 10).toFixed(1)),
          lastRunAgo: `${Math.floor(Math.random() * 90)}s ago`,
        };
      },
    };
  }

  private static buildConnectionNodeData(
    base: WorkspaceNodeData
  ): WorkspaceNodeData {
    const buffer: number[] = Array.from({ length: 20 }, () =>
      Number((20 + Math.random() * 10).toFixed(2))
    );

    return {
      ...base,
      stats: { impulseRates: [...buffer] },
      getStats: async () => {
        const next = Number((20 + Math.random() * 10).toFixed(2));
        buffer.push(next);
        if (buffer.length > 20) buffer.shift();
        return { impulseRates: [...buffer] };
      },
    };
  }

  private static buildDeviceNodeData(
    base: WorkspaceNodeData
  ): WorkspaceNodeData {
    const buffer: number[] = Array.from({ length: 20 }, () =>
      Number((5 + Math.random() * 5).toFixed(2))
    );

    return {
      ...base,
      stats: { impulseRates: [...buffer] },
      getStats: async () => {
        const next = Number((5 + Math.random() * 5).toFixed(2));
        buffer.push(next);
        if (buffer.length > 20) buffer.shift();
        return { impulseRates: [...buffer] };
      },
    };
  }

  private static buildEmptyNodeData(
    base: WorkspaceNodeData
  ): WorkspaceNodeData {
    const buffer: number[] = Array.from({ length: 20 }, () =>
      Number((5 + Math.random() * 3).toFixed(2))
    );

    return {
      ...base,
      stats: { impulseRates: [...buffer] },
      getStats: async () => {
        const next = Number((5 + Math.random() * 3).toFixed(2));
        buffer.push(next);
        if (buffer.length > 20) buffer.shift();
        return { impulseRates: [...buffer] };
      },
    };
  }

  private static buildSchemaNodeData(
    base: WorkspaceNodeData
  ): WorkspaceNodeData {
    const buffer: number[] = Array.from({ length: 20 }, () =>
      Number((10 + Math.random() * 10).toFixed(2))
    );

    return {
      ...base,
      stats: { impulseRates: [...buffer] },
      getStats: async () => {
        const next = Number((10 + Math.random() * 10).toFixed(2));
        buffer.push(next);
        if (buffer.length > 20) buffer.shift();
        return { impulseRates: [...buffer] };
      },
    };
  }

  private static buildSurfaceNodeData(
    base: WorkspaceNodeData
  ): WorkspaceNodeData {
    const buffer: number[] = Array.from({ length: 20 }, () =>
      Number((10 + Math.random() * 5).toFixed(2))
    );

    return {
      ...base,
      stats: {
        impulseRates: [...buffer],
        inputCount: Math.floor(Math.random() * 4) + 1,
        agentCount: Math.floor(Math.random() * 3) + 1,
        lastSignalAt: `${Math.floor(Math.random() * 60)}s ago`,
      },
      getStats: async () => {
        const next = Number((10 + Math.random() * 5).toFixed(2));
        buffer.push(next);
        if (buffer.length > 20) buffer.shift();

        return {
          impulseRates: [...buffer],
          inputCount: Math.floor(Math.random() * 4) + 1,
          agentCount: Math.floor(Math.random() * 3) + 1,
          lastSignalAt: `${Math.floor(Math.random() * 60)}s ago`,
        };
      },
    };
  }
}
