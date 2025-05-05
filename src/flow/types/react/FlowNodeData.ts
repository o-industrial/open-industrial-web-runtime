import { EaCVertexDetails } from '@fathym/eac';

export type FlowNodeData<TEaC extends EaCVertexDetails = EaCVertexDetails> = {
  /** Internal type*/
  type: string;

  /** Optional label for UI display */
  label?: string;

  /** Internal enablement state */
  enabled?: boolean;

  /** Canonical EaC details object */
  details: TEaC;

  /** Runtime node stats (live sim, metrics, etc.) */
  stats?: Record<string, unknown>;
  getStats?: () => Promise<Record<string, unknown>>;

  /** UI interaction */
  isSelected?: boolean;
  onDoubleClick?: () => void;

  /** Optional icon override */
  iconKey?: string;
};
