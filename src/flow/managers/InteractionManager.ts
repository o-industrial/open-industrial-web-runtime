import { Node, XYPosition } from 'reactflow';

import { SelectionManager } from './SelectionManager.ts';
import { PresetManager } from './PresetManager.ts';
import { FlowNodeData } from '../types/react/FlowNodeData.ts';
import { StatManager } from './StatManager.ts';
import { EaCManager } from './EaCManager.ts';

export class InteractionManager {
  private refreshCallback: (() => void) | null = null;

  constructor(
    private selection: SelectionManager,
    private presets: PresetManager,
    private stats: StatManager,
    private eacMgr: EaCManager
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

    const relativePosition = surfaceParent
      ? {
          x: position.x - surfaceParent.position.x,
          y: position.y - surfaceParent.position.y,
        }
      : position;

    const newGraphNode = this.eacMgr.CreateNodeFromPreset(
      type,
      { X: relativePosition.x, Y: relativePosition.y },
      surfaceParent?.id
    );

    const preset = this.presets.GetPreset(type)!;

    const enriched: FlowNodeData = this.stats.Enrich(type, {
      type,
      label: preset.Label,
      iconKey: preset.IconKey,
      enabled: true,
      details: newGraphNode.Details ?? {},
      onDoubleClick: () => {
        this.selection.SelectNode(newGraphNode.ID);
        this.refreshCallback?.();
      },
    });

    const reactNode: Node<FlowNodeData> = {
      id: newGraphNode.ID,
      type,
      position: relativePosition,
      data: enriched,
      ...(surfaceParent && {
        parentId: surfaceParent.id,
        extent: 'parent',
      }),
    };

    this.selection.SelectNode(newGraphNode.ID);

    return { newNode: reactNode, selectedId: newGraphNode.ID };
  }

  public ConnectNodes(source: string, target: string): void {
    this.eacMgr.CreateConnectionEdge(source, target);
  }

  public SetRefreshHandler(refresh: () => void) {
    this.refreshCallback = refresh;
  }
}
