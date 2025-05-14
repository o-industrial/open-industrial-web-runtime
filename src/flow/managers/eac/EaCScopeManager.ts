import { Edge, EdgeChange } from 'reactflow';
import { OpenIndustrialEaC } from '../../../types/OpenIndustrialEaC.ts';
import { FlowGraph } from '../../types/graph/FlowGraph.ts';
import { GraphStateManager } from '../GraphStateManager.ts';
import { FlowPosition } from '../../types/graph/FlowPosition.ts';
import { PresetManager } from '../PresetManager.ts';

/**
 * Abstract base for scoped EaC logic (workspace, surface, etc.).
 * Handles flow derivation and relationship management.
 */
export abstract class EaCScopeManager {
  constructor(protected graph: GraphStateManager, protected presets: PresetManager) {}

  /**
   * Build the graph (nodes + edges) for this scope.
   */
  abstract BuildGraph(eac: OpenIndustrialEaC): FlowGraph;

  /**
   * Construct a partial EaC update from a valid connection.
   */
  abstract CreateConnectionEdge(
    eac: OpenIndustrialEaC,
    source: string,
    target: string,
  ): Partial<OpenIndustrialEaC> | null;

  /**
   * Construct a partial EaC update from a preset.
   */
  abstract CreatePartialEaCFromPreset(
    type: string,
    id: string,
    position: FlowPosition,
  ): Partial<OpenIndustrialEaC>;

  /**
   * Check if an edge already exists between two nodes in the current graph.
   */
  abstract HasConnection(source: string, target: string): boolean;

  /**
   * Reverse an existing edge into a partial EaC delete/update payload.
   */
  abstract RemoveConnectionEdge(
    eac: OpenIndustrialEaC,
    edgeId: string,
  ): Partial<OpenIndustrialEaC> | null;

  /**
   * Optionally implement edge diffing logic.
   */
  abstract UpdateConnections(
    changes: EdgeChange[],
    edges: Edge[],
    eac: OpenIndustrialEaC,
  ): OpenIndustrialEaC | null;
}
