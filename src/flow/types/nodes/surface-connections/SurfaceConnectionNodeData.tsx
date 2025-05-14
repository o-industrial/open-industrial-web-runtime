import { FlowNodeData } from '../../react/FlowNodeData.ts';
import { SurfaceConnectionStats } from './SurfaceConnectionStats.tsx';
import { SurfaceDataConnectionSettings } from '@o-industrial/common/eac';

export type SurfaceConnectionNodeData = FlowNodeData<
  SurfaceDataConnectionSettings,
  SurfaceConnectionStats
>;
