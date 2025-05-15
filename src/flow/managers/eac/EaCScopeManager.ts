import {
  applyNodeChanges,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from 'reactflow';
import { OpenIndustrialEaC } from '../../../types/OpenIndustrialEaC.ts';
import { FlowGraph } from '../../types/graph/FlowGraph.ts';
import { GraphStateManager } from '../GraphStateManager.ts';
import { FlowPosition } from '../../types/graph/FlowPosition.ts';
import { PresetManager } from '../PresetManager.ts';
import { EaCNodeInspectorManager } from './EaCNodeInspectorManager.ts';
import { merge, NullableArrayOrObject } from '@fathym/common';
import { FlowNodeData } from '../../types/react/FlowNodeData.ts';
import { EaCFlowNodeMetadata } from '@o-industrial/common/eac';
import { EaCVertexDetails } from '@fathym/eac';
import { SimulatorDefinition } from '../SimulatorLibraryManager.ts';

/**
 * Abstract base for scoped EaC logic (workspace, surface, etc.).
 * Handles flow derivation and relationship management.
 */
export abstract class EaCScopeManager {
  constructor(
    protected graph: GraphStateManager,
    protected presets: PresetManager,
    protected inspector: EaCNodeInspectorManager
  ) {}

  /**
   * Build the graph (nodes + edges) for this scope.
   */
  public abstract BuildGraph(eac: OpenIndustrialEaC): FlowGraph;

  public BuildPartialForNodeUpdate(
    id: string,
    patch: Partial<{
      Details: EaCVertexDetails;
      Metadata: Partial<EaCFlowNodeMetadata>;
    }>
  ): Partial<OpenIndustrialEaC> | null {
    return this.inspector.BuildPartialForNodeUpdate(id, patch);
  }

  public BuildPartialForNodeDelete(
    id: string
  ): NullableArrayOrObject<OpenIndustrialEaC> | null {
    return this.inspector.BuildPartialForNodeDelete(id);
  }

  /**
   * Construct a partial EaC update from a valid connection.
   */
  public abstract CreateConnectionEdge(
    eac: OpenIndustrialEaC,
    source: string,
    target: string
  ): Partial<OpenIndustrialEaC> | null;

  /**
   * Construct a partial EaC update from a preset.
   */
  public abstract CreatePartialEaCFromPreset(
    type: string,
    id: string,
    position: FlowPosition
  ): Partial<OpenIndustrialEaC>;

  public GetNodeAsCode(id: string): {
    Metadata?: EaCFlowNodeMetadata;
    Details: EaCVertexDetails;
  } | null {
    return this.inspector.GetNodeAsCode(id);
  }

  /**
   * Check if an edge already exists between two nodes in the current graph.
   */
  public abstract HasConnection(source: string, target: string): boolean;

  public InstallSimulators(
    _simDefs: SimulatorDefinition[]
  ): Partial<OpenIndustrialEaC> {
    throw new Deno.errors.NotSupported(
      `InstallSimulators is not supported in scope ${this.constructor.name}`
    );
  }

  /**
   * Reverse an existing edge into a partial EaC delete/update payload.
   */
  public abstract RemoveConnectionEdge(
    eac: OpenIndustrialEaC,
    edgeId: string
  ): Partial<OpenIndustrialEaC> | null;

  /**
   * Optionally implement edge diffing logic.
   */
  public abstract UpdateConnections(
    changes: EdgeChange[],
    edges: Edge[],
    eac: OpenIndustrialEaC
  ): OpenIndustrialEaC | null;

  public UpdateNodesFromChanges(
    changes: NodeChange[],
    currentNodes: Node<FlowNodeData>[],
    _eac: OpenIndustrialEaC
  ): Partial<OpenIndustrialEaC> | null {
    const updated = applyNodeChanges(changes, currentNodes);

    let partial: Partial<OpenIndustrialEaC> = {};
    let modified = false;

    for (const node of updated) {
      const pos = { X: node.position.x, Y: node.position.y };
      const asCode = this.findAsCode(node);

      if (!asCode) continue;

      const prev = asCode.AsCode.Metadata?.Position;
      const changed = !prev || prev.X !== pos.X || prev.Y !== pos.Y;
      if (!changed) continue;

      debugger;
      const update = this.inspector.BuildPartialForNodeUpdate(node.id, {
        Metadata: {
          ...asCode.AsCode.Metadata,
          Position: pos,
        },
      });

      if (!update) continue;

      partial = merge(partial, update);
      modified = true;
    }

    return modified ? partial : null;
  }

  protected findAsCode(node: Node<FlowNodeData>) {
    return this.inspector.FindAsCode({
      ID: node.id,
      Type: node.type!,
    });
  }
}
