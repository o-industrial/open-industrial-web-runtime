import { EaCSimulatorDetails } from '@o-industrial/common/eac';
import { FlowNodeData } from '../../react/FlowNodeData.ts';
import { SimulatorStats } from './SimulatorStats.tsx';

export type SimulatorNodeData = FlowNodeData<
  EaCSimulatorDetails,
  SimulatorStats
>;
