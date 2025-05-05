import {
  Node,
  XYPosition,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  Edge,
} from 'reactflow';

import { SelectionManager } from './SelectionManager.ts';
import { PresetManager } from './PresetManager.ts';
import { FlowNodeData } from '../types/react/FlowNodeData.ts';
import { StatManager } from './StatManager.ts';
import { EaCManager } from './EaCManager.ts';
import { GraphStateManager } from './GraphStateManager.ts';

export class InteractionManager {
  private refreshCallback: (() => void) | null = null;
  private debounceNodeTimeout?: number;
  private debounceEdgeTimeout?: number;

  constructor(
    private selection: SelectionManager,
    private presets: PresetManager,
    private stats: StatManager,
    private eacMgr: EaCManager,
    private graphMgr: GraphStateManager
  ) {}

  /**
   * Handles a node drop on the canvas, resolving scope, position,
   * and instantiating the node in the graph and EaC structure.
   */
  public HandleDrop(
    event: DragEvent,
    nodes: Node<FlowNodeData>[],
    screenToFlowPosition: (p: XYPosition) => XYPosition
  ): { newNode: Node<FlowNodeData>; selectedId: string } | null {
    event.preventDefault();

    const type = event.dataTransfer?.getData('application/node-type');
    if (!type || !this.presets.GetPreset(type)) {
      console.warn(`[Drop] Aborted — unknown or missing node type: ${type}`);
      return null;
    }

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
      console.warn(`[Drop] Disallowed node type: ${type} in scope: ${scope}`);
      return null;
    }

    const relativePosition = surfaceParent
      ? {
          x: position.x - surfaceParent.position.x,
          y: position.y - surfaceParent.position.y,
        }
      : position;

    console.log(`[Drop] Creating node of type: ${type} at`, {
      screen: { x: event.clientX, y: event.clientY },
      flow: position,
      relative: relativePosition,
      scope,
      parent: surfaceParent?.id,
    });

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

    console.log(`[Drop] Node created with ID: ${newGraphNode.ID}`);

    this.selection.SelectNode(newGraphNode.ID);

    return { newNode: reactNode, selectedId: newGraphNode.ID };
  }

  /**
   * Handles a connection action between two nodes.
   * Creates a new edge in the runtime graph via EaCManager.
   */
  public ConnectNodes(source: string, target: string): void {
    console.log(`[Connect] Source: ${source} → Target: ${target}`);
    this.eacMgr.CreateConnectionEdge(source, target);
  }

  /**
   * Stores an optional callback to be triggered on UI refresh events.
   */
  public SetRefreshHandler(refresh: () => void) {
    this.refreshCallback = refresh;
    console.log(`[Init] Refresh handler registered`);
  }

  /**
   * Applies node changes from ReactFlow → updates GraphStateManager immediately
   * → debounces propagation to EaC (batch write of positions).
   */
  public OnNodesChange(
    changes: NodeChange[],
    currentNodes: Node<FlowNodeData>[]
  ): void {
    console.log(`[NodeChange] Received ${changes.length} changes`, changes);

    const updated = this.graphMgr.ApplyNodesChange(changes, currentNodes);

    this.eacMgr.UpdateNodePositionsFromReactFlow(updated);
  }

  /**
   * Applies edge changes from ReactFlow → updates GraphStateManager immediately
   * → debounces propagation to EaC (rebuild relationships).
   */
  public OnEdgesChange(changes: EdgeChange[], currentEdges: Edge[]): void {
    console.log(`[EdgeChange] Received ${changes.length} changes`, changes);

    const updated = this.graphMgr.ApplyEdgesChange(changes, currentEdges);

    this.eacMgr.UpdateEdgesFromReactFlow(changes, updated);
  }
}
