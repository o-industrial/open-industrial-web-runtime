import { XYPosition, Node, Edge } from 'reactflow';
import { GraphStateManager } from './GraphStateManager.ts';
import { SelectionManager } from './SelectionManager.ts';
import { PresetManager } from './PresetManager.ts';
import { FlowNodeData } from './FlowNodeData.ts';

export class InteractionManager {
  constructor(
    private graph: GraphStateManager,
    private selection: SelectionManager,
    private presets: PresetManager
  ) {}

  HandleDrop(
    event: DragEvent,
    nodes: Node<FlowNodeData>[],
    screenToFlowPosition: (p: XYPosition) => XYPosition
  ): { newNode: Node<FlowNodeData>; selectedId: string } | null {
    event.preventDefault();

    const type = event.dataTransfer?.getData('application/node-type');
    if (!type || !this.presets.GetPreset(type)) return null;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

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

    const scope = surfaceParent ? 'surface' : 'workspace';
    if (!this.presets.IsTypeAllowedInScope(type, scope)) {
      console.warn(`Node type "${type}" not allowed in scope "${scope}".`);
      return null;
    }

    const id = `${type}-${Date.now()}`;
    const relativePosition = surfaceParent
      ? {
          x: position.x - (surfaceParent.position.x ?? 0),
          y: position.y - (surfaceParent.position.y ?? 0),
        }
      : position;

    const preset = this.presets.GetPreset(type)!;
    const newNode: Node<FlowNodeData> = {
      id,
      type: preset.Type,
      position: relativePosition,
      data: {
        type: preset.Type,
        label: preset.Label,
        iconKey: preset.IconKey,
        isSelected: false,
        childNodeIds: [],
      },
      ...(surfaceParent && {
        parentId: surfaceParent.id,
        extent: 'parent',
      }),
    };

    this.graph.AddNode(newNode);
    this.selection.SelectNode(id);

    return { newNode, selectedId: id };
  }

  ConnectNodes(source: string, target: string): void {
    const edgeId = `e-${source}-${target}`;
    if (!this.graph.HasEdge(edgeId)) {
      const edge: Edge = {
        id: edgeId,
        source,
        target,
      };
      this.graph.AddEdge(edge);
    }
  }
}
