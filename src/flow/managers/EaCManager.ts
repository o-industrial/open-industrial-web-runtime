import { merge } from '@fathym/common';
import { Node, Edge, EdgeChange } from 'reactflow';

import { NodeScopeTypes } from '../types/graph/NodeScopeTypes.ts';
import { OpenIndustrialEaC } from '../../types/OpenIndustrialEaC.ts';
import { GraphStateManager } from './GraphStateManager.ts';
import { FlowGraph } from '../types/graph/FlowGraph.ts';
import { FlowGraphNode } from '../types/graph/FlowGraphNode.ts';
import { Position } from '../../types/Position.ts';
import { PresetManager } from './PresetManager.ts';
import { FlowNodeData } from '../types/react/FlowNodeData.ts';

/**
 * Canonical manager for synchronizing Everything-as-Code (EaC) state
 * with derived flow graph topology. All mutations flow through this
 * class to ensure source-of-truth consistency and downstream reactivity.
 *
 * EaCManager acts as the runtime boundary between user input
 * (e.g. drag, connect, mutate) and internal state transformation
 * into versioned, deployable system memory.
 */
export abstract class EaCManager {
  constructor(
    protected eac: OpenIndustrialEaC,
    protected scope: NodeScopeTypes,
    protected graph: GraphStateManager,
    protected presets: PresetManager
  ) {
    const initialGraph = this.buildGraph(this.eac);
    this.graph.LoadFromGraph(initialGraph);
  }

  /**
   * Creates a new EaC-backed node using a known preset type.
   * This inserts the partial structure into EaC and updates the graph.
   *
   * @param type The preset type to create (e.g. 'surface', 'simulator')
   * @param position The initial X/Y canvas position for the node
   * @param parentId Optional parent surface ID for scoping
   * @returns The fully initialized and hydrated FlowGraphNode
   */
  public CreateNodeFromPreset(
    type: string,
    position: Position,
    parentId?: string
  ): FlowGraphNode {
    const id = `${type}-${Date.now()}`;

    const partial = this.presets.CreatePartialEaCFromPreset(
      type,
      id,
      position,
      parentId
    );

    this.MergePartial(partial);

    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);

    if (!node) {
      throw new Error(`Failed to locate node after create: ${id}`);
    }

    return node;
  }

  /**
   * Handles a user-initiated connection from source → target node.
   * Must be implemented by subclass to update the appropriate EaC structure.
   *
   * @param source ID of the source node
   * @param target ID of the target node
   * @returns Partial EaC update (if applicable), or null if no change
   */
  public abstract CreateConnectionEdge(
    source: string,
    target: string
  ): Partial<OpenIndustrialEaC> | null;

  /**
   * Merges a partial EaC structure into the canonical model.
   * Triggers full graph rebuild if any structural change occurred.
   *
   * @param partial The incoming update to be merged
   */
  public MergePartial(partial: OpenIndustrialEaC): void {
    console.log('🔧 MergePartial called with:', partial);

    const { updated, changed } = this.merge(partial);

    console.log('📊 EaC merge result:', { changed });

    if (changed) {
      console.log('♻️ Rebuilding graph due to structural change');
      const rebuiltGraph = this.buildGraph(updated);
      this.graph.LoadFromGraph(rebuiltGraph);
    } else {
      console.log('✅ No graph rebuild needed — structure unchanged');
    }
  }

  /**
   * Called after drag/move or other node UI changes.
   * Applies updated X/Y positions to backing EaC nodes.
   *
   * @param nodes The updated ReactFlow node list
   */
  public UpdateNodePositionsFromReactFlow(nodes: Node<FlowNodeData>[]): void {
    for (const node of nodes) {
      this.updateNodePosition(node.id, {
        X: node.position.x,
        Y: node.position.y,
      });
    }
  }

  /**
   * Called after edge add/remove/update in the ReactFlow view.
   * Currently a no-op. Can be extended by subclasses as needed.
   *
   * @param edges The updated ReactFlow edge list
   */
  public UpdateEdgesFromReactFlow(
    changes: EdgeChange[],
    updated: Edge[]
  ): void {
    this.updateConnections(changes, updated);
  }

  /**
   * Returns the current mutable runtime EaC snapshot.
   */
  public GetEaC(): OpenIndustrialEaC {
    return this.eac;
  }

  /**
   * Performs deep merge of new EaC input and returns
   * both the updated result and whether a structural change occurred.
   *
   * @param newEaC Partial or full EaC structure to apply
   */
  protected merge(newEaC: OpenIndustrialEaC): {
    updated: OpenIndustrialEaC;
    changed: boolean;
  } {
    const updated = merge<OpenIndustrialEaC>(this.eac, newEaC);
    const changed = JSON.stringify(this.eac) !== JSON.stringify(updated);
    this.eac = updated;
    return { updated, changed };
  }

  /**
   * Subclass hook to retranslate EaC into FlowGraph format.
   * Called automatically after MergePartial changes structure.
   */
  protected abstract buildGraph(eac: OpenIndustrialEaC): FlowGraph;

  /**
   * Updates the `.Metadata.Position` of a given FlowGraphNode by ID.
   * Does not emit a graph changed event — assumes batch update.
   *
   * @param nodeId ID of node to update
   * @param position Canvas position to apply
   */
  protected updateNodePosition(nodeId: string, position: Position): void {
    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === nodeId);
    if (!node) {
      console.warn(`⚠️ updateNodePosition → Node not found: ${nodeId}`);
      return;
    }

    node.Metadata = node.Metadata || {};
    node.Metadata.Position = position;
  }

  /**
   * Updates connections in the graph after edge changes.
   * No-op by default. Subclasses may override.
   *
   * @param edges Full edge list from ReactFlow
   */
  protected abstract updateConnections(
    changes: EdgeChange[],
    updated: Edge[]
  ): void;
}
