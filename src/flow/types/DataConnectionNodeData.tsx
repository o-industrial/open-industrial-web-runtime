import { EaCDataConnectionDetails } from '@o-industrial/common/eac';
import { DataConnectionStats } from './DataConnectionStats.ts';
import { FlowNodeData } from './react/FlowNodeData.ts';

export type DataConnectionNodeData = FlowNodeData<
  EaCDataConnectionDetails,
  DataConnectionStats
>;
