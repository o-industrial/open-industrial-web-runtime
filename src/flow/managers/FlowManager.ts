import { Connection, Node, XYPosition } from 'reactflow';
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

  constructor(eac: OpenIndustrialEaC, scope: NodeScopeTypes = 'workspace') {
    this.Scope = scope;
    this.Graph = new GraphStateManager();
    this.Azi = new AziManager();
    this.Selection = new SelectionManager();
    this.Presets = new PresetManager();
    this.Stats = new StatManager();
    this.Simulators = new SimulatorLibraryManager();
    this.EaC = this.CreateEaCManager(eac);
    this.Runtime = new InteractionManager(
      this.Selection,
      this.Presets,
      this.Stats,
      this.EaC
    );
  }

  public UseAzi() {
    const [messages, setMessages] = useState(this.Azi.GetMessages());

    useEffect(() => {
      const update = () => setMessages(this.Azi.GetMessages());
      this.Azi.OnMessagesChanged(update);
      return () => this.Azi.OffMessagesChanged(update);
    }, []);

    const send = (text: string) => this.Azi.Send(text);

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
        const result = this.Runtime.HandleDrop(
          event,
          this.Graph.GetNodes(),
          toFlow
        );
        if (result) {
          this.Selection.SelectNode(result.selectedId);
        }
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

    return { handleDrop, handleConnect, handleNodeClick };
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

      // You’ll later wire this up to emit changes back to EaC
      // For now, local mutation is a fallback
      selected.data = { ...selected.data, ...settings };

      console.log('🔄 Saved (placeholder) settings for:', selected);
    };

    return {
      settings,
      updateSettings,
      saveSettings,
    };
  }

  public UseUIContext() {
    return {
      presets: this.Presets.GetPresetsForScope(this.Scope),
      nodeTypes: this.Presets.GetRendererMap(),
    };
  }

  protected CreateEaCManager(eac: OpenIndustrialEaC): EaCManager {
    switch (this.Scope) {
      case 'workspace':
        return new EaCWorkspaceManager(eac, this.Graph, this.Presets);
      case 'surface':
        throw new Error('Surface scope not yet implemented');
    }
  }
}
