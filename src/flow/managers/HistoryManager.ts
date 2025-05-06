import { jsonMapSetClone } from '@fathym/common';
import { OpenIndustrialEaC } from '../../types/OpenIndustrialEaC.ts';

export class HistoryManager {
  private history: OpenIndustrialEaC[] = [];
  private pointer = -1;
  private committed: OpenIndustrialEaC | null = null;
  private dirty = false;
  private maxHistory = 100;

  private onChange?: () => void;

  constructor() {
    const snapshot = jsonMapSetClone({});
    this.history.push(snapshot);
    this.pointer = 0;
    this.committed = snapshot;
  }

  public GetCurrent(): OpenIndustrialEaC {
    return jsonMapSetClone(this.history[this.pointer]);
  }

  public MarkDirty(): void {
    this.dirty = true;
  }

  public FlushIfDirty(next: OpenIndustrialEaC): void {
    if (!this.dirty) return;
    this.Push(next);
    this.dirty = false;
  }

  public Push(next: OpenIndustrialEaC): void {
    const snapshot = jsonMapSetClone(next);

    if (this.pointer < this.history.length - 1) {
      this.history = this.history.slice(0, this.pointer + 1);
    }

    this.history.push(snapshot);
    this.pointer++;

    if (this.history.length > this.maxHistory) {
      this.history.shift();
      this.pointer--;
    }

    this.onChange?.();
  }

  public Undo(): OpenIndustrialEaC | null {
    if (!this.CanUndo()) return null;
    this.pointer--;
    this.onChange?.();
    return jsonMapSetClone(this.history[this.pointer]);
  }

  public Redo(): OpenIndustrialEaC | null {
    if (!this.CanRedo()) return null;
    this.pointer++;
    this.onChange?.();
    return jsonMapSetClone(this.history[this.pointer]);
  }

  public Commit(): void {
    this.committed = jsonMapSetClone(this.history[this.pointer]);
    this.dirty = false;
    this.onChange?.();
  }

  public RevertToLastCommit(): OpenIndustrialEaC | null {
    if (!this.committed) return null;
    this.Push(this.committed);
    this.onChange?.();
    return jsonMapSetClone(this.committed);
  }

  public ForkRuntime(): OpenIndustrialEaC {
    const current = this.GetCurrent();
    // Future: apply ForkedFrom tag or runtime label here
    return jsonMapSetClone(current);
  }

  public GetVersion(): number {
    return this.pointer;
  }

  public HasUnsavedChanges(): boolean {
    return JSON.stringify(this.GetCurrent()) !== JSON.stringify(this.committed);
  }

  public CanUndo(): boolean {
    return this.pointer > 0;
  }

  public CanRedo(): boolean {
    return this.pointer < this.history.length - 1;
  }

  public OnChange(cb: () => void): void {
    this.onChange = cb;
  }
}
