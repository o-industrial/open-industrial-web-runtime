import { Edge, Node, XYPosition } from 'reactflow';
import { GraphStateManager } from './GraphStateManager.ts';
import { SelectionManager } from './SelectionManager.ts';
import { PresetManager } from './PresetManager.ts';
import { FlowNodeData } from '../types/react/FlowNodeData.ts';
import { StatManager } from './StatManager.ts';
import { FlowGraphNode } from '../types/graph/FlowGraphNode.ts';
import { FlowGraphEdge } from '../types/graph/FlowGraphEdge.ts';

export class InteractionManager {
  private refreshCallback: (() => void) | null = null;

  constructor(
    private graph: GraphStateManager,
    private selection: SelectionManager,
    private presets: PresetManager,
    private stats: StatManager
  ) {}

  public HandleDrop(
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
          x: position.x - surfaceParent.position.x,
          y: position.y - surfaceParent.position.y,
        }
      : position;

    const preset = this.presets.GetPreset(type)!;

    // === Canonical FlowGraph Node
    const newGraphNode: FlowGraphNode = {
      ID: id,
      Type: type as FlowGraphNode['Type'],
      Label: preset.Label,
      Metadata: {
        Position: { X: relativePosition.x, Y: relativePosition.y },
        Enabled: true,
      },
      Details: {
        Name: preset.Label,
      },
    };

    this.graph.AddNode(newGraphNode);

    // === View Node for immediate hydration
    const enriched: FlowNodeData = this.stats.Enrich(type, {
      type,
      label: preset.Label,
      iconKey: preset.IconKey,
      enabled: true,
      details: newGraphNode.Details ?? {},
      onDoubleClick: () => {
        this.selection.SelectNode(id);
        this.refreshCallback?.();
      },
    });

    const reactNode: Node<FlowNodeData> = {
      id,
      type,
      position: relativePosition,
      data: enriched,
      ...(surfaceParent && {
        parentId: surfaceParent.id,
        extent: 'parent',
      }),
    };

    this.selection.SelectNode(id);

    return { newNode: reactNode, selectedId: id };
  }

  public ConnectNodes(source: string, target: string): void {
    const edgeId = `${source}->${target}`;
    if (!this.graph.HasEdge(edgeId)) {
      const edge: FlowGraphEdge = {
        ID: edgeId,
        Source: source,
        Target: target,
        Label: '', // Optional: fill in label later
      };
      this.graph.AddEdge(edge);
    }
  }

  public SetRefreshHandler(refresh: () => void) {
    this.refreshCallback = refresh;
  }
}
