import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  XYPosition,
} from 'reactflow';
import { useCallback, useEffect, useState } from 'preact/hooks';

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

export class FlowManager {
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
    this.Runtime = new InteractionManager(this.Selection, this.Presets, this.EaC);

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
      []
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
      []
    );

    const handleNodesChange = useCallback(
      (changes: NodeChange[], nodes: Node[]) => {
        this.Runtime.OnNodesChange(changes, nodes ?? this.Graph.GetNodes());
      },
      []
    );

    const handleEdgesChange = useCallback(
      (changes: EdgeChange[], edges: Edge[]) => {
        this.Runtime.OnEdgesChange(changes, edges ?? this.Graph.GetEdges());
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

  public CommitRuntime(): void {
    this.History.Commit();
    console.log('✅ Runtime committed');
  }

  public RevertToLastCommit(): void {
    const reverted = this.History.RevertToLastCommit();
    if (reverted) {
      this.ReloadFromEaC(reverted);
      console.log('🔄 Reverted to last commit');
    }
  }

  public Undo(): void {
    const prev = this.History.Undo();
    if (prev) {
      this.ReloadFromEaC(prev);
      console.log('↩️ Undo successful');
    }
  }

  public Redo(): void {
    const next = this.History.Redo();
    if (next) {
      this.ReloadFromEaC(next);
      console.log('↪️ Redo successful');
    }
  }

  public ForkRuntime(): void {
    const forked = this.History.ForkRuntime();
    console.log('🌱 Forked runtime snapshot:', forked);
  }

  public HasUnsavedChanges(): boolean {
    return this.History.HasUnsavedChanges();
  }

  public ReloadFromEaC(eac: OpenIndustrialEaC): void {
    this.EaC = this.createEaCManager(eac);
    this.Graph.LoadFromGraph(this.EaC['buildGraph'](eac));
  }

  // === Internals ===

  protected createEaCManager(eac: OpenIndustrialEaC): EaCManager {
    switch (this.Scope) {
      case 'workspace':
        return new EaCWorkspaceManager(eac, this.Graph, this.Presets);
      case 'surface':
        throw new Error('Surface scope not yet implemented');
    }
  }
}
