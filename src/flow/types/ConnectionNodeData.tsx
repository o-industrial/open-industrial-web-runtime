import { ConnectionStats } from './ConnectionStats.ts';
import { FlowNodeData } from './react/FlowNodeData.ts';

export type ConnectionNodeData = FlowNodeData<ConnectionStats> & {
  connectionTypes?: string[];
};
