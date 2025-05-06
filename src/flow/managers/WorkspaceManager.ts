import { useCallback, useEffect, useState } from 'preact/hooks';
import { Connection, Edge, EdgeChange, Node, NodeChange, XYPosition } from 'reactflow';
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
import { EaCWorkspaceManager } from './EaCWorkspaceManager.ts';
import { OpenIndustrialEaC } from '../../types/OpenIndustrialEaC.ts';
import { HistoryManager } from './HistoryManager.ts';

export class WorkspaceManager {
  public Scope: NodeScopeTypes;
  public Azi: AziManager;
  public Graph: GraphStateManager;
  public Selection: SelectionManager;
  public Presets: PresetManager;
  public Runtime: InteractionManager;
  public Simulators: SimulatorLibraryManager;
  public Stats: StatManager;
  public EaC: EaCManager;
  public History: HistoryManager;

  constructor(eac: OpenIndustrialEaC, scope: NodeScopeTypes = 'workspace') {
    this.Scope = scope;
    this.Azi = new AziManager();
    this.Selection = new SelectionManager();
    this.Presets = new PresetManager();
    this.Stats = new StatManager();
    this.Simulators = new SimulatorLibraryManager();
    this.History = new HistoryManager();
    this.Graph = new GraphStateManager(this.Selection, this.Stats);
    this.EaC = this.createEaCManager(eac);
    this.Runtime = new InteractionManager(
      this.Selection,
      this.Presets,
      this.EaC,
    );

    console.log('🚀 FlowManager initialized:', {
      scope: this.Scope,
      nodes: this.Graph.GetNodes().length,
      edges: this.Graph.GetEdges().length,
    });
  }

  // === Hooks ===

  public UseAzi() {
    const [messages, setMessages] = useState(this.Azi.GetMessages());

    useEffect(() => {
      const update = () => setMessages(this.Azi.GetMessages());
      this.Azi.OnMessagesChanged(update);
      return () => this.Azi.OffMessagesChanged(update);
    }, []);

    const send = (text: string) => {
      this.Azi.Send(text);
    };

    return { messages, send };
  }

  public UseGraphView() {
    const [nodes, setNodes] = useState(this.Graph.GetNodes());
    const [edges, setEdges] = useState(this.Graph.GetEdges());

    useEffect(() => {
      const update = () => {
        setNodes([...this.Graph.GetNodes()]);
        setEdges([...this.Graph.GetEdges()]);
      };

      this.Graph.OnGraphChanged(update);
      return () => this.Graph.OffGraphChanged(update);
    }, []);

    return { nodes, edges };
  }

  public UseInteraction() {
    const handleDrop = useCallback(
      (event: DragEvent, toFlow: (point: XYPosition) => XYPosition) => {
        this.Runtime.HandleDrop(event, this.Graph.GetNodes(), toFlow);
      },
      [],
    );

    const handleConnect = useCallback((params: Connection) => {
      if (params.source && params.target) {
        this.Runtime.ConnectNodes(params.source, params.target);
      }
    }, []);

    const handleNodeClick = useCallback(
      (_e: unknown, node: Node<FlowNodeData>) => {
        this.Selection.SelectNode(node.id);
      },
      [],
    );

    const handleNodesChange = useCallback(
      (changes: NodeChange[], nodes: Node[]) => {
        this.Runtime.OnNodesChange(changes, nodes ?? this.Graph.GetNodes());
      },
      [],
    );

    const handleEdgesChange = useCallback(
      (changes: EdgeChange[], edges: Edge[]) => {
        this.Runtime.OnEdgesChange(changes, edges ?? this.Graph.GetEdges());
      },
      [],
    );

    return {
      handleDrop,
      handleConnect,
      handleNodeClick,
      handleNodesChange,
      handleEdgesChange,
    };
  }

  public UseHistory(oiSvc: OpenIndustrialAPIClient) {
    const [canUndo, setCanUndo] = useState(this.History.CanUndo());
    const [canRedo, setCanRedo] = useState(this.History.CanRedo());
    const [hasChanges, setHasChanges] = useState(
      this.History.HasUnsavedChanges(),
    );
    const [version, setVersion] = useState(this.History.GetVersion());

    useEffect(() => {
      const update = () => {
        setCanUndo(this.History.CanUndo());
        setCanRedo(this.History.CanRedo());
        setHasChanges(this.History.HasUnsavedChanges());
        setVersion(this.History.GetVersion());
      };

      this.History.OnChange(update);
      return () => this.History.OnChange(() => {});
    }, []);

    useEffect(() => {
      const update = () => {
        setCanUndo(this.History.CanUndo());
        setCanRedo(this.History.CanRedo());
        setHasChanges(this.History.HasUnsavedChanges());
        setVersion(this.History.GetVersion());
      };

      this.History.OnChange(update);

      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        if (this.History.HasUnsavedChanges()) {
          e.preventDefault();
          e.returnValue = ''; // For some browsers (Chrome)
        }
      };

      addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        this.History.OnChange(() => {});
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
      commit: () => this.Commit(oiSvc),
      revert: () => this.RevertToLastCommit(),
      fork: () => this.Fork(),
    };
  }

  public UseSelection() {
    const [selected, setSelected] = useState<Node<FlowNodeData> | null>(
      this.Selection.GetSelectedNodes(this.Graph.GetNodes())[0] ?? null,
    );

    useEffect(() => {
      const update = () => {
        const node = this.Selection.GetSelectedNodes(this.Graph.GetNodes())[0] ?? null;
        setSelected(node);
      };
      this.Selection.OnSelectionChanged(update);
      return () => this.Selection.OffSelectionChanged(update);
    }, []);

    return { selected, setSelected };
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

  public UseUIContext() {
    const presets = this.Presets.GetPresetsForScope(this.Scope);
    const nodeTypes = this.Presets.GetRendererMap();
    return { presets, nodeTypes };
  }

  // === History Actions ===

  public async Commit(oiSvc: OpenIndustrialAPIClient): Promise<void> {
    const history = this.History.GetCurrent();

    const status = await oiSvc.Workspaces.Commit(history);

    console.log(`✅ Runtime committed: CommitID ${status.ID}`);

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

  // === Internals ===

  protected createEaCManager(eac: OpenIndustrialEaC): EaCManager {
    switch (this.Scope) {
      case 'workspace':
        return new EaCWorkspaceManager(
          eac,
          this.Graph,
          this.Presets,
          this.History,
        );
      case 'surface':
        throw new Error('Surface scope not yet implemented');
    }
  }
}
