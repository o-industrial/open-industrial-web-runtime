import { NodeEvent, NodeEventRouter } from './NodeEventRouter.ts';
import { WorkspaceManager } from '../WorkspaceManager.ts';

export class WarmQueryEventRouter implements NodeEventRouter {
  constructor(protected workspace: WorkspaceManager) {}

  public Handle(event: NodeEvent): void {
    switch (event.Type.toLowerCase()) {
      case 'manage':
        this.workspace.SwitchToScope('warmquery', event.NodeID);
        break;

      default:
        console.warn(`⚠️ Unknown warm query event: ${event.Type}`);
        console.warn(event);
        break;
    }
  }
}
