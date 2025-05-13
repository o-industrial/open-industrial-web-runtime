import { NodeEvent, NodeEventRouter } from './NodeEventRouter.ts';
import { WorkspaceManager } from '../WorkspaceManager.ts';

export class SurfaceEventRouter implements NodeEventRouter {
  constructor(protected workspace: WorkspaceManager) {}

  public Handle(event: NodeEvent): void {
    switch (event.Type.toLowerCase()) {
      case 'manage':
        this.workspace.SwitchToScope('surface', event.NodeID);
        break;

      default:
        console.warn(`⚠️ Unknown surface event: ${event.Type}`);
        console.warn(event);
        break;
    }
  }
}
