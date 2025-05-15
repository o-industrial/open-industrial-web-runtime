import { jsonMapSetClone, merge, NullableArrayOrObject } from '@fathym/common';
import { Edge, EdgeChange, Node, NodeChange } from 'reactflow';

import { HistoryManager } from './HistoryManager.ts';
import { PresetManager } from './PresetManager.ts';
import { GraphStateManager } from './GraphStateManager.ts';
import { FlowNodeData } from '../types/react/FlowNodeData.ts';
import { SimulatorDefinition } from './SimulatorLibraryManager.ts';
import { FlowGraphNode } from '../types/graph/FlowGraphNode.ts';
import { OpenIndustrialEaC } from '../../types/OpenIndustrialEaC.ts';
import { NodeScopeTypes } from '../types/graph/NodeScopeTypes.ts';
import {
  EaCAzureDockerSimulatorDetails,
  EaCFlowNodeMetadata,
  Position,
} from '@o-industrial/common/eac';
import {
  EaCHistorySnapshot,
  Proposal,
  RecordKind,
} from '@o-industrial/common/types';
import { EaCEnterpriseDetails, EaCVertexDetails } from '@fathym/eac';

import { EaCDiffManager } from './eac/EaCDiffManager.ts';
import { WorkspaceSummary } from '../../types/WorkspaceSummary.ts';
import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
import { EaCStatus } from '@fathym/eac/steward/status';

import { EaCWorkspaceScopeManager } from './eac/EaCWorkspaceScopeManager.ts';
import { EaCScopeManager } from './eac/EaCScopeManager.ts';
import { EaCSurfaceScopeManager } from './eac/EaCSurfaceScopeManager.ts';
import { EaCProposalManager } from './eac/EaCProposalManager.ts';
import { ProposalOverlayMode } from '../types/graph/ProposalOverlayMode.ts';
import { EaCCapabilitiesManager } from './eac/EaCCapabilitiesManager.ts';

export class EaCManager {
  protected deleteEaC: NullableArrayOrObject<OpenIndustrialEaC> = {};
  protected changeListeners = new Set<() => void>();

  protected diff: EaCDiffManager;
  protected proposals: EaCProposalManager;
  protected scopeMgr!: EaCScopeManager;

  protected overlayMode: ProposalOverlayMode = 'pending';

  constructor(
    protected eac: OpenIndustrialEaC,
    protected oiSvc: OpenIndustrialAPIClient,
    protected scope: NodeScopeTypes,
    protected graph: GraphStateManager,
    protected history: HistoryManager
  ) {
    this.diff = new EaCDiffManager(history, this.emitEaCChanged.bind(this));

    this.proposals = new EaCProposalManager(oiSvc, this);

    this.SwitchTo(scope, undefined);
  }

  public ApplyReactFlowNodeChanges(
    changes: NodeChange[],
    currentNodes: Node<FlowNodeData>[]
  ): void {
    const partial = this.scopeMgr.UpdateNodesFromChanges(changes, currentNodes);

    if (partial) {
      this.MergePartial(partial);
    }
  }

  public ApplyReactFlowEdgeChanges(
    changes: EdgeChange[],
    currentEdges: Edge[]
  ): void {
    const partial = this.scopeMgr.UpdateConnections(changes, currentEdges);

    if (partial) {
      this.MergePartial(partial);
    }
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
    const partial = this.scopeMgr.CreateConnectionEdge(source, target);

    if (partial) {
      this.MergePartial(partial);
    }
  }

  public CreateNodeFromPreset(type: string, position: Position): FlowGraphNode {
    const id = `${type}-${Date.now()}`;

    const partial = this.scopeMgr.CreatePartialEaCFromPreset(
      type,
      id,
      position
    );

    this.MergePartial(partial);

    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);

    if (!node) {
      throw new Error(`Failed to locate node after create: ${id}`);
    }

    return node;
  }

  public DeleteNode(id: string): void {
    const partial = this.scopeMgr.BuildPartialForNodeDelete(id);

    if (partial) {
      this.MergeDelete(partial);
    }
  }

  public GetCapabilities(): EaCCapabilitiesManager {
    return this.scopeMgr.GetCapabilities();
  }

  public GetNodeAsCode(id: string): {
    Metadata?: EaCFlowNodeMetadata;
    Details: EaCVertexDetails;
  } | null {
    return this.scopeMgr.GetNodeAsCode(id);
  }

  public GetEaC(): OpenIndustrialEaC {
    return this.getEaCWithProposals();
  }

  /**
   * Retrieves live or mock stats for a given node ID by delegating to its capability manager.
   * Used by inspector panels and UI components to show node-specific metrics.
   */
  public async GetStats(id: string): Promise<Record<string, unknown>> {
    return await this.scopeMgr.GetStats(id);
  }

  public HasConnection(source: string, target: string): boolean {
    return this.scopeMgr.HasConnection(source, target);
  }

  public InstallSimulators(simDefs: SimulatorDefinition[]): void {
    const partial = this.scopeMgr.InstallSimulators(simDefs);

    if (partial) {
      this.MergePartial(partial);
    }
  }
  public List(): WorkspaceSummary[] {
    // TODO(AI): Hook up to API this.oiSvc.EaC.List()
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

      this.reloadFromEaC();
    }
  }

  public MergePartial(partial: OpenIndustrialEaC): void {
    const result = this.diff.MergePartial(this.eac, this.deleteEaC, partial);

    if (result.changed) {
      this.eac = result.updated;

      this.reloadFromEaC();
    }
  }

  public OnEaCChanged(cb: () => void): () => void {
    this.changeListeners.add(cb);

    return () => this.changeListeners.delete(cb);
  }

  public RemoveConnectionEdge(edgeId: string): void {
    const partial = this.scopeMgr.RemoveConnectionEdge(edgeId);

    if (partial) {
      this.MergePartial(partial);
    }
  }

  public ResetFromSnapshot(snapshot: EaCHistorySnapshot): void {
    this.eac = jsonMapSetClone(snapshot.eac);

    this.deleteEaC = jsonMapSetClone(snapshot.deletes);

    this.reloadFromEaC();
  }

  public SetProposalOverlayMode(mode: ProposalOverlayMode): void {
    this.overlayMode = mode;

    this.reloadFromEaC();
  }

  public SwitchTo(scope: NodeScopeTypes, lookup?: string): void {
    console.log(`[EaCManager] Switching to scope: ${scope} (${lookup})`);

    this.scope = scope;

    const capabilities = new EaCCapabilitiesManager(scope);

    switch (scope) {
      case 'workspace': {
        this.scopeMgr = new EaCWorkspaceScopeManager(
          this.graph,
          capabilities,
          () => this.GetEaC()
        );
        break;
      }

      case 'surface': {
        if (!lookup)
          throw new Error(`Lookup must be defined for scope: ${scope}`);

        this.scopeMgr = new EaCSurfaceScopeManager(
          this.graph,
          capabilities,
          () => this.GetEaC(),
          lookup
        );
        break;
      }

      default: {
        throw new Error(`Unsupported scope: ${scope}`);
      }
    }

    this.graph.ResetGraph();

    this.reloadFromEaC();
  }

  public UpdateNodePatch(
    id: string,
    patch: Partial<{
      Details: EaCVertexDetails;
      Metadata: Partial<EaCFlowNodeMetadata>;
    }>
  ): void {
    const current = this.GetNodeAsCode(id);

    if (!current) return;

    const merged: Partial<{
      Details: EaCVertexDetails;
      Metadata: EaCFlowNodeMetadata;
    }> = {};

    if (patch.Details) {
      const combined = { ...current.Details, ...patch.Details };
      if (JSON.stringify(current.Details) !== JSON.stringify(combined)) {
        merged.Details = combined;
      }
    }

    if (patch.Metadata) {
      const prevMeta = current.Metadata ?? {};
      const combined = merge<EaCFlowNodeMetadata>(prevMeta, patch.Metadata);
      if (JSON.stringify(prevMeta) !== JSON.stringify(combined)) {
        merged.Metadata = combined;
      }
    }

    if (Object.keys(merged).length > 0) {
      const partial = this.scopeMgr.BuildPartialForNodeUpdate(id, merged);
      if (partial) this.MergePartial(partial);
    }
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

  protected emitEaCChanged(): void {
    for (const cb of this.changeListeners) cb();
  }

  protected getEaCWithProposals(): OpenIndustrialEaC {
    const base = jsonMapSetClone(this.eac);

    if (!this.proposals || this.overlayMode === 'none') return base;

    const overlays =
      this.overlayMode === 'pending'
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

  protected reloadFromEaC(): void {
    const rebuilt = this.scopeMgr.BuildGraph();

    this.graph.LoadFromGraph(rebuilt);

    this.emitEaCChanged();
  }
}
