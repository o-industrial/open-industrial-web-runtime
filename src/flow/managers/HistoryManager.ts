import { jsonMapSetClone, NullableArrayOrObject } from '@fathym/common';
import { EaCHistorySnapshot } from '@o-industrial/common/types';
import { OpenIndustrialEaC } from '../../types/OpenIndustrialEaC.ts';

export class HistoryManager {
  private history: EaCHistorySnapshot[] = [];
  private pointer = -1;
  private committed: EaCHistorySnapshot | null = null;
  private dirty = false;
  private maxHistory = 100;

  private onChange?: () => void;

  constructor() {
    const empty: EaCHistorySnapshot = {
      eac: jsonMapSetClone({}),
      deletes: jsonMapSetClone({}),
    };
    this.history.push(empty);
    this.pointer = 0;
    this.committed = empty;
  }

  public GetCurrent(): EaCHistorySnapshot {
    return jsonMapSetClone(this.history[this.pointer]);
  }

  public MarkDirty(): void {
    this.dirty = true;
  }

  public FlushIfDirty(
    eac: OpenIndustrialEaC,
    deletes: NullableArrayOrObject<OpenIndustrialEaC>,
  ): void {
    if (!this.dirty) return;
    this.Push(eac, deletes);
    this.dirty = false;
  }

  public Push(
    eac: OpenIndustrialEaC,
    deletes: NullableArrayOrObject<OpenIndustrialEaC> = {},
  ): void {
    const snapshot: EaCHistorySnapshot = {
      eac: jsonMapSetClone(eac),
      deletes: jsonMapSetClone(deletes),
    };

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

  public Undo(): EaCHistorySnapshot | null {
    if (!this.CanUndo()) return null;
    this.pointer--;
    this.onChange?.();
    return jsonMapSetClone(this.history[this.pointer]);
  }

  public Redo(): EaCHistorySnapshot | null {
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

  public RevertToLastCommit(): EaCHistorySnapshot | null {
    if (!this.committed) return null;
    this.Push(this.committed.eac, this.committed.deletes);
    this.onChange?.();
    return jsonMapSetClone(this.committed);
  }

  public ForkRuntime(): OpenIndustrialEaC {
    const { eac } = this.GetCurrent();
    // Future: apply ForkedFrom tag or runtime label here
    return jsonMapSetClone(eac);
  }

  public GetVersion(): number {
    return this.pointer;
  }

  public HasUnsavedChanges(): boolean {
    if (!this.committed) return true;
    const current = this.GetCurrent();
    return (
      JSON.stringify(current.eac) !== JSON.stringify(this.committed.eac) ||
      JSON.stringify(current.deletes) !== JSON.stringify(this.committed.deletes)
    );
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
