import { EaCSurfaceDetails } from '@o-industrial/common/eac';
import { FlowNodeData } from '../../react/FlowNodeData.ts';
import { SurfaceNodeEvent } from './SurfaceNodeEvent.ts';
import { SurfaceStats } from './SurfaceStats.ts';

export type SurfaceNodeData = FlowNodeData<
  EaCSurfaceDetails,
  SurfaceStats,
  SurfaceNodeEvent
>;
