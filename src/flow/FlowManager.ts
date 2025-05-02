import { Connection, Edge, EdgeChange, Node, NodeChange, XYPosition } from 'reactflow';
import { FlowNodeData } from './FlowNodeData.ts';
import { useCallback, useState } from 'preact/hooks';
import { GraphStateManager } from './GraphStateManager.ts';
import { InteractionManager } from './InteractionManager.ts';
import { PresetManager } from './PresetManager.ts';
import { SelectionManager } from './SelectionManager.ts';

export type NodeScopeTypes = 'workspace' | 'surface';

export class FlowManager {
  public Graph: GraphStateManager;
  public Selection: SelectionManager;
  public Presets: PresetManager;
  public Runtime: InteractionManager;

  constructor(public Scope: NodeScopeTypes = 'workspace') {
    this.Graph = new GraphStateManager();
    this.Selection = new SelectionManager();
    this.Presets = new PresetManager();
    this.Runtime = new InteractionManager(
      this.Graph,
      this.Selection,
      this.Presets,
    );
  }

  public Use() {
    const [nodes, setNodes] = useState<Node<FlowNodeData>[]>(this.Graph.GetNodes());
    const [edges, setEdges] = useState<Edge[]>(this.Graph.GetEdges());

    const refresh = () => {
      setNodes([...this.Graph.GetNodes()]);
      setEdges([...this.Graph.GetEdges()]);
    };

    const onNodesChange = useCallback((changes: NodeChange[]) => {
      this.Graph.ApplyNodeChanges(changes);
      refresh();
    }, []);

    const onEdgesChange = useCallback((changes: EdgeChange[]) => {
      this.Graph.ApplyEdgeChanges(changes);
      refresh();
    }, []);

    const handleDrop = useCallback(
      (event: DragEvent, toFlow: (point: XYPosition) => XYPosition) => {
        const current = this.Graph.GetNodes();
        const result = this.Runtime.HandleDrop(event, current, toFlow);
        if (result) refresh();
      },
      [],
    );

    const handleConnect = useCallback((params: Connection) => {
      if (params.source && params.target) {
        this.Runtime.ConnectNodes(params.source, params.target);
        refresh();
      }
    }, []);

    const handleNodeClick = useCallback((_e: unknown, node: Node<FlowNodeData>) => {
      this.Selection.SelectNode(node.id);
      refresh();
    }, []);

    const presets = this.Presets.GetPresetsForScope(this.Scope);
    const nodeTypes = this.Presets.GetRendererMap();

    return {
      nodes,
      edges,
      presets,
      nodeTypes,
      onNodesChange,
      onEdgesChange,
      handleDrop,
      handleConnect,
      handleNodeClick,
    };
  }
}
