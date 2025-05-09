import { EaCAgentDetails } from '@o-industrial/common/eac';
import { AgentStats } from './AgentStats.tsx';
import { FlowNodeData } from '../../react/FlowNodeData.ts';

export type AgentNodeData = FlowNodeData<EaCAgentDetails, AgentStats>;
