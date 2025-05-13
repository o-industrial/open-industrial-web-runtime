import { WorkspaceManager } from './WorkspaceManager.ts';
import { NodeEvent, NodeEventRouter } from './node-events/NodeEventRouter.ts';
import { SurfaceEventRouter } from './node-events/SurfaceEventRouter.ts';

export class NodeEventManager {
  protected eventRouters: Record<string, NodeEventRouter>;

  constructor(protected workspace: WorkspaceManager) {
    this.eventRouters = {
      surface: new SurfaceEventRouter(this.workspace),
    };
  }

  public Emit(nodeType: string, event: NodeEvent): void {
    console.log(`[NodeEvent] ${event.Type} from ${event.NodeID} of node type ${nodeType}`);

    const router = this.eventRouters[nodeType.toLowerCase()];
    if (router) {
      router.Handle(event);
    } else {
      console.warn(`⚠️ No event router found for node type: ${nodeType}`);
    }
  }
}
