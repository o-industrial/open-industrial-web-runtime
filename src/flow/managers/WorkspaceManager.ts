import { useCallback, useEffect, useState } from 'preact/hooks';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  XYPosition,
} from 'reactflow';
import { merge } from '@fathym/common';
import { EaCEnterpriseDetails, EaCVertexDetails } from '@fathym/eac';
import { EaCStatusProcessingTypes } from '@fathym/eac/steward/status';
import { OpenIndustrialAPIClient } from '@o-industrial/common/api';

import { FlowNodeData } from '../types/react/FlowNodeData.ts';
import { GraphStateManager } from './GraphStateManager.ts';
import { InteractionManager } from './InteractionManager.ts';
import { PresetManager } from './PresetManager.ts';
import { SelectionManager } from './SelectionManager.ts';
import { AziManager } from './AziManager.ts';
import { SimulatorLibraryManager } from './SimulatorLibraryManager.ts';
import { EaCManager } from './EaCManager.ts';
import { NodeScopeTypes } from '../types/graph/NodeScopeTypes.ts';
import { StatManager } from './StatManager.ts';
import { OpenIndustrialEaC } from '../../types/OpenIndustrialEaC.ts';
import { HistoryManager } from './HistoryManager.ts';
import { WorkspaceSummary } from '../../types/WorkspaceSummary.ts';
import { TeamMember } from '../../types/TeamMember.ts';
import { TeamManager } from './TeamManager.ts';
import { NodeEventManager } from './NodeEventManager.ts';
import { IntentTypes } from '@o-industrial/common/types';
import { BreadcrumbPart } from '../../../apps/components/molecules/BreadcrumbBar.tsx';
import { InspectorCommonProps } from '../types/nodes/InspectorCommonProps.ts';

export class WorkspaceManager {
  protected currentScope: {
    Scope: NodeScopeTypes;

    Lookup?: string;
  };

  public Azi: AziManager;
  public EaC: EaCManager;
  public Graph: GraphStateManager;
  public History: HistoryManager;
  public Interaction: InteractionManager;
  public NodeEvents: NodeEventManager;
  public Presets: PresetManager;
  public Selection: SelectionManager;
  public Simulators: SimulatorLibraryManager;
  public Stats: StatManager;
  public Team: TeamManager;

  constructor(
    eac: OpenIndustrialEaC,
    protected oiSvc: OpenIndustrialAPIClient,
    scope: NodeScopeTypes = 'workspace'
  ) {
    this.currentScope = { Scope: scope };

    this.Azi = new AziManager();
    this.History = new HistoryManager();
    this.Presets = new PresetManager();
    this.Selection = new SelectionManager();
    this.Simulators = new SimulatorLibraryManager();
    this.Stats = new StatManager();
    this.Team = new TeamManager();

    this.NodeEvents = new NodeEventManager(this);

    this.Interaction = new InteractionManager(this.Selection, this.Presets);

    this.Graph = new GraphStateManager(
      this.Interaction,
      this.Stats,
      this.NodeEvents
    );

    this.EaC = new EaCManager(
      eac,
      this.oiSvc,
      this.currentScope.Scope,
      this.Graph,
      this.Presets,
      this.History
    );

    this.Interaction.BindEaCManager(this.EaC);

    console.log('🚀 FlowManager initialized:', {
      scope: this.currentScope,
      nodes: this.Graph.GetNodes().length,
      edges: this.Graph.GetEdges().length,
    });
  }

  // === Hooks ===

  public UseAzi() {
    const [messages, setMessages] = useState(this.Azi.GetMessages());

    useEffect(() => {
      const unsubscribe = this.Azi.OnMessagesChanged(() => {
        setMessages(this.Azi.GetMessages());
      });

      return unsubscribe;
    }, []);

    const send = (text: string) => {
      this.Azi.Send(text);
    };

    const reset = () => {
      this.Azi.Reset();
      setMessages(this.Azi.GetMessages()); // optional: triggers immediate UI update
    };

    return {
      messages,
      send,
      reset,
    };
  }

  public UseBreadcrumb(): BreadcrumbPart[] {
    const eac = this.UseEaC();
    const { currentScope, currentScopeData } = this.UseScopeSwitcher();

    const [pathParts, setPathParts] = useState<BreadcrumbPart[]>([
      { label: 'Loading...', intentType: IntentTypes.Info },
      { label: 'Workspace', intentType: IntentTypes.Primary },
    ]);

    useEffect(() => {
      const name = eac?.Details?.Name ?? 'Loading...';

      if (currentScope === 'workspace') {
        setPathParts([
          {
            label: `${name} (Workspace)`,
          },
        ]);
      } else {
        const surfaceLookup = currentScopeData.Lookup!;
        const surfaceName =
          eac.Surfaces?.[surfaceLookup]?.Details?.Name ?? 'Unknown Surface';

        setPathParts([
          {
            label: `${name} (Workspace)`,
            onClick: () => this.SwitchToScope('workspace'),
          },
          {
            label: `${surfaceName} (Surface)`,
          },
        ]);
      }
    }, [eac?.Details?.Name, currentScope]);

    return pathParts;
  }

  public UseEaC(): OpenIndustrialEaC {
    const [eac, setEaC] = useState(this.EaC.GetEaC());

    useEffect(() => {
      const unsubscribe = this.EaC.OnEaCChanged(() => {
        setEaC(this.EaC.GetEaC());
      });

      return unsubscribe;
    }, []);

    return eac;
  }

  public UseGraphView() {
    const [nodes, setNodes] = useState(this.Graph.GetNodes());
    const [edges, setEdges] = useState(this.Graph.GetEdges());

    useEffect(() => {
      const update = () => {
        setNodes(this.Graph.GetNodes());
        setEdges(this.Graph.GetEdges());
      };

      const unsubscribe = this.Graph.OnGraphChanged(update);
      return unsubscribe;
    }, []);

    return { nodes, edges };
  }

  public UseHistory() {
    const [canUndo, setCanUndo] = useState(this.History.CanUndo());
    const [canRedo, setCanRedo] = useState(this.History.CanRedo());
    const [hasChanges, setHasChanges] = useState(
      this.History.HasUnsavedChanges()
    );
    const [version, setVersion] = useState(this.History.GetVersion());

    useEffect(() => {
      const update = () => {
        setCanUndo(this.History.CanUndo());
        setCanRedo(this.History.CanRedo());
        setHasChanges(this.History.HasUnsavedChanges());
        setVersion(this.History.GetVersion());
      };

      const unsubscribe = this.History.OnChange(update);

      return () => unsubscribe();
    }, []);

    useEffect(() => {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        if (this.History.HasUnsavedChanges()) {
          e.preventDefault();
          e.returnValue = ''; // Required for Chrome
        }
      };

      addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);

    return {
      canUndo,
      canRedo,
      hasChanges,
      version,
      undo: () => this.Undo(),
      redo: () => this.Redo(),
      commit: () => this.Commit(),
      revert: () => this.RevertToLastCommit(),
      fork: () => this.Fork(),
    };
  }

  public UseInspector() {
    const { selected } = this.UseSelection();
    const selectedId = selected?.id;

    const [details, setDetails] = useState<EaCVertexDetails>({});
    const [enabled, setEnabled] = useState<boolean>(false);

    const [inspectorProps, setInspectorProps] = useState<
      InspectorCommonProps | undefined
    >();

    const handleDetailsChanged = useCallback(
      (next: Partial<EaCVertexDetails>) => {
        setDetails((prev): EaCVertexDetails => {
          const merged = merge<EaCVertexDetails>(prev, next);

          if (selectedId) {
            this.EaC.UpdateNodePatch(selectedId, { Details: merged });
            console.log(`🟢 Live-synced EaC details for node ${selectedId}`);
          }

          return merged;
        });
      },
      [selectedId]
    );

    const handleToggleEnabled = useCallback(
      (val: boolean) => {
        if (selectedId) {
          this.EaC.UpdateNodePatch(selectedId, {
            Metadata: { Enabled: val },
          });

          console.log(
            `🟡 Toggled enabled state for node ${selectedId} → ${val}`
          );
          setEnabled(val);
        }
      },
      [selectedId]
    );

    const handleDeleteNode = useCallback(() => {
      if (!selectedId) return;

      console.log(`🗑️ Deleting node ${selectedId}`);
      this.EaC.DeleteNode(selectedId);
      this.Selection.ClearSelection();
    }, [selectedId]);

    useEffect(() => {
      if (!selectedId) return;

      const code = this.EaC.GetNodeAsCode(selectedId);
      setDetails({ ...(code?.Details ?? {}) });
      setEnabled(code?.Metadata?.Enabled ?? false);
    }, [selectedId]);

    useEffect(() => {
      if (!selected) {
        setInspectorProps(undefined);
        return;
      }

      const presetConfig =
        this.Presets?.GetConfigForType?.(selected.id, selected.type!) ?? {};

      setInspectorProps({
        config: presetConfig,
        details,
        enabled,
        useStats: selected.data?.useStats ?? (() => undefined),
        onDelete: handleDeleteNode,
        onDetailsChanged: handleDetailsChanged,
        onToggleEnabled: handleToggleEnabled,
      });
    }, [
      selected,
      selectedId,
      details,
      enabled,
      handleDeleteNode,
      handleDetailsChanged,
      handleToggleEnabled,
    ]);

    return {
      selected,
      selectedId,
      inspectorProps,
    };
  }

  public UseInspectorSettings() {
    const { selected } = this.UseSelection();
    const [settings, setSettings] = useState<Partial<FlowNodeData>>({});

    useEffect(() => {
      if (selected) {
        setSettings({ ...selected.data });
      }
    }, [selected]);

    const updateSettings = (next: Partial<FlowNodeData>) => {
      setSettings((prev) => ({ ...prev, ...next }));
    };

    const saveSettings = () => {
      if (!selected) return;
      selected.data = { ...selected.data, ...settings };
    };

    return {
      settings,
      updateSettings,
      saveSettings,
    };
  }

  public UseInteraction() {
    const handleDrop = useCallback(
      (event: DragEvent, toFlow: (point: XYPosition) => XYPosition) => {
        this.Interaction.HandleDrop(event, this.Graph.GetNodes(), toFlow);
      },
      []
    );

    const handleConnect = useCallback((params: Connection) => {
      if (params.source && params.target) {
        this.Interaction.ConnectNodes(params.source, params.target);
      }
    }, []);

    const handleNodeClick = useCallback(
      (_e: unknown, node: Node<FlowNodeData>) => {
        this.Selection.SelectNode(node.id);
      },
      []
    );

    const handleNodesChange = useCallback(
      (changes: NodeChange[], nodes: Node[]) => {
        this.Interaction.OnNodesChange(changes, nodes ?? this.Graph.GetNodes());
      },
      []
    );

    const handleEdgesChange = useCallback(
      (changes: EdgeChange[], edges: Edge[]) => {
        this.Interaction.OnEdgesChange(changes, edges ?? this.Graph.GetEdges());
      },
      []
    );

    return {
      handleDrop,
      handleConnect,
      handleNodeClick,
      handleNodesChange,
      handleEdgesChange,
    };
  }

  public UseScopeSwitcher() {
    const [scopeCtx, setScopeCtx] = useState({ ...this.currentScope });

    useEffect(() => {
      const unsubscribe = this.Graph.OnGraphChanged(() => {
        // Optional: Scope doesn't directly change from graph, but if you wire up
        // a more proper observer (e.g., this.OnScopeChanged) you can hook into that instead
        setScopeCtx(this.currentScope);
      });

      return unsubscribe;
    }, []);

    const switchToScope = (scope: NodeScopeTypes, lookup?: string) => {
      this.SwitchToScope(scope, lookup);

      setScopeCtx({ Scope: scope, Lookup: lookup });
    };

    return {
      currentScope: scopeCtx.Scope,
      currentScopeData: scopeCtx,
      switchToScope,
    };
  }

  public UseSelection() {
    const [selected, setSelected] = useState<Node<FlowNodeData> | null>(
      this.Selection.GetSelectedNodes(this.Graph.GetNodes())[0] ?? null
    );

    useEffect(() => {
      const update = () => {
        const node =
          this.Selection.GetSelectedNodes(this.Graph.GetNodes())[0] ?? null;
        setSelected(node);
      };

      const unsubscribe = this.Selection.OnSelectionChanged(update);
      return () => unsubscribe();
    }, []);

    return { selected, setSelected };
  }

  public UseUIContext() {
    const presetsForScope = this.Presets.GetPresetsForScope(
      this.currentScope.Scope
    );
    const rendererMap = this.Presets.GetRendererMap();

    return {
      presets: presetsForScope,
      nodeTypes: rendererMap,
    };
  }

  public UseWorkspaceSettings() {
    const getCurrentWorkspace = (): WorkspaceSummary => {
      const eac = this.EaC.GetEaC();

      return {
        Lookup: eac.EnterpriseLookup!,
        Details: eac.Details!,
      };
    };

    const [current, setCurrent] = useState<WorkspaceSummary>(
      getCurrentWorkspace()
    );
    const [hasChanges, setHasChanges] = useState(
      this.History.HasUnsavedChanges()
    );

    useEffect(() => {
      const update = () => {
        setCurrent(getCurrentWorkspace());
        setHasChanges(this.History.HasUnsavedChanges());
      };

      const unsubscribe = this.History.OnChange(update);
      return () => unsubscribe();
    }, []);

    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

    useEffect(() => {
      const members = this.Team?.ListUsers?.() ?? [
        { Email: 'admin@factory.com', Role: 'Owner' },
        { Email: 'engineer@factory.com', Role: 'Editor' },
      ];

      setTeamMembers(members);
    }, []);

    const [workspaces, setWorkspaces] = useState<WorkspaceSummary[]>([]);

    useEffect(() => {
      const results = this.EaC.List?.() ?? [];
      setWorkspaces(results);
    }, []);

    const update = (next: Partial<EaCEnterpriseDetails>) => {
      this.EaC.UpdateWorkspace(next);

      setCurrent(getCurrentWorkspace());
    };

    const save = () => {
      this.Commit();

      console.log('💾 Saved workspace details');
    };

    const archive = () => {
      const name = current.Details.Name ?? 'this workspace';

      const confirmed = confirm(
        `Are you sure you want to archive ${name}? This will remove it from the current session.`
      );

      if (!confirmed) return;

      this.EaC.Archive?.().then(() => {
        location.reload();
      });
    };

    const inviteMember = (email: string, role: string) => {
      if (!email) return;
      this.Team?.InviteUser?.(email, role);
      setTeamMembers((prev) => [...prev, { Email: email, Role: role }]);
    };

    const removeMember = (email: string) => {
      this.Team?.RemoveUser?.(email);
      setTeamMembers((prev) => prev.filter((m) => m.Email !== email));
    };

    const listWorkspaces = (): WorkspaceSummary[] => {
      return workspaces;
    };

    const switchToWorkspace = (lookup: string) => {
      //  TODO(mcgear): Set the kv Current EaC value for the user

      location.reload();

      setCurrent(getCurrentWorkspace());
    };

    return {
      currentWorkspace: current,
      teamMembers,
      inviteMember,
      removeMember,
      update,
      save,
      archive,
      hasChanges,
      listWorkspaces,
      switchToWorkspace,
    };
  }

  // === History Actions ===

  public async Commit(): Promise<void> {
    const history = this.History.GetCurrent();

    const status = await this.EaC.Commit(history);

    if (status.Processing === EaCStatusProcessingTypes.COMPLETE) {
      this.History.Commit();
    }
  }

  public Fork(): void {
    const forked = this.History.ForkRuntime();
    console.log('🌱 Forked runtime snapshot:', forked);
  }

  public HasUnsavedChanges(): boolean {
    return this.History.HasUnsavedChanges();
  }

  public RevertToLastCommit(): void {
    const snapshot = this.History.RevertToLastCommit();
    if (snapshot) {
      this.EaC.ResetFromSnapshot(snapshot);
      console.log('🔄 Reverted to last commit');
    }
  }

  public Undo(): void {
    const snapshot = this.History.Undo();
    if (snapshot) {
      this.EaC.ResetFromSnapshot(snapshot);
      console.log('↩️ Undo successful');
    }
  }

  public Redo(): void {
    const snapshot = this.History.Redo();
    if (snapshot) {
      this.EaC.ResetFromSnapshot(snapshot);
      console.log('↪️ Redo successful');
    }
  }

  public SwitchToScope(scope: NodeScopeTypes, lookup?: string): void {
    console.log(`🔀 Switching scope to: ${scope} (${lookup})`);

    // Update internal scope reference
    this.currentScope = { Scope: scope, Lookup: lookup };

    // Clear selection before switching
    this.Selection.ClearSelection();

    // Delegate the actual scope swap and graph rebuild to the EaCManager
    this.EaC.SwitchTo(scope, lookup);

    // You may also want to trigger a stat refresh or reset other managers if needed
    // e.g., this.Stats.Reset(); this.Runtime.Rebind();

    // Optionally, you could emit a custom hook event or callback here
  }
}
