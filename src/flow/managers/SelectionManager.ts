import { Node } from 'reactflow';
import { FlowNodeData } from '../types/react/FlowNodeData.ts';

type SelectionChangedCallback = () => void;

export class SelectionManager {
  private selectedNodeIds = new Set<string>();
  private listeners: Set<SelectionChangedCallback> = new Set();

  GetSelectedNodes(nodes: Node<FlowNodeData>[]): Node<FlowNodeData>[] {
    return nodes.filter((n) => this.selectedNodeIds.has(n.id));
  }

  GetSelectedNodeIDs(): string[] {
    return Array.from(this.selectedNodeIds);
  }

  SelectNode(id: string): void {
    this.selectedNodeIds = new Set([id]);
    this.Emit();
  }

  ClearSelection(): void {
    this.selectedNodeIds.clear();
    this.Emit();
  }

  IsSelected(id: string): boolean {
    return this.selectedNodeIds.has(id);
  }

  OnSelectionChanged(cb: SelectionChangedCallback): void {
    this.listeners.add(cb);
  }

  OffSelectionChanged(cb: SelectionChangedCallback): void {
    this.listeners.delete(cb);
  }

  private Emit(): void {
    for (const cb of this.listeners) {
      cb();
    }
  }
}
