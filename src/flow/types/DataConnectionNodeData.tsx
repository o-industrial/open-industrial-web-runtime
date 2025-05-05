import { EaCDataConnectionDetails } from '../../eac/EaCDataConnectionDetails.ts';
import { DataConnectionStats } from './DataConnectionStats.ts';
import { FlowNodeData } from './react/FlowNodeData.ts';

export type DataConnectionNodeData = FlowNodeData<
  EaCDataConnectionDetails,
  DataConnectionStats
>;
