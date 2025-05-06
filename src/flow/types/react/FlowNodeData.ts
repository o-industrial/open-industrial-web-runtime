import { EaCVertexDetails } from '@fathym/eac';

export type FlowNodeData<
  TEaC extends EaCVertexDetails = EaCVertexDetails,
  TStats extends Record<string, unknown> = Record<string, unknown>,
> = {
  /** Internal type*/
  type: string;

  /** Optional label for UI display */
  label?: string;

  /** Internal enablement state */
  enabled?: boolean;

  /** Canonical EaC details object */
  details: TEaC;

  /** Runtime node stats (live sim, metrics, etc.) */
  getStats?: () => Promise<TStats>;

  /** UI interaction */
  isSelected?: boolean;
  onDoubleClick?: () => void;

  /** Optional icon override */
  iconKey?: string;
};
