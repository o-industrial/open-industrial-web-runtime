import { jsonMapSetClone, merge } from '@fathym/common';
import {
  Node,
  Edge,
  EdgeChange,
  NodeChange,
  applyNodeChanges,
} from 'reactflow';
import { NodeScopeTypes } from '../types/graph/NodeScopeTypes.ts';
import { OpenIndustrialEaC } from '../../types/OpenIndustrialEaC.ts';
import { GraphStateManager } from './GraphStateManager.ts';
import { FlowGraph } from '../types/graph/FlowGraph.ts';
import { FlowGraphNode } from '../types/graph/FlowGraphNode.ts';
import { Position } from '../../types/Position.ts';
import { PresetManager } from './PresetManager.ts';
import { FlowNodeData } from '../types/react/FlowNodeData.ts';
import { EaCFlowNodeMetadata } from '../../eac/EaCFlowNodeMetadata.ts';
import { SimulatorDefinition } from './SimulatorLibraryManager.ts';
import { EaCAzureDockerSimulatorDetails } from '../../eac/EaCAzureDockerSimulatorDetails.ts';
import { EaCVertexDetails } from '@fathym/eac';

/**
 * Canonical manager for synchronizing Everything-as-Code (EaC) state
 * with derived flow graph topology. All mutations flow through this
 * class to ensure source-of-truth consistency and downstream reactivity.
 */
export abstract class EaCManager {
  constructor(
    protected eac: OpenIndustrialEaC,
    protected scope: NodeScopeTypes,
    protected graph: GraphStateManager,
    protected presets: PresetManager
  ) {
    const initialGraph = this.buildGraph(jsonMapSetClone(this.eac));
    this.graph.LoadFromGraph(initialGraph);
  }

  public ApplyReactFlowNodeChanges(
    changes: NodeChange[],
    currentNodes: Node<FlowNodeData>[]
  ): void {
    console.log(`[EaC] 🧩 Applying ${changes.length} node changes`);

    const updated = applyNodeChanges(changes, currentNodes);
    const partial: OpenIndustrialEaC = {};
    let modified = false;

    for (const node of updated) {
      const pos: Position = { X: node.position.x, Y: node.position.y };
      const result = this.findEaCAsCode(node.id, node.type!);
      if (!result) continue;

      const { Type, ID, AsCode } = result;
      const prev = AsCode.Metadata?.Position;

      const changed = !prev || prev.X !== pos.X || prev.Y !== pos.Y;
      if (!changed) continue;

      const key = this.getEaCKeyForType(Type);

      partial[key] ??= {};

      (partial[key] as Record<string, unknown>)[ID] = {
        Metadata: {
          ...AsCode.Metadata,
          Position: pos,
        },
        Details: {},
      };

      console.log(`✏️ [EaC] Updating position of ${Type}:${ID} →`, pos);
      modified = true;
    }

    if (modified) {
      this.MergePartial(partial);
    } else {
      console.log(`🛑 [EaC] No position changes detected`);
    }
  }

  public ApplyReactFlowEdgeChanges(
    changes: EdgeChange[],
    currentEdges: Edge[]
  ): void {
    console.log(`[EaC] 🔗 Applying ${changes.length} edge changes`);

    const partial = this.updateConnections(changes, currentEdges);

    if (partial) {
      console.log(`✅ [EaC] Connections changed — merging updated connections`);
      this.MergePartial(partial);
    } else {
      console.log(`🛑 [EaC] No connection changes detected`);
    }
  }

  public abstract CreateConnectionEdge(
    source: string,
    target: string
  ): Partial<OpenIndustrialEaC> | null;

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
    if (!node) throw new Error(`Failed to locate node after create: ${id}`);

    return node;
  }

  public GetEaC(): OpenIndustrialEaC {
    return jsonMapSetClone(this.eac);
  }

  public GetDetailsForNode(id: string): EaCVertexDetails | null {
    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);

    if (!node) {
      console.warn(`[Inspector] No matching node in graph for ID: ${id}`);
      return null;
    }

    const result = this.findEaCAsCode(node.ID, node.Type);

    return result?.AsCode?.Details ?? null;
  }

  public GetMetadataForNode(id: string): EaCFlowNodeMetadata | null {
    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);
  
    if (!node) {
      console.warn(`[Inspector] No matching node in graph for ID: ${id}`);
      return null;
    }
  
    const result = this.findEaCAsCode(node.ID, node.Type);
  
    return result?.AsCode?.Metadata ?? null;
  }
  
  public InstallSimulators(simDefs: SimulatorDefinition[]): void {
    const partial: OpenIndustrialEaC = {
      Simulators: {},
    };

    for (const sim of simDefs) {
      partial.Simulators![sim.ID] = {
        Details: {
          Type: 'AzureDocker',
          Name: sim.Label,
          Description: sim.Description,
        } as EaCAzureDockerSimulatorDetails,
        // Metadata: {
        //   Position: { X: 100, Y: 100 },
        // },
      };
    }

    this.MergePartial(partial);
  }

  public MergePartial(partial: OpenIndustrialEaC): void {
    console.log('🔧 MergePartial called with:', partial);

    const { updated, changed } = this.merge(partial);
    console.log('📊 EaC merge result:', { changed });

    if (changed) {
      console.log('♻️ Rebuilding graph due to structural change');
      const rebuilt = this.buildGraph(jsonMapSetClone(updated));
      this.graph.LoadFromGraph(rebuilt);
    } else {
      console.log('✅ No graph rebuild needed — structure unchanged');
    }
  }

  public UpdateDetailsForNode(id: string, next: EaCVertexDetails): void {
    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);
    if (!node) {
      console.warn(`[Inspector] No matching node in graph for ID: ${id}`);
      return;
    }

    const type = node.Type;
    const current = this.findEaCAsCode(id, type);
    if (!current) return;

    const prevDetails = current.AsCode.Details ?? {};
    const merged = { ...prevDetails, ...next };

    const changed = JSON.stringify(prevDetails) !== JSON.stringify(merged);
    if (!changed) {
      console.log(`[Inspector] No detail changes for node: ${id}`);
      return;
    }

    const partial: OpenIndustrialEaC = {
      [this.getEaCKeyForType(type)]: {
        [id]: {
          Details: merged,
        },
      },
    };

    console.log(`✏️ [Inspector] Merging updated Details for ${id} →`, merged);

    this.MergePartial(partial);
  }

  public UpdateMetadataForNode(id: string, metadata: Partial<EaCFlowNodeMetadata>): void {
    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);
    if (!node) {
      console.warn(`[EaC] No graph node found for ID: ${id}`);
      return;
    }
  
    const type = node.Type;
    const current = this.findEaCAsCode(id, type);
    if (!current) {
      console.warn(`[EaC] No matching EaC entry for ${type}:${id}`);
      return;
    }
  
    const prevMeta = current.AsCode.Metadata ?? {};
    const mergedMeta = { ...prevMeta, ...metadata };
  
    const changed = JSON.stringify(prevMeta) !== JSON.stringify(mergedMeta);
    if (!changed) {
      console.log(`[EaC] No metadata change for ${id}`);
      return;
    }
  
    const partial: OpenIndustrialEaC = {
      [this.getEaCKeyForType(type)]: {
        [id]: {
          Metadata: mergedMeta,
          Details: {},
        },
      },
    };
  
    console.log(`✏️ [EaC] Merging updated Metadata for ${id} →`, mergedMeta);
  
    this.MergePartial(partial);
  }

  protected findEaCAsCode(
    nodeId: string,
    type: string
  ):
    | {
        Type: string;
        ID: string;
        AsCode: { Metadata?: EaCFlowNodeMetadata; Details: EaCVertexDetails };
      }
    | undefined {
    const id = nodeId;

    let asCode:
      | { Metadata?: EaCFlowNodeMetadata; Details?: EaCVertexDetails }
      | undefined;

    switch (type) {
      case 'agent':
        asCode = this.eac.Agents?.[id];
        break;
      case 'connection':
        asCode = this.eac.DataConnections?.[id];
        break;
      case 'schema':
        asCode = this.eac.Schemas?.[id];
        break;
      case 'simulator':
        asCode = this.eac.Simulators?.[id];
        break;
      case 'surface':
        asCode = this.eac.Surfaces?.[id];
        break;
    }

    if (!asCode) {
      console.warn(`⚠️ [EaC] Unable to find EaC entry for nodeId: ${nodeId}`);
      return undefined;
    }

    const clone = jsonMapSetClone(asCode);

    // Ensure required fields exist
    clone.Metadata ??= {};
    clone.Details ??= {};

    // TypeScript: trust us — we ensured Details is now present
    return {
      Type: type,
      ID: id,
      AsCode: clone as {
        Metadata?: EaCFlowNodeMetadata;
        Details: EaCVertexDetails;
      },
    };
  }

  protected merge(newEaC: OpenIndustrialEaC): {
    updated: OpenIndustrialEaC;
    changed: boolean;
  } {
    const updated = merge<OpenIndustrialEaC>(this.eac, newEaC);
    const changed = JSON.stringify(this.eac) !== JSON.stringify(updated);
    this.eac = updated;
    return { updated, changed };
  }

  protected abstract buildGraph(eac: OpenIndustrialEaC): FlowGraph;

  protected getEaCKeyForType(type: string): keyof OpenIndustrialEaC {
    switch (type) {
      case 'agent':
        return 'Agents';
      case 'connection':
        return 'DataConnections';
      case 'schema':
        return 'Schemas';
      case 'simulator':
        return 'Simulators';
      case 'surface':
        return 'Surfaces';
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  }

  protected abstract updateConnections(
    changes: EdgeChange[],
    updated: Edge[]
  ): OpenIndustrialEaC | null;
}
