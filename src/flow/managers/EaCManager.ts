import { jsonMapSetClone, merge, NullableArrayOrObject } from '@fathym/common';
import { applyNodeChanges, Edge, EdgeChange, Node, NodeChange } from 'reactflow';

import { HistoryManager } from './HistoryManager.ts';
import { PresetManager } from './PresetManager.ts';
import { GraphStateManager } from './GraphStateManager.ts';
import { FlowNodeData } from '../types/react/FlowNodeData.ts';
import { SimulatorDefinition } from './SimulatorLibraryManager.ts';
import { FlowGraph } from '../types/graph/FlowGraph.ts';
import { FlowGraphNode } from '../types/graph/FlowGraphNode.ts';
import { OpenIndustrialEaC } from '../../types/OpenIndustrialEaC.ts';
import { Position } from '../../types/Position.ts';
import { NodeScopeTypes } from '../types/graph/NodeScopeTypes.ts';
import { EaCAzureDockerSimulatorDetails, EaCFlowNodeMetadata } from '@o-industrial/common/eac';
import { EaCHistorySnapshot } from '@o-industrial/common/types';
import { EaCEnterpriseDetails, EaCVertexDetails } from '@fathym/eac';

import { EaCNodeInspectorManager } from './eac/EaCNodeInspectorManager.ts';
import { EaCDiffManager } from './eac/EaCDiffManager.ts';
import { WorkspaceSummary } from '../../types/WorkspaceSummary.ts';
import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
import { EaCStatus } from '@fathym/eac/steward/status';

/**
 * Base manager for Everything-as-Code state. This class is the canonical interface for
 * runtime graph manipulation, EaC diffs, node metadata/detail access, and interaction with presets.
 *
 * All subclass implementations (e.g., workspace, surface) are responsible for defining
 * graph derivation and connection interpretation.
 */
export abstract class EaCManager {
  protected deleteEaC: NullableArrayOrObject<OpenIndustrialEaC> = {};
  protected changeListeners = new Set<() => void>();

  protected inspector: EaCNodeInspectorManager;
  protected diff: EaCDiffManager;

  constructor(
    protected eac: OpenIndustrialEaC,
    protected oiSvc: OpenIndustrialAPIClient,
    protected scope: NodeScopeTypes,
    protected graph: GraphStateManager,
    protected presets: PresetManager,
    protected history: HistoryManager,
  ) {
    this.inspector = new EaCNodeInspectorManager(graph, () => this.eac);
    this.diff = new EaCDiffManager(history, this.emitEaCChanged.bind(this));

    const initialGraph = this.buildGraph(jsonMapSetClone(this.eac));
    this.graph.LoadFromGraph(initialGraph);
  }

  public ApplyReactFlowNodeChanges(
    changes: NodeChange[],
    currentNodes: Node<FlowNodeData>[],
  ): void {
    const updated = applyNodeChanges(changes, currentNodes);
    const partial: OpenIndustrialEaC = {};
    let modified = false;

    for (const node of updated) {
      const pos: Position = { X: node.position.x, Y: node.position.y };
      const asCode = this.inspector.FindAsCode({
        Type: node.type!,
        ID: node.id,
      });
      if (!asCode) continue;

      const prev = asCode.AsCode.Metadata?.Position;
      const changed = !prev || prev.X !== pos.X || prev.Y !== pos.Y;
      if (!changed) continue;

      const key = this.getEaCKeyForType(asCode.Type);
      partial[key] ??= {};
      (partial[key] as Record<string, unknown>)[asCode.ID] = {
        Metadata: { ...asCode.AsCode.Metadata, Position: pos },
        Details: {},
      };

      modified = true;
    }

    if (modified) this.MergePartial(partial);
  }

  public ApplyReactFlowEdgeChanges(
    changes: EdgeChange[],
    currentEdges: Edge[],
  ): void {
    const partial = this.updateConnections(changes, currentEdges);
    if (partial) this.MergePartial(partial);
  }

  public async Archive(): Promise<void> {
    console.warn(
      `[EaCManager] Archive requested for current workspace: ${this.eac.EnterpriseLookup}`,
    );

    await this.oiSvc.Workspaces.Archive();

    // TODO(mcgear): Ensure that after archiving, any user with an archived EaC should get moved off of it...  Some how handle more centrally in ensuring sstandard EaC retrieval doesn't return archived intsances
  }

  public abstract CreateConnectionEdge(
    source: string,
    target: string,
  ): Partial<OpenIndustrialEaC> | null;

  public async Commit(history: EaCHistorySnapshot): Promise<EaCStatus> {
    const status = await this.oiSvc.Workspaces.Commit(history);

    console.log(`✅ Runtime committed: CommitID ${status.ID}`);

    return status;
  }

  public CreateNodeFromPreset(
    type: string,
    position: Position,
    parentId?: string,
  ): FlowGraphNode {
    const id = `${type}-${Date.now()}`;

    const partial = this.presets.CreatePartialEaCFromPreset(
      type,
      id,
      position,
      parentId,
    );

    this.MergePartial(partial);

    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);
    if (!node) throw new Error(`Failed to locate node after create: ${id}`);

    return node;
  }

  public DeleteNode(id: string): void {
    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);
    if (!node) return;

    const key = this.getEaCKeyForType(node.Type);
    const partial: OpenIndustrialEaC = {
      [key]: { [id]: null },
    } as OpenIndustrialEaC;

    this.MergeDelete(partial);

    const edges = this.graph
      .GetGraph()
      .Edges.filter((e) => e.Source === id || e.Target === id);

    if (edges.length) {
      const changes = edges.map((e) => ({ id: e.ID, type: 'remove' as const }));
      this.ApplyReactFlowEdgeChanges(changes, []);
    }
  }

  public GetEaC(): OpenIndustrialEaC {
    return jsonMapSetClone(this.eac);
  }

  public GetDetailsForNode(id: string): EaCVertexDetails | null {
    return this.inspector.GetDetails(id);
  }

  public GetMetadataForNode(id: string): EaCFlowNodeMetadata | null {
    return this.inspector.GetMetadata(id);
  }

  public InstallSimulators(simDefs: SimulatorDefinition[]): void {
    const partial: OpenIndustrialEaC = { Simulators: {} };

    for (const sim of simDefs) {
      partial.Simulators![sim.ID] = {
        Details: {
          Type: 'AzureDocker',
          Name: sim.Label,
          Description: sim.Description,
        } as EaCAzureDockerSimulatorDetails,
      };
    }

    this.MergePartial(partial);
  }

  public List(): WorkspaceSummary[] {
    return [
      {
        Lookup: this.eac.EnterpriseLookup!,
        Details: this.eac.Details!,
      },
    ];
  }

  public MergeDelete(partial: OpenIndustrialEaC): void {
    const result = this.diff.MergeDelete(this.eac, this.deleteEaC, partial);
    if (result.changed) {
      this.eac = result.updated;
      const rebuilt = this.buildGraph(jsonMapSetClone(this.eac));
      this.graph.LoadFromGraph(rebuilt);
    }
  }

  public MergePartial(partial: OpenIndustrialEaC): void {
    const result = this.diff.MergePartial(this.eac, this.deleteEaC, partial);
    if (result.changed) {
      this.eac = result.updated;
      const rebuilt = this.buildGraph(jsonMapSetClone(this.eac));
      this.graph.LoadFromGraph(rebuilt);
    }
  }

  public OnEaCChanged(cb: () => void): () => void {
    this.changeListeners.add(cb);
    return () => this.changeListeners.delete(cb);
  }

  public ResetFromSnapshot(snapshot: EaCHistorySnapshot): void {
    this.eac = jsonMapSetClone(snapshot.eac);
    this.deleteEaC = jsonMapSetClone(snapshot.deletes);

    const rebuilt = this.buildGraph(this.eac);
    this.graph.LoadFromGraph(rebuilt);

    this.emitEaCChanged();
  }

  public SwitchTo(lookup: string): void {
    console.warn(
      `[EaCManager] SwitchTo not implemented — requested: ${lookup}`,
    );
    // Placeholder logic
    location.reload();
  }

  public UpdateDetailsForNode(id: string, next: EaCVertexDetails): void {
    const prev = this.GetDetailsForNode(id);
    if (!prev) return;

    const merged = { ...prev, ...next };
    if (JSON.stringify(prev) === JSON.stringify(merged)) return;

    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);
    if (!node) return;

    const key = this.getEaCKeyForType(node.Type);
    const partial: OpenIndustrialEaC = {
      [key]: {
        [id]: {
          Details: merged,
        },
      },
    };

    this.MergePartial(partial);
  }

  public UpdateMetadataForNode(
    id: string,
    metadata: Partial<EaCFlowNodeMetadata>,
  ): void {
    const prev = this.GetMetadataForNode(id);
    if (!prev) return;

    const merged = merge(prev, metadata);
    if (JSON.stringify(prev) === JSON.stringify(merged)) return;

    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);
    if (!node) return;

    const key = this.getEaCKeyForType(node.Type);
    const partial: OpenIndustrialEaC = {
      [key]: {
        [id]: {
          Metadata: merged,
          Details: {},
        },
      },
    };

    this.MergePartial(partial);
  }

  public UpdateWorkspace(details: Partial<EaCEnterpriseDetails>): void {
    const merged = merge<EaCEnterpriseDetails>(this.eac.Details || {}, details);

    const changed = JSON.stringify(this.eac.Details) !== JSON.stringify(merged);

    if (!changed) return;

    const partial: OpenIndustrialEaC = {
      Details: merged,
    };

    this.MergePartial(partial);
  }

  protected abstract buildGraph(eac: OpenIndustrialEaC): FlowGraph;

  protected emitEaCChanged(): void {
    for (const cb of this.changeListeners) cb();
  }

  protected abstract updateConnections(
    changes: EdgeChange[],
    updated: Edge[],
  ): OpenIndustrialEaC | null;

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
}
