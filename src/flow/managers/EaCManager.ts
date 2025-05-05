import { merge } from '@fathym/common';
import { NodeScopeTypes } from '../types/graph/NodeScopeTypes.ts';
import { OpenIndustrialEaC } from '../../types/OpenIndustrialEaC.ts';
import { GraphStateManager } from './GraphStateManager.ts';
import { FlowGraph } from '../types/graph/FlowGraph.ts';
import { FlowGraphNode } from '../types/graph/FlowGraphNode.ts';
import { Position } from '../../types/Position.ts';
import { PresetManager } from './PresetManager.ts';

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
    // Initial full graph generation from the provided EaC
    const initialGraph = this.buildGraph(this.eac);
    this.graph.LoadFromGraph(initialGraph);
  }

  /**
   * Handle connection intent from source → target.
   * Each subclass determines how this maps to structured EaC relationships.
   *
   * If applicable, returns the applied EaC delta for traceability.
   *
   * @param source The source node ID
   * @param target The target node ID
   * @returns Partial EaC object that was merged, or null if no-op
   */
  public abstract CreateConnectionEdge(
    source: string,
    target: string
  ): Partial<OpenIndustrialEaC> | null;

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
   * Returns the current runtime EaC snapshot (mutable).
   * For safe consumption, use a frozen clone externally if needed.
   */
  public GetEaC(): OpenIndustrialEaC {
    return this.eac;
  }

  /**
   * Merges a partial EaC structure into the canonical model,
   * then triggers a full rebuild of the flow graph if structure changed.
   *
   * @param partial Partial EaC to apply (e.g. from a new node, edge, or update)
   */
  public MergePartial(partial: OpenIndustrialEaC): void {
    const { updated, changed } = this.merge(partial);

    if (changed) {
      const rebuiltGraph = this.buildGraph(updated);
      this.graph.LoadFromGraph(rebuiltGraph);
    }
  }

  /**
   * Each concrete manager must implement a full translation of EaC state
   * into the current canonical `FlowGraph` topology (nodes + edges).
   *
   * This is called automatically after any successful merge.
   */
  protected abstract buildGraph(eac: OpenIndustrialEaC): FlowGraph;

  /**
   * Performs deep merge of new EaC input and returns
   * both the updated result and whether a structural change occurred.
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
}
