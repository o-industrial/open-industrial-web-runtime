type NodeEvent = {
  Type: string;
  NodeID: string;
};

type NodeEventCallback = (event: NodeEvent) => void;

export class NodeEventManager {
  protected handlers: Record<string, Set<NodeEventCallback>> = {};

  public Emit(nodeType: string, event: NodeEvent): void {
    console.log(`[NodeEvent] ${event.Type} from ${event.NodeID} of node type ${nodeType}`);

    const key = nodeType.toLowerCase();
    for (const handler of this.handlers[key] ?? []) {
      handler(event);
    }
  }

  public On(nodeType: string, callback: NodeEventCallback): () => void {
    const key = nodeType.toLowerCase();
    this.handlers[key] ??= new Set();
    this.handlers[key]!.add(callback);

    return () => {
      this.handlers[key]!.delete(callback);
    };
  }
}
