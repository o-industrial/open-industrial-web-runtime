import { Node } from 'reactflow';
import { FlowNodeData } from './FlowNodeData.ts';

export class SelectionManager {
  private selectedNodeIds = new Set<string>();

  GetSelectedNodes(nodes: Node<FlowNodeData>[]): Node<FlowNodeData>[] {
    return nodes.filter((n) => this.selectedNodeIds.has(n.id));
  }

  SelectNode(id: string): void {
    this.selectedNodeIds = new Set([id]);
  }

  ClearSelection(): void {
    this.selectedNodeIds.clear();
  }

  IsSelected(id: string): boolean {
    return this.selectedNodeIds.has(id);
  }
}
