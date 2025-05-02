export type FlowNodeData<TStats extends Record<string, unknown> = Record<string, unknown>> = {
  type: string;
  label: string;
  iconKey?: string;
  isSelected?: boolean;
  onDoubleClick?: () => void;

  stats?: TStats;
  getStats?: () => Promise<TStats>;

  [key: string]: unknown;
};
