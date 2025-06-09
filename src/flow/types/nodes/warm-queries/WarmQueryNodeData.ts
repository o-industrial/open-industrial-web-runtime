import { EaCWarmQueryDetails } from '@o-industrial/common/eac';
import { FlowNodeData } from '../../react/FlowNodeData.ts';
import { WarmQueryNodeEvent } from './WarmQueryNodeEvent.ts';
import { WarmQueryStats } from './WarmQueryStats.ts';

export type WarmQueryNodeData = FlowNodeData<
  EaCWarmQueryDetails,
  WarmQueryStats,
  WarmQueryNodeEvent
>;
