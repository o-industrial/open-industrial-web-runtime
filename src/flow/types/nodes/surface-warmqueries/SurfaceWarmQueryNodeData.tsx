import { FlowNodeData } from '../../react/FlowNodeData.ts';
import { SurfaceWarmQueryStats } from './SurfaceWarmQueryStats.tsx';
import { SurfaceWarmQuerySettings } from '@o-industrial/common/eac';

export type SurfaceWarmQueryNodeData = FlowNodeData<
  SurfaceWarmQuerySettings,
  SurfaceWarmQueryStats
>;
