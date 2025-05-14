import { jsonMapSetClone, merge, NullableArrayOrObject } from '@fathym/common';
import { applyNodeChanges, Edge, EdgeChange, Node, NodeChange } from 'reactflow';

import { HistoryManager } from './HistoryManager.ts';
import { PresetManager } from './PresetManager.ts';
import { GraphStateManager } from './GraphStateManager.ts';
import { FlowNodeData } from '../types/react/FlowNodeData.ts';
import { SimulatorDefinition } from './SimulatorLibraryManager.ts';
import { FlowGraphNode } from '../types/graph/FlowGraphNode.ts';
import { OpenIndustrialEaC } from '../../types/OpenIndustrialEaC.ts';
import { FlowPosition } from '../types/graph/FlowPosition.ts';
import { NodeScopeTypes } from '../types/graph/NodeScopeTypes.ts';
import { EaCAzureDockerSimulatorDetails, EaCFlowNodeMetadata } from '@o-industrial/common/eac';
import { EaCHistorySnapshot, Proposal, RecordKind } from '@o-industrial/common/types';
import { EaCEnterpriseDetails, EaCVertexDetails } from '@fathym/eac';

import { EaCNodeInspectorManager } from './eac/EaCNodeInspectorManager.ts';
import { EaCDiffManager } from './eac/EaCDiffManager.ts';
import { WorkspaceSummary } from '../../types/WorkspaceSummary.ts';
import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
import { EaCStatus } from '@fathym/eac/steward/status';

import { EaCWorkspaceScopeManager } from './eac/EaCWorkspaceScopeManager.ts';
import { EaCScopeManager } from './eac/EaCScopeManager.ts';
import { EaCSurfaceScopeManager } from './eac/EaCSurfaceScopeManager.ts';
import { EaCProposalManager } from './eac/EaCProposalManager.ts';
import { ProposalOverlayMode } from '../types/graph/ProposalOverlayMode.ts';

export class EaCManager {
  protected deleteEaC: NullableArrayOrObject<OpenIndustrialEaC> = {};
  protected changeListeners = new Set<() => void>();

  protected diff: EaCDiffManager;
  protected inspector: EaCNodeInspectorManager;
  protected proposals: EaCProposalManager;
  protected scopeMgr!: EaCScopeManager;

  protected overlayMode: ProposalOverlayMode = 'pending';

  constructor(
    protected eac: OpenIndustrialEaC,
    protected oiSvc: OpenIndustrialAPIClient,
    protected scope: NodeScopeTypes,
    protected graph: GraphStateManager,
    protected presets: PresetManager,
    protected history: HistoryManager,
  ) {
    this.diff = new EaCDiffManager(history, this.emitEaCChanged.bind(this));
    this.inspector = new EaCNodeInspectorManager(graph, () => this.eac);
    this.proposals = new EaCProposalManager(oiSvc, this);

    // 🔁 Currently hardcoded to workspace scope
    this.SwitchTo(scope, undefined);
  }

  public ApplyReactFlowNodeChanges(
    changes: NodeChange[],
    currentNodes: Node<FlowNodeData>[],
  ): void {
    console.log('🌀 ApplyReactFlowNodeChanges called');
    console.log('📥 Changes received:', changes);
    console.log('📦 Current nodes:', currentNodes);

    const updated = applyNodeChanges(changes, currentNodes);
    console.log('🔧 Nodes after applyNodeChanges:', updated);

    let partial: OpenIndustrialEaC = {};
    let modified = false;

    for (const node of updated) {
      const pos: FlowPosition = { X: node.position.x, Y: node.position.y };
      console.log(`📍 Evaluating node: ${node.id} at position`, pos);

      const asCode = this.inspector.FindAsCode({
        Type: node.type!,
        ID: node.id,
      });

      if (!asCode) {
        console.warn(`⚠️ No asCode found for node: ${node.id}`);
        continue;
      }

      const prev = asCode.AsCode.Metadata?.Position;
      const changed = !prev || prev.X !== pos.X || prev.Y !== pos.Y;
      console.log(`🔁 Previous position:`, prev);
      console.log(`📌 Position changed?`, changed);

      if (!changed) continue;

      const update = this.inspector.BuildPartialForNodeUpdate(node.id, {
        Metadata: {
          ...asCode.AsCode.Metadata,
          Position: { X: pos.X, Y: pos.Y },
        },
      });

      if (!update) {
        console.warn(
          `🚫 BuildPartialForNodeUpdate returned null for ${node.id}`,
        );
        continue;
      }

      console.log(`✅ Built partial for node ${node.id}:`, update);

      // Mutably accumulate the per-node patch into `partial`
      partial = merge(partial, update);
      modified = true;
    }

    if (modified) {
      console.log('📡 Merged final partial EaC:', partial);
      this.MergePartial(partial);
    } else {
      console.log('⛔ No node positions were changed — skipping merge');
    }
  }

  public ApplyReactFlowEdgeChanges(
    changes: EdgeChange[],
    currentEdges: Edge[],
  ): void {
    const partial = this.scopeMgr.UpdateConnections(
      changes,
      currentEdges,
      this.eac,
    );

    if (partial) this.MergePartial(partial);
  }

  public async Archive(): Promise<void> {
    await this.oiSvc.Workspaces.Archive();
  }

  public async Commit(history: EaCHistorySnapshot): Promise<EaCStatus> {
    const status = await this.oiSvc.Workspaces.Commit(history);
    console.log(`✅ Runtime committed: CommitID ${status.ID}`);
    return status;
  }

  public CreateConnectionEdge(source: string, target: string): void {
    const partial = this.scopeMgr.CreateConnectionEdge(
      this.eac,
      source,
      target,
    );

    if (partial) {
      this.MergePartial(partial);
    }
  }

  public CreateNodeFromPreset(
    type: string,
    position: FlowPosition,
  ): FlowGraphNode {
    const id = `${type}-${Date.now()}`;
    const partial = this.scopeMgr.CreatePartialEaCFromPreset(
      type,
      id,
      position,
    );
    this.MergePartial(partial);

    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);
    if (!node) throw new Error(`Failed to locate node after create: ${id}`);
    return node;
  }

  public DeleteNode(id: string): void {
    const partial = this.inspector.BuildPartialForNodeDelete(id);
    if (!partial) return;

    this.MergeDelete(partial);

    // const edges = this.graph
    //   .GetGraph()
    //   .Edges.filter((e) => e.Source === id || e.Target === id);

    // if (edges.length) {
    //   const changes = edges.map((e) => ({ id: e.ID, type: 'remove' as const }));
    //   this.ApplyReactFlowEdgeChanges(changes, []);
    // }
  }

  public GetDetailsForNode(id: string): EaCVertexDetails | null {
    return this.inspector.GetDetails(id);
  }

  public GetEaC(): OpenIndustrialEaC {
    return jsonMapSetClone(this.eac);
  }

  public GetMetadataForNode(id: string): EaCFlowNodeMetadata | null {
    return this.inspector.GetMetadata(id);
  }

  public HasConnection(source: string, target: string): boolean {
    return this.scopeMgr.HasConnection(source, target);
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

  public MergeDelete(partial: NullableArrayOrObject<OpenIndustrialEaC>): void {
    const result = this.diff.MergeDelete(this.eac, this.deleteEaC, partial);
    if (result.changed) {
      this.eac = result.updated;
      const rebuilt = this.scopeMgr.BuildGraph(this.getEaCWithProposals());
      this.graph.LoadFromGraph(rebuilt);
    }
  }

  public MergePartial(partial: OpenIndustrialEaC): void {
    const result = this.diff.MergePartial(this.eac, this.deleteEaC, partial);
    if (result.changed) {
      this.eac = result.updated;
      const rebuilt = this.scopeMgr.BuildGraph(this.getEaCWithProposals());
      this.graph.LoadFromGraph(rebuilt);
    }
  }

  public OnEaCChanged(cb: () => void): () => void {
    this.changeListeners.add(cb);
    return () => this.changeListeners.delete(cb);
  }

  public RemoveConnectionEdge(edgeId: string): void {
    const partial = this.scopeMgr.RemoveConnectionEdge(this.eac, edgeId);
    if (partial) this.MergePartial(partial);
  }

  public ResetFromSnapshot(snapshot: EaCHistorySnapshot): void {
    this.eac = jsonMapSetClone(snapshot.eac);
    this.deleteEaC = jsonMapSetClone(snapshot.deletes);

    const rebuilt = this.scopeMgr.BuildGraph(this.getEaCWithProposals());
    this.graph.LoadFromGraph(rebuilt);

    this.emitEaCChanged();
  }

  public SetProposalOverlayMode(mode: ProposalOverlayMode): void {
    this.overlayMode = mode;

    const rebuilt = this.scopeMgr.BuildGraph(this.getEaCWithProposals());
    this.graph.LoadFromGraph(rebuilt);
  }

  public SwitchTo(scope: NodeScopeTypes, lookup?: string): void {
    console.log(`[EaCManager] Switching to scope: ${scope} (${lookup})`);

    this.scope = scope;

    switch (scope) {
      case 'workspace': {
        this.scopeMgr = new EaCWorkspaceScopeManager(this.graph, this.presets);
        break;
      }

      case 'surface': {
        if (lookup) {
          this.scopeMgr = new EaCSurfaceScopeManager(
            this.graph,
            this.presets,
            lookup,
          );
        } else {
          throw new Error(`Lookup must be defined for scope: ${scope}`);
        }

        break;
      }

      default: {
        throw new Error(`Unsupported scope: ${scope}`);
      }
    }

    const rebuilt = this.scopeMgr.BuildGraph(this.getEaCWithProposals());

    this.graph.ResetGraph();

    this.graph.LoadFromGraph(rebuilt);

    this.emitEaCChanged();
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

  public UpdateDetailsForNode(id: string, next: EaCVertexDetails): void {
    const prev = this.GetDetailsForNode(id);
    if (!prev) return;

    const merged = { ...prev, ...next };
    if (JSON.stringify(prev) === JSON.stringify(merged)) return;

    const partial = this.inspector.BuildPartialForNodeUpdate(id, {
      Details: merged,
    });
    if (partial) this.MergePartial(partial);
  }

  public UpdateMetadataForNode(
    id: string,
    metadata: Partial<EaCFlowNodeMetadata>,
  ): void {
    const prev = this.GetMetadataForNode(id);
    if (!prev) return;

    const merged = merge<EaCFlowNodeMetadata>(prev, metadata);

    if (JSON.stringify(prev) === JSON.stringify(merged)) return;

    const partial = this.inspector.BuildPartialForNodeUpdate(id, {
      Metadata: merged,
    });

    if (partial) this.MergePartial(partial);
  }

  protected emitEaCChanged(): void {
    for (const cb of this.changeListeners) cb();
  }

  protected getEaCWithProposals(): OpenIndustrialEaC {
    const base = jsonMapSetClone(this.eac);

    if (!this.proposals || this.overlayMode === 'none') return base;

    const overlays = this.overlayMode === 'pending'
      ? this.proposals.GetPending()
      : 'ids' in this.overlayMode
      ? this.overlayMode.ids
        .map((id) => this.proposals.GetByID(id))
        .filter((p): p is Proposal<RecordKind> => !!p)
      : [];

    for (const proposal of overlays) {
      const patch = {
        [proposal.Kind]: {
          [proposal.Key]: proposal.Proposed,
        },
      };

      merge(base, patch);
    }

    return base;
  }
}
